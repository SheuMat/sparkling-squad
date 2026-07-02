import HeroSlider from "@/components/HeroSlider";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Coverage from "@/components/Coverage";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { faqs } from "@/lib/faqs";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustStrip />
      <Services />
      <WhyUs />
      <Process />
      <Pricing />
      <Reviews />
      <Coverage />
      <FAQ items={faqs.slice(0, 6)} />
      <CTASection />
    </>
  );
}
