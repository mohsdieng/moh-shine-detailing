import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { PackagesTeaser } from "@/components/sections/PackagesTeaser";
import { Contact } from "@/components/sections/Contact";

/**
 * Homepage — luxury automotive launch page narrative.
 *
 * Order mirrors a Mercedes/Audi launch page:
 *   Hero  →  Service features  →  Gallery  →  Reviews  →  Packages  →  Contact
 *
 * Secondary sections (How it works, Why us, Service area, FAQ) live on their
 * own routes for SEO. The home stays focused and editorial.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <PackagesTeaser />
      <Contact />
    </>
  );
}
