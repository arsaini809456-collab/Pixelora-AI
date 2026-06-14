"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";


const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));



const GeneratedPreview = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => (
  <Image
    src={src}
    alt={alt}
    width={1024}
    height={1024}
    unoptimized
    className="h-auto max-h-[320px] sm:max-h-[420px] w-full rounded-2xl border border-white/10 object-contain"
  />
);


export default function Page() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [enhanceStatus, setEnhanceStatus] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("Realistic");
  const [thumbnailType, setThumbnailType] = useState<string>("video");
  const [selectedModel, setSelectedModel] = useState<string>("auto");

  const canGenerate = useMemo(() => {
    return !loading && prompt.trim().length > 0;
  }, [loading, prompt]);




  interface PuterModule {
    puter?: {
      ai?: {
        txt2img?: (args: { model: string; prompt: string }) => Promise<unknown>;
      };
    };
  }



  const isBlob = (v: unknown): v is Blob => v instanceof Blob;

  const getPuterModel = (): string => {
    if (selectedModel !== "auto") return selectedModel;

    switch (selectedStyle) {
      case "Realistic":
      case "Pinterest":
      case "YouTube Thumbnail":
        return "gpt-image-2";
      case "Logo":
        return "gpt-image-1-mini";
      case "Anime":
      case "Wallpaper":
      case "3D Art":
        return "flux";


      default:
        return "gpt-image-2";
    }
  };

  const extractImageUrl = (result: unknown): string | null => {

    if (typeof result === "string") return result;


    if (result instanceof HTMLImageElement) return result.src;
    if (isBlob(result)) return URL.createObjectURL(result);

    if (!result || typeof result !== "object") return null;

    const r = result as Record<string, unknown>;

    const imageUrl = typeof r.imageUrl === "string" ? r.imageUrl : undefined;
    if (imageUrl) return imageUrl;

    const url = typeof r.url === "string" ? r.url : undefined;
    if (url) return url;

    const tagName = typeof r.tagName === "string" ? r.tagName : "";
    if (tagName.toLowerCase() === "img" && typeof r.src === "string") {
      return r.src;
    }

    const images = Array.isArray(r.images) ? r.images : null;
    if (images && images.length > 0) {
      const first = images[0] as Record<string, unknown>;
      if (typeof first?.url === "string") return first.url as string;
      if (typeof first?.imageUrl === "string") return first.imageUrl as string;
    }

    if (r.blob && isBlob(r.blob)) {
      return URL.createObjectURL(r.blob);
    }

    const image = r.image;
    if (image && isBlob(image)) return URL.createObjectURL(image);
    if (image && typeof image === "object") {
      const maybeSrc = (image as { src?: unknown }).src;
      if (typeof maybeSrc === "string") return maybeSrc;
    }

    return null;
  };

  function onDownload() {
    if (!imageUrl) return;

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "ai-generated-image.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }


  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#050617] via-[#050617] to-[#02030a] text-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-14">
        <header className="mb-6 px-1 text-center sm:mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
              Pixelora AI
            </span>
          </h1>
            <p className="mt-2 text-sm text-white/70 sm:mt-3 sm:text-base">
              Create stunning AI images from simple prompts.
            </p>
        </header>

        <section className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 shadow-[0_0_80px_-20px_rgba(236,72,153,0.25)] backdrop-blur-xl">
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-semibold text-white/80">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A futuristic city at sunset, cinematic lighting"
                className="mt-2 min-h-[120px] sm:min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/25"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                "Realistic",
                "Anime",
                "Logo",
                "Wallpaper",
                "3D Art",
                "Pinterest",
                "YouTube Thumbnail",
              ].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setSelectedStyle(style)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    selectedStyle === style
                      ? "border-purple-400/60 bg-purple-400/15 text-white"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            {selectedStyle === "YouTube Thumbnail" ? (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setThumbnailType("video")}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    thumbnailType === "video"
                      ? "border-purple-400/60 bg-purple-400/15 text-white"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  Video
                </button>
                <button
                  type="button"
                  onClick={() => setThumbnailType("shorts")}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    thumbnailType === "shorts"
                      ? "border-purple-400/60 bg-purple-400/15 text-white"
                      : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
                >
                  Shorts
                </button>
              </div>
            ) : null}

            <div className="mt-1">
              <div className="mb-2 text-xs font-semibold text-white/70">Puter Model</div>
              <div className="flex flex-wrap gap-2">

                {[
                  { label: "Auto", value: "auto" },
                  { label: "GPT Image 2", value: "gpt-image-2" },
                  { label: "GPT Image Mini", value: "gpt-image-1-mini" },
                  { label: "DALL-E 3", value: "dall-e-3" },
                  { label: "FLUX", value: "flux" },
                  { label: "Nano Banana", value: "nanobanana" },
                  { label: "Grok Image", value: "grok-image" },
                ].map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setSelectedModel(m.value)}
                    className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                      selectedModel === m.value
                        ? "border-purple-400/60 bg-purple-400/15 text-white"
                        : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={async () => {
                if (!prompt.trim()) return;
                setEnhancing(true);
                setError(null);


                setEnhanceStatus("Improving your prompt...");
                await sleep(800);
                setEnhanceStatus("Adding style details...");
                await sleep(800);
                setEnhanceStatus("Finalizing enhanced prompt...");
                await sleep(800);

                try {
                  const res = await fetch("/api/enhance", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      prompt: prompt.trim(),
                      style: selectedStyle,
                      thumbnailType:
                        selectedStyle === "YouTube Thumbnail"
                          ? thumbnailType
                          : undefined,
                    }),
                  });

                  const data = (await res.json().catch(() => ({}))) as {
                    enhancedPrompt?: string;
                    error?: string;
                  };

                  if (!res.ok) {
                    setError(data.error || "Failed to enhance prompt.");
                    return;
                  }

                  if (data.enhancedPrompt) {
                    setPrompt(data.enhancedPrompt);
                  } else {
                    setError("No enhanced prompt returned from the server.");
                  }
                } catch {
                  setError("Something went wrong while enhancing the prompt.");
                } finally {
                  setEnhancing(false);
                  setEnhanceStatus(null);
                }
              }}
              disabled={enhancing || !prompt.trim()}
              className={`inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto ${
                enhancing || !prompt.trim()
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >
              {enhancing ? "Enhancing..." : "Enhance Prompt"}
            </button>

            {enhanceStatus ? (
              <div className="mt-3 text-center text-sm font-semibold text-purple-300 animate-pulse">
                {enhanceStatus}
              </div>
            ) : null}

            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
              <button
                onClick={async () => {
                  if (!prompt.trim()) return;

                  // Prefer Puter; fallback to /api/generate.
                  // While this runs, keep existing loading & messages behavior.
                  setError(null);

                  // Puter aspect ratio guidance (best-effort).
                  const style = selectedStyle;
                  const thumb = style === "YouTube Thumbnail" ? thumbnailType : undefined;
                  const aspectHint = thumb === "shorts"
                    ? "--ar 9:16"
                    : style === "YouTube Thumbnail"
                      ? "--ar 16:9"
                      : "--ar 1:1";

                  const originalPrompt = prompt.trim();
                  const puterPrompt = `${originalPrompt} ${aspectHint}`;

                  setLoading(true);
                  setGenerationStatus("Generating with Puter...");

                  try {
                    setGenerationStatus("Preparing your prompt...");
                    await sleep(300);


                    // Import client-side only; avoid SSR issues.
                    const mod = (await import("@heyputer/puter.js")) as PuterModule;
                    const puter = mod?.puter;
                    if (!puter?.ai?.txt2img) {
                      throw new Error("Puter SDK not available in this browser context.");
                    }


                    // Timeout protection: Puter should return within 90 seconds.
                    const withTimeout = async <T,>(p: Promise<T>, ms: number): Promise<T> => {
                      return new Promise<T>((resolve, reject) => {
                        const timer = setTimeout(
                          () => reject(new Error(`Puter timeout after ${ms}ms`)),
                          ms
                        );
                        p.then((v) => {
                          clearTimeout(timer);
                          resolve(v);
                        }).catch((err) => {
                          clearTimeout(timer);
                          reject(err);
                        });
                      });
                    };

                    console.log("Starting Puter generation");
                    setGenerationStatus("Generating with Puter...");

                    const finalPrompt = (() => {
                      const hint = (() => {
                        const style = selectedStyle;
                        const thumb =
                          style === "YouTube Thumbnail" ? thumbnailType : undefined;

                        if (thumb === "video") return "--ar 16:9";
                        if (thumb === "shorts") return "--ar 9:16";
                        if (style === "Wallpaper") return "--ar 9:16";
                        if (style === "Pinterest") return "--ar 2:3";
                        if (style === "Logo") return "--ar 1:1";
                        return "--ar 1:1";
                      })();

                      return `${prompt.trim()} ${hint}`;
                    })();

                    const result = await withTimeout(
                      puter.ai.txt2img({
                        model: getPuterModel(),
                        prompt: finalPrompt.trim(),
                      }),

                      90_000
                    );


                    console.log("Puter response received", result);

                    const generatedImage = extractImageUrl(result);
                    if (!generatedImage) {
                      throw new Error("Puter did not return a usable image (url/image/blob).");
                    }

                    setImageUrl(generatedImage);

                    setGenerationStatus(null);
                    return;
                  } catch (err: unknown) {
                    console.log("Puter error", err);

                    const message = err instanceof Error ? err.message : "Unknown error";
                    const msg = message.toLowerCase();

                    if (msg.includes("timeout")) {
                      setGenerationStatus(null);
                      setError("Puter is taking too long. Please try again.");
                    }

                    // Fallback to existing Hugging Face API route.
                    // Re-run the original Generate Image flow.
                    setGenerationStatus("Connecting to image model...");
                    await sleep(800);
                    setGenerationStatus("Generating your image...");
                    await sleep(800);
                    setGenerationStatus("Almost ready...");
                    await sleep(800);

                    try {
                      setError(null);
                      setImageUrl(null);
                      const trimmedHF = prompt.trim();


                      const res = await fetch("/api/generate", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ prompt: trimmedHF }),
                      });

                      const data = (await res.json().catch(() => ({}))) as {
                        imageUrl?: string;
                        error?: string;
                      };

                      if (!res.ok) {
                        setError(data.error || "Failed to generate image.");
                        return;
                      }

                      if (!data.imageUrl) {
                        setError("No image URL returned from the server.");
                        return;
                      }


                      setImageUrl(data.imageUrl);
                    } catch (err: unknown) {
                      setError(
                        err instanceof Error ? err.message : "Something went wrong while generating the image."
                      );
                    } finally {

                      setLoading(false);
                      setGenerationStatus(null);
                    }
                  }
                }}
                disabled={!canGenerate}
                className={`mt-1 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 text-sm font-bold transition sm:text-base sm:flex-1 ${
                  canGenerate
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:brightness-110"
                    : "cursor-not-allowed bg-white/10 text-white/50"
                }`}
              >
                {loading ? "Generating..." : "Generate Image"}
              </button>
            </div>



            {generationStatus && (
              <p className="mt-3 text-center text-sm font-semibold text-purple-300 animate-pulse">
                {generationStatus}
              </p>
            )}

            <button
              type="button"
              onClick={() => {
                setPrompt("");
                setError(null);
              }}
              disabled={false}

              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Clear Prompt
            </button>

            <button
              type="button"
              onClick={() => {
                setPrompt("");
                setError(null);
                setImageUrl(null);
                setSelectedStyle("Realistic");
                setThumbnailType("video");
                setLoading(false);
                setEnhancing(false);
              }}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Reset All
            </button>


            {error ? (

              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                <div className="font-semibold">Error</div>
                <div className="mt-1 break-words">{error}</div>
              </div>
            ) : null}


            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-white/80">Preview</h2>
                <div className="text-xs text-white/60">
                  {loading ? "Rendering image..." : imageUrl ? "Ready" : "Waiting..."}
                </div>
              </div>

              <div className="mt-4 flex flex-col items-center gap-4 sm:gap-5">
                {imageUrl ? (
                  <>
                    <GeneratedPreview src={imageUrl} alt="Generated" />


                    <button
                      onClick={onDownload}
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                    >
                      Download
                    </button>
                  </>
                ) : (
                  <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-black/10 px-4 py-10 text-center">
                    <div className="text-sm font-semibold text-white/75">
                      Your generated image will show up here
                    </div>
                    <div className="text-xs text-white/50">
                      Type a prompt above and click Generate.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-7 text-center text-xs text-white/50">
          Uses <span className="text-white/70">/api/generate</span> to create images.
        </footer>
      </div>
    </main>
  );
}

