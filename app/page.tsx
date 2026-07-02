import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Reviews from "@/components/Reviews";
import Coverage from "@/components/Coverage";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <TrustStrip />
        <Services />
        <WhyUs />
        <Process />
        <Pricing />
        <Reviews />
        <Coverage />
      </main>
      <Footer />
    </>
  );
}
