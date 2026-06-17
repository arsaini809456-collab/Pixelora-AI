"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
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

export default function GeneratePage() {
  const [prompt, setPrompt] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string | null>(null);
  const [enhanceStatus, setEnhanceStatus] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("Realistic");
  const [thumbnailType, setThumbnailType] = useState<string>("video");

  const canGenerate = useMemo(() => {
    return !loading && prompt.trim().length > 0;
  }, [loading, prompt]);

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
      {/* Sticky Navbar (shared look, generator route) */}
      <div className="sticky top-0 z-50">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 shadow-[0_0_40px_-20px_rgba(236,72,153,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-purple-400/25">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-indigo-500/30 blur-[1px]" />
                <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-pink-500/40 via-purple-500/40 to-indigo-500/40" />
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-black text-white">
                  P
                </span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                    Pixelora AI
                  </span>
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-6 md:flex">
              {[{ label: "Features", href: "/#features" }, { label: "Examples", href: "/#examples" }, { label: "Pricing", href: "/#pricing" }].map(
                (item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-sm font-semibold text-white/75 transition hover:text-white hover:underline hover:decoration-purple-400/70 hover:underline-offset-4"
                  >
                    {item.label}
                  </a>
                )
              )}

            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Back to Home"
              >
                <span className="mr-2" aria-hidden>
                  
                </span>
                 Back to Home
              </Link>

            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* Left: Prompt + Controls */}
          <div className="w-full lg:max-w-[560px]">
            <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 shadow-[0_0_70px_-40px_rgba(168,85,247,0.35)] backdrop-blur-xl">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-sm font-semibold text-white/80">Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A futuristic city at sunset, cinematic lighting"
                    className="mt-2 min-h-[120px] sm:min-h-[140px] w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/25 transition"
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
                            selectedStyle === "YouTube Thumbnail" ? thumbnailType : undefined,
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
                    enhancing || !prompt.trim() ? "cursor-not-allowed opacity-60" : ""
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

                      setError(null);
                      setLoading(true);
                      setGenerationStatus("Connecting to image model...");

                      try {
                        setGenerationStatus("Preparing your prompt...");
                        await sleep(300);

                        setGenerationStatus("Generating your image...");
                        await sleep(800);
                        setGenerationStatus("Almost ready...");
                        await sleep(800);

                        const res = await fetch("/api/generate", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ prompt: prompt.trim() }),
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
                        setGenerationStatus(null);
                      } catch (err: unknown) {
                        setError(
                          err instanceof Error
                            ? err.message
                            : "Something went wrong while generating the image."
                        );
                        setGenerationStatus(null);
                      } finally {
                        setLoading(false);
                        setGenerationStatus(null);
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

                {generationStatus ? (
                  <p className="mt-3 text-center text-sm font-semibold text-purple-300 animate-pulse">
                    {generationStatus}
                  </p>
                ) : null}

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


              </div>
            </div>
          </div>
          {/* Right: Preview + Download */}
          <div className="w-full lg:flex-1">
            <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 shadow-[0_0_70px_-40px_rgba(168,85,247,0.35)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-sm font-semibold text-white/80">Preview</h2>
                <div className="text-xs text-white/60">
                  {loading ? "Rendering image..." : imageUrl ? "Ready" : "Waiting..."}
                </div>
              </div>

              <div className="mt-4">
                {imageUrl ? (
                  <div className="flex flex-col gap-4">
                    <GeneratedPreview src={imageUrl} alt="Generated" />

                    <button
                      onClick={onDownload}
                      className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Download
                    </button>
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-black/10 px-4 py-10 text-center">
                    <div className="text-sm font-semibold text-white/75">
                      Your generated image will show up here
                    </div>
                    <div className="text-xs text-white/50">Type a prompt and click Generate.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

