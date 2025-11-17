"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeroSection() {
  const t = useTranslation();
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

      {/* Content Section - Centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center self-stretch px-4 pt-20 sm:px-6 sm:pt-16 md:px-8 lg:px-10">
        <div className="flex w-full max-w-[800px] flex-col items-center gap-4 sm:gap-6 md:gap-8">
          {/* Headline */}
          <h1
            ref={titleRef}
            className="w-full text-center text-[32px] font-normal leading-[1.4em] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[56px]"
            style={{
              fontFamily: "var(--font-michroma)",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            {t("hero.title").split(t("hero.dataHighlight")).map((part, i, arr) => (
              <React.Fragment key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="text-[#5DD4C5]">{t("hero.dataHighlight")}</span>
                )}
              </React.Fragment>
            ))}
          </h1>

          {/* Subheadline */}
          <p
            ref={subtitleRef}
            className="w-full text-center text-xs leading-[1.5em] text-white/90 sm:text-sm md:text-base lg:text-lg"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="flex flex-col items-center justify-center w-full sm:w-auto">
            <button
              className="flex items-center justify-center gap-2 rounded-[1000px] bg-[#0F408F] px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base transition-all hover:bg-[#0D3678] active:scale-95"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              <span className="text-center font-semibold leading-[1.5em] tracking-[-0.03em] text-white">
                {t("hero.cta")}
              </span>
            </button>
          </div>

          {/* Dive Deeper - Centered with content */}
          <div
            ref={footerRef}
            className="mt-6 flex flex-col items-center gap-2 sm:mt-8 md:mt-12"
          >
            <span
              className="text-[10px] text-white/80 sm:text-xs md:text-sm"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              {t("hero.diveDeeper")}
            </span>
            <button
              className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full transition-all hover:bg-white/10 active:scale-95"
              aria-label="Scroll down"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Mouse body */}
                <path
                  d="M12 2C8.13 2 5 5.13 5 9v6c0 3.87 3.13 7 7 7s7-3.13 7-7V9c0-3.87-3.13-7-7-7z"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Scroll wheel */}
                <line
                  x1="12"
                  y1="6"
                  x2="12"
                  y2="10"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info - Fixed at bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-10 flex items-end justify-between px-4 sm:bottom-6 sm:px-6 md:bottom-8 md:px-8 lg:px-10">
        {/* Built in */}
        <div
          className="text-[10px] leading-tight text-white/60 sm:text-xs"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <span className="hidden sm:inline">
            {t("hero.builtIn")}
            <br />
          </span>
          2025
        </div>

        {/* Spacer for center alignment */}
        <div className="flex-1" />

        {/* Power by */}
        <div
          className="text-right text-[10px] leading-tight text-white/60 sm:text-xs"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <span className="hidden sm:inline">
            {t("hero.powerBy")}
            <br />
          </span>
          {t("hero.firstCognition")}
        </div>
      </div>
    </section>
  );
}

