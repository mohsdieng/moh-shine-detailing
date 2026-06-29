# `/public/videos/` — short cinematic loops (optional)

Drop your real video loops here. **The moment a file exists at the exact path
below, the site plays it automatically** — muted, looped, autoplaying behind
the matching panel. Until then, the poster image (see `/public/posters/`) or
the CSS cinematic panel shows instead.

Video is **optional everywhere.** A great poster image alone already looks
premium. Add videos when you have footage worth showing.

See the full workflow in [`/MEDIA-GUIDE.md`](../../MEDIA-GUIDE.md).

---

## Exact filenames to drop here

Filenames **must match exactly** (lowercase, hyphenated, `.mp4`).

| Drop this file | Used for |
|---|---|
| `hero.mp4` | Home hero — full-bleed background loop |
| `wash-and-wax.mp4` | Wash & Wax service |
| `exterior-detail.mp4` | Exterior Detail service |
| `interior-detail.mp4` | Interior Detail service |
| `full-detail.mp4` | Full Detail service |
| `paint-correction.mp4` | Paint Correction service |
| `ceramic-coating.mp4` | Ceramic Coating service |
| `headlight-restoration.mp4` | Headlight Restoration service |
| `odor-removal.mp4` | Odor Removal service |
| `engine-bay-cleaning.mp4` | Engine Bay Cleaning service |

> These names are the `video.local` paths in
> [`lib/media.ts`](../../lib/media.ts).

---

## Specs for fast, premium playback

The player is **muted, looping, and autoplays inline** — so treat each clip as
moving wallpaper, not a film. Short and light beats long and heavy.

| Setting | Recommendation |
|---|---|
| **Format / codec** | `.mp4`, **H.264** video, **no audio track** (it's muted anyway — dropping audio shrinks the file) |
| **Resolution** | 1080p max (1920×1080). 720p is plenty for a background |
| **Length** | 6–12 seconds, seamless loop |
| **Frame rate** | 24–30 fps |
| **File size** | Target **2–6 MB**. Hard ceiling ~10 MB |
| **Motion** | Slow, deliberate camera moves read as luxury; avoid shaky/fast cuts |

### Compress before dropping (ffmpeg)

```bash
# Strip audio, scale to 1080p, compress (CRF 24 ≈ high quality, small size)
ffmpeg -i raw.mov -an -vf "scale=1920:-2" -c:v libx264 -crf 24 \
  -preset slow -movflags +faststart -pix_fmt yuv420p hero.mp4
```

- `-an` removes audio (smaller file, and playback is muted regardless).
- `-movflags +faststart` lets the video start before it fully downloads.
- `-pix_fmt yuv420p` guarantees Safari/iOS compatibility.
- Raise `-crf` to 26–28 if you need a smaller file; lower to 22 for more quality.

### How playback already protects performance

You don't need to do anything for these — they're built in:

- **Lazy:** videos only start loading when scrolled near (`preload="none"` +
  intersection observer). The hero defers to browser idle time so it never
  fights first paint.
- **Graceful:** if a file is missing, the codec is unsupported, or the
  connection is slow, the poster/CSS panel stays — **no broken state, ever**.
- **Reduced motion:** users with “reduce motion” set never see autoplay; they
  get the still poster.
