import Link from "next/link";

export type Crumb = { name: string; path: string };

/**
 * Visual breadcrumb trail for the location pages. Pair with breadcrumbSchema()
 * (rendered separately as JSON-LD) so the markup and structured data agree.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-chrome/70">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span className="text-white" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="transition-colors hover:text-shine">
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
