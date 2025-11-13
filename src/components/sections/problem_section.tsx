"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "url('/images/problem-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>

      {/* Main Content */}
      <div 
        ref={contentRef} 
        className="flex w-full items-stretch justify-stretch px-10"
        style={{ gap: "120px" }}
      >
        {/* Content Container */}
        <div 
          className="flex w-full items-center px-20"
          style={{ gap: "120px" }}
        >
          {/* Left Content - Text */}
          <div className="flex flex-1 flex-col justify-center" style={{ gap: "32px" }}>
            {/* Label */}
            <h2 
              className="text-[20px] leading-[1.4em] tracking-[-0.04em] font-michroma"
              style={{
                fontWeight: 400,
                color: "#2DD4C2",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              Data Problem
            </h2>

            {/* Content Group */}
            <div className="flex flex-col items-center self-stretch" style={{ gap: "16px" }}>
              {/* Headline */}
              <div className="flex flex-col justify-center self-stretch">
                <h3 
                  className="text-[44px] leading-[1.3em] tracking-[-0.04em] font-manrope"
                  style={{
                    fontWeight: 500,
                    color: "rgba(255, 255, 255, 0.88)",
                  }}
                >
                  You enter the same information
                </h3>
              </div>

              {/* Description */}
              <p 
                className="text-[18px] leading-[1.5em] tracking-[-0.03em] font-manrope"
                style={{
                  fontWeight: 450,
                  color: "rgba(255, 255, 255, 0.55)",
                }}
              >
                Forms, profiles, applications - endless repetition. Your data is scattered across dozens of sites, locked away in incompatible formats, impossible to reuse.
              </p>
            </div>
          </div>

          {/* Right Content - Video */}
          <div className="relative flex-shrink-0">
            <div 
              className="relative overflow-hidden"
              style={{
                width: "524px",
                height: "478px",
                borderRadius: "24px",
                backgroundColor: "#19549B",
              }}
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
    </section>
  );
}

