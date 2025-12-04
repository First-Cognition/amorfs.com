"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontFamily } from "@/lib/utils/fonts";


export default function ProblemSolutionSection() {
  const t = useTranslation();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const problemContentRef = useRef<HTMLDivElement>(null);
  const solutionContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const decorationRef = useRef<HTMLDivElement>(null);
  const solutionTitleRef = useRef<HTMLDivElement>(null);
  const solutionSubtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Initial fade-in animation when section enters viewport
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Pin the entire section for scroll-based transitions
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%", // Extended to include fade-out transition to Product section
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Show Problem content briefly
      mainTimeline.fromTo(
        problemContentRef.current,
        { opacity: 1, y: 0 },
        { opacity: 1, y: 0, duration: 0.1 }
      );

      // Phase 2: Fade out Problem content quickly
      mainTimeline.to(
        problemContentRef.current,
        {
          opacity: 0,
          y: -50,
          duration: 0.2,
        },
        "+=0.1"
      );

      // Phase 3: Fade in Solution content rapidly
      mainTimeline.fromTo(
        solutionContentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
        },
        "-=0.1"
      );

      // Animate solution title quickly
      if (solutionTitleRef.current) {
        mainTimeline.fromTo(
          solutionTitleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.15"
        );
      }

      // Animate solution subtitle quickly
      if (solutionSubtitleRef.current) {
        mainTimeline.fromTo(
          solutionSubtitleRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      // Fade in decoration icons quickly - no moving around
      if (decorationRef.current) {
        mainTimeline.fromTo(
          decorationRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          },
          "-=0.2"
        );
      }

      // Hold solution content visible briefly before next section
      mainTimeline.to({}, { duration: 0.15 });

      // Phase 5: Fade out Solution content for transition to Product section
      mainTimeline.to(
        solutionContentRef.current,
        {
          opacity: 0,
          y: -40,
          duration: 0.25,
          ease: "power2.in",
        },
        "+=0.05"
      );

      // Fade out decoration during transition
      if (decorationRef.current) {
        mainTimeline.to(
          decorationRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.2,
          },
          "<"
        );
      }

      // Custom scroll handler for "gentle scroll" up to Hero
      let isScrolling = false;
      const handleWheel = (e: WheelEvent) => {
        // Only trigger if scrolling UP (deltaY < 0)
        if (e.deltaY < 0 && !isScrolling) {
          const st = mainTimeline.scrollTrigger;
          // Check if we are at the very start of the ScrollTrigger (progress 0)
          // We use a small threshold (0.01) to account for floating point precision
          if (st && st.progress <= 0.01) {
            const heroSection = document.querySelector('#hero');
            if (heroSection) {
              e.preventDefault();
              isScrolling = true;
              heroSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });

              // Reset lock after animation
              setTimeout(() => {
                isScrolling = false;
              }, 1000);
            }
          }
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });

      return () => {
        window.removeEventListener('wheel', handleWheel);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem-solution"
      ref={sectionRef}
      className="relative z-10 h-screen w-full overflow-hidden scroll-snap-align-start opacity-0"
    >
      {/* Background Image - Shared for both Problem and Solution */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <Image
          src="/images/solution-section-bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>


      {/* Problem Content */}
      <div
        ref={problemContentRef}
        className="absolute inset-0 flex items-center justify-center px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8 xl:px-10"
        suppressHydrationWarning
      >
        <div
          className="flex w-full max-w-7xl flex-col items-center gap-4 sm:gap-6 md:gap-8 lg:flex-row lg:items-center lg:gap-12 xl:gap-16 lg:px-6 xl:px-10"
          suppressHydrationWarning
        >
          {/* Left Content - Text */}
          <div className="flex w-full flex-col justify-center gap-3 sm:gap-4 md:gap-6 lg:flex-1 lg:gap-6" suppressHydrationWarning>
            {/* Label */}
            <h2
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-[1.4em] tracking-[-0.04em] font-michroma"
              style={{
                fontFamily: getFontFamily(language, "michroma"),
                fontWeight: 400,
                color: "#2DD4C2",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              {t("problem.label")}
            </h2>

            {/* Content Group */}
            <div className="flex flex-col items-start self-stretch gap-2 sm:gap-3 md:gap-4" suppressHydrationWarning>
              {/* Headline */}
              <div className="flex flex-col justify-center self-stretch" suppressHydrationWarning>
                <h3
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px] leading-[1.25em] tracking-[-0.04em] font-manrope"
                  style={{
                    fontFamily: getFontFamily(language, "manrope"),
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.88)",
                  }}
                >
                  {t("problem.title")}
                </h3>
              </div>

              {/* Description */}
              <p
                className="text-xs sm:text-sm md:text-base lg:text-lg leading-[1.5em] tracking-[-0.03em] font-manrope whitespace-pre-line"
                style={{
                  fontFamily: getFontFamily(language, "manrope"),
                  fontWeight: 450,
                  color: "rgba(255, 255, 255, 0.55)",
                }}
              >
                {t("problem.description")}
              </p>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="relative flex-shrink-0 w-full max-w-[500px] sm:max-w-[600px] lg:w-auto lg:max-w-none" suppressHydrationWarning>
            <div
              className="relative overflow-hidden w-full aspect-[524/478] lg:w-[450px] lg:h-[410px] xl:w-[524px] xl:h-[478px] rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl"
              style={{
                backgroundColor: "#19549B",
              }}
              suppressHydrationWarning
            >
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/video problem (2).mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Content */}
      <div
        ref={solutionContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-3 py-8 sm:px-4 sm:py-12 md:px-6 md:py-16 lg:px-8 lg:py-20 opacity-0"
        suppressHydrationWarning
      >
        <div className="flex w-full max-w-[800px] mx-auto flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 px-3 sm:px-4 md:px-6 lg:px-10" suppressHydrationWarning>
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6" suppressHydrationWarning>
            {/* Small Title */}
            <h2
              className="w-full text-center font-michroma text-sm sm:text-base md:text-lg lg:text-xl leading-[1.4em] tracking-[-0.04em] text-[#2DD4C2] [text-shadow:0px_4px_4px_rgba(0,0,0,0.05)]"
              style={{ fontFamily: getFontFamily(language, "michroma") }}
            >
              {t("solution.label")}
            </h2>

            {/* Main Content Group - simplified without text swap */}
            <div className="flex w-full flex-col items-center gap-2 sm:gap-3 self-stretch" suppressHydrationWarning>
              {/* Main Heading */}
              <div
                ref={solutionTitleRef}
                className="flex flex-col items-center gap-1 sm:gap-2"
                suppressHydrationWarning
              >
                <h3
                  className="text-center font-manrope text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[44px] font-medium leading-[1.25em] tracking-[-0.04em] text-white/88 px-2"
                  style={{ fontFamily: getFontFamily(language, "manrope") }}
                >
                  {t("solution.initialTitle")}
                </h3>
              </div>

              {/* Subtitle */}
              <div
                ref={solutionSubtitleRef}
                className="flex items-center justify-center gap-2 p-1 sm:p-2"
                suppressHydrationWarning
              >
                <p
                  className="text-center font-manrope text-xs sm:text-sm md:text-base lg:text-lg font-normal leading-[1.5em] tracking-[-0.03em] text-white/55 px-2 whitespace-pre-line"
                  style={{ fontFamily: getFontFamily(language, "manrope") }}
                >
                  {t("solution.initialSubtitle")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative SVG - Initially hidden, hidden on mobile */}
      <div
        ref={decorationRef}
        className="pointer-events-none absolute left-[80%] top-[80%] -translate-x-1/2 -translate-y-1/2 h-[120px] w-[380px] sm:h-[180px] sm:w-[570px] md:h-[220px] md:w-[697px] lg:h-[280px] lg:w-[888px] xl:h-[308px] xl:w-[975px] rounded-[100px] opacity-0 hidden sm:block"
        style={{ transform: 'translate(-50%, -50%) rotate(-1.5deg)' }}
      >
        <Image
          src="/images/solution-decoration.svg"
          alt="Decoration"
          fill
          className="object-contain"
          style={{ transform: 'rotate(-1.5deg)' }}
        />
      </div>
    </section>
  );
}

