# `/public/posters/` — still images (hero + each service)

Drop your real photos here. **The moment a file exists at the exact path
below, the site uses it automatically** — no code change. Until then, a
temporary Unsplash photo (or the CSS cinematic panel) shows instead.

See the full workflow in [`/MEDIA-GUIDE.md`](../../MEDIA-GUIDE.md).

---

## Exact filenames to drop here

Each poster is the still image behind a service's video panel (and the hero).
Filenames **must match exactly** (lowercase, hyphenated, `.jpg`).

| Drop this file | Used for |
|---|---|
| `hero.jpg` | Home hero background (most important — see note) |
| `wash-and-wax.jpg` | Wash & Wax service |
| `exterior-detail.jpg` | Exterior Detail service |
| `interior-detail.jpg` | Interior Detail service |
| `full-detail.jpg` | Full Detail service |
| `paint-correction.jpg` | Paint Correction service |
| `ceramic-coating.jpg` | Ceramic Coating service |
| `headlight-restoration.jpg` | Headlight Restoration service |
| `odor-removal.jpg` | Odor Removal service |
| `engine-bay-cleaning.jpg` | Engine Bay Cleaning service |

> These names are the `poster.local` paths in
> [`lib/media.ts`](../../lib/media.ts). If you ever rename a file, update that
> one file too.

---

## Specs for a fast, premium result

| Setting | Recommendation |
|---|---|
| **Format** | `.jpg` (or `.webp` — then rename the entry in `lib/media.ts`) |
| **Width** | 1600–1920px wide |
| **Aspect** | Landscape ~16:9 or 4:5 portrait; the frame crops with `object-cover`, so keep the subject centered |
| **Quality** | JPEG ~80% — visually lossless at this size |
| **File size** | Aim **under 300 KB** each (hero can go ~400 KB) |
| **Color** | Dark, cinematic, low-key lighting matches the brand best |

### Optimize before dropping (one command)

```bash
# Resize to 1800px wide + compress to ~82% quality (ImageMagick)
magick input.jpg -resize 1800x -quality 82 -strip hero.jpg

# Or convert to WebP (smaller; then change .jpg → .webp in lib/media.ts)
cwebp -q 80 -resize 1800 0 input.jpg -o hero.webp
```

### ⭐ The hero poster is special (`hero.jpg`)

It is the first big thing visitors see (your **LCP** element), so it loads
**eagerly**. Make this one count:

- Use your single best, darkest, most cinematic shot.
- Keep it **well under 400 KB** so it paints fast.
- A dark image also means the white headline stays readable over it.

The hero **video** (`/videos/hero.mp4`) layers on top once it loads — the
poster is what shows instantly and on slow connections, so it must look great
on its own.
