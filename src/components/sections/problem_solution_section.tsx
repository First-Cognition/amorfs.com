"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
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
  const initialTextRef = useRef<HTMLDivElement>(null);
  const optionsTextRef = useRef<HTMLDivElement>(null);

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
          end: "+=300%", // Pin for longer scroll to accommodate both sections
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Show Problem content
      mainTimeline.fromTo(
        problemContentRef.current,
        { opacity: 1, y: 0 },
        { opacity: 1, y: 0, duration: 0.3 }
      );

      // Phase 2: Fade out Problem content
      mainTimeline.to(
        problemContentRef.current,
        {
          opacity: 0,
          y: -50,
          duration: 0.3,
        },
        "+=0.3"
      );

      // Phase 3: Fade in Solution content AND decoration icons
      mainTimeline.fromTo(
        solutionContentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
        "-=0.1"
      );

      // Fade in decoration icons at the same time as Solution content
      if (decorationRef.current) {
        mainTimeline.fromTo(
          decorationRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=0.3"
        );
      }

      // Phase 4: Text swap within Solution (Initial -> Options)
      mainTimeline.to(
        initialTextRef.current,
        {
          opacity: 0,
          y: -30,
          duration: 0.3,
        },
        "+=0.3"
      );

      mainTimeline.fromTo(
        optionsTextRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        "-=0.2"
      );

      // Animate decoration with parallax effect (only when visible)
      if (decorationRef.current) {
        gsap.fromTo(
          decorationRef.current,
          {
            y: 100,
            rotation: -15,
          },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "50% top", // Start parallax after solution appears
              end: "bottom top",
              scrub: 1.5,
            },
            y: -100,
            rotation: 15,
            ease: "none",
          }
        );

      }
      if (decorationRef.current) {
        mainTimeline.fromTo(
          decorationRef.current,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
          },
          "-=0.3"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="problem-solution"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden scroll-snap-align-start opacity-0"
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
        className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10"
        suppressHydrationWarning
      >
        <div
          className="flex w-full max-w-7xl flex-col items-center gap-6 sm:gap-8 md:gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-[120px] lg:px-10 xl:px-20"
          suppressHydrationWarning
        >
          {/* Left Content - Text */}
          <div className="flex w-full flex-col justify-center gap-4 sm:gap-6 md:gap-8 lg:flex-1 lg:gap-8" suppressHydrationWarning>
            {/* Label */}
            <h2
              className="text-base sm:text-lg md:text-xl leading-[1.4em] tracking-[-0.04em] font-michroma"
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
            <div className="flex flex-col items-start self-stretch gap-3 sm:gap-4 md:gap-6" suppressHydrationWarning>
              {/* Headline */}
              <div className="flex flex-col justify-center self-stretch" suppressHydrationWarning>
                <h3
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.3em] tracking-[-0.04em] font-manrope"
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
                className="text-sm sm:text-base md:text-lg leading-[1.5em] tracking-[-0.03em] font-manrope"
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
          <div className="relative flex-shrink-0 w-full lg:w-auto" suppressHydrationWarning>
            <div
              className="relative overflow-hidden w-full aspect-[524/478] max-w-full lg:w-[524px] lg:h-[478px] rounded-xl sm:rounded-2xl md:rounded-3xl"
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
                <source src="/VIdeo problem.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Content */}
      <div
        ref={solutionContentRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-24 lg:px-10 lg:py-[200px] opacity-0"
        suppressHydrationWarning
      >
        <div className="flex w-full max-w-[800px] mx-auto flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-[120px] px-4 sm:px-6 md:px-10 lg:px-20" suppressHydrationWarning>
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8" suppressHydrationWarning>
            {/* Small Title */}
            <h2
              className="w-full text-center font-michroma text-base sm:text-lg md:text-xl leading-[1.4em] tracking-[-0.04em] text-[#2DD4C2] [text-shadow:0px_4px_4px_rgba(0,0,0,0.05)]"
              style={{ fontFamily: getFontFamily(language, "michroma") }}
            >
              {t("solution.label")}
            </h2>

            {/* Main Content Group - with text swap */}
            <div className="relative flex w-full flex-col items-center gap-3 sm:gap-4 self-stretch" suppressHydrationWarning>
              {/* Initial Text - Will fade out on scroll */}
              <div
                ref={initialTextRef}
                className="absolute inset-0 flex flex-col items-center gap-3 sm:gap-4"
                suppressHydrationWarning
              >
                {/* Main Heading */}
                <div className="flex flex-col items-center gap-2 sm:gap-3" suppressHydrationWarning>
                  <ScrollReveal
                    containerClassName="my-0"
                    textClassName="text-center font-manrope text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88"
                    style={{ fontFamily: getFontFamily(language, "manrope") } as React.CSSProperties}
                  >
                    {t("solution.initialTitle")}
                  </ScrollReveal>
                </div>

                {/* Subtitle */}
                <div className="flex items-center justify-center gap-2 p-2" suppressHydrationWarning>
                  <p 
                    className="text-center font-manrope text-sm sm:text-base md:text-lg font-normal leading-[1.5em] tracking-[-0.03em] text-white/55"
                    style={{ fontFamily: getFontFamily(language, "manrope") }}
                  >
                    {t("solution.initialSubtitle")}
                  </p>
                </div>
              </div>

              {/* Options Text - Will fade in on scroll */}
              <div
                ref={optionsTextRef}
                className="flex flex-col items-center gap-3 sm:gap-4 opacity-0"
                suppressHydrationWarning
              >
                {/* Browser Extension & Data Studio Options */}
                <div className="flex flex-col items-center gap-3 sm:gap-4 self-stretch" suppressHydrationWarning>
                  {/* Browser Extension */}
                  <div className="flex flex-row items-center gap-2 sm:gap-3" suppressHydrationWarning>
                    <h1 
                      className="text-center font-manrope text-xl sm:text-2xl md:text-3xl lg:text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88"
                      style={{ fontFamily: getFontFamily(language, "manrope") }}
                    >
                      <span className="text-white/60">{`{ `}</span>
                      {t("solution.optionsTitle")}
                      <span className="text-white/60">{` }`}</span>
                    </h1>
                  </div>

                  {/* Data Studio */}
                  <div className="flex flex-row items-center gap-2 sm:gap-3" suppressHydrationWarning>
                    <h1 
                      className="text-center font-manrope text-xl sm:text-2xl md:text-3xl lg:text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88"
                      style={{ fontFamily: getFontFamily(language, "manrope") }}
                    >
                      <span className="text-white/60">{`{ `}</span>
                      {t("solution.optionsTitle2")}
                      <span className="text-white/60">{` }`}</span>
                    </h1>
                  </div>
                </div>
              </div>

              {/* Spacer to maintain layout height */}
              <div className="invisible flex flex-col items-center gap-2 sm:gap-3" suppressHydrationWarning>
                <h1 className="text-center font-manrope text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88">
                  Capture Once, <br />
                  Use Everywhere
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative SVG - Initially hidden */}
      <div
        ref={decorationRef}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[114px] w-[361px] sm:h-[152px] sm:w-[481px] md:h-[190px] md:w-[602px] lg:h-[228px] lg:w-[722px] lg:left-[356px] lg:top-[264px] lg:translate-x-0 lg:translate-y-0 rounded-[100px] opacity-0"
      >
        <Image
          src="/images/solution-decoration.svg"
          alt="Decoration"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}

