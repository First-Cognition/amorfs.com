"use client";

import { useRef } from "react";
import Image from "next/image";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { BookmarkCheck, FolderOpen, RefreshCw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFontFamily } from "@/lib/utils/fonts";

export default function HowItWorksSection() {
  const t = useTranslation();
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image - Full Screen */}
      <div className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>
        <Image
          src="/images/how-it-works-bg.png"
          alt="How It Works Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Video BG Overlay - Full Screen */}
      <div className="absolute inset-0 z-0 overflow-hidden" suppressHydrationWarning>
        <div
          className="absolute"
          style={{
            left: "-76px",
            top: "-0.5px",
            width: "calc(100% + 152px)",
            height: "calc(100% + 1px)",
          }}
          suppressHydrationWarning
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
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-16 md:py-20" suppressHydrationWarning>
        {/* Title Section */}
        <div className="w-full max-w-[1440px] mx-auto px-4 pb-6 sm:pb-8 md:pb-10 flex flex-col items-center gap-2" suppressHydrationWarning>
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

        {/* ScrollStack Container */}
        <div className="relative w-full flex-1 flex items-center justify-center min-h-0" suppressHydrationWarning>
          <div className="w-full max-w-[1440px] mx-auto px-4 h-full" suppressHydrationWarning>
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
                    itemClassName="bg-[#DDEBF9] border-2 border-[#A0C2E0] rounded-2xl sm:rounded-3xl md:rounded-[60px] !p-0 !h-auto !my-4 sm:!my-6 md:!my-8"
                  >
                    <div 
                      className="flex flex-col sm:flex-row items-center justify-center w-full max-w-[813px] mx-auto"
                      style={{
                        gap: "20px",
                        padding: "20px",
                        boxSizing: "border-box",
                      }}
                      suppressHydrationWarning
                    >
                      {/* Left Content */}
                      <div 
                        className="flex flex-col justify-center flex-shrink-0 w-full sm:w-auto"
                        style={{
                          gap: "12px",
                          width: "100%",
                          maxWidth: "240px",
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
                        className="bg-white rounded-xl sm:rounded-2xl md:rounded-[24px] flex-shrink-0 w-full sm:w-auto aspect-[453/300] sm:w-[453px] sm:h-[300px]"
                        suppressHydrationWarning
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

