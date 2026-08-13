import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import WhoWeAre from "@/components/about/WhoWeAre";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import OurHistory from "@/components/about/OurHistory";
import CTASection from "@/components/home/CTASection";

export default function About() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <WhoWeAre />
      <WhyChooseUs />
      <OurHistory />
      <CTASection />
    </>
  );
}
