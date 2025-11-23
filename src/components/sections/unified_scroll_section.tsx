"use client";

import React, { useRef, useEffect } from "react";
import { BookmarkCheck, FolderOpen, RefreshCw } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Magnet from "@/components/Magnet";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontFamily } from "@/lib/utils/fonts";

export default function UnifiedScrollSection() {
    const t = useTranslation();
    const { language } = useLanguage();
    
    // Main wrapper ref
    const wrapperRef = useRef<HTMLElement>(null);

    // How It Works Refs
    const hiwContentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const hiwTitleRef = useRef<HTMLDivElement>(null);

    // Features Refs
    const featuresContentRef = useRef<HTMLDivElement>(null);
    const globeRef = useRef<HTMLDivElement>(null);
    const badgesRef = useRef<HTMLDivElement[]>([]);
    const featuresTitleRef = useRef<HTMLHeadingElement>(null);

    // Footer Refs
    const footerVideoContainerRef = useRef<HTMLDivElement>(null);
    const futureCardRef = useRef<HTMLDivElement>(null);
    const footerContentRef = useRef<HTMLDivElement>(null);

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
            // ===== UNIFIED TIMELINE with Extended Duration =====
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: "+=1200%", // Extended to accommodate all 3 sections
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // ===== INITIAL STATES =====

            // How It Works cards - start hidden
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

            // Features content - start hidden
            gsap.set(featuresContentRef.current, {
                opacity: 0,
                pointerEvents: "none",
                y: 100
            });

            // Globe starts at normal scale
            if (globeRef.current) {
                gsap.set(globeRef.current, { scale: 1 });
            }

            // Footer container - start hidden with blur
            gsap.set(footerVideoContainerRef.current, {
                opacity: 0,
                filter: "blur(15px)",
                pointerEvents: "none"
            });

            gsap.set(futureCardRef.current, {
                opacity: 0,
                scale: 0.85,
                y: 80
            });

            gsap.set(footerContentRef.current, {
                opacity: 0,
                y: 50
            });

            // ===== PHASE 1: HOW IT WORKS ANIMATION =====

            // Title Animation
            tl.to(hiwTitleRef.current, {
                top: "10%",
                yPercent: 0,
                scale: 0.6,
                duration: 1,
                ease: "power2.inOut",
            });

            // Card 1 enters
            tl.to(cardsRef.current[0], {
                yPercent: -50,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
            });

            // Card 2 enters, Card 1 moves up
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

            // Card 3 enters, others move up
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

            // ===== PHASE 2: TRANSITION TO FEATURES =====

            // Fade out HIW content
            tl.to(hiwContentRef.current, {
                opacity: 0,
                y: -50,
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
            }, "<0.5");

            // Hold to view features content
            tl.to({}, { duration: 1.5 });

            // ===== PHASE 3: GLOBE ZOOM & EXIT =====

            // Hide Badges and Features Title
            const activeBadges = badgesRef.current.filter(Boolean);
            tl.to([activeBadges, featuresTitleRef.current], {
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                ease: "power2.in"
            });

            // Zoom Globe by 90%
            if (globeRef.current) {
                tl.to(globeRef.current, {
                    scale: 1.9,
                    duration: 1.2,
                    ease: "power2.inOut",
                    transformOrigin: "center center"
                }, "<0.2");
            }

            // Hold the zoomed globe
            tl.to({}, { duration: 0.5 });

            // ===== PHASE 4: BLUR TRANSITION TO FOOTER (NEW) =====

            // Blur + fade out entire features section
            tl.to(featuresContentRef.current, {
                opacity: 0,
                filter: "blur(20px)",
                scale: 1.05,
                duration: 1,
                ease: "power2.inOut"
            });

            // Overlap: Fade in footer video background with blur effect
            tl.fromTo(footerVideoContainerRef.current,
                { opacity: 0, filter: "blur(15px)" },
                { 
                    opacity: 1, 
                    filter: "blur(0px)", 
                    duration: 1.2, 
                    ease: "power2.out",
                    pointerEvents: "auto"
                },
                "<0.6" // Start 0.6s before features fade completes (overlap)
            );

            // ===== PHASE 5: FUTURE CARD ANIMATION =====

            // Hold background for a moment
            tl.to({}, { duration: 0.8 });

            // Fade in Future card
            tl.to(futureCardRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.8,
                ease: "power2.out"
            });

            // Hold Future content visible
            tl.to({}, { duration: 1.2 });

            // ===== PHASE 6: TRANSITION TO FOOTER CONTENT =====

            // Fade out Future card
            tl.to(futureCardRef.current, {
                opacity: 0,
                scale: 0.95,
                y: -30,
                duration: 0.6,
                ease: "power2.in"
            });

            // Fade in Footer content
            tl.to(footerContentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out"
            }, "-=0.3");

            // Hold final footer content
            tl.to({}, { duration: 1 });

        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={wrapperRef}
            className="relative w-full h-screen overflow-hidden"
        >
            {/* ===== LAYER 1: Ocean Background Video (z-0) ===== */}
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
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/85" />
            </div>

            {/* ===== LAYER 2: HOW IT WORKS + FEATURES CONTENT (z-10) ===== */}
            
            {/* How It Works Content */}
            <div
                ref={hiwContentRef}
                className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center py-12 sm:py-16 md:py-20"
                suppressHydrationWarning
            >
                {/* Title Section */}
                <div
                    ref={hiwTitleRef}
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

            {/* Features Content */}
            <div
                ref={featuresContentRef}
                className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-[60px] px-4"
                suppressHydrationWarning
            >
                <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center gap-4 sm:gap-5 md:gap-6" suppressHydrationWarning>
                    {/* Title */}
                    <h2
                        ref={featuresTitleRef}
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

            {/* ===== LAYER 3: FOOTER VIDEO + CONTENT (z-5, initially hidden) ===== */}
            <div
                ref={footerVideoContainerRef}
                className="absolute inset-0 z-5"
                suppressHydrationWarning
            >
                {/* Footer Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/Video footer.mp4" type="video/mp4" />
                </video>
                {/* Overlay */}
                <div className="absolute inset-0 bg-[rgba(3,38,65,0.3)]" suppressHydrationWarning />

                {/* Future Card Content */}
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
                                    <span className="font-semibold" style={{ color: "#073071" }}>
                                        Amorfs is not just a tool.
                                    </span>
                                    <br />
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
                                    <span className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F408F] opacity-0 transition-opacity group-hover:opacity-20" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer CTA Content */}
                <div
                    ref={footerContentRef}
                    className="absolute inset-0 flex items-center justify-center px-4"

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

                            {/* Buttons Container */}
                            <div className="relative flex flex-wrap justify-center items-start gap-3 sm:gap-4 md:gap-6">
                                {/* Install Extension Button */}
                                <Magnet
                                    padding={50}
                                    magnetStrength={10}
                                    wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
                                >
                                    <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[200px] lg:w-[200px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25 mt-0">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                                        >
                                            <path
                                                d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16M21 16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16M21 16L21 18M3 16L3 18M8 11L12 15M12 15L16 11M12 15V6"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
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

                                {/* Open Studio Button */}
                                <Magnet
                                    padding={50}
                                    magnetStrength={10}
                                    wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
                                >
                                    <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[200px] lg:w-[200px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25 mt-8 sm:mt-10 md:mt-12">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                                        >
                                            <path
                                                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M9 22V12H15V22"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
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

                                {/* View Pricing Button */}
                                <Magnet
                                    padding={50}
                                    magnetStrength={10}
                                    wrapperClassName="cursor-pointer sm:!p-[75px] md:!p-[100px]"
                                >
                                    <div className="relative flex h-[140px] w-[140px] sm:h-[160px] sm:w-[160px] md:h-[180px] md:w-[180px] lg:h-[206px] lg:w-[206px] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 rounded-full border-2 border-white/55 bg-white/17 p-4 sm:p-5 md:p-6 backdrop-blur-[20px] transition-all hover:bg-white/25 mt-4 sm:mt-5 md:mt-6">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                                        >
                                            <path
                                                d="M12 2L2 7L12 12L22 7L12 2Z"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M2 17L12 22L22 17"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M2 12L12 17L22 12"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
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
                        <div className="absolute bottom-0 left-0 right-0 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4">
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
            </div>
        </section>
    );
}

