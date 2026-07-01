import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { allPosts, featuredPost, blogCategories } from "@/lib/blog";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { BookButton } from "@/components/ui/BookButton";
import { Breadcrumbs } from "@/components/locations/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Detailing Tips & Car Care Guides | Raleigh Auto Detailing Blog",
  description:
    "Practical car care guides from Moh's Shine Detailing — detailing costs, ceramic coating, paint correction, interior care and maintenance advice for Raleigh-area drivers.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const featured = featuredPost();
  const posts = allPosts();
  const rest = posts.filter((p) => p.slug !== featured.slug);
  const categories = Object.values(blogCategories);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  // Blog (ItemList) + breadcrumb structured data for the index.
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog`,
    name: `${site.name} Blog`,
    description:
      "Car care guides and detailing advice for Raleigh-area drivers.",
    url: `${site.url}/blog`,
    publisher: { "@id": `${site.url}/#business` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${site.url}/blog/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified ?? p.datePublished,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={blogSchema} />

      {/* Cinematic header */}
      <header className="relative overflow-hidden border-b border-chrome-line bg-navy-950 pt-28 sm:pt-36">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-950 to-black" />
          <div className="absolute right-[20%] top-[10%] h-[60vh] w-[60vh] rounded-full bg-shine/15 blur-[140px]" />
          <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
        </div>
        <Container className="relative pb-16 sm:pb-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-shine" />
              The Journal
            </p>
            <h1 className="max-w-4xl text-balance text-5xl font-bold leading-[0.98] tracking-tightest text-white sm:text-6xl md:text-[4.5rem]">
              Car care, <span className="text-shine italic">explained.</span>
            </h1>
            <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              Honest, practical guides on detailing, ceramic coating, paint
              correction and keeping a car looking its best in the NC Triangle.
            </p>
          </Reveal>
        </Container>
      </header>

      {/* Featured */}
      <Section>
        <Reveal className="mb-10 flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-shine">Featured</span>
          <span className="h-px flex-1 bg-chrome-line" aria-hidden="true" />
        </Reveal>
        <Reveal>
          <PostCard post={featured} featured />
        </Reveal>

        {/* Category facets */}
        <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs uppercase tracking-widest text-chrome/70">Topics:</span>
          {categories.map((c) => (
            <span
              key={c.slug}
              className="border border-chrome-line bg-white/[0.03] px-3 py-1.5 text-xs text-white/85"
            >
              {c.name}
            </span>
          ))}
        </Reveal>

        {/* All articles */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative border-t border-chrome-line bg-black py-20 sm:py-28">
        <Container>
          <Reveal className="overflow-hidden border border-chrome-line bg-gradient-to-br from-shine/15 to-navy-950 p-10 text-center sm:p-16">
            <p className="eyebrow mb-5">Ready when you are</p>
            <h2 className="text-balance text-4xl font-bold tracking-tightest text-white sm:text-5xl">
              Skip the reading — <span className="text-shine italic">book a detail.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              We bring the full studio to your driveway across Raleigh and the
              Triangle. Tell us your vehicle and we&apos;ll send a quote.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BookButton size="lg">Book Now</BookButton>
              <Button href="/contact" variant="secondary" size="lg">
                Get a Quote
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
