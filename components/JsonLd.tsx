import { site } from "@/lib/site";

/**
 * Injects a JSON-LD <script> block. Next.js recommends rendering structured
 * data with a plain script tag using dangerouslySetInnerHTML.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is static & trusted (built from site config), not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness (AutoDetailing) schema describing the whole business. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
    priceRange: site.priceRange,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card",
    areaServed: site.areaServed.map((name) => ({
      "@type": "City",
      name: name.replace(/, NC$/, ""),
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Raleigh",
      addressRegion: "NC",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    openingHoursSpecification: site.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days,
      opens: spec.opens,
      closes: spec.closes,
    })),
    sameAs: [site.social.instagram, site.social.tiktok],
  };
}

/** BreadcrumbList schema for a route page. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/** Service schema for an individual offering. */
export function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    description,
    provider: { "@id": `${site.url}/#business` },
    areaServed: site.areaServed.map((a) => a.replace(/, NC$/, "")),
  };
}
