import React from "react";
import Link from "next/link";

export default function Page() {
  return (

    <main className="min-h-screen w-full bg-gradient-to-b from-[#050617] via-[#050617] to-[#02030a] text-white">
      {/* Sticky Navbar */}
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
              {[
                { label: "Features", href: "#features" },
                { label: "Examples", href: "#examples" },
                { label: "Pricing", href: "#pricing" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-white/75 transition hover:text-white hover:underline hover:decoration-purple-400/70 hover:underline-offset-4"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/generate"
                className="rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-2 text-sm font-bold text-white shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] transition hover:brightness-110"
              >
                Get Started
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        <section className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-xl">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
              Instant AI image generation for creators
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                Create Stunning AI Images with Pixelora AI
              </span>
            </h1>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Generate Pinterest images, logos, wallpapers, and YouTube thumbnails instantly.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["Prompt Enhancement", "Multiple Styles", "Instant Downloads"].map((t) => (
                <div
                  key={t}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 backdrop-blur-xl"
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-white/10"
              >
                Get Started
              </Link>

              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] transition hover:brightness-110"
              >
                Start Creating Free
              </Link>

            </div>

            <p className="mt-3 text-xs text-white/50">
              No signup required. Generate in seconds.
            </p>
          </div>

          <div className="relative">
            <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-4 sm:p-6 shadow-[0_0_90px_-30px_rgba(168,85,247,0.35)] backdrop-blur-xl">
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
                <div className="text-sm font-semibold text-white/80">Preview</div>
                <div className="mt-3 flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20" />
                  <div>
                    <div className="text-sm font-bold">Your image dashboard</div>
                    <div className="text-xs text-white/60">Click Generate to see live results.</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { t: "Enhance Prompt", d: "Upgrade your text into a stronger prompt." },
                  { t: "Choose a Style", d: "Realistic, Anime, Logos, Wallpapers, more." },
                  { t: "Generate Images", d: "Instant output using our model." },
                  { t: "Download", d: "Save your results right away." },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <div className="text-sm font-semibold">{c.t}</div>
                    <div className="mt-1 text-xs text-white/65">{c.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Link
                  href="/generate"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] transition hover:brightness-110 sm:w-auto"
                >
                  Start Generating
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Features Section (UI-only) */}
        <section id="features" className="mt-14 border-t border-white/10/75 pt-10">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Features</h2>
                <p className="mt-2 text-sm text-white/70 sm:text-base">
                  Everything you need to go from idea to high-quality AI visuals.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.8)]" />
                SaaS-grade generation flow
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "✨",
                  title: "Prompt Enhancement",
                  desc: "Transform simple ideas into detailed AI prompts automatically.",
                },
                {
                  icon: "🎨",
                  title: "Multiple Styles",
                  desc: "Generate Pinterest images, logos, wallpapers, thumbnails and more.",
                },
                {
                  icon: "⚡",
                  title: "Lightning Fast",
                  desc: "Powered by Cloudflare AI for fast image generation.",
                },
                {
                  icon: "⬇️",
                  title: "Instant Downloads",
                  desc: "Download high-quality generated images instantly.",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-[0_0_80px_-40px_rgba(168,85,247,0.25)] transition hover:-translate-y-0.5 hover:border-purple-400/25 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 ring-1 ring-white/10 transition group-hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]">
                      <span className="text-lg" aria-hidden>
                        {f.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-bold tracking-tight">{f.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples Section (UI-only) */}
        <section id="examples" className="mt-14">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Popular Creations</h2>
              <p className="mt-2 text-sm text-white/70 sm:text-base">See what you can create with Pixelora AI</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Pinterest Aesthetic Images", desc: "Trendy visuals with aesthetic color grading." },
                { title: "Professional Logos", desc: "Clean brand marks built for modern startups." },
                { title: "4K Wallpapers", desc: "Ultra-detailed backgrounds for your devices." },
                { title: "YouTube Thumbnails", desc: "High-impact thumbnails that increase clicks." },
              ].map((ex) => (
                <Link
                  key={ex.title}
                  href="/generate"
                  className="group text-left rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-purple-400/25 hover:bg-white/10"
                >
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <div className="aspect-[4/3] w-full bg-gradient-to-br from-pink-500/20 via-purple-500/15 to-indigo-500/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.25),transparent_45%)] opacity-0 transition group-hover:opacity-100" />
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-xl">
                      Explore
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold tracking-tight">{ex.title}</h3>
                    <p className="mt-1 text-sm text-white/70">{ex.desc}</p>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-14" aria-label="Stats">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_90px_-40px_rgba(168,85,247,0.25)]">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-3xl font-extrabold tracking-tight">100K+</div>
                  <div className="mt-1 text-sm text-white/70">Images Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight">⚡</div>
                  <div className="mt-1 text-sm text-white/70">Fast Generation</div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold tracking-tight">🆓</div>
                  <div className="mt-1 text-sm text-white/70">Free to Use</div>
                  <div className="mt-1 text-xs text-white/50">No signup required</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-14" id="pricing">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 p-6 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(168,85,247,0.35),transparent_35%),radial-gradient(circle_at_85%_30%,rgba(236,72,153,0.25),transparent_40%)]" />
              <div className="relative grid gap-4 md:grid-cols-3 md:items-center">
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Ready to create your next masterpiece?</h2>
                  <p className="mt-2 text-sm text-white/70">Start generating today—powered by Pixelora AI.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <a
                  href="#examples"
                  className="inline-flex items-center justify-center rounded-xl bg-white/5 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  Explore Examples
                </a>

                  <Link
                    href="/generate"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_30px_-10px_rgba(168,85,247,0.6)] transition hover:brightness-110"
                  >
                    Start Creating Free
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 border-t border-white/10 pt-10">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="text-sm font-bold tracking-tight">Pixelora AI</div>
                <p className="mt-2 text-xs text-white/60">Create stunning AI visuals in seconds.</p>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80">Product</div>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>
                    <a className="hover:text-white transition" href="/generate">
                      Generate
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition" href="#features">
                      Features
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition" href="#examples">
                      Examples
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80">Resources</div>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>
                    <a className="hover:text-white transition" href="#">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition" href="#">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-semibold text-white/80">Company</div>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>
                    <a className="hover:text-white transition" href="#">
                      About
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition" href="#">
                      Contact
                    </a>
                  </li>
                </ul>

                <div className="mt-6 text-sm font-semibold text-white/80">Legal</div>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>
                    <a className="hover:text-white transition" href="#">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-white transition" href="#">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
              <div>
                Uses <span className="text-white/70">/api/generate</span> to create images.
              </div>
              <div>© {new Date().getFullYear()} Pixelora AI. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

