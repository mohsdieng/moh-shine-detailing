import Link from "next/link";
import type { Block, RichText } from "@/lib/blog";

/** Slugify an H2 string into a stable anchor id. */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Render RichText segments — strings plus inline internal/external links. */
function Rich({ text }: { text: RichText }) {
  return (
    <>
      {text.map((seg, i) => {
        if (typeof seg === "string") return <span key={i}>{seg}</span>;
        const internal = seg.href.startsWith("/");
        const className =
          "font-medium text-shine underline decoration-shine/30 underline-offset-4 transition-colors hover:decoration-shine";
        return internal ? (
          <Link key={i} href={seg.href} className={className}>
            {seg.text}
          </Link>
        ) : (
          <a key={i} href={seg.href} target="_blank" rel="noopener noreferrer" className={className}>
            {seg.text}
          </a>
        );
      })}
    </>
  );
}

/**
 * Renders an article's typed block array as premium, accessible prose.
 * Server component — no client JS, keeping articles light and SSG-friendly.
 */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={i} className="text-lg font-light leading-relaxed text-white sm:text-xl">
                <Rich text={block.text} />
              </p>
            );
          case "p":
            return (
              <p key={i} className="text-base leading-relaxed text-chrome sm:text-[1.0625rem]">
                <Rich text={block.text} />
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                id={slugifyHeading(block.text)}
                className="scroll-mt-28 pt-6 text-2xl font-bold tracking-tightest text-white sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-4 text-xl font-semibold tracking-tight text-white">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="divide-y divide-chrome-line border-y border-chrome-line">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 py-3 text-base leading-relaxed text-chrome">
                    <span className="mt-2.5 h-px w-4 flex-shrink-0 bg-shine" aria-hidden="true" />
                    <span>
                      <Rich text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-4 text-base leading-relaxed text-chrome">
                    <span className="mt-0.5 font-mono text-sm font-bold text-shine">
                      {String(j + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <Rich text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside
                key={i}
                className="border-l-2 border-shine bg-gradient-to-br from-shine/10 to-transparent p-6"
              >
                {block.title && (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-shine">
                    {block.title}
                  </p>
                )}
                <p className="text-base leading-relaxed text-white/90">
                  <Rich text={block.text} />
                </p>
              </aside>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-chrome-line pl-6 text-xl font-light italic leading-relaxed text-white"
              >
                {block.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
