import Link from "next/link";
import { formatDate, readingTime, type BlogPost } from "@/lib/blog";

type PostCardProps = {
  post: BlogPost;
  /** Larger treatment for the featured article. */
  featured?: boolean;
};

/**
 * Article card used on the blog index and in related-posts grids.
 * Pure server component; the whole card is a single link for accessibility.
 */
export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <article className={featured ? "h-full" : "h-full"}>
      <Link
        href={`/blog/${post.slug}`}
        className={`group flex h-full flex-col border border-chrome-line bg-gradient-to-br from-slate-card to-black p-7 transition-all duration-300 hover:-translate-y-1 hover:border-shine/50 ${
          featured ? "sm:p-10" : ""
        }`}
      >
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-shine/80">
          <span className="border border-shine/30 bg-shine/10 px-2 py-0.5 font-mono">
            {post.category.name}
          </span>
          <span className="text-chrome/60">{readingTime(post)} min read</span>
        </div>

        <h3
          className={`mt-5 font-bold leading-tight tracking-tightest text-white ${
            featured ? "text-3xl sm:text-4xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>

        <p className={`mt-3 flex-1 leading-relaxed text-chrome ${featured ? "text-base sm:text-lg" : "text-sm"}`}>
          {post.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-chrome-line pt-5">
          <time dateTime={post.datePublished} className="text-xs uppercase tracking-wider text-chrome/60">
            {formatDate(post.datePublished)}
          </time>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors group-hover:text-shine">
            Read
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
