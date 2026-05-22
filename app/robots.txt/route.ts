import { site } from "@/lib/site";

/** Hand-written robots.txt route handler (see sitemap.xml/route.ts for why). */
export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${site.url}/sitemap.xml`,
    `Host: ${site.url}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
