"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

// Debounce helper
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function ProductSection() {
  const t = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const slidesInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const draggableRef = useRef<Draggable[] | null>(null);
  const rafRef = useRef<number | null>(null);

  // Refs for slide text animations
  const slide1ContentRef = useRef<HTMLDivElement>(null);
  const slide2ContentRef = useRef<HTMLDivElement>(null);
  const slide3ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

    if (!sectionRef.current || !slidesContainerRef.current || !slidesInnerRef.current) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".product-slide");
      const numSlides = slides.length;
      const progressPerItem = 1 / (numSlides - 1);
      const threshold = progressPerItem / 5;
      const slideDuration = 0.3;

      const snapProgress = gsap.utils.snap(progressPerItem);
      const snapProgressDirectional = (value: number, direction: number) => {
        const snapped = snapProgress(value);
        if (direction < 0 && value - snapped > threshold) {
          return snapped + progressPerItem;
        } else if (direction > 0 && snapped - value > threshold) {
          return snapped - progressPerItem;
        }
        return snapped;
      };

      let slideWidth: number;
      let totalWidth: number;
      let isScrolling = false;
      let scrollTriggerInstance: ScrollTrigger | null = null;
      let currentSlideIndex = 0;

      // Set initial hidden state for all animate-text elements
      const allAnimateTextElements = document.querySelectorAll('.animate-text');
      gsap.set(allAnimateTextElements, {
        y: 50,
        opacity: 0,
      });

      // Animate slide content with move-up effect
      const animateSlideContent = (slideRef: React.RefObject<HTMLDivElement | null>) => {
        if (!slideRef.current) return;

        const elements = slideRef.current.querySelectorAll('.animate-text');

        gsap.to(
          elements,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          }
        );
      };

      // Initial animation for first slide
      setTimeout(() => {
        animateSlideContent(slide1ContentRef);
      }, 300);

      // Create animation with GPU acceleration
      const animation = gsap.to(slides, {
        xPercent: -((numSlides - 1) * 100),
        ease: "none",
        paused: true,
        duration: 1,
        force3D: true, // Force GPU acceleration
      });

      animationRef.current = animation;

      // Create draggable
      const draggable = Draggable.create(document.createElement("div"), {
        type: "x",
        edgeResistance: 0.9,
        dragResistance: 0.0,
        trigger: slidesContainerRef.current,
        onPress(this: Draggable & { startProgress?: number }) {
          gsap.killTweensOf(animation);
          this.startProgress = animation.progress();
        },
        onDrag(this: Draggable & { startProgress?: number; startX?: number }) {
          const change = ((this.startX || 0) - (this.x || 0)) / totalWidth;
          animation.progress((this.startProgress || 0) + change);
        },
        onRelease(this: Draggable & { deltaX?: number }) {
          gsap.to(animation, {
            progress: snapProgressDirectional(
              animation.progress(),
              (this.deltaX || 0) > 0 ? 1 : -1
            ),
            duration: slideDuration,
            overwrite: true,
          });
        },
      });

      draggableRef.current = draggable;

      // Pin the section and control slide progress with scroll
      const pinEnd = `+=${(numSlides - 1) * 100}%`;

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: pinEnd,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        fastScrollEnd: true, // Performance optimization
        onUpdate: (self) => {
          // Use RAF to throttle updates
          if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
          }
          rafRef.current = requestAnimationFrame(() => {
            const scrollProgress = self.progress;
            const slideProgress = Math.min(scrollProgress, 1);
            animation.progress(slideProgress);

            // Determine current slide and trigger animations
            const newSlideIndex = Math.round(slideProgress * (numSlides - 1));
            if (newSlideIndex !== currentSlideIndex) {
              currentSlideIndex = newSlideIndex;

              // Trigger animation for the new slide
              if (currentSlideIndex === 0) {
                animateSlideContent(slide1ContentRef);
              } else if (currentSlideIndex === 1) {
                animateSlideContent(slide2ContentRef);
              } else if (currentSlideIndex === 2) {
                animateSlideContent(slide3ContentRef);
              }
            }
          });
        },
      });

      // Optimized wheel handler
      const handleWheel = (e: WheelEvent) => {
        if (isScrolling || !scrollTriggerInstance) return;

        const currentProgress = animation.progress();
        let direction = 0;

        // Detect horizontal scroll (shift + wheel or trackpad horizontal)
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          direction = e.deltaX > 0 ? 1 : -1;
        } else {
          // Vertical scroll
          direction = e.deltaY > 0 ? 1 : -1;
        }

        // If at first slide and scrolling backwards, allow native scroll
        if (currentProgress === 0 && direction === -1) {
          return;
        }

        // If at last slide and scrolling forwards, allow native scroll
        if (currentProgress >= 1 && direction === 1) {
          return;
        }

        // Prevent default scroll for slides in between
        e.preventDefault();

        isScrolling = true;

        const newProgress = snapProgress(currentProgress + direction * progressPerItem);

        if (newProgress >= 0 && newProgress <= 1) {
          // Calculate target scroll position
          const scrollDistance = scrollTriggerInstance.end - scrollTriggerInstance.start;
          const targetScroll = scrollTriggerInstance.start + newProgress * scrollDistance;

          // Optimized scroll animation
          gsap.to(window, {
            scrollTo: { y: targetScroll, autoKill: true },
            duration: slideDuration,
            ease: "power2.out",
            overwrite: true,
            onComplete: () => {
              // Small delay before allowing next scroll
              requestAnimationFrame(() => {
                isScrolling = false;
              });
            },
          });
        } else {
          isScrolling = false;
        }
      };

      const container = slidesContainerRef.current;
      if (container) {
        container.addEventListener("wheel", handleWheel, { passive: false });
      }

      // Debounced resize handler
      const resize = debounce(() => {
        slideWidth = slides[0]?.offsetWidth || 0;
        totalWidth = slideWidth * numSlides;

        // Refresh ScrollTrigger on resize
        if (scrollTriggerInstance) {
          scrollTriggerInstance.refresh();
        }
      }, 150);

      resize();
      window.addEventListener("resize", resize);

      // Cleanup
      return () => {
        if (container) {
          container.removeEventListener("wheel", handleWheel);
        }
        window.removeEventListener("resize", resize);
      };
    }, sectionRef);

    return () => {
      // Clean up RAF
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      ctx.revert();
    };
  }, []);

  // Memoize products array to prevent recreation on every render
  const products = useMemo(() => [
    {
      number: t("product.extension.number"),
      title: t("product.extension.title"),
      buttonText: t("product.extension.buttonText"),
      heading: t("product.extension.heading"),
      description: t("product.extension.description"),
      perfectFor: t("product.extension.perfectFor"),
      features: [
        t("product.extension.features.0"),
        t("product.extension.features.1"),
        t("product.extension.features.2"),
      ],
      bgColor: "bg-[#9EC2E7]",
    },
    {
      number: t("product.studio.number"),
      title: t("product.studio.title"),
      buttonText: t("product.studio.buttonText"),
      heading: t("product.studio.heading"),
      description: t("product.studio.description"),
      perfectFor: t("product.studio.perfectFor"),
      features: [
        t("product.studio.features.0"),
        t("product.studio.features.1"),
        t("product.studio.features.2"),
        t("product.studio.features.3"),
      ],
      bgColor: "bg-[#9EC2E7]",
    },
  ], [t]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url('/images/product-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        willChange: "transform", // Hint for GPU acceleration
      }}
    >
      {/* Slides Container */}
      <div
        ref={slidesContainerRef}
        className="relative flex h-full w-full overflow-hidden"
        style={{ willChange: "contents" }}
        suppressHydrationWarning
      >
        <div
          ref={slidesInnerRef}
          className="slides-inner flex h-full w-full"
          style={{
            willChange: "transform",
            transform: "translateZ(0)", // Force GPU layer
          }}
          suppressHydrationWarning
        >
          {/* Slide 1 - Amorfs Extension */}
          <div className="product-slide flex h-full w-full flex-shrink-0 items-center justify-center p-4 sm:p-6 md:p-8" suppressHydrationWarning>
            <div className="flex w-full max-w-[1280px] h-auto shrink-0 items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-[120px] rounded-[40px] border border-white/30 bg-white/[0.03] p-6 sm:p-8 md:p-12 flex-col lg:flex-row backdrop-blur-sm" suppressHydrationWarning>
              {/* Left Side - Preview Box */}
              <div className={`flex w-full lg:w-[596px] lg:h-[430px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[430px] shrink-0 items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/30 ${products[0].bgColor} overflow-hidden`} suppressHydrationWarning>
                <Image
                  src="/images/Still progress.png"
                  alt="Amorfs Extension Preview"
                  width={900}
                  height={640}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Right Side - Content */}
              <div ref={slide1ContentRef} className="flex w-full lg:w-[500px] shrink-0 flex-col gap-4 sm:gap-5 md:gap-6" suppressHydrationWarning>
                {/* Top Section - Badge, Title & Button */}
                <div className="flex flex-col gap-3 sm:gap-4" suppressHydrationWarning>
                  <div className="flex items-center gap-2 sm:gap-3 animate-text" suppressHydrationWarning>
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0E4478]/40" suppressHydrationWarning>
                      <span className="font-['Michroma'] text-[10px] sm:text-xs font-normal leading-[1.4] tracking-[-0.04em] text-white">
                        {products[0].number}
                      </span>
                    </div>
                    <h3 className="font-['Michroma'] text-lg sm:text-xl md:text-2xl font-normal leading-[1.67] tracking-[-0.03em] text-white">
                      {products[0].title}
                    </h3>
                  </div>
                  <button className="w-fit rounded-full bg-white px-4 py-2 sm:px-6 sm:py-2.5 font-['Manrope'] text-xs sm:text-sm font-semibold leading-[1.71] tracking-[-0.02em] text-[#0A2647] transition-all hover:bg-white/90 active:scale-95 animate-text">
                    {products[0].buttonText}
                  </button>
                </div>

                {/* Heading */}
                <h4 className="font-['Manrope'] text-lg sm:text-xl md:text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-white animate-text">
                  {products[0].heading}
                </h4>

                {/* Description */}
                <p className="font-['Manrope'] text-sm sm:text-base font-normal leading-[1.6] tracking-normal text-white/80 animate-text">
                  {products[0].description}
                </p>

                {/* Features Box */}
                <div className="w-full rounded-xl sm:rounded-2xl border border-[#0E4478] bg-[#0A2647]/50 p-4 sm:p-5 animate-text" suppressHydrationWarning>
                  <p className="mb-2 sm:mb-3 font-['Manrope'] text-xs sm:text-sm font-bold leading-[1.5] tracking-normal text-white/90">
                    {products[0].perfectFor}
                  </p>
                  <div className="flex flex-col gap-2 sm:gap-2.5" suppressHydrationWarning>
                    {products[0].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 sm:gap-2.5" suppressHydrationWarning>
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#2DD4C2]" />
                        <span className="font-['Manrope'] text-xs sm:text-sm font-normal leading-[1.5] tracking-normal text-[#2DD4C2]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Amorfs Studio */}
          <div className="product-slide flex h-full w-full flex-shrink-0 items-center justify-center p-4 sm:p-6 md:p-8" suppressHydrationWarning>
            <div className="flex w-full max-w-[1280px] h-auto shrink-0 items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-[120px] rounded-[40px] border border-white/30 bg-white/[0.03] p-6 sm:p-8 md:p-12 flex-col lg:flex-row backdrop-blur-sm" suppressHydrationWarning>
              {/* Left Side - Preview Box */}
              <div className={`flex w-full lg:w-[596px] lg:h-[430px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[430px] shrink-0 items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl ${products[1].bgColor} overflow-hidden`} suppressHydrationWarning>
                <Image
                  src="/images/Studio mockup (900x640).png"
                  alt="Amorfs Studio Preview"
                  width={900}
                  height={640}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Side - Content */}
              <div ref={slide2ContentRef} className="flex w-full lg:w-[500px] shrink-0 flex-col gap-4 sm:gap-5 md:gap-6" suppressHydrationWarning>
                {/* Top Section - Badge, Title & Button */}
                <div className="flex flex-col gap-3 sm:gap-4" suppressHydrationWarning>
                  <div className="flex items-center gap-2 sm:gap-3 animate-text" suppressHydrationWarning>
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0E4478]/40" suppressHydrationWarning>
                      <span className="font-['Michroma'] text-[10px] sm:text-xs font-normal leading-[1.4] tracking-[-0.04em] text-white">
                        {products[1].number}
                      </span>
                    </div>
                    <h3 className="font-['Michroma'] text-lg sm:text-xl md:text-2xl font-normal leading-[1.67] tracking-[-0.03em] text-white">
                      {products[1].title}
                    </h3>
                  </div>
                  <button className="w-fit rounded-full bg-white px-4 py-2 sm:px-6 sm:py-2.5 font-['Manrope'] text-xs sm:text-sm font-semibold leading-[1.71] tracking-[-0.02em] text-[#0A2647] transition-all hover:bg-white/90 active:scale-95 animate-text">
                    {products[1].buttonText}
                  </button>
                </div>

                {/* Heading */}
                <h4 className="font-['Manrope'] text-lg sm:text-xl md:text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-white animate-text">
                  {products[1].heading}
                </h4>

                {/* Description */}
                <p className="font-['Manrope'] text-sm sm:text-base font-normal leading-[1.6] tracking-normal text-white/80 animate-text">
                  {products[1].description}
                </p>

                {/* Features Box */}
                <div className="w-full rounded-xl sm:rounded-2xl border border-[#0E4478] bg-[#0A2647]/50 p-4 sm:p-5 animate-text" suppressHydrationWarning>
                  <p className="mb-2 sm:mb-3 font-['Manrope'] text-xs sm:text-sm font-bold leading-[1.5] tracking-normal text-white/90">
                    {products[1].perfectFor}
                  </p>
                  <div className="flex flex-col gap-2 sm:gap-2.5" suppressHydrationWarning>
                    {products[1].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 sm:gap-2.5" suppressHydrationWarning>
                        <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-[#2DD4C2]" />
                        <span className="font-['Manrope'] text-xs sm:text-sm font-normal leading-[1.5] tracking-normal text-[#2DD4C2]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 - Privacy */}
          <div className="product-slide flex h-full w-full flex-shrink-0 items-center justify-center p-4 sm:p-6 md:p-8" suppressHydrationWarning>
            <div className="relative flex w-full max-w-[1280px] h-auto shrink-0 items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 flex-col lg:flex-row" suppressHydrationWarning>
              {/* Left Side - Heading */}
              <div ref={slide3ContentRef} className="flex w-full lg:w-auto shrink-0 flex-col leading-none lg:self-start lg:pt-8" suppressHydrationWarning>
                <h2 className="font-['Manrope'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-medium leading-[1.1] tracking-[-0.04em] text-white/[0.35] animate-text">
                  {t("product.privacy.title")}
                </h2>
                <h2 className="font-['Manrope'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-medium leading-[1.1] tracking-[-0.04em] text-white animate-text">
                  {t("product.privacy.title2")}
                </h2>
              </div>

              {/* Right Side - Description with Icon */}
              <div className="relative z-10 flex w-full lg:w-[550px] shrink-0 flex-col gap-1" suppressHydrationWarning>
                {/* Shield Icon - Positioned at top right */}
                <div className="flex justify-end mb-4 sm:mb-6 animate-text" suppressHydrationWarning>
                  <div className="flex items-center justify-center rounded-full bg-[#67E4F9]/[0.08] p-4 sm:p-5 md:p-6 rotate-[15deg]" suppressHydrationWarning>
                    <ShieldCheck className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-[70px] lg:w-[70px] text-[#67E4F9]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Description Text */}
                <p className="relative z-10 font-['Manrope'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] font-medium leading-[1.3] tracking-[-0.03em] text-white animate-text">
                  {t("product.privacy.description1")}
                </p>
                <p className="relative z-10 font-['Manrope'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] font-medium leading-[1.3] tracking-[-0.03em] text-white/[0.5] animate-text">
                  {t("product.privacy.description2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

