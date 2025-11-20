"use client";

import LightRays from "@/components/LightRays";
import ProblemSolutionSection from "./problem_solution_section";
import ProductSection from "./product_section";

export default function ProblemProductWrapper() {
    return (
        <div className="relative min-h-screen">
            {/* Light Rays Effect - Persistent across both sections */}
            <div
                className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-50"
                style={{ minHeight: '200vh', zIndex: 10 }}
            >
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

            {/* Sections - Stacked above LightRays */}
            <div className="relative" style={{ zIndex: 20 }}>
                <ProblemSolutionSection />
                <ProductSection />
            </div>
        </div>
    );
}
