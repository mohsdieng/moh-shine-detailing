import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Gallery } from "@/components/sections/Gallery";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <HowItWorks />
      <Gallery />
      <ServiceArea />
      <Testimonials />
      <Contact />
    </>
  );
}
