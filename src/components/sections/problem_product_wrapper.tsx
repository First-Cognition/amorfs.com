"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LightRays from "@/components/LightRays";
import ProblemSolutionSection from "./problem_solution_section";
import ProductSection from "./product_section";

export default function ProblemProductWrapper() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const raysRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!wrapperRef.current || !raysRef.current) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: raysRef.current,
                pinSpacing: false, // Don't add space, just pin the overlay
            });
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={wrapperRef} className="relative min-h-screen w-full">
            {/* Sections Container - Base layer */}
            <div className="relative" style={{ zIndex: 1 }}>
                <ProblemSolutionSection />
                <ProductSection />
            </div>

            {/* Light Rays Effect - Pinned by GSAP to cover the entire wrapper duration */}
            <div
                ref={raysRef}
                className="absolute top-0 left-0 w-full h-screen pointer-events-none"
                style={{ zIndex: 49 }}
            >
                <div className="w-full h-full mix-blend-screen opacity-60">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#CFFAFE"
                        raysSpeed={0.2}
                        lightSpread={0.6}
                        rayLength={0.8}
                        pulsating={true}
                        fadeDistance={0.6}
                        followMouse={true}
                        mouseInfluence={0.05}
                    />
                </div>
            </div>
        </div>
    );
}
