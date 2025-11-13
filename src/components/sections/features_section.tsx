"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate badges with stagger
      badgesRef.current.forEach((badge, index) => {
        gsap.from(badge, {
          scrollTrigger: {
            trigger: badge,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          scale: 0,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: "back.out(1.7)",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const badges = [
    { 
      text: "Zero\nKnowledge", 
      x: 327, 
      y: 457, 
      width: 160, 
      height: 160,
      variant: "default" 
    },
    { 
      text: "Cross Devices", 
      x: 1124, 
      y: 224, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: "Beautiful Templates", 
      x: 943, 
      y: 465, 
      width: 160, 
      height: 160,
      variant: "default" 
    },
    { 
      text: "Instant Reuse", 
      x: 160, 
      y: 220, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: "Language Agnostic", 
      x: 348, 
      y: 125, 
      width: 160, 
      height: 160,
      variant: "default" 
    },
    { 
      text: "Easy Sharing", 
      x: 988, 
      y: 289, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: "Full Control", 
      x: 293, 
      y: 307, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: "Auto\nCapture", 
      x: 923, 
      y: 128, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden min-h-[800px] max-w-[1440px] mx-auto"
    >
      {/* Background Image */}
      <div className="absolute inset-0 rounded-[20px] overflow-hidden">
        <Image
          src="/images/feature-bg.png"
          alt="Feature Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Video BG Overlay */}
      <div 
        className="absolute overflow-hidden rounded-[20px]"
        style={{
          left: "-5.3%",
          top: "-0.06%",
          width: "110.5%",
          height: "100.1%",
        }}
      >
        <Image
          src="/images/feature-video-bg.png"
          alt="Video Background"
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col py-[60px]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center gap-6 px-4">
          {/* Title */}
          <h2 
            className="font-michroma text-[28px] md:text-[28px] leading-[1.4] tracking-[-0.04em] text-center whitespace-pre-line"
            style={{ color: "#2DD4C2" }}
          >
            Everything{"\n"}You Need
          </h2>

          {/* Features Container - Relative positioning for badges */}
          <div className="relative w-full max-w-[1294px] aspect-[1294/524] mx-auto">
            {/* Globe Image */}
            <div 
              className="absolute"
              style={{
                left: "30.91%",
                top: "30.92%",
                width: "49.46%",
                height: "97.63%",
              }}
            >
              <Image
                src="/images/feature-globe.svg"
                alt="Globe"
                fill
                className="object-contain"
              />
            </div>

            {/* Feature Badges */}
            {badges.map((badge, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) badgesRef.current[index] = el;
                }}
                className="absolute flex items-center justify-center text-center transition-all hover:scale-105 cursor-pointer"
                style={{
                  left: `${(badge.x / 1294) * 100}%`,
                  top: `${(badge.y / 524) * 100}%`,
                  width: `${(badge.width / 1294) * 100}%`,
                  height: `${(badge.height / 524) * 100}%`,
                  padding: "0.62% 1.55%",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.17)",
                  borderRadius: "1000px",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <span 
                  className="font-inter leading-[1.5] text-white text-center whitespace-pre-line w-full"
                  style={{
                    fontSize: "clamp(10px, 1.39vw, 18px)",
                  }}
                >
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


