import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../Reveal";
import { readingTime, type BlogPost } from "@/lib/blog";

type FromTheBlogProps = {
  posts: BlogPost[];
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  /** Modest section heading. Kept low-key so it never competes with the CTA. */
  heading?: string;
};

/**
 * Compact "From the journal" backlink strip for the money pages.
 *
 * Deliberately subdued — an image-less hairline list (zero LCP/CLS impact),
 * always placed BEFORE the page's primary CTA so the Book/Quote action stays
 * the strongest, last element. Renders nothing when there are no posts.
 * Server component — no client JS.
 */
export function FromTheBlog({
  posts,
  eyebrow = "From the journal",
  heading = "Helpful reading before you book",
}: FromTheBlogProps) {
  if (!posts.length) return null;

  return (
    <section className="relative border-t border-chrome-line bg-black py-16 sm:py-20">
      <Container>
        <Reveal>
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {heading}
          </h2>

          <ul className="mt-8 divide-y divide-chrome-line border-y border-chrome-line">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-center justify-between gap-6 py-5 transition-colors"
                >
                  <span className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-shine/70">
                      {p.category.name}
                    </span>
                    <span className="mt-1 block truncate text-base font-semibold tracking-tight text-white transition-colors group-hover:text-shine sm:text-lg">
                      {p.title}
                    </span>
                  </span>
                  <span className="hidden flex-shrink-0 text-xs uppercase tracking-widest text-chrome/60 sm:block">
                    {readingTime(p)} min
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 text-shine transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
