import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Contact } from "@/components/sections/Contact";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Book — Mobile Detailing in Raleigh & Durham",
  description:
    "Book mobile car detailing in Raleigh & Durham, NC. Reserve online through Square, or call/email Moh's Shine Detailing for a custom quote. We come to you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        eyebrow="Book / Get a quote"
        title="Let's get your car shining"
        intro="Book online in under a minute, or reach out for a custom quote. We serve the entire Raleigh–Durham area and come straight to you."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Contact />
    </>
  );
}
