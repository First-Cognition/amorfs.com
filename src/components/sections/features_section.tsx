"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Magnet from "@/components/Magnet";
import { useTranslation } from "@/hooks/useTranslation";

export default function FeaturesSection() {
  const t = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const badgesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate badges with stagger (skip badges with noAnimation flag)
      let animationIndex = 0;
      badges.forEach((badge, index) => {
        const badgeElement = badgesRef.current[index];
        if (badgeElement && !badge.noAnimation) {
          gsap.from(badgeElement, {
            scrollTrigger: {
              trigger: badgeElement,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            scale: 0,
            opacity: 0,
            duration: 0.8,
            delay: animationIndex * 0.08,
            ease: "back.out(1.7)",
          });
          animationIndex++;
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Calculate positions relative to centered globe
  // Original globe center: x=720 (400+320), y=417.8 (162+255.8)
  // Container center: x=647 (1294/2), y=262 (524/2)
  // Offset to center globe: dx=73, dy=155.8
  const globeCenterX = 720;
  const globeCenterY = 417.8;
  const containerCenterX = 647;
  const containerCenterY = 262;
  const offsetX = globeCenterX - containerCenterX; // 73
  const offsetY = globeCenterY - containerCenterY; // 155.8

  const badges = [
    { 
      text: t("features.badges.zeroKnowledge"), 
      x: 327 - offsetX, 
      y: 457 - offsetY, 
      width: 160, 
      height: 160,
      variant: "default",
      noAnimation: true
    },
    { 
      text: t("features.badges.crossDevices"), 
      x: 1124 - offsetX, 
      y: 224 - offsetY, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: t("features.badges.beautifulTemplates"), 
      x: 943 - offsetX, 
      y: 465 - offsetY, 
      width: 160, 
      height: 160,
      variant: "default",
      noAnimation: true
    },
    { 
      text: t("features.badges.instantReuse"), 
      x: 160 - offsetX, 
      y: 220 - offsetY, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: t("features.badges.languageAgnostic"), 
      x: 348 - offsetX, 
      y: 125 - offsetY, 
      width: 160, 
      height: 160,
      variant: "default" 
    },
    { 
      text: t("features.badges.easySharing"), 
      x: 988 - offsetX, 
      y: 289 - offsetY, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: t("features.badges.fullControl"), 
      x: 293 - offsetX, 
      y: 307 - offsetY, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
    { 
      text: t("features.badges.autoCapture"), 
      x: 923 - offsetX, 
      y: 128 - offsetY, 
      width: 120, 
      height: 120,
      variant: "variant2" 
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
        <Image
          src="/images/feature-bg.png"
          alt="Feature Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Video BG Overlay - Full Screen */}
      <div className="absolute inset-0 overflow-hidden" suppressHydrationWarning>
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
            src="/images/feature-video-bg.png"
            alt="Video Background"
            fill
            className="object-cover opacity-10"
          />
        </div>
      </div>

      {/* Content Container - Centered with max-width */}
      <div className="relative w-full h-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-[60px] px-4" suppressHydrationWarning>
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-4 sm:gap-5 md:gap-6" suppressHydrationWarning>
          {/* Title */}
          <h2 
            className="font-michroma text-xl sm:text-2xl md:text-[28px] leading-[1.4] tracking-[-0.04em] text-center whitespace-pre-line"
            style={{ color: "#2DD4C2" }}
          >
            {t("features.title")}
          </h2>

          {/* Features Container - Relative positioning for badges */}
          <div className="relative w-full max-w-[1294px] aspect-[1294/524] min-h-[200px] sm:min-h-[300px] md:min-h-[400px]" suppressHydrationWarning>
            {/* Globe GIF - Centered */}
            <div 
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "49.46%",
                height: "97.63%",
              }}
              suppressHydrationWarning
            >
              <Image
                src="/Video-ocean-globe.gif"
                alt="Ocean Globe"
                fill
                className="object-contain"
                style={{
                  pointerEvents: "none",
                }}
                unoptimized
              />
            </div>

            {/* Feature Badges */}
            {badges.map((badge, index) => (
              <Magnet
                key={index}
                padding={50}
                magnetStrength={10}
                className="cursor-pointer"
                style={{
                  position: "absolute",
                  left: `${(badge.x / 1294) * 100}%`,
                  top: `${(badge.y / 524) * 100}%`,
                  width: `${(badge.width / 1294) * 100}%`,
                  height: `${(badge.height / 524) * 100}%`,
                }}
                wrapperClassName="cursor-pointer"
                innerClassName="w-full h-full"
              >
                <div
                  ref={(el) => {
                    if (el && !badge.noAnimation) {
                      badgesRef.current[index] = el;
                    }
                  }}
                  className="flex items-center justify-center text-center transition-all hover:scale-105"
                  style={{
                    width: "100%",
                    height: "100%",
                    minWidth: "100%",
                    minHeight: "100%",
                    aspectRatio: "1",
                    padding: "clamp(8px, 1.2vw, 16px)",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.17)",
                    borderRadius: "50%",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span 
                    className="font-inter leading-[1.4] text-white text-center whitespace-pre-line"
                    style={{
                      fontSize: "clamp(8px, 1.2vw, 18px)",
                      lineHeight: "1.4",
                    }}
                  >
                    {badge.text}
                  </span>
                </div>
              </Magnet>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


