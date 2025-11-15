"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate main card
      if (cardRef.current) {
        gsap.from(cardRef.current, {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/future-bg.png"
          alt="Future Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay - rgba(3, 38, 65, 0.3) */}
        <div className="absolute inset-0 bg-[rgba(3,38,65,0.3)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-4">
        {/* Main Card */}
        <div
          ref={cardRef}
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

        {/* CTA Section - Positioned at bottom */}
        <div
          className="absolute bottom-[100px] flex flex-col items-center gap-6"
          style={{ opacity: 0 }}
        >
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
          <div className="relative flex gap-6">
            {/* Install Extension Button */}
            <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center gap-4 rounded-full border-2 border-white/55 bg-white/17 p-6 backdrop-blur-[20px]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5V19M14 19L9 14M14 19L19 14M5 19V22.5C5 23.0523 5.44772 23.5 6 23.5H22C22.5523 23.5 23 23.0523 23 22.5V19"
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
            <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center gap-4 rounded-full border-2 border-white/55 bg-white/17 p-6 backdrop-blur-[20px]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5V19M14 19L9 14M14 19L19 14M5 19V22.5C5 23.0523 5.44772 23.5 6 23.5H22C22.5523 23.5 23 23.0523 23 22.5V19"
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
            <div className="relative flex h-[200px] w-[200px] flex-col items-center justify-center gap-4 rounded-full border-2 border-white/55 bg-white/17 p-6 backdrop-blur-[20px]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5V19M14 19L9 14M14 19L19 14M5 19V22.5C5 23.0523 5.44772 23.5 6 23.5H22C22.5523 23.5 23 23.0523 23 22.5V19"
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
                View
                <br />
                Pricing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
