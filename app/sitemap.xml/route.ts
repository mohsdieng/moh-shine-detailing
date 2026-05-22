import { site } from "@/lib/site";

/**
 * Hand-written sitemap route handler.
 * (We use a route handler instead of the `app/sitemap.ts` convention so the
 * build doesn't depend on the project's filesystem path — Next's metadata-route
 * loader mishandles apostrophes in the absolute path.)
 */
export const dynamic = "force-static";

export function GET() {
  const lastmod = new Date().toISOString();
  const routes = [
    { path: "", priority: "1.0" },
    { path: "/services", priority: "0.8" },
    { path: "/gallery", priority: "0.8" },
    { path: "/about", priority: "0.8" },
    { path: "/contact", priority: "0.8" },
  ];

  const urls = routes
    .map(
      (r) =>
        `  <url>\n    <loc>${site.url}${r.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
