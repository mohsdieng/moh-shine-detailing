import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import {
  posts,
  getPost,
  relatedPosts,
  readingTime,
  formatDate,
  BLOG_AUTHOR,
} from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/locations/Breadcrumbs";
import { LocalFaq } from "@/components/locations/LocalFaq";
import { LocationCta } from "@/components/locations/LocationCta";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd, breadcrumbSchema, blogPostingSchema } from "@/components/JsonLd";

/* ---------- Static generation -------------------------------------- */

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

/* ---------- Page --------------------------------------------------- */

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const related = relatedPosts(post, 3);
  const mins = readingTime(post);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: BLOG_AUTHOR,
        })}
      />

      {/* Cinematic header */}
      <header className="relative overflow-hidden border-b border-chrome-line bg-navy-950 pt-28 sm:pt-36">
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-950 to-black" />
          <div className="absolute right-[18%] top-[12%] h-[60vh] w-[60vh] rounded-full bg-shine/15 blur-[140px]" />
          <div className="absolute inset-0 bg-shine-grid bg-[size:64px_64px] opacity-25 [mask-image:radial-gradient(ellipse_at_70%_30%,black,transparent_70%)]" />
        </div>
        <Container className="relative pb-14 sm:pb-16">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-widest">
              <span className="border border-shine/40 bg-shine/10 px-2.5 py-1 font-mono text-shine">
                {post.category.name}
              </span>
              <time dateTime={post.datePublished} className="text-chrome">
                {formatDate(post.datePublished)}
              </time>
              <span className="text-chrome/60">·</span>
              <span className="text-chrome">{mins} min read</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tightest text-white sm:text-5xl md:text-[3.5rem]">
              {post.title}
            </h1>
            <div className="mt-7 h-px w-16 bg-shine" aria-hidden="true" />
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-chrome sm:text-lg">
              {post.description}
            </p>
          </Reveal>
        </Container>
      </header>

      {/* Body */}
      <section className="relative bg-black py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <ArticleBody blocks={post.body} />
            </Reveal>

            {/* Related internal links */}
            {post.related && post.related.length > 0 && (
              <Reveal className="mt-12 border-t border-chrome-line pt-8">
                <p className="text-xs uppercase tracking-widest text-chrome/70">Keep reading</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="inline-flex items-center gap-2 border border-chrome-line bg-white/[0.03] px-4 py-2 text-sm text-white/85 transition-colors hover:border-shine hover:text-shine"
                      >
                        {r.label}
                        <span aria-hidden="true" className="text-shine">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Author / trust */}
            <Reveal className="mt-10">
              <AuthorCard />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ (also emits FAQPage schema) */}
      {post.faqs && post.faqs.length > 0 && (
        <LocalFaq
          items={post.faqs}
          heading={
            <>
              Frequently <span className="text-shine italic">asked.</span>
            </>
          }
        />
      )}

      {/* Related posts */}
      {related.length > 0 && (
        <section className="relative border-t border-chrome-line bg-navy-950 py-20 sm:py-28">
          <Container>
            <Reveal className="mb-10">
              <p className="eyebrow mb-5">More guides</p>
              <h2 className="text-balance text-3xl font-bold tracking-tightest text-white sm:text-4xl">
                Keep <span className="text-shine italic">reading.</span>
              </h2>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <PostCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <LocationCta
        heading={
          post.cta ? (
            <>{post.cta.heading}</>
          ) : (
            <>
              Bring the studio to your <span className="text-shine italic">driveway.</span>
            </>
          )
        }
        body={
          post.cta?.body ??
          "Book online in under a minute or send your vehicle details for a tailored quote across the Raleigh–Durham Triangle."
        }
      />
    </>
  );
}
