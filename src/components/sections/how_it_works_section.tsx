"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { BookmarkCheck, FolderOpen, RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontFamily } from "@/lib/utils/fonts";

export default function HowItWorksSection() {
  const t = useTranslation();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: t("howItWorks.steps.capture.number"),
      title: t("howItWorks.steps.capture.title"),
      description: t("howItWorks.steps.capture.description"),
      icon: BookmarkCheck,
    },
    {
      number: t("howItWorks.steps.store.number"),
      title: t("howItWorks.steps.store.title"),
      description: t("howItWorks.steps.store.description"),
      icon: FolderOpen,
    },
    {
      number: t("howItWorks.steps.reuse.number"),
      title: t("howItWorks.steps.reuse.title"),
      description: t("howItWorks.steps.reuse.description"),
      icon: RefreshCw,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Initial state: Centered horizontally, pushed down vertically
      cardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.set(card, {
            xPercent: -50,
            yPercent: 150, // Start well below
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            zIndex: i + 1
          });
        }
      });

      // Animation Sequence

      // Card 1 enters to center
      tl.to(cardsRef.current[0], {
        yPercent: -50, // Center
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
      });

      // Card 2 enters, Card 1 moves up
      tl.to(cardsRef.current[0], {
        yPercent: -60, // Move up 10%
        scale: 0.95,
        opacity: 0.6,
        filter: "blur(4px)",
        duration: 1,
        ease: "power2.out",
      }, ">");

      tl.to(cardsRef.current[1], {
        yPercent: -50, // Center
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
      }, "<");

      // Card 3 enters, others move up
      tl.to(cardsRef.current[0], {
        yPercent: -70, // Move up another 10%
        scale: 0.9,
        opacity: 0.4,
        filter: "blur(8px)",
        duration: 1,
        ease: "power2.out",
      }, ">");

      tl.to(cardsRef.current[1], {
        yPercent: -60,
        scale: 0.95,
        opacity: 0.6,
        filter: "blur(4px)",
        duration: 1,
        ease: "power2.out",
      }, "<");

      tl.to(cardsRef.current[2], {
        yPercent: -50,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
      }, "<");

      // Hold the final state for a moment
      tl.to({}, { duration: 0.5 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>
        <Image
          src="/images/how-it-works-bg.png"
          alt="How It Works Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Video BG Overlay - Full Screen */}
      <div className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>
        <div
          className="absolute"
          style={{
            left: "-76px",
            top: "-0.5px",
            width: "calc(100% + 152px)",
            height: "calc(100% + 1px)",
          }}
          suppressHydrationWarning
        >
          <Image
            src="/images/how-it-works-video-bg.png"
            alt="Video Background"
            fill
            className="object-cover opacity-10"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20" suppressHydrationWarning>
        {/* Title Section - Fixed at top of content area */}
        <div className="w-full max-w-[1440px] mx-auto px-4 pb-6 sm:pb-8 md:pb-10 flex flex-col items-center gap-2 absolute top-[10%] left-0 right-0 z-20" suppressHydrationWarning>
          <h2
            className="font-michroma text-2xl sm:text-3xl md:text-4xl lg:text-[48px] xl:text-[60px] leading-[1.4em] tracking-[-0.04em] text-center"
            style={{
              fontFamily: getFontFamily(language, "michroma"),
              color: "#2DD4C2",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            {t("howItWorks.title")}
          </h2>
        </div>

        {/* Cards Container */}
        <div className="relative w-full max-w-[1440px] mx-auto px-4 h-full flex items-center justify-center mt-20" suppressHydrationWarning>
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="absolute left-1/2 top-1/2 w-full max-w-[900px] bg-[#DDEBF9] border-2 border-[#A0C2E0] rounded-2xl sm:rounded-3xl md:rounded-[60px] p-0 overflow-hidden shadow-lg"
                style={{
                  zIndex: index + 1,
                  willChange: "transform, opacity, filter",
                }}
              >
                <div
                  className="flex flex-col sm:flex-row items-center justify-center w-full mx-auto"
                  style={{
                    gap: "20px",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                  suppressHydrationWarning
                >
                  {/* Left Content */}
                  <div
                    className="flex flex-col justify-center flex-shrink-0 w-full sm:w-auto p-4 sm:p-6 md:p-8"
                    style={{
                      gap: "12px",
                      width: "100%",
                      maxWidth: "300px",
                    }}
                    suppressHydrationWarning
                  >
                    {/* Icon */}
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "#0F408F",
                        borderRadius: "100px",
                        padding: "8px",
                        width: "fit-content",
                      }}
                      suppressHydrationWarning
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3
                      className="font-manrope text-xl sm:text-2xl md:text-3xl lg:text-[32px]"
                      style={{
                        fontFamily: getFontFamily(language, "manrope"),
                        fontWeight: 500,
                        lineHeight: "1.25em",
                        letterSpacing: "-0.03em",
                        color: "#073071",
                      }}
                    >
                      {step.number}. {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="font-manrope text-sm sm:text-base md:text-lg"
                      style={{
                        fontFamily: getFontFamily(language, "manrope"),
                        fontWeight: 450,
                        lineHeight: "1.5em",
                        letterSpacing: "-0.03em",
                        color: "#073071",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Right Image Placeholder */}
                  <div
                    className="bg-white rounded-xl sm:rounded-2xl md:rounded-[40px] flex-shrink-0 w-full sm:w-auto aspect-[453/300] sm:w-[453px] sm:h-[300px]"
                    suppressHydrationWarning
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
