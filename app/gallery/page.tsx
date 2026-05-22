import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Gallery } from "@/components/sections/Gallery";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "Detailing Gallery — Before & After in Raleigh & Durham",
  description:
    "Before-and-after results from Moh's Shine Detailing. See the difference a professional hand detail makes on cars, SUVs and trucks across the NC Triangle.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <PageHeader
        eyebrow="The results"
        title="Before & after gallery"
        intro="A look at recent transformations from driveways around Raleigh and Durham. Real results, all detailed by hand."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />
      <Gallery />
    </>
  );
}
