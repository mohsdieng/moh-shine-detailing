# `/public/gallery/` — your real work (before / after)

This folder feeds the **Gallery** section. Each card is a draggable
before/after slider. As you finish real jobs, drop the photos here and the
grid fills with your own work in place of the temporary stock shots.

See the full workflow in [`/MEDIA-GUIDE.md`](../../MEDIA-GUIDE.md).

---

## Two ways the slider works

Each gallery entry in [`lib/media.ts`](../../lib/media.ts) (the `GALLERY`
array) has an **`after`** image and an *optional* **`before`** image:

- **After only** (current setup): the slider shows your finished photo on both
  sides and darkens/desaturates the left half with a CSS filter to imply the
  "before." Good enough to look real from day one.
- **Before + after** (best): add a real `before` photo and the slider becomes a
  true documentary reveal. **Shoot the same angle, framing and lighting** for
  both shots so the wipe lines up.

---

## Exact filenames for the current cards

These are the `after.local` paths already wired in `GALLERY`. Drop a file at
the matching name and that card switches to your photo:

| Drop this file | Card |
|---|---|
| `bmw-m3-after.jpg` | M3 Coupe — paint correction (Raleigh) |
| `mercedes-after.jpg` | C-Class — full detail (Durham) |
| `ceramic-after.jpg` | Daily driver — ceramic coating (Cary) |
| `bmw-front-after.jpg` | BMW M-series — exterior reset (Wake Forest) |
| `interior-after.jpg` | Leather interior — deep clean (Chapel Hill) |
| `headlight-after.jpg` | Headlights — restored clarity (Apex) |

To add a matching **before** photo, drop e.g. `bmw-m3-before.jpg` and add
`before: { local: "/gallery/bmw-m3-before.jpg" }` to that entry in `lib/media.ts`.

> `before.svg` and `after.svg` in this folder are the original placeholders and
> can be deleted once you have real photos.

---

## Adding a brand-new gallery card

Append one object to `GALLERY` in `lib/media.ts` and mark it as real work:

```ts
{
  id: "audi-rs5-ceramic",          // unique, used as the React key
  label: "Audi RS5 — ceramic coating",
  service: "Ceramic Coating",       // chip shown on the card
  location: "Cary",                 // chip shown on the card
  after:  { local: "/gallery/audi-rs5-after.jpg" },
  before: { local: "/gallery/audi-rs5-before.jpg" }, // optional
  real: true,                       // flags it as genuine client work
},
```

## Specs

| Setting | Recommendation |
|---|---|
| **Format** | `.jpg` or `.webp` |
| **Width** | 1200–1600px |
| **Quality** | ~80% |
| **File size** | Under 300 KB each |
| **Pairs** | Before/after must share angle, distance and lighting to line up |

(Same `magick` / `cwebp` commands as in
[`/public/posters/README.md`](../posters/README.md).)
