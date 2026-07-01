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

// Keep brand + domain in sync with lib/site.ts.
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="bg" cx="62%" cy="22%" r="95%">
      <stop offset="0" stop-color="#101a26"/><stop offset="0.55" stop-color="#070c14"/><stop offset="1" stop-color="#000000"/>
    </radialGradient>
    <radialGradient id="glow" cx="68%" cy="24%" r="40%">
      <stop offset="0" stop-color="#38B6FF" stop-opacity="0.20"/><stop offset="1" stop-color="#38B6FF" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <!-- oversized faded monogram, right side -->
  <text x="1150" y="470" text-anchor="end" font-family="Poppins, Arial, sans-serif" font-style="italic" font-weight="800" font-size="520" letter-spacing="-20" fill="#FFFFFF" fill-opacity="0.03">MS</text>
  <!-- wordmark -->
  <text x="80" y="135" font-family="Poppins, Arial, sans-serif" font-style="italic" font-weight="800" font-size="56" letter-spacing="-2">
    <tspan fill="#FFFFFF">M</tspan><tspan fill="#38B6FF">S</tspan><tspan fill="#38B6FF" font-size="24" letter-spacing="7" dx="14">DETAILING</tspan>
  </text>
  <!-- eyebrow -->
  <text x="82" y="258" font-family="Poppins, Arial, sans-serif" font-weight="600" font-size="24" letter-spacing="6" fill="#C9D2DA">PREMIUM MOBILE DETAILING · RALEIGH–DURHAM, NC</text>
  <!-- headline -->
  <text x="80" y="350" font-family="Poppins, Arial, sans-serif" font-weight="800" font-size="78" fill="#FFFFFF">Mobile Detailing &amp;</text>
  <text x="80" y="438" font-family="Poppins, Arial, sans-serif" font-weight="800" font-style="italic" font-size="78" fill="#38B6FF">Ceramic Coating.</text>
  <!-- accent line -->
  <rect x="82" y="478" width="90" height="3" fill="#38B6FF"/>
  <!-- footer line -->
  <text x="80" y="548" font-family="Poppins, Arial, sans-serif" font-weight="500" font-size="28" fill="#9AA7B2">Interior · Exterior · Paint Correction · Ceramic — we come to you.</text>
  <text x="80" y="592" font-family="Poppins, Arial, sans-serif" font-weight="600" font-size="26" letter-spacing="1" fill="#38B6FF">mohshinedetailing.com</text>
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
