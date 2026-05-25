# Moh's Shine Detailing — Website

A premium, awwwards-style, SEO-optimized marketing site for **Moh's Shine Detailing**
(brand mark: *MS Detailing*), a mobile car detailing business serving the
Raleigh–Durham, North Carolina area.

Built with **Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

---

## Quick start

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

## Where to put your real content

Almost everything you'll want to change lives in two files:

### 1. Business details, links & contact — `lib/site.ts`

Open [`lib/site.ts`](lib/site.ts) and swap the placeholder values:

| Field | What it is |
| --- | --- |
| `url` | Your production domain (used for canonical URLs, sitemap, Open Graph). |
| `phone` / `phoneHref` | Display phone + the `tel:` link. |
| `email` / `emailHref` | Display email + the `mailto:` link. |
| `bookingUrl` | **Your Square Appointments booking URL.** Powers every "Book Now" button. |
| `social.instagram` / `social.tiktok` | Social profile links. |
| `areaServed` | Cities shown in the Service Area section + JSON-LD. |
| `geo` | Latitude/longitude for LocalBusiness structured data. |
| `hours` / `openingHours` | Display hours + machine-readable opening hours. |

### 2. Services & pricing — `lib/services.ts`

Open [`lib/services.ts`](lib/services.ts) to edit service copy and prices.

> ⚠️ **Locked price — do not change:** the *Exterior Hand Wash & Towel Dry* price
> (`from $50 sedan / $65 SUV & truck`) is confirmed and marked `priceLocked: true`.
> The other prices are `from $X` placeholders — update them once confirmed.

---

## Swapping the logo

The header/footer logo is an inline SVG recreation in
[`components/Logo.tsx`](components/Logo.tsx) (white **M** + blue **S** + blue
*DETAILING*). It has a `variant` prop:

- `variant="dark"` → for dark backgrounds (white M). *Used by default.*
- `variant="light"` → for white backgrounds (M switches to near-black so it stays visible).

**To use the real raster logo instead:** drop your file at `public/logo.png` and
replace the `<Logo />` usage in `components/Header.tsx` / `components/Footer.tsx`
with a `next/image`:

```tsx
import Image from "next/image";
<Image src="/logo.png" alt="Moh's Shine Detailing" width={180} height={80} priority />
```

`public/logo.png` is also referenced in the LocalBusiness structured data
(`components/JsonLd.tsx`), so dropping the file there is recommended either way.

### Favicon / app icons / social image

The favicon, Apple touch icon and social share image are pre-rendered PNGs in
`public/` (`favicon.png`, `apple-icon.png`, `og.png`), generated from the "MS"
monogram by [`scripts/generate-brand-assets.mjs`](scripts/generate-brand-assets.mjs).

To tweak them, edit the SVG templates in that script and re-run:

```bash
node scripts/generate-brand-assets.mjs
```

> **Why static PNGs and not Next's dynamic `ImageResponse`?** `@vercel/og` (the
> library behind dynamic OG images) fails to initialize when the project's folder
> path contains an apostrophe — as in `Moh's shine website`. Pre-rendered PNGs work
> reliably everywhere. If you move the project to a path without an apostrophe and
> prefer dynamic generation, you can convert these back to `app/icon.tsx` /
> `app/opengraph-image.tsx` conventions.

---

## Swapping the gallery photos

Placeholder before/after images live in `public/gallery/` as lightweight SVGs
(`before.svg`, `after.svg`).

1. Add your real photos to `public/gallery/` (e.g. `civic-before.jpg`, `civic-after.jpg`).
2. Edit the `items` array in [`components/sections/Gallery.tsx`](components/sections/Gallery.tsx):
   point `before`/`after` at your files and write **descriptive `alt` text**.
3. Once you've removed the SVG placeholders, you can drop the `dangerouslyAllowSVG`
   block from `next.config.mjs`.

---

## Premium video & poster assets

Hero + service Feature sections will automatically render a cinematic looping
video when the matching file exists. If it doesn't, they gracefully fall back
to the CSS cinematic panel (with the brand icon as focal element) — **no broken
state**, ever.

### Where to drop the files

```
public/
  videos/
    hero.mp4
    wash-and-wax.mp4
    exterior-detail.mp4
    interior-detail.mp4
    full-detail.mp4
    paint-correction.mp4
    ceramic-coating.mp4
    headlight-restoration.mp4
    odor-removal.mp4
    engine-bay-cleaning.mp4
  posters/
    hero.jpg
    wash-and-wax.jpg
    exterior-detail.jpg
    interior-detail.jpg
    full-detail.jpg
    paint-correction.jpg
    ceramic-coating.jpg
    headlight-restoration.jpg
    odor-removal.jpg
    engine-bay-cleaning.jpg
```

The exact filenames are wired up in [`lib/services.ts`](lib/services.ts) (the
`media` field on each service) and at the top of
[`components/sections/Hero.tsx`](components/sections/Hero.tsx) for the hero video.

### Recommended specs (luxury feel, fast load)

- **Resolution**: 1920 × 1080 (16:9). Feature panels render at portrait
  aspect so they'll crop centrally — frame the action in the middle.
- **Duration**: 8 – 15 seconds, seamless loop. The video is muted, looped,
  autoplaying — so the user shouldn't notice the loop point.
- **Format**: `.mp4` with the **H.264** video codec and **AAC** audio
  (audio is muted but some codecs misbehave without an audio track).
- **Bitrate**: target ~2 – 4 Mbps. Don't ship a 50 MB clip.
- **No sound**, no logos baked-in, no captions — those are layered over
  via the component overlay.

#### One-liner with `ffmpeg`

```bash
# Compress a source clip to 1080p, ~3 Mbps, web-optimized
ffmpeg -i source.mov \
  -vf "scale='min(1920,iw)':-2" \
  -c:v libx264 -profile:v high -preset slow -crf 23 \
  -movflags +faststart \
  -an \
  hero.mp4
```

### Poster images

- **Resolution**: same as the video (1920 × 1080). Compress to JPG at
  quality 75-82.
- **Purpose**: shown instantly while the video loads, and as the
  permanent visual if the video errors out.
- If you only have a still photo and no video, drop the poster alone —
  the component will skip the `<video>` element entirely and just render
  the photo + overlay.

### Performance

- Videos load **only when their section enters the viewport** (driven by
  `IntersectionObserver` inside `CinematicVideo`).
- `preload="none"` keeps the initial page load light.
- A dark gradient is layered on top of every video/poster so headlines and
  body copy stay readable regardless of footage exposure.
- Users with `prefers-reduced-motion` see the poster only — the video never
  auto-plays.

---

## SEO features included

- **Metadata API** per page: unique titles, descriptions, canonical URLs, Open Graph + Twitter cards (`lib/seo.ts`).
- **JSON-LD structured data**: `LocalBusiness` (AutoDetailing), `Service`, and `BreadcrumbList` (`components/JsonLd.tsx`).
- **`sitemap.xml`** (`app/sitemap.xml/route.ts`) and **`robots.txt`** (`app/robots.txt/route.ts`).
- Semantic HTML, one `<h1>` per page, descriptive `alt` text, `lang="en"`.
- Self-hosted **Poppins** via `next/font` with `font-display: swap`.
- `next/image` everywhere with explicit sizing for minimal CLS.

> After deploying, update `site.url` in `lib/site.ts` to your real domain so
> canonical URLs, the sitemap and structured data point to the right place.

---

## Accessibility & motion

- Color contrast meets AA (white & `#38B6FF` blue on black).
- Visible focus rings, skip-to-content link, `aria-label`s on icon buttons.
- All animations respect `prefers-reduced-motion` (Framer Motion + CSS fallback).

---

## Project structure

```
app/
  layout.tsx            # root layout, fonts, metadata, JSON-LD, header/footer
  page.tsx              # single-page scroll home
  services/ gallery/ about/ contact/   # dedicated SEO route pages
  sitemap.xml/route.ts robots.txt/route.ts   # SEO endpoints
  globals.css
components/
  Logo.tsx Header.tsx Footer.tsx PageHeader.tsx Reveal.tsx JsonLd.tsx icons.tsx
  ui/                   # Button, Section, Container
  sections/             # Hero, Services, HowItWorks, Gallery, ServiceArea, Testimonials, Contact
lib/
  site.ts services.ts seo.ts
scripts/
  generate-brand-assets.mjs   # regenerates favicon/apple/og PNGs from the monogram
public/
  gallery/              # placeholder before/after SVGs
  favicon.png apple-icon.png og.png   # generated brand imagery
  logo.png              # (drop your real logo here)
```

---

## Brand tokens

Configured in `tailwind.config.ts`:

| Token | Hex | Use |
| --- | --- | --- |
| White | `#FFFFFF` | Primary text on dark, the "M". |
| Shine blue | `#38B6FF` | Accent, the "S" & DETAILING. |
| Black | `#000000` | Primary background. |
| Slate surface | `#0E1318` | Alternate dark surfaces. |
| Slate muted | `#9AA7B2` | Muted body text. |
