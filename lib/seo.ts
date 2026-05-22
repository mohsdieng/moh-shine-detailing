import type { Metadata } from "next";
import { site } from "./site";

type PageSeo = {
  title: string;
  description: string;
  /** Route path beginning with "/", used for canonical + OG url. */
  path: string;
};

/**
 * Builds a consistent Metadata object per page: title, description, canonical,
 * Open Graph and Twitter cards. metadataBase is set in the root layout.
 */
export function buildMetadata({ title, description, path }: PageSeo): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      locale: "en_US",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
