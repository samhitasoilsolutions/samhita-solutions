import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import PMPranamSection from "@/components/home/PMPranamSection";
import CultivationSection from "@/components/home/CultivationSection";

import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import FounderSection from "@/components/home/FounderSection";
import CTASection from "@/components/home/CTASection";

export default function Index() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <SustainabilitySection />
      <PMPranamSection />
      <CultivationSection />
      <WhyChooseUsSection />
      <FounderSection />
      <CTASection />
    </>
  );
}
