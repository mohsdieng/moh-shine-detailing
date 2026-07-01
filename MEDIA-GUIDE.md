# Media Guide — swapping temporary visuals for your real work

Everything visual on the site resolves through **one file**:
[`lib/media.ts`](lib/media.ts). You almost never need to touch code — just drop
correctly-named files into `/public/` and they take over automatically.

---

## The golden rule: real wins over temporary

Every image/video slot tries sources in this order:

1. **Your local file** (`/public/...`) — used the instant it exists. ✅
2. **Temporary stock URL** (Unsplash) — shown only until your file exists.
3. **CSS cinematic panel** — the branded fallback if there's nothing else.

So the replacement workflow is simply: **drop a file with the right name → done.**
No deploy gymnastics, no code edits, no broken images in between.

```
   /public/posters/ceramic-coating.jpg   ← drop this …
   lib/media.ts  "ceramic-coating": {
     poster: { local: "/posters/ceramic-coating.jpg",  ← … and this path lights up
               temp:  "https://images.unsplash.com/…" }  ← temp is ignored once local exists
   }
```

---

## Where each thing goes

| Folder | What | Naming reference |
|---|---|---|
| [`/public/posters/`](public/posters/README.md) | Still images for the hero + each service panel | `README` lists every filename |
| [`/public/videos/`](public/videos/README.md) | Optional short cinematic loops | `README` lists every filename |
| [`/public/gallery/`](public/gallery/README.md) | Your before/after work for the Gallery section | `README` explains pairs |

Each folder's `README.md` has the **exact filenames** to use and the specs.
Start with **posters** — they do the most visual work for the least effort.

---

## Performance — already handled for you

These are built into the `CinematicVideo` / hero / `BeforeAfter` components, so
you get them for free:

- **Lazy loading** — service videos/posters only load when scrolled near
  (`preload="none"` + IntersectionObserver). The hero video waits for browser
  idle so it never delays first paint.
- **LCP-safe hero** — the hero *poster* loads eagerly and is the only file you
  should keep especially light (< 400 KB). Everything else is below the fold.
- **No broken states** — a missing file or unsupported codec silently falls
  back to the next source. You can replace media one file at a time.
- **Reduced motion** — visitors who prefer reduced motion never autoplay video;
  they see the still poster. The interactive demos are static for them too.

**Your only job for performance:** size and compress the source files before
dropping them (each README has a one-line `ffmpeg` / `magick` command).

| Asset | Target size |
|---|---|
| Hero poster | < 400 KB |
| Service / gallery image | < 300 KB |
| Video loop | 2–6 MB (≤ 10 MB) |

---

## Recommended order to replace temp media

1. **`/public/posters/hero.jpg`** — biggest visual impact, it's the LCP.
2. The **five featured service posters**: `exterior-detail`, `interior-detail`,
   `paint-correction`, `ceramic-coating`, `odor-removal` (these appear on the
   home page).
3. The remaining service posters.
4. **Gallery** `after` photos as you complete real jobs (add `before` photos
   for true before/after sliders).
5. **Videos** last — optional, only where you have footage worth looping.

---

## Removing the temporary stock entirely

Once you have real work everywhere, you can drop the Unsplash dependency:

1. In `lib/media.ts`, delete the `temp: unsplash(...)` part of each entry (keep
   `local`). Entries then resolve to your file, or the CSS panel if absent.
2. When **no** `temp:` URLs remain, remove the Unsplash entry from
   `images.remotePatterns` in [`next.config.mjs`](next.config.mjs).
3. If you've replaced the placeholder gallery SVGs with real photos, you can
   also drop `dangerouslyAllowSVG` from `next.config.mjs` and delete
   `/public/gallery/before.svg` + `after.svg`.

> Tip: there's no rush. The site looks finished today with temp media, and you
> can swap in real work gradually without ever shipping a broken image.
