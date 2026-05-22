import Link from "next/link";
import { Container } from "./ui/Container";
import { Reveal } from "./Reveal";

type Crumb = { name: string; path: string };

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
};

/** Inner-page hero block with breadcrumb, eyebrow, H1 and intro. */
export function PageHeader({ eyebrow, title, intro, crumbs }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-black pt-28 sm:pt-36">
      <div className="absolute left-1/2 top-0 h-[40vh] w-[60vh] -translate-x-1/2 rounded-full bg-shine/15 blur-[130px]" aria-hidden="true" />
      <Container className="relative pb-16 sm:pb-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-muted">
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.path} className="transition-colors hover:text-shine">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">{c.name}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-muted sm:text-lg">
              {intro}
            </p>
          )}
        </Reveal>
      </Container>
    </header>
  );
}
