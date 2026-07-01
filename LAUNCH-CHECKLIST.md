# 🚀 Launch Checklist — Moh's Shine Detailing

The site is **built, tested, and launch-safe**: nothing fake is shown anywhere.
Every piece of real business info you haven't provided yet is simply hidden
(and left out of Google's structured data) until you fill it in.

This checklist is the short list of what **you** still need to provide. Each
item points to the **exact file and field** to change — or hand the value to
your developer and it's a one-line edit.

> 🔎 Find everything fast: search the codebase for **`TODO(launch)`** — every
> blank that needs a real value is tagged with it.

---

## 1. Business contact info → [`lib/site.ts`](lib/site.ts)

All of these live in one object. Filling a value makes it appear across the
site (header, footer, contact page) **and** in Google's business data. Leaving
it blank keeps it hidden — no broken UI.

| ☐ | Item | Field(s) to set | Example |
|---|---|---|---|
| ☐ | **Phone** | `phone` and `phoneHref` | `phone: "(919) 555-0123"` · `phoneHref: "tel:+19195550123"` |
| ☐ | **Public email** | `email` and `emailHref` | `email: "hello@mohshinedetailing.com"` · `emailHref: "mailto:hello@mohshinedetailing.com"` |
| ☐ | **Square booking URL** | `bookingUrl` | `bookingUrl: "https://book.squareup.com/appointments/…"` |
| ☐ | **Instagram** | `social.instagram` | `instagram: "https://instagram.com/mohsshinedetailing"` |
| ☐ | **Google Business Profile** | `social.google` | `google: "https://g.page/r/…"` (your review link) |
| ☐ | TikTok *(optional)* | `social.tiktok` | `tiktok: "https://tiktok.com/@…"` |
| ☐ | Business hours *(optional, recommended)* | `hours` + `openingHours` | see the comments in `site.ts` |
| ☐ | Map pin *(optional)* | `geo` | `{ latitude: 35.78, longitude: -78.64 }` |

### What each one unlocks

- **Phone** → a tappable "Call" button appears in the header/footer and a phone
  number is added to your Google business data.
- **Email** → email contact card on the Contact page + footer.
- **Square `bookingUrl`** → every **"Book Now"** button opens your real Square
  booking page in a new tab. *Until set, "Book Now" routes to the on-site
  Contact form so it's never a dead link.*
- **Instagram / TikTok** → social icons appear in the footer and are added to
  your business `sameAs` data for search engines.
- **Google Business Profile** → enables the "Leave a review / See reviews" CTA.

### Filled-in example (the contact block of `site.ts`)

```ts
phone: "(919) 555-0123",
phoneHref: "tel:+19195550123",
email: "hello@mohshinedetailing.com",
emailHref: "mailto:hello@mohshinedetailing.com",
bookingUrl: "https://book.squareup.com/appointments/abc123/location/xyz",

social: {
  instagram: "https://instagram.com/mohsshinedetailing",
  tiktok: "",
  google: "https://g.page/r/your-review-link",
},
```

---

## 2. Real photos & videos → see [`MEDIA-GUIDE.md`](MEDIA-GUIDE.md)

The site ships with premium temporary stock visuals so it looks finished today.
Replace them with your own work, one file at a time, **with zero code changes** —
just drop correctly-named files into `/public/`.

| ☐ | Item | Where | Priority |
|---|---|---|---|
| ☐ | **Hero image** | `/public/posters/hero.jpg` | ⭐ highest — it's the first thing visitors see |
| ☐ | **5 featured service photos** | `/public/posters/` (exterior, interior, paint-correction, ceramic, odor) | high |
| ☐ | Remaining service photos | `/public/posters/` | medium |
| ☐ | **Gallery before/after** | `/public/gallery/` | add as you finish jobs |
| ☐ | Video loops *(optional)* | `/public/videos/` | nice-to-have |

Each `/public/` subfolder has a `README.md` with the **exact filenames** and
size/format specs. Full workflow + compression commands are in `MEDIA-GUIDE.md`.

---

## 3. Customer reviews → [`lib/content.ts`](lib/content.ts)

We never publish fabricated reviews, so the testimonials section is **hidden**
until you add real, owner-approved quotes (ideally mirrored from Google).

| ☐ | Step |
|---|---|
| ☐ | Collect a few genuine customer reviews (Google reviews are perfect) |
| ☐ | Add each to the `testimonials` array: `{ quote, name, detail, rating }` |
| ☐ | Flip `reviewsPublished = true` |
| ☐ | *(optional)* add real numbers to `stats` and flip `statsPublished = true` (e.g. "Vehicles detailed: 250+") |

When `reviewsPublished` is true, the testimonials section and aggregate rating
appear automatically across the site.

---

## 4. Domain & deployment

The project is a standard Next.js 14 app — **Vercel** is the simplest host
(free tier is fine to start) and handles HTTPS automatically.

| ☐ | Step | Notes |
|---|---|---|
| ☐ | Confirm the domain | Site is configured for **`mohshinedetailing.com`** (set in `lib/site.ts` `url:` and used for canonical URLs, sitemap, Open Graph). Change it there if the real domain differs. |
| ☐ | Create a Vercel account | <https://vercel.com> — sign in with GitHub |
| ☐ | Import the GitHub repo | `mohsdieng/moh-shine-detailing` → Vercel auto-detects Next.js, no config needed |
| ☐ | Deploy | First build runs automatically; you get a `*.vercel.app` preview URL |
| ☐ | Add your custom domain | Vercel → Project → **Settings → Domains** → add `mohshinedetailing.com` |
| ☐ | Point DNS | At your domain registrar, add the records Vercel shows (usually an `A` record / `CNAME` to Vercel). HTTPS is issued automatically. |
| ☐ | Verify production | Open the live domain; confirm pages load, "Book Now" works, no console errors |

### After the domain is live — SEO setup

| ☐ | Step |
|---|---|
| ☐ | **Google Search Console** — verify the domain, then submit `https://mohshinedetailing.com/sitemap.xml` |
| ☐ | **Google Business Profile** — create/claim it (Raleigh service-area business); this is huge for local "near me" searches |
| ☐ | Confirm `robots.txt` and `sitemap.xml` resolve (they're generated automatically) |
| ☐ | *(optional)* Add analytics (Vercel Analytics or Google Analytics) |

---

## 5. Final go-live verification

Once the info above is in and the site is deployed:

- [ ] Phone/email/social all show correctly and link properly
- [ ] "Book Now" opens your real Square page in a new tab
- [ ] At least the hero + featured service photos are your real work
- [ ] Reviews section shows real testimonials (or stays hidden if not ready)
- [ ] Live site loads over HTTPS on the real domain, no console errors
- [ ] Sitemap submitted to Google Search Console
- [ ] Google Business Profile created/claimed

---

### Recap — the absolute minimum to go live

1. **Phone + email** (`lib/site.ts`)
2. **Square booking URL** (`lib/site.ts`)
3. **Instagram + Google Business Profile** (`lib/site.ts`)
4. **A real hero photo** (`/public/posters/hero.jpg`)
5. **Deploy to Vercel + connect the domain**

Everything else (more photos, reviews, videos, hours, stats) can be added
gradually after launch without ever taking the site down.
