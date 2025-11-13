import {
  HeroSection,
  ProblemSection,
  SolutionSection,
  ProductSection,
  HowItWorksSection,
  FeaturesSection,
  FutureSection,
  FooterSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FutureSection />
      <FooterSection />
    </main>
  );
}
