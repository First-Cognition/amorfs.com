"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate steps
      stepsRef.current.forEach((step, index) => {
        gsap.from(step, {
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Animate connecting line
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
          scaleY: 0,
          transformOrigin: "top",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: "1",
      title: "Sign Up & Setup",
      description:
        "Create your account in seconds. Our onboarding wizard guides you through the initial setup process.",
      icon: "🚀",
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: "2",
      title: "Configure Your Workspace",
      description:
        "Customize your workspace to match your workflow. Import existing data or start fresh.",
      icon: "⚙️",
      color: "from-purple-500 to-pink-500",
    },
    {
      number: "3",
      title: "Invite Your Team",
      description:
        "Collaborate with colleagues by inviting them to your workspace. Assign roles and permissions.",
      icon: "👥",
      color: "from-orange-500 to-red-500",
    },
    {
      number: "4",
      title: "Start Building",
      description:
        "Begin creating and automating your workflows. Our AI assists you every step of the way.",
      icon: "🎯",
      color: "from-green-500 to-teal-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gray-900 py-24 sm:py-32"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400">
            Getting Started
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            How It Works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Get up and running in minutes with our simple 4-step process.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 lg:block"
          />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el;
                }}
                className={`relative flex flex-col gap-8 lg:flex-row ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div
                    className={`rounded-3xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm ${
                      index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className="mb-4 text-6xl">{step.icon}</div>
                    <h3 className="mb-4 text-2xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>

                {/* Number Badge */}
                <div className="flex items-center justify-center lg:w-24">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-2xl font-bold text-white shadow-lg`}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
}


