"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
            className="relative w-full max-w-[760px] rounded-[60px] border-2 border-white bg-[rgba(255,255,255,0.82)] p-[60px] backdrop-blur-[4px]"
          >
            <div className="flex flex-col items-center gap-5">
              {/* Title */}
              <h2
                className="text-center text-[32px] font-semibold leading-[1.25em] tracking-[-0.03em]"
                style={{
                  fontFamily: "var(--font-manrope)",
                  color: "#073071",
                }}
              >
                Powering the Future of AI
              </h2>

              {/* Icon/Logo */}
              <div className="flex h-[23px] w-[78px] items-center justify-center">
                <svg
                  width="79"
                  height="23"
                  viewBox="0 0 79 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="7.295"
                    cy="11.5"
                    rx="7.295"
                    ry="7.295"
                    fill="#0F408F"
                  />
                  <rect
                    x="11.43"
                    y="10.94"
                    width="22.86"
                    height="1.12"
                    fill="#0F408F"
                  />
                  <ellipse
                    cx="34.725"
                    cy="11.5"
                    rx="11.5"
                    ry="11.5"
                    fill="#0F408F"
                  />
                  <rect
                    x="34.725"
                    y="0.56"
                    width="22.86"
                    height="1.12"
                    fill="#0F408F"
                  />
                  <ellipse
                    cx="57.885"
                    cy="11.5"
                    rx="7.295"
                    ry="7.295"
                    fill="#0F408F"
                  />
                </svg>
              </div>

              {/* Description */}
              <div className="w-full max-w-[500px]">
                <p
                  className="text-center text-[18px] leading-[1.5em] tracking-[-0.03em]"
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
              <div className="mt-5 flex justify-center">
                <button
                  onClick={handleLearnMoreClick}
                  className="group relative rounded-full border border-[#0F408F] px-5 py-3 text-center text-[16px] font-semibold uppercase leading-[1.5em] tracking-[-0.03em] text-[#0F408F] transition-all hover:bg-[#0F408F] hover:text-white"
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
            <div className="flex flex-col items-center gap-6">
              {/* Title */}
              <h3
                className="text-center text-[60px] font-normal leading-[1.3em] tracking-[-0.04em] text-white"
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
              <div className="relative flex flex-wrap justify-center gap-6">
                {/* Install Extension Button */}
                <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center gap-4 rounded-full border-2 border-white/55 bg-white/17 p-6 backdrop-blur-[20px] transition-all hover:bg-white/25">
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                    className="text-center text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                    style={{
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    Install
                    <br />
                    Extension
                  </span>
                </div>

                {/* Open Studio Button */}
                <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center gap-4 rounded-full border-2 border-white/55 bg-white/17 p-6 backdrop-blur-[20px] transition-all hover:bg-white/25">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                    className="text-center text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                    style={{
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    Open
                    <br />
                    Studio
                  </span>
                </div>

                {/* View Pricing Button */}
                <div className="relative flex h-[206px] w-[206px] flex-col items-center justify-center gap-4 rounded-full border-2 border-white/55 bg-white/17 p-6 backdrop-blur-[20px] transition-all hover:bg-white/25">
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                    className="text-center text-[20px] font-semibold leading-[1.4em] tracking-[-0.03em] text-white"
                    style={{
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    View
                    <br />
                    Pricing
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 w-full bg-gradient-to-t from-black/50 to-transparent px-10 py-6">
              <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-4 sm:flex-row">
                <p
                  className="text-[16px] font-medium leading-[1.4em] tracking-[-0.02em] text-white/68"
                  style={{
                    fontFamily: "var(--font-manrope)",
                  }}
                >
                  © 2025 Amorfs. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                  <a
                    href="#privacy"
                    className="text-[16px] font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 transition-colors hover:text-white"
                    style={{
                      fontFamily: "var(--font-manrope)",
                    }}
                  >
                    Privacy and Policy
                  </a>
                  <a
                    href="#terms"
                    className="text-[16px] font-medium leading-[1.4em] tracking-[-0.02em] text-white/68 transition-colors hover:text-white"
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

