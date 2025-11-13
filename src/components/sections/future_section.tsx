"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FutureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate main content
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Animate roadmap cards
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const roadmap = [
    {
      quarter: "Q1 2025",
      title: "AI Copilot",
      description: "Intelligent assistant that helps you work faster with natural language commands.",
      status: "In Development",
      color: "bg-blue-500",
    },
    {
      quarter: "Q2 2025",
      title: "Advanced Integrations",
      description: "Connect with 100+ popular tools and services seamlessly.",
      status: "Planned",
      color: "bg-purple-500",
    },
    {
      quarter: "Q3 2025",
      title: "Mobile Apps",
      description: "Native iOS and Android apps for the ultimate mobile experience.",
      status: "Planned",
      color: "bg-pink-500",
    },
    {
      quarter: "Q4 2025",
      title: "Enterprise Suite",
      description: "Advanced features for large organizations with complex needs.",
      status: "Planned",
      color: "bg-orange-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 py-24 sm:py-32"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/Video ocean BG.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/80 via-blue-900/80 to-gray-900/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div ref={contentRef} className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400">
            What's Next
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            The Future is Bright
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We're constantly innovating and building new features to help you stay ahead.
            Here's what's coming next.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="space-y-8">
            {roadmap.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`flex flex-col gap-6 lg:flex-row ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* Content Card */}
                <div className="flex-1">
                  <div className="group relative overflow-hidden rounded-3xl border border-gray-700 bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:border-blue-500 hover:bg-gray-800/70">
                    {/* Status Badge */}
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold text-white">
                      <div className={`h-2 w-2 rounded-full ${item.color} animate-pulse`} />
                      {item.status}
                    </div>

                    <h3 className="mb-3 text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    
                    <p className="mb-4 text-gray-300">{item.description}</p>

                    {/* Quarter Label */}
                    <div className="text-sm font-semibold text-blue-400">
                      {item.quarter}
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-16 translate-y-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
                  </div>
                </div>

                {/* Connector Circle */}
                <div className="hidden items-center justify-center lg:flex lg:w-16">
                  <div className={`h-4 w-4 rounded-full ${item.color}`} />
                </div>

                {/* Spacer */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-12 text-center backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-white">
            Want to Shape Our Future?
          </h3>
          <p className="mt-4 text-lg text-gray-300">
            Join our beta program and get early access to upcoming features.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition-all hover:scale-105 hover:bg-gray-100">
              Join Beta Program
            </button>
            <button className="rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-gray-900">
              View Full Roadmap
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

