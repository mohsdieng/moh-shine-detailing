import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";

// Self-hosted Poppins via next/font (no layout shift, font-display: swap).
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Mobile Car Detailing in Raleigh & Durham, NC | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "mobile car detailing",
    "car detailing Raleigh",
    "car detailing Durham",
    "auto detailing NC",
    "paint correction Raleigh",
    "interior detailing Durham",
    "mobile detailing Triangle NC",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `Mobile Car Detailing in Raleigh & Durham, NC | ${site.name}`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Mobile Car Detailing in Raleigh & Durham, NC | ${site.name}`,
    description: site.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen bg-black font-sans text-white antialiased">
        <JsonLd data={localBusinessSchema()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-shine focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
