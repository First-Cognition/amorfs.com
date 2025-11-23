"use client";

import { useRef, useEffect } from "react";
import { BookmarkCheck, FolderOpen, RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Magnet from "@/components/Magnet";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontFamily } from "@/lib/utils/fonts";

export default function HowItWorksFeaturesWrapper() {
    const t = useTranslation();
    const { language } = useLanguage();
    const wrapperRef = useRef<HTMLElement>(null);

    // How It Works Refs
    const hiwContentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const titleRef = useRef<HTMLDivElement>(null);

    // Features Refs
    const featuresContentRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<HTMLDivElement>(null);
    const badgesRef = useRef<HTMLDivElement[]>([]);

    // Data for How It Works
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

    // Data for Features
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
            variant: "default"
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
            variant: "default"
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

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!wrapperRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "+=800%", // Increased duration to accommodate both sections
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // --- How It Works Animation (Similar to original) ---

            // Initial state for HIW cards
            cardsRef.current.forEach((card, i) => {
                if (card) {
                    gsap.set(card, {
                        xPercent: -50,
                        yPercent: 150,
                        opacity: 0,
                        scale: 0.9,
                        filter: "blur(10px)",
                        zIndex: i + 1
                    });
                }
            });

            // Initial state for Features
            gsap.set(featuresContentRef.current, {
                opacity: 0,
                pointerEvents: "none",
                y: 100 // Start slightly down
            });

            // Ensure globe starts at normal scale
            if (globeRef.current) {
                gsap.set(globeRef.current, { scale: 1 });
            }

            // 1. Title Animation
            tl.to(titleRef.current, {
                top: "10%",
                yPercent: 0,
                scale: 0.6,
                duration: 1,
                ease: "power2.inOut",
            });

            // 2. Card 1 enters
            tl.to(cardsRef.current[0], {
                yPercent: -50,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
            });

            // 3. Card 2 enters, Card 1 moves up
            tl.to(cardsRef.current[0], {
                yPercent: -60,
                scale: 0.95,
                opacity: 0.6,
                filter: "blur(4px)",
                duration: 1,
                ease: "power2.out",
            }, ">");

            tl.to(cardsRef.current[1], {
                yPercent: -50,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
            }, "<");

            // 4. Card 3 enters, others move up
            tl.to(cardsRef.current[0], {
                yPercent: -70,
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

            // Hold HIW state briefly
            tl.to({}, { duration: 0.5 });

            // --- Transition to Features ---

            // Fade out HIW content
            tl.to(hiwContentRef.current, {
                opacity: 0,
                y: -50, // Move up slightly as it fades
                duration: 1,
                pointerEvents: "none",
                ease: "power2.inOut"
            });

            // Fade in Features content
            tl.to(featuresContentRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                pointerEvents: "auto",
                ease: "power2.inOut"
            }, "<0.5"); // Overlap slightly

            // --- Features Animation ---
            
            // Hold to view features content
            tl.to({}, { duration: 1.5 });

            // --- Exit Animation (Zoom Globe -> Fade Out) ---
            
            // 1. Hide Badges and Title to clear the view
            const activeBadges = badgesRef.current.filter(Boolean);
            tl.to([activeBadges, titleRef.current], {
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                ease: "power2.in"
            });

            // 2. Zoom Globe by 90% (scale from 1 to 1.9)  
            if (globeRef.current) {
                tl.to(globeRef.current, {
                    scale: 1.9, // Zoom in by 90%
                    duration: 1.2,
                    ease: "power2.inOut",
                    transformOrigin: "center center"
                }, "<0.2"); // Start shortly after hiding badges
            }

            // 3. Hold the zoomed globe briefly
            tl.to({}, { duration: 0.4 });

            // 4. Fade out globe and features content
            tl.to(featuresContentRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power1.inOut"
            });

            // 5. Fade out the entire section wrapper to reveal the next section
            tl.to(wrapperRef.current, {
                opacity: 0,
                duration: 0.6,
                ease: "power1.out",
                pointerEvents: "none"
            }, ">-0.4"); // Overlap with features fade out

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* Shared Background Video - Full Screen */}
            <div className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/Video ocean BG.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-0 bg-black/85" />

            {/* --- How It Works Content --- */}
            <div
                ref={hiwContentRef}
                className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20"
                suppressHydrationWarning
            >
                {/* Title Section */}
                <div
                    ref={titleRef}
                    className="w-full max-w-[1440px] mx-auto px-4 pb-6 sm:pb-8 md:pb-10 flex flex-col items-center gap-2 absolute top-1/2 left-0 right-0 z-20 -translate-y-1/2"
                    suppressHydrationWarning
                >
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

            {/* --- Features Content --- */}
            <div
                ref={featuresContentRef}
                className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-[60px] px-4"
                suppressHydrationWarning
            >
                <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-4 sm:gap-5 md:gap-6" suppressHydrationWarning>
                    {/* Title */}
                    <h2
                        className="font-michroma text-xl sm:text-2xl md:text-[28px] leading-[1.4] tracking-[-0.04em] text-center whitespace-pre-line"
                        style={{
                            fontFamily: getFontFamily(language, "michroma"),
                            color: "#2DD4C2"
                        }}
                    >
                        {t("features.title")}
                    </h2>

                    {/* Features Container */}
                    <div className="relative w-full max-w-[1294px] aspect-[1294/524] min-h-[200px] sm:min-h-[300px] md:min-h-[400px]" suppressHydrationWarning>
                        {/* Globe Video - Centered */}
                        <div
                            ref={globeRef}
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
                            <video
                                src="/Video ocean-globe.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="object-contain w-full h-full"
                                style={{
                                    pointerEvents: "none",
                                    mixBlendMode: "screen",
                                    clipPath: "circle(closest-side)"
                                }}
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
                                        badgesRef.current[index] = el as HTMLDivElement;
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
                                            fontFamily: getFontFamily(language, "inter"),
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
