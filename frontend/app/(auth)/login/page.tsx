"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (!isSupabaseConfigured) {
      setError(
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in frontend/.env.local, then restart the frontend.",
      );
      setLoading(false);
      return;
    }

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  function scrollToLogin() {
    const el = document.getElementById("login-section");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-[#0a1220] text-gray-900 scroll-smooth">
      {/* Background Architectural Photo */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Cinematic Dark Gradient Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-black/30 to-black/75"
      />

      {/* =========================================================
          TOP NAVIGATION BAR (Glassy Box HR365 & Glassy Box Log in)
      ========================================================= */}
      <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between p-5 sm:p-8 pointer-events-none">
        {/* Top-Left HR365 Glassy Box */}
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center justify-center rounded-2xl border border-white/45 bg-white/75 px-6 py-2.5 text-lg sm:text-xl font-bold text-[#111827] shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/90 hover:scale-105 active:scale-95"
        >
          HR365
        </Link>

        {/* Top-Right Glassy Theme Toggle & Log in */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="inline-flex items-center justify-center rounded-2xl border border-white/45 bg-white/75 p-1 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/90">
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={scrollToLogin}
            className="inline-flex items-center justify-center rounded-2xl border border-white/45 bg-white/75 px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#111827] shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/90 hover:scale-105 active:scale-95"
          >
            Log in
          </button>
        </div>
      </header>

      {/* =========================================================
          HERO LANDING SECTION (Matching Screenshot 1 exactly)
      ========================================================= */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-24 text-center sm:px-8">
        {/* Floating Animated Icons with Glassy Squircle Boxes & Hover Animations */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          {/* 1. Analytics Chart (Top-Left of Center) */}
          <div className="login-float-one pointer-events-auto absolute left-[14%] top-[12%] sm:left-[22%] sm:top-[12%] flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-[20px] border border-white/50 bg-white/25 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-125 hover:rotate-6 hover:shadow-2xl cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100/90 text-indigo-600 shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
            </div>
          </div>

          {/* 2. Briefcase (Mid-Left) */}
          <div className="login-float-two pointer-events-auto absolute left-[5%] top-[24%] sm:left-[10%] sm:top-[22%] flex h-16 w-16 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-[22px] border border-white/50 bg-white/25 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-125 hover:-rotate-6 hover:shadow-2xl cursor-pointer">
            <span className="text-3xl filter drop-shadow-sm select-none">💼</span>
          </div>

          {/* 3. Globe (Top-Right of Center) */}
          <div className="login-float-three pointer-events-auto absolute right-[14%] top-[11%] sm:right-[24%] sm:top-[11%] flex h-16 w-16 sm:h-[68px] sm:w-[68px] items-center justify-center rounded-[22px] border border-white/50 bg-white/25 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-125 hover:rotate-6 hover:shadow-2xl cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-400/20 text-sky-400">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
          </div>

          {/* 4. Lightbulb (Mid-Right) */}
          <div className="login-float-four pointer-events-auto absolute right-[5%] top-[24%] sm:right-[11%] sm:top-[22%] flex h-14 w-14 sm:h-[64px] sm:w-[64px] items-center justify-center rounded-[20px] border border-white/50 bg-white/25 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-125 hover:-rotate-6 hover:shadow-2xl cursor-pointer">
            <span className="text-3xl filter drop-shadow-sm select-none">💡</span>
          </div>
        </div>

        {/* Hero Content Block */}
        <div className="relative z-10 flex max-w-4xl flex-col items-center">
          {/* Center Badge Capsule */}
          <div className="mb-6 sm:mb-8 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-xs sm:text-sm font-medium text-white/90 shadow-md backdrop-blur-md transition hover:bg-black/50">
            We just launched HR365 🚀
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-xl sm:text-6xl lg:text-7xl">
            Your Haven for
            <br />
            <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
              Seamless HR Solutions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/85 drop-shadow-md sm:text-base lg:text-lg">
            Empowering you with intelligent, effortless tools to streamline your
            workflow, enhance collaboration, and achieve more—seamlessly.
          </p>

          {/* Get Started CTA Button */}
          <button
            type="button"
            onClick={scrollToLogin}
            className="mt-8 sm:mt-10 rounded-full bg-[#1e60ff] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(30,96,255,0.45)] transition hover:bg-[#1550e5] hover:scale-105 active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Bottom spacer for hero section */}
        <div className="h-8" />
      </section>

      {/* =========================================================
          LOGIN CARD SECTION (Matching Screenshot exactly)
      ========================================================= */}
      <section
        id="login-section"
        className="relative z-10 flex min-h-screen scroll-mt-0 flex-col items-center justify-start"
      >
        {/* The Translucent Wavy Top Ribbon with Continuous Moving Wave Animations */}
        <div className="relative w-full overflow-hidden leading-none pointer-events-none h-20 sm:h-24 md:h-28">
          {/* Back Wave (Drifts gently left) */}
          <div className="absolute inset-0 w-[200%] min-w-[200%] h-full animate-wave-back pointer-events-none">
            <svg
              viewBox="0 0 2880 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,60 C120,45 360,90 540,50 C720,15 900,80 1080,40 C1200,10 1320,75 1440,60 C1560,45 1800,90 1980,50 C2160,15 2340,80 2520,40 C2640,10 2760,75 2880,60 L2880,120 L0,120 Z"
                fill="rgba(255, 255, 255, 0.22)"
              />
            </svg>
          </div>

          {/* Front Wave (Drifts right, creates fluid wave interference) */}
          <div className="absolute inset-0 w-[200%] min-w-[200%] h-full animate-wave-front pointer-events-none">
            <svg
              viewBox="0 0 2880 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,72 C120,90 280,30 460,55 C640,80 800,25 980,60 C1160,95 1320,54 1440,72 C1560,90 1720,30 1900,55 C2080,80 2240,25 2420,60 C2600,95 2760,54 2880,72 L2880,120 L0,120 Z"
                fill="rgba(255, 255, 255, 0.38)"
              />
            </svg>
          </div>
        </div>

        {/* Frosted Metallic Pane with Login Card */}
        <div className="w-full flex-1 flex flex-col items-center justify-start border-t border-white/40 bg-white/35 px-5 pt-8 pb-24 shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-2xl sm:px-8">
          <div
            className="relative z-20 w-full max-w-[440px] rounded-[32px] border border-white/80 bg-white/95 p-8 sm:p-10 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-300 hover:shadow-[0_25px_80px_rgba(0,0,0,0.3)]"
          >
          {/* Card Title & Subtitle */}
          <div className="mb-7 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-[#64748b]">
              Sign in to your HR365 workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold text-[#334155]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold text-[#334155]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm text-[#0f172a] outline-none transition placeholder:text-[#94a3b8] focus:border-blue-500 focus:bg-white"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-50/90 px-4 py-3 text-xs text-red-600 font-medium"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-[#181d24] py-3.5 text-sm font-semibold text-white transition hover:bg-black shadow-md disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.99]"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* "OR CONTINUE WITH" Divider */}
          <div className="relative my-7 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-[#fdfdfd] px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
              OR CONTINUE WITH
            </span>
          </div>

          {/* Social Logins (Google & Microsoft) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google Button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* Microsoft Button */}
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 21 21">
                <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
              </svg>
              <span>Microsoft</span>
            </button>
          </div>

          {/* Footer Link */}
          <p className="mt-8 text-center text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-bold text-[#0f172a] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
        </div>
      </section>
    </main>
  );
}