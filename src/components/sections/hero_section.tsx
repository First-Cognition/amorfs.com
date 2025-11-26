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
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center self-stretch px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28 md:px-8 md:pb-32 lg:px-10 lg:pb-36" suppressHydrationWarning>
        <div className="flex w-full max-w-[800px] mx-auto flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8" suppressHydrationWarning>
          {/* Headline */}
          <h1
            ref={titleRef}
            className="w-full text-center text-[28px] font-normal leading-[1.3em] tracking-[-0.04em] text-white xs:text-[32px] sm:text-[36px] md:text-[44px] lg:text-[52px] xl:text-[56px] whitespace-pre-line"
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
            className="w-full text-center text-sm leading-[1.5em] text-white/90 sm:text-base md:text-lg lg:text-xl whitespace-pre-line px-2"
            style={{ fontFamily: getFontFamily(language, "inter") }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA Button */}
          <div ref={ctaRef} className="flex flex-col items-center justify-center w-full sm:w-auto mt-2" suppressHydrationWarning>
            <button
              className="flex items-center justify-center gap-2 rounded-[1000px] bg-[#0F408F] px-5 py-3 text-sm sm:px-6 sm:py-3.5 md:text-base transition-all hover:bg-[#0D3678] active:scale-95 min-h-[44px]"
              style={{ fontFamily: getFontFamily(language, "manrope") }}
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
        className="absolute bottom-3 left-0 right-0 z-10 flex items-end justify-between px-3 sm:bottom-4 sm:px-4 md:bottom-6 md:px-6 lg:bottom-8 lg:px-10 gap-2"
        suppressHydrationWarning
      >
        {/* Built in - Left */}
        <div
          className="text-[11px] leading-tight text-white/80 sm:text-[13px] md:text-[14px] flex-shrink-0"
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
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 sm:gap-1" suppressHydrationWarning>
          <button
            className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 items-center justify-center rounded-full transition-all hover:bg-white/10 active:scale-95 min-h-[44px] min-w-[44px]"
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
            <Image
              src="/mouse.svg"
              alt="Scroll down"
              width={24}
              height={24}
              className="h-4 w-4 sm:h-5 sm:w-5 animate-bounce"
            />
          </button>
          <span
            className="text-[11px] sm:text-[12px] md:text-[13px] text-white/80 hidden sm:block"
            style={{ fontFamily: getFontFamily(language, "manrope") }}
          >
            {t("hero.diveDeeper")}
          </span>
        </div>

        {/* Power by - Right */}
        <div
          className="flex flex-col items-end text-right text-[11px] leading-tight text-white/80 sm:text-[13px] md:text-[14px] flex-shrink-0"
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
            className="flex items-center gap-1 sm:gap-2 hover:underline"
          >
            <Image
              src="/images/FC logo-symbol-transparent.png"
              alt="First Cognition Logo"
              width={24}
              height={24}
              className="opacity-80 brightness-0 invert sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]"
            />
            <span>{t("hero.firstCognition")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

