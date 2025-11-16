"use client";

import { useRef } from "react";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { BookmarkCheck, FolderOpen, RefreshCw } from "lucide-react";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      number: "1",
      title: "Capture",
      description:
        "Enter information once in any web form. Amorfs saves it automatically.",
      icon: BookmarkCheck,
    },
    {
      number: "2",
      title: "Store",
      description:
        "Your data lives in an intuitive text format that's easy to read, edit, and share backed by a sophisticated semantic model that understands concepts, not just text.",
      icon: FolderOpen,
    },
    {
      number: "3",
      title: "Reuse",
      description:
        "Fill forms instantly. Transform data into beautiful presentations. Share with others.",
      icon: RefreshCw,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/how-it-works-bg.png"
          alt="How It Works Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Video BG Overlay - Full Screen */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute"
          style={{
            left: "-76px",
            top: "-0.5px",
            width: "calc(100% + 152px)",
            height: "calc(100% + 1px)",
          }}
        >
          <Image
            src="/images/how-it-works-video-bg.png"
            alt="Video Background"
            fill
            className="object-cover opacity-10"
          />
        </div>
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-20">
        {/* Title Section */}
        <div className="w-full max-w-[1440px] mx-auto px-4 pb-10 flex flex-col items-center gap-2">
          <h2
            className="font-michroma text-[48px] md:text-[60px] leading-[1.4em] tracking-[-0.04em] text-center"
            style={{
              color: "#2DD4C2",
              textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            How Amorfs Works
          </h2>
        </div>

        {/* ScrollStack Container */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-0">
          <div className="w-full max-w-[1440px] mx-auto px-4 h-full">
            <ScrollStack
              className="w-full h-full scroll-stack-no-scrollbar"
              useWindowScroll={true}
              itemDistance={100}
              itemScale={0.03}
              itemStackDistance={30}
              stackPosition="20%"
              scaleEndPosition="10%"
              baseScale={0.85}
              rotationAmount={0}
              blurAmount={0}
            >
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <ScrollStackItem
                    key={index}
                    itemClassName="bg-[#DDEBF9] border-2 border-[#A0C2E0] rounded-[60px] !p-0 !h-auto !my-8"
                  >
                    <div 
                      className="flex flex-row items-center justify-center"
                      style={{
                        gap: "44px",
                        padding: "40px",
                        width: "813px",
                        height: "380px",
                        boxSizing: "border-box",
                      }}
                    >
                      {/* Left Content */}
                      <div 
                        className="flex flex-col justify-center flex-shrink-0"
                        style={{
                          gap: "20px",
                          width: "240px",
                        }}
                      >
                        {/* Icon */}
                        <div 
                          className="flex items-center justify-center rounded-full"
                          style={{
                            backgroundColor: "#0F408F",
                            borderRadius: "100px",
                            padding: "12px",
                            width: "fit-content",
                          }}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>

                        {/* Title */}
                        <h3
                          className="font-manrope"
                          style={{
                            fontWeight: 500,
                            fontSize: "32px",
                            lineHeight: "1.25em",
                            letterSpacing: "-0.03em",
                            color: "#073071",
                          }}
                        >
                          {step.number}. {step.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="font-manrope"
                          style={{
                            fontWeight: 450,
                            fontSize: "18px",
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
                        className="bg-white rounded-[24px] flex-shrink-0"
                        style={{
                          width: "453px",
                          height: "300px",
                        }}
                      />
                    </div>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>
        </div>
      </div>
    </section>
  );
}

