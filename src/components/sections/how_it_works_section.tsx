"use client";

import { useEffect, useRef, useState } from "react";
import { BookmarkCheck, FolderOpen, RefreshCw } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const [stackCompleted, setStackCompleted] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const isInSectionRef = useRef(false);
  const preventScrollRef = useRef(false);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          if (!sectionRef.current || !titleRef.current) {
            ticking = false;
            return;
          }

          const sectionRect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const scrollY = window.scrollY;
          const sectionTop = sectionRect.top;
          const sectionBottom = sectionRect.bottom;
          const sectionScrolled = scrollY - (sectionRef.current.offsetTop || 0);
          const sectionHeight = sectionRef.current.offsetHeight;

          // Check if user is in the section
          const inSection = sectionTop <= 0 && sectionBottom > windowHeight;
          isInSectionRef.current = inSection;

          // Near the end of section (last 20% of section height)
          const nearEnd = sectionScrolled > sectionHeight * 0.8;

          // Prevent scroll if in section, not completed, and not near end
          preventScrollRef.current = inSection && !stackCompleted && !nearEnd;

          // If stack completed and scrolled past section, allow natural scroll
          if (stackCompleted && sectionBottom <= 0) {
            preventScrollRef.current = false;
            setShowScrollIndicator(false);
          }

          // Show scroll indicator when stack completed and still in section
          if (stackCompleted && inSection && nearEnd) {
            setShowScrollIndicator(true);
          } else if (!stackCompleted || !inSection) {
            setShowScrollIndicator(false);
          }

          // Fade out title as we scroll down
          if (sectionTop < windowHeight / 2 && sectionTop > -windowHeight) {
            const scrollProgress = Math.max(
              0,
              Math.min(1, (windowHeight / 2 - sectionTop) / (windowHeight / 2))
            );
            const newOpacity = Math.round((1 - scrollProgress) * 100) / 100;
            setTitleOpacity(newOpacity);
          }
          ticking = false;
        });
      }
    };

    // Prevent default scroll when in section and stack not completed
    const preventScroll = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if trying to scroll down out of section
      const atBottomOfSection = sectionRect.bottom <= windowHeight + 100;

      if (preventScrollRef.current && e.deltaY > 0 && !atBottomOfSection) {
        // Prevent scroll down while in section and stack not complete
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll as any, { passive: false });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll as any);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [stackCompleted]);

  const handleStackComplete = () => {
    setStackCompleted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[300vh] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #0A1628 100%)",
      }}
    >
      {/* Video Background - Absolute within section */}
      <div 
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0"
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
        >
          <source src="/Video ocean BG.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Title - Center Screen at First */}
      <div className="h-screen flex items-center justify-center px-6 sticky top-0 z-10">
        <h2
          ref={titleRef}
          className="text-center text-4xl lg:text-[60px] leading-[1.4] tracking-[-0.04em] font-michroma text-[#2DD4C2]"
          style={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
            opacity: titleOpacity,
            willChange: "opacity",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "translate3d(0, 0, 0)",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          How Amorfs Works
        </h2>
      </div>

      {/* ScrollStack Cards - Start after title */}
      <div className="relative -mt-[50vh] z-20">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={150}
          itemScale={0.03}
          itemStackDistance={30}
          stackPosition="25%"
          scaleEndPosition="10%"
          baseScale={0.88}
          onStackComplete={handleStackComplete}
        >
          {/* Step 1: Capture */}
          <ScrollStackItem itemClassName="bg-[#DDEBF9] border-2 border-[#A0C2E0] !rounded-[60px] max-w-[900px] mx-auto !h-auto">
            <div className="flex flex-col lg:flex-row gap-[44px]">
              {/* Content */}
              <div className="flex flex-col gap-5 w-full lg:w-[240px]">
                {/* Icon */}
                <div className="flex items-center justify-center w-fit p-3 rounded-full bg-[#0F408F]">
                  <BookmarkCheck className="w-7 h-7 text-[#EFF5FF]" />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-[32px] leading-[1.25] tracking-[-0.03em] text-[#073071] font-manrope font-medium">
                  1. Capture
                </h3>

                {/* Description */}
                <p className="text-base lg:text-[18px] leading-[1.5] tracking-[-0.03em] text-[#073071] font-manrope">
                  Enter information once in any web form. Amorfs saves it
                  automatically.
                </p>
              </div>

              {/* Placeholder for illustration */}
              <div className="flex-1 min-h-[300px] bg-white rounded-[24px]" />
            </div>
          </ScrollStackItem>

          {/* Step 2: Store */}
          <ScrollStackItem itemClassName="bg-[#DDEBF9] border-2 border-[#A0C2E0] !rounded-[60px] max-w-[900px] mx-auto !h-auto">
            <div className="flex flex-col lg:flex-row gap-[44px]">
              {/* Content */}
              <div className="flex flex-col gap-5 w-full lg:w-[240px]">
                {/* Icon */}
                <div className="flex items-center justify-center w-fit p-3 rounded-full bg-[#0F408F]">
                  <FolderOpen className="w-7 h-7 text-[#EFF5FF]" />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-[32px] leading-[1.25] tracking-[-0.03em] text-[#073071] font-manrope font-medium">
                  2. Store
                </h3>

                {/* Description */}
                <p className="text-base lg:text-[18px] leading-[1.5] tracking-[-0.03em] text-[#073071] font-manrope">
                  Your data lives in an intuitive text format that's easy to
                  read, edit, and share backed by a sophisticated semantic model
                  that understands concepts, not just text.
                </p>
              </div>

              {/* Placeholder for illustration */}
              <div className="flex-1 min-h-[300px] bg-white rounded-[24px]" />
            </div>
          </ScrollStackItem>

          {/* Step 3: Reuse */}
          <ScrollStackItem itemClassName="bg-[#DDEBF9] border-2 border-[#A0C2E0] !rounded-[60px] max-w-[900px] mx-auto !h-auto">
            <div className="flex flex-col lg:flex-row gap-[44px]">
              {/* Content */}
              <div className="flex flex-col gap-5 w-full lg:w-[240px]">
                {/* Icon */}
                <div className="flex items-center justify-center w-fit p-3 rounded-full bg-[#0F408F]">
                  <RefreshCw className="w-7 h-7 text-[#EFF5FF]" />
                </div>

                {/* Title */}
                <h3 className="text-2xl lg:text-[32px] leading-[1.25] tracking-[-0.03em] text-[#073071] font-manrope font-medium">
                  3. Reuse
                </h3>

                {/* Description */}
                <p className="text-base lg:text-[18px] leading-[1.5] tracking-[-0.03em] text-[#073071] font-manrope">
                  Fill forms instantly. Transform data into beautiful
                  presentations. Share with others.
                </p>
              </div>

              {/* Placeholder for illustration */}
              <div className="flex-1 min-h-[300px] bg-white rounded-[24px]" />
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
}


