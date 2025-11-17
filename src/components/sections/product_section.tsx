"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProductSection() {
  const t = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const slidesInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const draggableRef = useRef<Draggable[] | null>(null);

  useEffect(() => {
    gsap.registerPlugin(Draggable);

    if (!slidesContainerRef.current || !slidesInnerRef.current) return;

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

    // Create animation
    const animation = gsap.to(slides, {
      xPercent: -((numSlides - 1) * 100),
      ease: "none",
      paused: true,
      duration: 1,
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

    // Handle wheel/scroll event
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      const currentProgress = animation.progress();
      let direction = 0;
      
      // Detect horizontal scroll (shift + wheel or trackpad horizontal)
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        direction = e.deltaX > 0 ? 1 : -1;
      } else {
        // Vertical scroll
        direction = e.deltaY > 0 ? 1 : -1;
      }
      
      // Allow native scroll at edges
      // If at first slide and scrolling backwards, allow native scroll
      if (currentProgress === 0 && direction === -1) {
        return;
      }
      
      // If at last slide and scrolling forwards, allow native scroll
      if (currentProgress === 1 && direction === 1) {
        return;
      }
      
      // Prevent default scroll for slides in between
      e.preventDefault();
      
      isScrolling = true;
      
      const newProgress = snapProgress(currentProgress + direction * progressPerItem);
      
      if (newProgress >= 0 && newProgress <= 1) {
        gsap.to(animation, {
          progress: newProgress,
          duration: slideDuration,
          ease: "power2.out",
          overwrite: true,
          onComplete: () => {
            setTimeout(() => {
              isScrolling = false;
            }, 300);
          },
        });
      } else {
        isScrolling = false;
      }
    };

    const container = slidesContainerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });

    const resize = () => {
      slideWidth = slides[0]?.offsetWidth || 0;
      totalWidth = slideWidth * numSlides;
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("wheel", handleWheel);
      animation.kill();
      if (draggable && draggable.length > 0) {
        draggable[0].kill();
      }
    };
  }, []);

  const products = [
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
  ];

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full overflow-hidden"
      style={{
        backgroundImage: "url('/images/product-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Slides Container */}
      <div
        ref={slidesContainerRef}
        className="relative flex h-full w-full overflow-hidden"
        suppressHydrationWarning
      >
        <div ref={slidesInnerRef} className="slides-inner flex h-full w-full" suppressHydrationWarning>
          {/* Slide 1 - Amorfs Extension */}
          <div className="product-slide flex h-full w-full flex-shrink-0 items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-[120px] px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 flex-col lg:flex-row" suppressHydrationWarning>
            {/* Left Side - Preview Box */}
            <div className={`flex w-full lg:w-[596px] lg:h-[430px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[430px] shrink-0 items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/30 ${products[0].bgColor} p-3 sm:p-4 md:p-5`} suppressHydrationWarning>
              {/* Placeholder for preview */}
            </div>

            {/* Right Side - Content */}
            <div className="flex w-full lg:w-[500px] shrink-0 flex-col gap-4 sm:gap-5 md:gap-6" suppressHydrationWarning>
              {/* Top Section - Badge, Title & Button */}
              <div className="flex flex-col gap-3 sm:gap-4" suppressHydrationWarning>
                <div className="flex items-center gap-2 sm:gap-3" suppressHydrationWarning>
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0E4478]/40" suppressHydrationWarning>
                    <span className="font-['Michroma'] text-[10px] sm:text-xs font-normal leading-[1.4] tracking-[-0.04em] text-white">
                      {products[0].number}
                    </span>
                  </div>
                  <h3 className="font-['Michroma'] text-lg sm:text-xl md:text-2xl font-normal leading-[1.67] tracking-[-0.03em] text-white">
                    {products[0].title}
                  </h3>
                </div>
                <button className="w-fit rounded-full bg-white px-4 py-2 sm:px-6 sm:py-2.5 font-['Manrope'] text-xs sm:text-sm font-semibold leading-[1.71] tracking-[-0.02em] text-[#0A2647] transition-all hover:bg-white/90 active:scale-95">
                  {products[0].buttonText}
                </button>
              </div>

              {/* Heading */}
              <h4 className="font-['Manrope'] text-lg sm:text-xl md:text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-white">
                {products[0].heading}
              </h4>

              {/* Description */}
              <p className="font-['Manrope'] text-sm sm:text-base font-normal leading-[1.6] tracking-normal text-white/80">
                {products[0].description}
              </p>

              {/* Features Box */}
              <div className="w-full rounded-xl sm:rounded-2xl border border-[#0E4478] bg-[#0A2647]/50 p-4 sm:p-5" suppressHydrationWarning>
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

          {/* Slide 2 - Amorfs Studio */}
          <div className="product-slide flex h-full w-full flex-shrink-0 items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-[120px] px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 flex-col lg:flex-row" suppressHydrationWarning>
            {/* Left Side - Preview Box */}
            <div className={`flex w-full lg:w-[596px] lg:h-[430px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[430px] shrink-0 items-center justify-center rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/30 ${products[1].bgColor} p-3 sm:p-4 md:p-5`} suppressHydrationWarning>
              {/* Placeholder for preview */}
            </div>

            {/* Right Side - Content */}
            <div className="flex w-full lg:w-[500px] shrink-0 flex-col gap-4 sm:gap-5 md:gap-6" suppressHydrationWarning>
              {/* Top Section - Badge, Title & Button */}
              <div className="flex flex-col gap-3 sm:gap-4" suppressHydrationWarning>
                <div className="flex items-center gap-2 sm:gap-3" suppressHydrationWarning>
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#0E4478]/40" suppressHydrationWarning>
                    <span className="font-['Michroma'] text-[10px] sm:text-xs font-normal leading-[1.4] tracking-[-0.04em] text-white">
                      {products[1].number}
                    </span>
                  </div>
                  <h3 className="font-['Michroma'] text-lg sm:text-xl md:text-2xl font-normal leading-[1.67] tracking-[-0.03em] text-white">
                    {products[1].title}
                  </h3>
                </div>
                <button className="w-fit rounded-full bg-white px-4 py-2 sm:px-6 sm:py-2.5 font-['Manrope'] text-xs sm:text-sm font-semibold leading-[1.71] tracking-[-0.02em] text-[#0A2647] transition-all hover:bg-white/90 active:scale-95">
                  {products[1].buttonText}
                </button>
              </div>

              {/* Heading */}
              <h4 className="font-['Manrope'] text-lg sm:text-xl md:text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-white">
                {products[1].heading}
              </h4>

              {/* Description */}
              <p className="font-['Manrope'] text-sm sm:text-base font-normal leading-[1.6] tracking-normal text-white/80">
                {products[1].description}
              </p>

              {/* Features Box */}
              <div className="w-full rounded-xl sm:rounded-2xl border border-[#0E4478] bg-[#0A2647]/50 p-4 sm:p-5" suppressHydrationWarning>
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

          {/* Slide 3 - Privacy */}
          <div className="product-slide relative flex h-full w-full flex-shrink-0 items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-[120px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-[200px] py-6 sm:py-8 md:py-10 flex-col lg:flex-row" suppressHydrationWarning>
            {/* Left Side - Heading */}
            <div className="flex w-full lg:w-[400px] shrink-0 flex-col leading-none self-start pt-0 sm:pt-8 md:pt-12 lg:pt-[150px]" suppressHydrationWarning>
              <h2 className="font-['Manrope'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-medium leading-[1.1] tracking-[-0.04em] text-white/[0.35]">
                {t("product.privacy.title")}
              </h2>
              <h2 className="font-['Manrope'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-medium leading-[1.1] tracking-[-0.04em] text-white">
                {t("product.privacy.title2")}
              </h2>
            </div>

            {/* Right Side - Description with Icon */}
            <div className="relative z-10 flex w-full lg:w-[600px] shrink-0 flex-col gap-1 self-end pb-0 sm:pb-8 md:pb-12 lg:pb-[150px]" suppressHydrationWarning>
              {/* Shield Icon - Absolute positioned with lower z-index and rotated */}
              <div className="absolute -right-4 sm:-right-8 md:-right-[50px] -top-8 sm:-top-12 md:-top-[60px] z-0 flex items-center justify-center rounded-full bg-[#67E4F9]/[0.08] p-4 sm:p-6 md:p-8 lg:p-10 rotate-[15deg]" suppressHydrationWarning>
                <ShieldCheck className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-[90px] lg:w-[90px] text-[#67E4F9]" strokeWidth={1.5} />
              </div>

              {/* Description Text */}
              <p className="relative z-10 font-['Manrope'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] font-medium leading-[1.3] tracking-[-0.03em] text-white">
                {t("product.privacy.description1")}
              </p>
              <p className="relative z-10 font-['Manrope'] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[34px] font-medium leading-[1.3] tracking-[-0.03em] text-white/[0.5]">
                {t("product.privacy.description2")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

