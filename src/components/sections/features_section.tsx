"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 80,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized performance ensures your work never slows down.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: "🔐",
      title: "Secure by Default",
      description: "Enterprise-grade security with end-to-end encryption.",
      gradient: "from-green-400 to-cyan-500",
    },
    {
      icon: "🎨",
      title: "Customizable",
      description: "Tailor every aspect to match your brand and workflow.",
      gradient: "from-pink-400 to-purple-500",
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description: "Work seamlessly across all your devices.",
      gradient: "from-blue-400 to-indigo-500",
    },
    {
      icon: "🤖",
      title: "AI-Powered",
      description: "Smart automation that learns and adapts to your needs.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: "🌐",
      title: "Global CDN",
      description: "Fast content delivery worldwide with 99.9% uptime.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: "📊",
      title: "Advanced Analytics",
      description: "Deep insights with real-time data visualization.",
      gradient: "from-red-400 to-pink-500",
    },
    {
      icon: "🔄",
      title: "Auto Sync",
      description: "Your data automatically synced across all devices.",
      gradient: "from-green-400 to-teal-500",
    },
    {
      icon: "💬",
      title: "Live Chat Support",
      description: "Get help instantly from our expert support team.",
      gradient: "from-orange-400 to-red-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-24 sm:py-32"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 top-0 h-96 w-96 rounded-full bg-blue-100 opacity-50 blur-3xl" />
        <div className="absolute -right-48 bottom-0 h-96 w-96 rounded-full bg-purple-100 opacity-50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Features
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything You Need to Succeed
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Packed with powerful features designed to help you work smarter and achieve more.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon with Gradient Background */}
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-3xl transition-all group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600">{feature.description}</p>

              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-20 blur-xl`}
                />
              </div>

              {/* Bottom Gradient Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Want to see more?{" "}
            <button className="font-semibold text-blue-600 transition-colors hover:text-blue-700">
              Explore all features →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}


