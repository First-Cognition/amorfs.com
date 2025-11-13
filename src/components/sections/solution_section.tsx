"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      number: "01",
      title: "Automated Workflows",
      description:
        "Streamline your processes with intelligent automation that saves time and reduces errors.",
      features: ["AI-powered automation", "Custom workflows", "Real-time monitoring"],
    },
    {
      number: "02",
      title: "Enterprise Security",
      description:
        "Bank-grade encryption and compliance with international security standards.",
      features: ["End-to-end encryption", "Multi-factor auth", "SOC 2 compliant"],
    },
    {
      number: "03",
      title: "Intuitive Interface",
      description:
        "Beautiful, user-friendly design that anyone can master in minutes, not months.",
      features: ["Drag-and-drop UI", "Mobile responsive", "Dark mode support"],
    },
    {
      number: "04",
      title: "Cost Effective",
      description:
        "Flexible pricing and efficient resource usage that grows with your business.",
      features: ["Pay as you grow", "No hidden fees", "Free trial available"],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-24 sm:py-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Our Approach
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Comprehensive Solutions
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We've built a platform that addresses every challenge with cutting-edge
            technology and user-centric design.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          {solutions.map((solution, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl"
            >
              {/* Number Badge */}
              <div className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-600">
                {solution.number}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                {solution.title}
              </h3>
              
              <p className="mb-6 text-gray-600">{solution.description}</p>

              {/* Features List */}
              <ul className="space-y-2">
                {solution.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Gradient */}
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 translate-y-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 blur-3xl transition-opacity group-hover:opacity-20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

