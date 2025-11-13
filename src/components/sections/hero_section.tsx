"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Header from "@/components/layout/Header";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for hero content
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.3,
    })
      .from(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        footerRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3"
      );
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Video Hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay - rgba(0, 61, 76, 0.4) */}
        <div className="absolute inset-0 bg-[rgba(0,61,76,0.4)]" />
      </div>

      {/* Header */}
      <Header />

      {/* Content Section - Centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center self-stretch px-6">
        <div className="flex w-full max-w-[800px] flex-col items-center gap-6 sm:gap-8">
          {/* Headline */}
          <h1
            ref={titleRef}
            className="w-full text-center text-4xl font-normal leading-[1.4em] tracking-[-0.04em] text-white sm:text-5xl md:text-[56px]"
            style={{
              fontFamily: "var(--font-michroma)",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            Your{" "}
            <span className="text-[#5DD4C5]">{"{Data}"}</span>
            <br />
            Beautifully Organized
            <br />
            Finally
          </h1>

          {/* Subheadline */}
          <p
            ref={subtitleRef}
            className="w-full text-center text-sm leading-[1.5em] text-white/90 sm:text-base"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Stop retyping the same information.{" "}
            <span className="hidden md:inline">
              <br />
            </span>
            Amorfs captures what you enter once, stores it securely,{" "}
            <span className="hidden md:inline">
              <br />
            </span>
            and lets you reuse it anywhere—or transform it into something
            beautiful to share.
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="flex flex-col items-center justify-center">
            <button
              className="flex items-center justify-center gap-2 rounded-[1000px] bg-[#0F408F] px-5 py-3 transition-all hover:bg-[#0D3678]"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <span className="text-center text-base font-semibold leading-[1.5em] tracking-[-0.03em] text-white">
                Explore Amorfs Studio
              </span>
            </button>
          </div>

          {/* Dive Deeper - Centered with content */}
          <div
            ref={footerRef}
            className="mt-8 flex flex-col items-center gap-2 sm:mt-12"
          >
            <span
              className="text-xs text-white/80 sm:text-sm"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Dive Deeper
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-all hover:border-white/60 hover:bg-white/10"
              aria-label="Scroll down"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <svg
                className="h-4 w-4 animate-bounce text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info - Fixed at bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-end justify-between px-6 sm:bottom-8 sm:px-8 md:px-10">
        {/* Built in */}
        <div
          className="text-xs leading-tight text-white/60"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <span className="hidden sm:inline">
            Built in
            <br />
          </span>
          2025
        </div>

        {/* Spacer for center alignment */}
        <div className="flex-1" />

        {/* Power by */}
        <div
          className="text-right text-xs leading-tight text-white/60"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <span className="hidden sm:inline">
            Power by
            <br />
          </span>
          First Cognition
        </div>
      </div>
    </section>
  );
}

