"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const problems = [
    {
      icon: "⚠️",
      title: "Inefficient Workflows",
      description: "Traditional methods waste time and resources on repetitive tasks.",
    },
    {
      icon: "🔒",
      title: "Security Concerns",
      description: "Data breaches and privacy issues are constant threats.",
    },
    {
      icon: "📉",
      title: "Poor User Experience",
      description: "Complex interfaces lead to frustration and low adoption rates.",
    },
    {
      icon: "💸",
      title: "High Costs",
      description: "Legacy systems require expensive maintenance and upgrades.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gray-900 py-24 sm:py-32"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 opacity-30">
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

      {/* Content */}
      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400">
            The Challenge
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Problems We Solve
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Modern businesses face numerous challenges that hinder growth and innovation.
            Here's what stands in your way.
          </p>
        </div>

        {/* Problem Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:border-blue-500 hover:bg-gray-800"
            >
              <div className="mb-4 text-4xl">{problem.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-white">
                {problem.title}
              </h3>
              <p className="text-gray-400">{problem.description}</p>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

