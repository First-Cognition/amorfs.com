import {
  HeroSection,
  ProblemProductWrapper,
  UnifiedScrollSection,
} from "@/components/sections";
import Header from "@/components/layout/Header";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden scroll-snap-type-y scroll-snap-mandatory">
      {/* Global Header */}
      <div className="fixed left-0 right-0 top-0 z-50">
        <Header />
      </div>

      <HeroSection />
      <ProblemProductWrapper />
      <UnifiedScrollSection />
    </main>
  );
}
