/**
 * Generates static brand raster assets (favicon, apple touch icon, OG image)
 * from the "MS" monogram into /public.
 *
 * Run with:  node scripts/generate-brand-assets.mjs
 *
 * We pre-render to static PNGs rather than using Next's runtime ImageResponse
 * because @vercel/og cannot initialize when the project's filesystem path
 * contains an apostrophe (as in "Moh's shine website"). Static assets work
 * everywhere. Re-run this script after editing the SVG templates below.
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const monogram = (fontSize, dy) => `
  <text x="50%" y="50%" dy="${dy}" text-anchor="middle"
        font-family="Poppins, Arial, sans-serif" font-style="italic"
        font-weight="800" font-size="${fontSize}" letter-spacing="-2">
    <tspan fill="#FFFFFF">M</tspan><tspan fill="#38B6FF">S</tspan>
  </text>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#000000"/>
  ${monogram(40, "0.34em")}
</svg>`;

const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <defs><radialGradient id="g" cx="50%" cy="35%" r="75%">
    <stop offset="0" stop-color="#0e2233"/><stop offset="1" stop-color="#000000"/>
  </radialGradient></defs>
  <rect width="180" height="180" fill="url(#g)"/>
  ${monogram(108, "0.34em")}
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><radialGradient id="bg" cx="30%" cy="20%" r="90%">
    <stop offset="0" stop-color="#0e2233"/><stop offset="0.6" stop-color="#000000"/>
  </radialGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="80" y="150" font-family="Poppins, Arial, sans-serif" font-style="italic" font-weight="800" font-size="64" letter-spacing="-3">
    <tspan fill="#FFFFFF">M</tspan><tspan fill="#38B6FF">S</tspan><tspan fill="#38B6FF" font-size="28" letter-spacing="8" dx="14">DETAILING</tspan>
  </text>
  <text x="80" y="320" font-family="Poppins, Arial, sans-serif" font-weight="800" font-size="72" fill="#FFFFFF">Your car, detailed to a shine.</text>
  <text x="80" y="390" font-family="Poppins, Arial, sans-serif" font-weight="500" font-size="32" fill="#9AA7B2">Premium mobile car detailing · Raleigh &amp; Durham, NC</text>
  <text x="80" y="450" font-family="Poppins, Arial, sans-serif" font-weight="500" font-size="26" fill="#38B6FF" letter-spacing="2">www.mohsshinedetailing.com</text>
</svg>`;

const targets = [
  { svg: faviconSvg, out: "favicon.png" },
  { svg: appleSvg, out: "apple-icon.png" },
  { svg: ogSvg, out: "og.png" },
];

for (const { svg, out } of targets) {
  await sharp(Buffer.from(svg)).png().toFile(join(publicDir, out));
  console.log(`generated public/${out}`);
}
