import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = body?.prompt;

    console.log("Received prompt:", prompt);

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing Hugging Face API key. Check .env.local and restart server." },
        { status: 500 }
      );
    }

    console.log("Original prompt:", prompt);

    let finalPrompt = prompt.trim();

    const groqApiKey = process.env.GROQ_API_KEY;

    if (groqApiKey) {
      try {
        const groqResponse = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${groqApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "llama-3.1-8b-instant",
              messages: [
                {
                  role: "system",
                  content:
                    "You are an expert AI image prompt engineer. Convert short user ideas into detailed image generation prompts. Return only the final prompt, no explanation.",
                },
                {
                  role: "user",
                  content: prompt.trim(),
                },
              ],
              temperature: 0.8,
              max_tokens: 200,
            }),
          }
        );

        if (groqResponse.ok) {
          const groqData = await groqResponse.json().catch(() => null);
          const enhancedPrompt =
            groqData?.choices?.[0]?.message?.content;

          if (typeof enhancedPrompt === "string" && enhancedPrompt.trim()) {
            finalPrompt = enhancedPrompt.trim();
          }
        } else {
          const groqErrorText = await groqResponse.text().catch(() => "");
          console.error("Groq API error:", groqErrorText);
        }
      } catch (e) {
        console.error("Groq prompt enhancement failed:", e);
      }
    }

    console.log("Enhanced prompt:", finalPrompt);

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
          inputs: finalPrompt,
          options: {
            wait_for_model: true,
          },
        }),

      }
    );

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", errorText);

      return NextResponse.json(
        { error: errorText || "Hugging Face API failed." },
        { status: response.status }
      );
    }

    if (!contentType.includes("image")) {
      const text = await response.text();
      console.error("Expected image but got:", text);

      return NextResponse.json(
        { error: text || "Hugging Face did not return an image." },
        { status: 500 }
      );
    }

    const imageBuffer = await response.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    return NextResponse.json({
      imageUrl: `data:image/png;base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Generate route error:", error);

    return NextResponse.json(
      { error: "Something went wrong while generating image." },
      { status: 500 }
    );
  }
}
