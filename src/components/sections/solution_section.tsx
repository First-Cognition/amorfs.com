// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";
// import ScrollReveal from "@/components/ScrollReveal";

// export default function SolutionSection() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);
//   const decorationRef = useRef<HTMLDivElement>(null);
//   const initialTextRef = useRef<HTMLDivElement>(null);
//   const optionsTextRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Register GSAP plugin only on client side
//     gsap.registerPlugin(ScrollTrigger);
    
//     if (!sectionRef.current) return;

//     const ctx = gsap.context(() => {
//       // Animate title fade in
//       if (contentRef.current) {
//         gsap.from(contentRef.current, {
//           scrollTrigger: {
//             trigger: contentRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse",
//           },
//           y: 60,
//           opacity: 0,
//           duration: 1,
//           ease: "power3.out",
//         });
//       }

//       // Pin section and text swap animation: Initial -> Options
//       if (initialTextRef.current && optionsTextRef.current && sectionRef.current) {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top top",
//             end: "+=200%", // Pin for 200% of viewport height (lâu hơn)
//             scrub: 1,
//             pin: true, // Pin the section during animation
//             anticipatePin: 1,
//           },
//         });

//         // Fade out initial text
//         tl.to(initialTextRef.current, {
//           opacity: 0,
//           y: -30,
//           duration: 0.4,
//         })
//         // Fade in options text
//         .fromTo(
//           optionsTextRef.current,
//           {
//             opacity: 0,
//             y: 30,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//           },
//           "-=0.2"
//         );
//       }

//       // Animate decoration with stronger parallax and rotation
//       if (decorationRef.current) {
//         gsap.fromTo(
//           decorationRef.current,
//           {
//             y: 100,
//             rotation: -15,
//             scale: 0.8,
//             opacity: 0.3,
//           },
//           {
//             scrollTrigger: {
//               trigger: sectionRef.current,
//               start: "top bottom",
//               end: "bottom top",
//               scrub: 1.5,
//             },
//             y: -100,
//             rotation: 15,
//             scale: 1.2,
//             opacity: 1,
//             ease: "none",
//           }
//         );
//       }
//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-screen w-full overflow-hidden"
//     >
//       {/* Background Image - Full Screen */}
//       <div className="absolute inset-0">
//         <Image
//           src="/images/solution-section-bg.png"
//           alt="Solution Background"
//           fill
//           className="object-cover"
//           priority
//         />
//       </div>

//       {/* Content Container */}
//       <div className="relative flex h-full flex-col items-stretch">
//         {/* Main Content */}
//         <div className="flex flex-1 flex-col items-center justify-center px-10 py-[200px]">
//           <div className="flex w-full max-w-[800px] flex-col items-center gap-[120px] px-20">
//             <div className="flex w-full flex-col items-center justify-center gap-8">
//               {/* Small Title */}
//               <h2
//                 ref={contentRef}
//                 className="w-full text-center font-michroma text-xl leading-[1.4em] tracking-[-0.04em] text-[#2DD4C2] [text-shadow:0px_4px_4px_rgba(0,0,0,0.05)]"
//               >
//                 Amorfs Solution
//               </h2>

//               {/* Main Content Group - with text swap */}
//               <div className="relative flex w-full flex-col items-center gap-4 self-stretch">
//                 {/* Initial Text - Will fade out on scroll */}
//                 <div
//                   ref={initialTextRef}
//                   className="absolute inset-0 flex flex-col items-center gap-4"
//                 >
//                   {/* Main Heading */}
//                   <div className="flex flex-col items-center gap-3">
//                     <ScrollReveal
//                       containerClassName="my-0"
//                       textClassName="text-center font-manrope text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88"
//                     >
//                       Capture Once, Use Everywhere
//                     </ScrollReveal>
//                   </div>

//                   {/* Subtitle */}
//                   <div className="flex items-center justify-center gap-2 p-2">
//                     <p className="text-center font-manrope text-lg font-normal leading-[1.5em] tracking-[-0.03em] text-white/55">
//                       We're solving data from the ground up.
//                       <br />
//                       No more endless retyping. No more scattered information.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Options Text - Will fade in on scroll */}
//                 <div
//                   ref={optionsTextRef}
//                   className="flex flex-col items-center gap-4 opacity-0"
//                 >
//                   {/* Browser Extension & Data Studio Options */}
//                   <div className="flex flex-col items-center gap-4 self-stretch">
//                     {/* Browser Extension */}
//                     <div className="flex flex-row items-center gap-3">
//                       <h1 className="text-center font-manrope text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88">
//                         <span className="text-white/60">{`{ `}</span>
//                         Browser Extension
//                         <span className="text-white/60">{` }`}</span>
//                       </h1>
//                     </div>

//                     {/* Data Studio */}
//                     <div className="flex flex-row items-center gap-3">
//                       <h1 className="text-center font-manrope text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88">
//                         <span className="text-white/60">{`{ `}</span>
//                         Data Studio
//                         <span className="text-white/60">{` }`}</span>
//                       </h1>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Spacer to maintain layout height */}
//                 <div className="invisible flex flex-col items-center gap-3">
//                   <h1 className="text-center font-manrope text-[44px] font-medium leading-[1.3em] tracking-[-0.04em] text-white/88">
//                     Capture Once, <br />
//                     Use Everywhere
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Decorative SVG */}
//         <div
//           ref={decorationRef}
//           className="pointer-events-none absolute left-[356px] top-[264px] h-[228px] w-[722px] rounded-[100px]"
//         >
//           <Image
//             src="/images/solution-decoration.svg"
//             alt="Decoration"
//             fill
//             className="object-contain"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
