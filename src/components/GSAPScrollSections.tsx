"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

interface Section {
  heading: string;
  bgImage: string;
  bgGradient?: string;
}

interface GSAPScrollSectionsProps {
  sections: Section[];
  headerContent?: React.ReactNode;
}

export default function GSAPScrollSections({
  sections,
  headerContent,
}: GSAPScrollSectionsProps) {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const outerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerWrappersRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef<number>(-1);
  const animatingRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register GSAP Observer plugin
    gsap.registerPlugin(Observer);

    // Set initial positions
    gsap.set(outerWrappersRef.current, { yPercent: 100 });
    gsap.set(innerWrappersRef.current, { yPercent: -100 });

    // Helper function to wrap index
    const wrap = (index: number) => {
      if (index >= sections.length) return 0;
      if (index < 0) return sections.length - 1;
      return index;
    };

    // Split heading into characters for animation
    const splitText = (element: HTMLElement) => {
      const text = element.textContent || "";
      element.innerHTML = "";
      
      const chars = text.split("").map((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        return span;
      });
      
      chars.forEach((char) => element.appendChild(char));
      return chars;
    };

    // Split all headings
    const splitHeadings = headingsRef.current.map((heading) => {
      if (heading) return splitText(heading);
      return [];
    });

    // Go to section function
    const gotoSection = (index: number, direction: number) => {
      index = wrap(index);
      animatingRef.current = true;

      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animatingRef.current = false;
        },
      });

      // Animate out current section
      if (currentIndexRef.current >= 0) {
        gsap.set(sectionsRef.current[currentIndexRef.current], { zIndex: 0 });
        tl.to(imagesRef.current[currentIndexRef.current], {
          yPercent: -15 * dFactor,
        }).set(sectionsRef.current[currentIndexRef.current], {
          autoAlpha: 0,
        });
      }

      // Animate in new section
      gsap.set(sectionsRef.current[index], { autoAlpha: 1, zIndex: 1 });
      
      tl.fromTo(
        [outerWrappersRef.current[index], innerWrappersRef.current[index]],
        {
          yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor),
        },
        {
          yPercent: 0,
        },
        0
      )
        .fromTo(
          imagesRef.current[index],
          { yPercent: 15 * dFactor },
          { yPercent: 0 },
          0
        )
        .fromTo(
          splitHeadings[index],
          {
            autoAlpha: 0,
            yPercent: 150 * dFactor,
          },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );

      currentIndexRef.current = index;
    };

    // Create Observer
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current - 1, -1),
      onUp: () =>
        !animatingRef.current && gotoSection(currentIndexRef.current + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    // Initialize first section
    gotoSection(0, 1);

    // Cleanup
    return () => {
      observer.kill();
    };
  }, [sections]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Header */}
      {headerContent && (
        <header className="fixed left-0 right-0 top-0 z-[3] flex h-28 items-center justify-between px-[5%] text-white">
          {headerContent}
        </header>
      )}

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={index}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          className="fixed left-0 top-0 h-full w-full"
          style={{ visibility: "hidden" }}
        >
          <div
            ref={(el) => {
              outerWrappersRef.current[index] = el;
            }}
            className="outer h-full w-full overflow-y-hidden"
          >
            <div
              ref={(el) => {
                innerWrappersRef.current[index] = el;
              }}
              className="inner h-full w-full overflow-y-hidden"
            >
              <div
                ref={(el) => {
                  imagesRef.current[index] = el;
                }}
                className="bg absolute left-0 top-0 flex h-full w-full items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `${section.bgGradient || "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%)"}, url(${section.bgImage})`,
                }}
              >
                <h2
                  ref={(el) => {
                    headingsRef.current[index] = el;
                  }}
                  className="z-[999] mx-auto w-[90vw] max-w-[1200px] text-center text-[clamp(1rem,8vw,10rem)] font-semibold text-white"
                  style={{ marginRight: "-0.5em" }}
                >
                  {section.heading}
                </h2>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}


