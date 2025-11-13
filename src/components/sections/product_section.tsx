"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function ProductSection() {
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
      number: "1",
      title: "Amorfs Extension",
      buttonText: "Install Extension",
      heading: "Never Retype the Same Thing Twice",
      description:
        "The extension watches as you fill out forms and automatically captures your data - names, addresses, preferences, any details you enter. Next time it's right there, ready to reuse with a click.",
      features: [
        "Tired of repetitive form-filling",
        "Executive assistants managing information for others",
        "Who value their time and privacy",
      ],
      bgColor: "bg-[#9EC2E7]",
    },
    {
      number: "2",
      title: "Amorfs Studio",
      buttonText: "Open Studio",
      heading: "Curate. Design. Share.",
      description:
        "Transform your data into something beautiful. Amorfs Studio lets you personalize and curate your information, then bring it to life with stunning layout templates from our library or create your own.",
      features: [
        "Catalog treasures with style",
        "craft beautiful data presentations",
        "Organize and showcase any collection",
        "Create templates others can use",
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
      >
        <div ref={slidesInnerRef} className="slides-inner flex h-full w-full">
          {/* Slide 1 - Amorfs Extension */}
          <div className="product-slide flex h-full w-full flex-shrink-0 items-center justify-center gap-[120px] px-10 py-6">
            {/* Left Side - Preview Box */}
            <div className={`flex h-[430px] w-[596px] shrink-0 items-center justify-center rounded-3xl border border-white/30 ${products[0].bgColor} p-5`}>
              {/* Placeholder for preview */}
            </div>

            {/* Right Side - Content */}
            <div className="flex w-[500px] shrink-0 flex-col gap-6">
              {/* Top Section - Badge, Title & Button */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E4478]/40">
                    <span className="font-['Michroma'] text-xs font-normal leading-[1.4] tracking-[-0.04em] text-white">
                      {products[0].number}
                    </span>
                  </div>
                  <h3 className="font-['Michroma'] text-2xl font-normal leading-[1.67] tracking-[-0.03em] text-white">
                    {products[0].title}
                  </h3>
                </div>
                <button className="w-fit rounded-full bg-white px-6 py-2.5 font-['Manrope'] text-sm font-semibold leading-[1.71] tracking-[-0.02em] text-[#0A2647] transition-all hover:bg-white/90">
                  {products[0].buttonText}
                </button>
              </div>

              {/* Heading */}
              <h4 className="font-['Manrope'] text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-white">
                {products[0].heading}
              </h4>

              {/* Description */}
              <p className="font-['Manrope'] text-base font-normal leading-[1.6] tracking-normal text-white/80">
                {products[0].description}
              </p>

              {/* Features Box */}
              <div className="w-full rounded-2xl border border-[#0E4478] bg-[#0A2647]/50 p-5">
                <p className="mb-3 font-['Manrope'] text-sm font-bold leading-[1.5] tracking-normal text-white/90">
                  Perfect for ones:
                </p>
                <div className="flex flex-col gap-2.5">
                  {products[0].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2DD4C2]" />
                      <span className="font-['Manrope'] text-sm font-normal leading-[1.5] tracking-normal text-[#2DD4C2]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 - Amorfs Studio */}
          <div className="product-slide flex h-full w-full flex-shrink-0 items-center justify-center gap-[120px] px-10 py-6">
            {/* Left Side - Preview Box */}
            <div className={`flex h-[430px] w-[596px] shrink-0 items-center justify-center rounded-3xl border border-white/30 ${products[1].bgColor} p-5`}>
              {/* Placeholder for preview */}
            </div>

            {/* Right Side - Content */}
            <div className="flex w-[500px] shrink-0 flex-col gap-6">
              {/* Top Section - Badge, Title & Button */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E4478]/40">
                    <span className="font-['Michroma'] text-xs font-normal leading-[1.4] tracking-[-0.04em] text-white">
                      {products[1].number}
                    </span>
                  </div>
                  <h3 className="font-['Michroma'] text-2xl font-normal leading-[1.67] tracking-[-0.03em] text-white">
                    {products[1].title}
                  </h3>
                </div>
                <button className="w-fit rounded-full bg-white px-6 py-2.5 font-['Manrope'] text-sm font-semibold leading-[1.71] tracking-[-0.02em] text-[#0A2647] transition-all hover:bg-white/90">
                  {products[1].buttonText}
                </button>
              </div>

              {/* Heading */}
              <h4 className="font-['Manrope'] text-2xl font-semibold leading-[1.3] tracking-[-0.02em] text-white">
                {products[1].heading}
              </h4>

              {/* Description */}
              <p className="font-['Manrope'] text-base font-normal leading-[1.6] tracking-normal text-white/80">
                {products[1].description}
              </p>

              {/* Features Box */}
              <div className="w-full rounded-2xl border border-[#0E4478] bg-[#0A2647]/50 p-5">
                <p className="mb-3 font-['Manrope'] text-sm font-bold leading-[1.5] tracking-normal text-white/90">
                  Perfect for ones:
                </p>
                <div className="flex flex-col gap-2.5">
                  {products[1].features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#2DD4C2]" />
                      <span className="font-['Manrope'] text-sm font-normal leading-[1.5] tracking-normal text-[#2DD4C2]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 - Privacy */}
          <div className="product-slide relative flex h-full w-full flex-shrink-0 items-center justify-center gap-[120px] px-[200px] py-10">
            {/* Left Side - Heading */}
            <div className="flex w-[400px] shrink-0 flex-col leading-none self-start pt-[150px]">
              <h2 className="font-['Manrope'] text-[72px] font-medium leading-[1.1] tracking-[-0.04em] text-white/[0.35]">
                Your Privacy
              </h2>
              <h2 className="font-['Manrope'] text-[72px] font-medium leading-[1.1] tracking-[-0.04em] text-white">
                Guaranteed
              </h2>
            </div>

            {/* Right Side - Description with Icon */}
            <div className="relative z-10 flex w-[600px] shrink-0 flex-col gap-1 self-end pb-[150px]">
              {/* Shield Icon - Absolute positioned with lower z-index and rotated */}
              <div className="absolute -right-[50px] -top-[60px] z-0 flex items-center justify-center rounded-full bg-[#67E4F9]/[0.08] p-10 rotate-[15deg]">
                <ShieldCheck className="h-[90px] w-[90px] text-[#67E4F9]" strokeWidth={1.5} />
              </div>

              {/* Description Text */}
              <p className="relative z-10 font-['Manrope'] text-[34px] font-medium leading-[1.3] tracking-[-0.03em] text-white">
                Our zero-knowledge
              </p>
              <p className="relative z-10 font-['Manrope'] text-[34px] font-medium leading-[1.3] tracking-[-0.03em] text-white/[0.5]">
                architecture means we never see your unencrypted data. You&apos;re in complete control.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

