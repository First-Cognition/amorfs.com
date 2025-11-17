"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnet from "@/components/Magnet";

export default function FutureFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const futureCardRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate main card on initial load
      if (futureCardRef.current && !showFooter) {
        gsap.from(futureCardRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [showFooter]);

  useEffect(() => {
    if (showFooter && footerContentRef.current && futureCardRef.current) {
      // Animate out Future card
      gsap.to(futureCardRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
      });

      // Animate in Footer content
      gsap.fromTo(
        footerContentRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }
  }, [showFooter]);

  const handleLearnMoreClick = () => {
    setShowFooter(true);
    // Smooth scroll to footer section
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Video Background - Full Screen (Shared) */}
      <div className="absolute inset-0 z-0">
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
        <div className="absolute inset-0 bg-[rgba(3,38,65,0.3)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center gap-6 px-4 py-20">
        {/* Future Section - Shown initially */}
        {!showFooter && (
          <div
            ref={futureCardRef}
            className="relative w-full max-w-[760px] rounded-2xl sm:rounded-3xl md:rounded-[60px] border-2 border-white bg-[rgba(255,255,255,0.82)] p-6 sm:p-8 md:p-12 lg:p-[60px] backdrop-blur-[4px]"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-5">
              {/* Title */}
              <h2
                className="text-center text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold leading-[1.25em] tracking-[-0.03em]"
                style={{
                  fontFamily: "var(--font-manrope)",
                  color: "#073071",
                }}
              >
                Powering the Future of AI
              </h2>

              {/* Icon/Logo */}
              <div className="flex h-[18px] w-[62px] sm:h-[20px] sm:w-[70px] md:h-[23px] md:w-[78px] items-center justify-center">
                <svg width="79" height="23" viewBox="0 0 79 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M39.0879 0C42.9316 0 46.3349 1.88578 48.423 4.78263C50.5876 7.78567 53.4842 10.9385 57.1861 10.9385C60.8131 10.9385 63.7283 7.61773 66.6946 5.53053C67.8797 4.69672 69.3244 4.20712 70.8838 4.20703C74.9114 4.20703 78.1768 7.47237 78.1768 11.5C78.1767 15.5276 74.9114 18.793 70.8838 18.793C69.3235 18.7929 67.8779 18.3027 66.6924 17.468C63.7269 15.3801 60.812 12.0596 57.1853 12.0596C53.484 12.0596 50.5881 15.2121 48.4245 18.2152C46.3365 21.1133 42.9326 23 39.0879 23C35.2434 22.9999 31.8398 21.1132 29.7521 18.2153C27.5886 15.2121 24.6927 12.0596 20.9914 12.0596C17.3647 12.0596 14.4499 15.3801 11.4844 17.468C10.2988 18.3027 8.85328 18.7929 7.29297 18.793C3.26539 18.793 8.81353e-05 15.5276 0 11.5C0 7.47237 3.26534 4.20703 7.29297 4.20703C8.85241 4.2071 10.2971 4.69669 11.4821 5.53051C14.4485 7.61772 17.3636 10.9385 20.9907 10.9385C24.6926 10.9385 27.5891 7.78568 29.7536 4.78256C31.8415 1.88583 35.2443 9.57582e-05 39.0879 0Z" fill="#0F408F"/>
              </svg>
              </div>

              {/* Description */}
              <div className="w-full max-w-[500px]">
                <p
                  className="text-center text-sm sm:text-base md:text-lg leading-[1.5em] tracking-[-0.03em]"
                  style={{
                    fontFamily: "var(--font-manrope)",
                    color: "#525252",
                    fontWeight: 450,
                  }}
                >
                  Amorfs is not just a tool.
                  <br />
                  <br />
                  It's the foundation for how intelligent systems should understand
                  information.
                  <br />
                  <br />
                  By capturing small data with complete fidelity and representing it
                  at the concept level, Amorfs enables AI to reason more accurately
                  and efficiently. It's a glimpse into a future where data flows
                  seamlessly, intelligently, and naturally.
                </p>
              </div>

              {/* Button */}
              <div className="mt-4 sm:mt-5 flex justify-center">
                <button
                  onClick={handleLearnMoreClick}
                  className="group relative rounded-full border border-[#0F408F] px-4 py-2.5 sm:px-5 sm:py-3 text-center text-sm sm:text-base font-semibold uppercase leading-[1.5em] tracking-[-0.03em] text-[#0F408F] transition-all hover:bg-[#0F408F] hover:text-white active:scale-95"
                  style={{
                    fontFamily: "var(--font-manrope)",
                  }}
                >
                  Learn more our vision
                  {/* Hover circle effect */}
                  <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F408F] opacity-0 transition-opacity group-hover:opacity-20" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Section - Shown after click */}
        {showFooter && (
          <div
            ref={footerContentRef}
            className="flex w-full max-w-[1440px] flex-col items-center gap-6 px-4"
          >
            {/* CTA Section */}
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              {/* Title */}
              <h3
                className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-normal leading-[1.3em] tracking-[-0.04em] text-white"
                style={{
                  fontFamily: "var(--font-michroma)",
                  textShadow: "0 0.5px 0 #FFFFFF",
                  WebkitTextStroke: "0.5px #FFFFFF",
                }}
              >
                Your Data
                <br />
                Your Way
              </h3>

              {/* Buttons Container */}
              <div className="relative flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                {/* Install Extension Button */}
                <Magnet
                  padding={50}
                  magnetStrength={10}
                  wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
                >
                  <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[200px] lg:w-[200px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25">
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    >
                      <path
                        d="M14.5 5V19M14.5 19L9.5 14M14.5 19L19.5 14M5 19V22.5C5 23.0523 5.44772 23.5 6 23.5H23C23.5523 23.5 24 23.0523 24 22.5V19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                      style={{
                        fontFamily: "var(--font-manrope)",
                      }}
                    >
                      Install
                      <br />
                      Extension
                    </span>
                  </div>
                </Magnet>

                {/* Open Studio Button */}
                <Magnet
                  padding={50}
                  magnetStrength={10}
                  wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
                >
                  <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[200px] lg:w-[200px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="24"
                        height="24"
                        rx="4"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 10V22M16 22L11 17M16 22L21 17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span
                      className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                      style={{
                        fontFamily: "var(--font-manrope)",
                      }}
                    >
                      Open
                      <br />
                      Studio
                    </span>
                  </div>
                </Magnet>

                {/* View Pricing Button */}
                <Magnet
                  padding={50}
                  magnetStrength={10}
                  wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
                >
                  <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[206px] lg:w-[206px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25">
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                    >
                      <circle
                        cx="14.5"
                        cy="14.5"
                        r="12"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M14.5 9C12.567 9 11 10.567 11 12.5C11 14.433 12.567 16 14.5 16C16.433 16 18 14.433 18 12.5C18 10.567 16.433 9 14.5 9ZM14.5 20C10.91 20 8 22.91 8 26.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="14.5"
                        cy="12.5"
                        r="1"
                        fill="white"
                      />
                    </svg>
                    <span
                      className="text-center text-sm sm:text-base md:text-lg lg:text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                      style={{
                        fontFamily: "var(--font-manrope)",
                      }}
                    >
                      View
                      <br />
                      Pricing
                    </span>
                  </div>
                </Magnet>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black/50 to-transparent px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6">
              <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
                <p
                  className="text-sm sm:text-base font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 text-center sm:text-left"
                  style={{
                    fontFamily: "var(--font-manrope)",
                  }}
                >
                  © 2025 Amorfs. All rights reserved.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:gap-6">
                  <a
                    href="#privacy"
                    className="text-sm sm:text-base font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 transition-colors hover:text-white"
                    style={{
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    Privacy and Policy
                  </a>
                  <a
                    href="#terms"
                    className="text-sm sm:text-base font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 transition-colors hover:text-white"
                    style={{
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    Terms and Conditions
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

