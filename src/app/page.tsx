import {
  HeroSection,
  ProblemProductWrapper,
  UnifiedScrollSection,
} from "@/components/sections";
import Header from "@/components/layout/Header";
import ClientLayout from "@/components/layout/ClientLayout";

export default function Home() {
  return (
    <ClientLayout>
      <main className="relative w-full overflow-x-hidden scroll-snap-type-y scroll-snap-mandatory">
        {/* Global Header - z-[100] ensures it stays above GSAP pinned sections */}
        <div className="fixed left-0 right-0 top-0 z-[100]">
          <Header />
        </div>

        <HeroSection />
        <ProblemProductWrapper />
        <UnifiedScrollSection />
      </main>
    </ClientLayout>
  );
}
