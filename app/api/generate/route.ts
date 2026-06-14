import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function aspectRatioToDimensions(aspectRatio?: string) {
  const ar = (aspectRatio || "").trim();

  switch (ar) {
    case "16:9":
      return { width: 1280, height: 720 };
    case "9:16":
      return { width: 720, height: 1280 };
    case "2:3":
      return { width: 768, height: 1152 };
    case "1:1":
    default:
      return { width: 1024, height: 1024 };
  }
}

function shouldFallbackToPollinations(hfStatus: number, hfErrorText: string) {
  const text = (hfErrorText || "").toLowerCase();

  if (hfStatus === 402) return true;

  return (
    text.includes("depleted") ||
    text.includes("monthly included credits") ||
    text.includes("included credits") ||
    text.includes("payment required") ||
    text.includes("quota") ||
    text.includes("credits") ||
    text.includes("quota exceeded")
  );
}

async function fetchPollinationsImage({
  finalPrompt,
  aspectRatio,
}: {
  finalPrompt: string;
  aspectRatio?: string;
}) {
  const { width, height } = aspectRatioToDimensions(aspectRatio);

  const pollinationsUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(
    finalPrompt
  )}?width=${width}&height=${height}&model=flux&enhance=false`;

  const pollinationRes = await fetch(pollinationsUrl, {
    method: "GET",
    headers: {
      Accept: "image/*",
    },
  });

  if (!pollinationRes.ok) {
    const errText = await pollinationRes.text().catch(() => "");
    throw new Error(
      errText || `Pollinations request failed with status ${pollinationRes.status}`
    );
  }

  const imageBuffer = await pollinationRes.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  return {
    imageUrl: `data:image/png;base64,${base64Image}`,
  };
}

async function generateWithCloudflareWorker({
  workerUrl,
  apiKey,
  prompt,
}: {
  workerUrl: string;
  apiKey: string;
  prompt: string;
}) {
  const response = await fetch(workerUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || `Cloudflare Worker failed with status ${response.status}`
    );
  }

  const imageBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  return {
    imageUrl: `data:image/png;base64,${base64Image}`,
  };
}

async function generateWithHuggingFace({
  prompt,
  aspectRatio,
}: {
  prompt: string;
  aspectRatio?: string;
}) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing Hugging Face API key. Check .env.local and restart server."
    );
  }

  const response = await fetch(
    "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "image/png",
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: true,
        },
      }),
    }
  );

  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");

    if (shouldFallbackToPollinations(response.status, errorText)) {
      return await fetchPollinationsImage({
        finalPrompt: prompt,
        aspectRatio,
      });
    }

    throw new Error(errorText || "Hugging Face API failed.");
  }

  if (!contentType.includes("image")) {
    const text = await response.text().catch(() => "");
    throw new Error(text || "Hugging Face did not return an image.");
  }

  const imageBuffer = await response.arrayBuffer();
  const base64Image = Buffer.from(imageBuffer).toString("base64");

  return {
    imageUrl: `data:image/png;base64,${base64Image}`,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = body?.prompt;
    const aspectRatio: string | undefined = body?.aspectRatio;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const finalPrompt = prompt.trim();

    const workerUrl = process.env.CLOUDFLARE_WORKER_URL;
    const workerApiKey = process.env.CLOUDFLARE_API_KEY;

    if (!workerUrl || !workerApiKey) {
      return NextResponse.json(
        { error: "Cloudflare image API is not configured." },
        { status: 500 }
      );
    }

    try {
      return NextResponse.json(
        await generateWithCloudflareWorker({
          workerUrl,
          apiKey: workerApiKey,
          prompt: finalPrompt,
        })
      );
    } catch (workerErr) {
      const workerMsg =
        workerErr instanceof Error ? workerErr.message : "Cloudflare Worker failed.";

      // Fallback to Hugging Face only if it still exists/works.
      try {
        return NextResponse.json(
          await generateWithHuggingFace({
            prompt: finalPrompt,
            aspectRatio,
          })
        );
      } catch (hfErr) {
        const hfMsg =
          hfErr instanceof Error ? hfErr.message : "Hugging Face failed.";

        return NextResponse.json(
          {
            error: `Image generation failed. Cloudflare Worker error: ${workerMsg}. Hugging Face error: ${hfMsg}`,
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const name = error instanceof Error ? error.name : "";
    const combined = `${name} ${message}`.toLowerCase();

    const isConnectTimeout =
      combined.includes("und_err_connect_timeout") ||
      combined.includes("fetch failed") ||
      combined.includes("timeout") ||
      combined.includes("connect timeout") ||
      combined.includes("etimedout");

    if (isConnectTimeout) {
      return NextResponse.json(
        {
          error:
            "Image server is taking too long or network connection failed. Please try again.",
        },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong while generating image." },
      { status: 500 }
    );
  }
}


