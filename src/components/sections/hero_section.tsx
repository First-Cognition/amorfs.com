"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontFamily } from "@/lib/utils/fonts";

export default function HeroSection() {
  const t = useTranslation();
  const { language } = useLanguage();
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

    // Custom scroll handler for "gentle scroll" effect
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      // Only trigger if scrolling down and we are at the top of the page
      if (e.deltaY > 0 && window.scrollY < 50 && !isScrolling) {
        const nextSection = document.querySelector('#problem-solution');
        if (nextSection) {
          // Prevent default scrolling to avoid conflict with smooth scroll
          e.preventDefault();
          isScrolling = true;
          nextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // Reset lock after animation (approx 1s)
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col overflow-hidden scroll-snap-align-start">
      {/* Video Background */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
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
        <div className="absolute inset-0 bg-[rgba(0,61,76,0.4)]" suppressHydrationWarning />
      </div>

      {/* Content Section - Centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center self-stretch px-4 pt-20 sm:px-6 sm:pt-16 md:px-8 lg:px-10" suppressHydrationWarning>
        <div className="flex w-full max-w-[800px] mx-auto flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8" suppressHydrationWarning>
          {/* Headline */}
          <h1
            ref={titleRef}
            className="w-full text-center text-[32px] font-normal leading-[1.4em] tracking-[-0.04em] text-white sm:text-4xl md:text-5xl lg:text-[56px] whitespace-pre-line"
            style={{
              fontFamily: getFontFamily(language, "michroma"),
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
            className="w-full text-center text-xs leading-[1.5em] text-white/90 sm:text-sm md:text-base lg:text-lg whitespace-pre-line"
            style={{ fontFamily: getFontFamily(language, "inter") }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="flex flex-col items-center justify-center w-full sm:w-auto" suppressHydrationWarning>
            <button
              className="flex items-center justify-center gap-2 rounded-[1000px] bg-[#0F408F] px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-base transition-all hover:bg-[#0D3678] active:scale-95"
              style={{ fontFamily: getFontFamily(language, "manrope") }}
            >
              <span className="text-center font-semibold leading-[1.5em] tracking-[-0.03em] text-white">
                {t("hero.cta")}
              </span>
            </button>
          </div>


        </div>
      </div>

      {/* Footer Info - Fixed at bottom */}
      <div
        ref={footerRef}
        className="absolute bottom-4 left-0 right-0 z-10 flex items-center justify-between px-4 sm:bottom-6 sm:px-6 md:bottom-8 md:px-8 lg:px-10"
        suppressHydrationWarning
      >
        {/* Built in - Left */}
        <div
          className="text-[14px] leading-tight text-white/80 sm:text-[14px]"
          style={{ fontFamily: getFontFamily(language, "manrope") }}
          suppressHydrationWarning
        >
          <span className="hidden sm:inline">
            {t("hero.builtIn")}
            <br />
          </span>
          2025
        </div>

        {/* Dive Deeper - Center */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" suppressHydrationWarning>
          <button
            className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all hover:bg-white/10 active:scale-95"
            aria-label="Scroll down"
            onClick={() => {
              const nextSection = document.querySelector('#problem-solution');
              if (nextSection) {
                nextSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }
            }}
          >
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4 animate-bounce text-white"
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
          <span
            className="text-[14px] text-white/80 sm:text-[14px]"
            style={{ fontFamily: getFontFamily(language, "manrope") }}
          >
            {t("hero.diveDeeper")}
          </span>
        </div>

        {/* Power by - Right */}
        <div
          className="flex flex-col items-end text-right text-[14px] leading-tight text-white/80 sm:text-[14px]"
          style={{ fontFamily: getFontFamily(language, "manrope") }}
          suppressHydrationWarning
        >
          <span className="hidden sm:inline">
            {t("hero.powerBy")}
          </span>
          <a
            href="https://firstcognition.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <Image
              src="/images/FC logo-symbol-transparent.png"
              alt="First Cognition Logo"
              width={32}
              height={32}
              className="opacity-80 brightness-0 invert"
            />
            {t("hero.firstCognition")}
          </a>
        </div>
      </div>
    </section>
  );
}

