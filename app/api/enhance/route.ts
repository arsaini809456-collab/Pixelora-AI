import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const prompt = body?.prompt;
    const style = body?.style;


    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required." },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json(
        { error: "Missing GROQ API key. Check .env.local and restart server." },
        { status: 500 }
      );
    }

    const originalPrompt = prompt.trim();
    const finalStyle = typeof style === "string" && style.trim() ? style.trim() : "Realistic";
    const finalThumbnailType =
      typeof body?.thumbnailType === "string" && body.thumbnailType.trim()
        ? body.thumbnailType.trim()
        : "video";


    const styleInstruction = (() => {
      const s = finalStyle.toLowerCase();
      if (s === "anime") return "Anime style illustration with clean linework, vibrant colors, and expressive eyes.";
      if (s === "logo") return "Clean modern logo design, minimal shapes, strong contrast, and readable typography.";
      if (s === "wallpaper") return "Vertical 9:16 wallpaper design, high detail, balanced composition, and modern color grading.";
      if (s === "3d art") return "High quality 3D render, realistic materials, studio lighting, and cinematic depth of field.";
      if (s === "pinterest") return "Aesthetic Pinterest-style image prompt, trending composition, soft tones, and photogenic details.";
      // YouTube prompts are controlled by thumbnailType.
      if (s === "youtube thumbnail") {
        if (finalThumbnailType === "shorts") {
          return "Create a vertical 9:16 YouTube Shorts thumbnail prompt with centered subject, energetic style, clean background, and high visual impact.";
        }

        // default to video thumbnail
        return "Create a highly clickable 16:9 YouTube thumbnail prompt with a bold main subject, dramatic lighting, vibrant colors, high contrast, clear focal point, space for text, and a professional thumbnail composition.";
      }


      return "Ultra realistic photography, natural lighting, high detail, and cinematic color grading.";

    })();

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
              content: `${originalPrompt}\n\nStyle: ${finalStyle}. ${styleInstruction}`,
            },
          ],
          temperature: 0.8,
          max_tokens: 200,
        }),
      }
    );

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text().catch(() => "");
      return NextResponse.json(
        {
          error: errorText || "Groq prompt enhancement failed.",
        },
        { status: groqResponse.status }
      );
    }

    const groqData = (await groqResponse.json().catch(() => null)) as any;

    const enhancedPrompt =
      groqData?.choices?.[0]?.message?.content;

    if (!enhancedPrompt || typeof enhancedPrompt !== "string") {
      return NextResponse.json(
        { error: "Groq did not return an enhanced prompt." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      enhancedPrompt: enhancedPrompt.trim(),
    });
  } catch (error) {
    console.error("Enhance route error:", error);

    return NextResponse.json(
      { error: "Something went wrong while enhancing the prompt." },
      { status: 500 }
    );
  }
}

