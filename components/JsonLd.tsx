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

/**
 * Service schema for an individual offering.
 *
 * Pass `opts.areaServed` to scope the service to a single city (used by the
 * /locations/[city]/[service] pages); omit it to default to the full service
 * area. Pass `opts.url` to add the canonical page URL + a name.
 */
export function serviceSchema(
  name: string,
  description: string,
  opts: { areaServed?: string; url?: string } = {},
) {
  const areaServed = opts.areaServed
    ? [{ "@type": "City", name: opts.areaServed }]
    : site.areaServed.map((a) => ({ "@type": "City", name: a.replace(/, NC$/, "") }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    ...(opts.url ? { name, url: opts.url } : {}),
    description,
    provider: { "@id": `${site.url}/#business` },
    areaServed,
  };
}

/**
 * FAQPage schema from a list of question/answer pairs. Reused by the global
 * FAQ section and every local landing page so Google can surface rich results.
 */
export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BlogPosting schema for an individual article. */
export function blogPostingSchema(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const url = `${site.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: opts.image ?? `${site.url}/og.png`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Organization", name: opts.author ?? site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/logo.png` },
    },
  };
}
