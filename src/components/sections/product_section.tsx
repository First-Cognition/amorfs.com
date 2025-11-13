"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabs = [
    {
      name: "Dashboard",
      description:
        "Get a comprehensive overview of your data with our intuitive dashboard. Real-time analytics and insights at your fingertips.",
      image: "/file.svg",
    },
    {
      name: "Analytics",
      description:
        "Deep dive into your metrics with advanced analytics tools. Make data-driven decisions with confidence.",
      image: "/globe.svg",
    },
    {
      name: "Collaboration",
      description:
        "Work seamlessly with your team. Share, comment, and collaborate in real-time from anywhere.",
      image: "/window.svg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Product Overview
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything You Need
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our powerful features designed to help you work smarter, not harder.
          </p>
        </div>

        {/* Product Showcase */}
        <div className="mt-16 lg:mt-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            {/* Tabs */}
            <div className="flex flex-col justify-center">
              <div className="space-y-4">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full rounded-2xl p-6 text-left transition-all ${
                      activeTab === index
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <h3 className="mb-2 text-xl font-bold">{tab.name}</h3>
                    <p
                      className={`text-sm ${
                        activeTab === index ? "text-blue-100" : "text-gray-600"
                      }`}
                    >
                      {tab.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Image/Preview */}
            <div
              ref={imageRef}
              className="relative flex items-center justify-center"
            >
              <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
                <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white">
                  <Image
                    src={tabs[activeTab].image}
                    alt={tabs[activeTab].name}
                    width={400}
                    height={400}
                    className="h-48 w-48 object-contain opacity-80"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 top-12 h-24 w-24 animate-pulse rounded-full bg-blue-400 opacity-20 blur-3xl" />
              <div className="absolute -left-4 bottom-12 h-32 w-32 animate-pulse rounded-full bg-purple-400 opacity-20 blur-3xl" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 sm:mt-20 lg:grid-cols-4">
          {[
            { value: "50K+", label: "Active Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
            { value: "150+", label: "Countries" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600">{stat.value}</div>
              <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


