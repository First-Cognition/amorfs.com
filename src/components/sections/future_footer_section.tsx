"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnet from "@/components/Magnet";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontFamily } from "@/lib/utils/fonts";

export default function FutureFooterSection() {
  const t = useTranslation();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const futureCardRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !futureCardRef.current || !footerContentRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the entire section for scroll-based transitions
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%", // Extended pin duration for smoother transitions
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 0: Hold background only (no content visible)
      mainTimeline.to({}, { duration: 1.6 });

      // Phase 1: Fade in and animate Future content from bottom
      mainTimeline.fromTo(
        futureCardRef.current,
        {
          opacity: 0,
          scale: 0.85,
          y: 80
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.8,
          ease: "power2.out"
        }
      );

      // Phase 2: Hold Future content visible
      mainTimeline.to(
        futureCardRef.current,
        {
          opacity: 1,
          duration: 0.4
        }
      );

      // Phase 3: Fade out Future content
      mainTimeline.to(
        futureCardRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: -30,
          duration: 0.6,
          ease: "power2.in"
        }
      );

      // Phase 4: Fade in Footer content
      mainTimeline.fromTo(
        footerContentRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Video Background - Full Screen (Pinned) */}
      <div className="absolute inset-0 z-0" suppressHydrationWarning>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Video footer.mp4" type="video/mp4" />
        </video>
        {/* Overlay - rgba(3, 38, 65, 0.3) */}
        <div className="absolute inset-0 bg-[rgba(3,38,65,0.3)]" suppressHydrationWarning />
      </div>


      {/* Future Section - Initially visible */}
      <div
        ref={futureCardRef}
        className="absolute inset-0 flex items-center justify-center px-4"
        suppressHydrationWarning
      >
        <div
          className="relative w-full max-w-[760px] rounded-2xl sm:rounded-3xl md:rounded-[60px] border-2 border-white bg-[rgba(255,255,255,0.82)] p-6 sm:p-8 md:p-12 lg:p-[60px] backdrop-blur-[4px]"
          suppressHydrationWarning
        >
          <div className="flex flex-col items-center gap-4 sm:gap-5" suppressHydrationWarning>
            {/* Title */}
            <h2
              className="text-center text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold leading-[1.25em] tracking-[-0.03em]"
              style={{
                fontFamily: getFontFamily(language, "manrope"),
                color: "#073071",
              }}
            >
              {t("future.title")}
            </h2>

            {/* Icon/Logo */}
            <div className="flex h-[18px] w-[62px] sm:h-[20px] sm:w-[70px] md:h-[23px] md:w-[78px] items-center justify-center" suppressHydrationWarning>
              <svg width="79" height="23" viewBox="0 0 79 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M39.0879 0C42.9316 0 46.3349 1.88578 48.423 4.78263C50.5876 7.78567 53.4842 10.9385 57.1861 10.9385C60.8131 10.9385 63.7283 7.61773 66.6946 5.53053C67.8797 4.69672 69.3244 4.20712 70.8838 4.20703C74.9114 4.20703 78.1768 7.47237 78.1768 11.5C78.1767 15.5276 74.9114 18.793 70.8838 18.793C69.3235 18.7929 67.8779 18.3027 66.6924 17.468C63.7269 15.3801 60.812 12.0596 57.1853 12.0596C53.484 12.0596 50.5881 15.2121 48.4245 18.2152C46.3365 21.1133 42.9326 23 39.0879 23C35.2434 22.9999 31.8398 21.1132 29.7521 18.2153C27.5886 15.2121 24.6927 12.0596 20.9914 12.0596C17.3647 12.0596 14.4499 15.3801 11.4844 17.468C10.2988 18.3027 8.85328 18.7929 7.29297 18.793C3.26539 18.793 8.81353e-05 15.5276 0 11.5C0 7.47237 3.26534 4.20703 7.29297 4.20703C8.85241 4.2071 10.2971 4.69669 11.4821 5.53051C14.4485 7.61772 17.3636 10.9385 20.9907 10.9385C24.6926 10.9385 27.5891 7.78568 29.7536 4.78256C31.8415 1.88583 35.2443 9.57582e-05 39.0879 0Z" fill="#0F408F" />
              </svg>
            </div>

            {/* Description */}
            <div className="w-full max-w-[500px]" suppressHydrationWarning>
              <p
                className="text-center text-sm sm:text-base md:text-lg leading-[1.5em] tracking-[-0.03em]"
                style={{
                  fontFamily: getFontFamily(language, "manrope"),
                  color: "#525252",
                  fontWeight: 450,
                }}
              >
                {/* First line with bold */}
                <span className="font-semibold" style={{ color: "#073071" }}>
                  Amorfs is not just a tool.
                </span>
                <br />
                {/* Second part with line break */}
                It's the foundation for how intelligent systems should understand information.
                <br />
                By capturing small data with complete fidelity and representing it at the concept level, Amorfs enables AI to reason more accurately and efficiently. It's a glimpse into a future where data flows seamlessly, intelligently, and naturally.
              </p>
            </div>

            {/* Scroll Hint Button */}
            <div className="mt-4 sm:mt-5 flex justify-center" suppressHydrationWarning>
              <button
                className="group relative rounded-full border border-[#0F408F] px-4 py-2.5 sm:px-5 sm:py-3 text-center text-sm sm:text-base font-semibold capitalize leading-[1.5em] tracking-[-0.03em] text-[#0F408F] transition-all hover:bg-[#0F408F] hover:text-white cursor-default"
                style={{
                  fontFamily: getFontFamily(language, "manrope"),
                }}
              >
                Learn More Our Vision
                {/* Hover circle effect */}
                <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F408F] opacity-0 transition-opacity group-hover:opacity-20" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - Initially hidden, revealed on scroll */}
      <div
        ref={footerContentRef}
        className="absolute inset-0 flex items-center justify-center px-4 opacity-0"
        suppressHydrationWarning
      >
        <div className="flex w-full max-w-[1440px] flex-col items-center gap-6">
          {/* CTA Section */}
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            {/* Title */}
            <h3
              className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-normal leading-[1.3em] tracking-[-0.04em] text-white"
              style={{
                fontFamily: getFontFamily(language, "michroma"),
                textShadow: "0 0.5px 0 #FFFFFF",
                WebkitTextStroke: "0.5px #FFFFFF",
              }}
            >
              {t("future.ctaTitle").split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < t("future.ctaTitle").split("\n").length - 1 && <br />}
                </React.Fragment>
              ))}
            </h3>

            {/* Buttons Container - Staggered Layout */}
            <div className="relative flex flex-wrap justify-center items-start gap-3 sm:gap-4 md:gap-6">
              {/* Install Extension Button */}
              <Magnet
                padding={50}
                magnetStrength={10}
                wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
              >
                <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[200px] lg:w-[200px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25 mt-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative">
                    <Image
                      src="/images/download.svg"
                      alt="Install Extension"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                    style={{
                      fontFamily: getFontFamily(language, "manrope"),
                    }}
                  >
                    {t("future.installExtension").split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < t("future.installExtension").split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </Magnet>

              {/* Open Studio Button - Offset down */}
              <Magnet
                padding={50}
                magnetStrength={10}
                wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
              >
                <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[200px] lg:w-[200px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25 mt-8 sm:mt-10 md:mt-12">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative">
                    <Image
                      src="/images/click.svg"
                      alt="Open Studio"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                    style={{
                      fontFamily: getFontFamily(language, "manrope"),
                    }}
                  >
                    {t("future.openStudio").split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < t("future.openStudio").split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </Magnet>

              {/* View Pricing Button - Offset up */}
              <Magnet
                padding={50}
                magnetStrength={10}
                wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
              >
                <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[206px] lg:w-[206px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25 mt-4 sm:mt-5 md:mt-6">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 relative">
                    <Image
                      src="/images/dollar.svg"
                      alt="View Pricing"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                    style={{
                      fontFamily: getFontFamily(language, "manrope"),
                    }}
                  >
                    {t("future.viewPricing").split("\n").map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < t("future.viewPricing").split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
              </Magnet>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 w-full px-6 sm:px-8 md:px-10 py-6 sm:py-8">
            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
              <p
                className="text-sm sm:text-base font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 text-center sm:text-left"
                style={{
                  fontFamily: getFontFamily(language, "manrope"),
                }}
              >
                {t("footer.copyright")}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
                <a
                  href="https://www.firstcognition.com/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 transition-colors hover:text-white"
                  style={{
                    fontFamily: getFontFamily(language, "manrope"),
                  }}
                >
                  {t("footer.privacy")}
                </a>
                <a
                  href="https://www.firstcognition.com/terms.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 transition-colors hover:text-white"
                  style={{
                    fontFamily: getFontFamily(language, "manrope"),
                  }}
                >
                  {t("footer.terms")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

