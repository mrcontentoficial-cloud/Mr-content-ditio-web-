import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStrip from "@/components/BrandStrip";
import ValueProp from "@/components/ValueProp";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import CaseStudies from "@/components/CaseStudies";
import Pricing from "@/components/Pricing";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <BrandStrip />
      <ValueProp />
      <Stats />
      <Services />
      <CaseStudies />
      <Pricing />
      <Process />
      <Faq />
      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
