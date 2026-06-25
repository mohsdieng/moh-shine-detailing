import Link from "next/link";
import { Logo } from "../Logo";
import { site } from "@/lib/site";

/**
 * Author / brand trust block shown at the foot of each article.
 * States only verifiable facts about the business — no invented stats or
 * reviews — to keep E-E-A-T signals honest.
 */
export function AuthorCard() {
  return (
    <aside className="border border-chrome-line bg-black/40 p-7 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-12 w-auto items-center">
          <Logo variant="dark" className="h-full" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest text-shine">Written by {site.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-chrome">
            {site.name} is a mobile car detailing studio based in Raleigh, serving
            Durham, Cary and the surrounding NC Triangle. We bring professional,
            by-hand detailing — interior, exterior, paint correction and ceramic
            coating — straight to your driveway.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-widest">
            <Link href="/services" className="text-white transition-colors hover:text-shine">
              Our services →
            </Link>
            <Link href="/locations" className="text-white transition-colors hover:text-shine">
              Service areas →
            </Link>
            <Link href="/contact" className="text-white transition-colors hover:text-shine">
              Get a quote →
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
