# 🔀 Merge & Launch Plan — PRs #1–#13

A safe, step-by-step guide to merging the stacked PR chain and taking the site
live. Follow it top to bottom.

---

## The one golden rule

**Merge from the bottom of the stack upward, one at a time, in number order
(#1 first, #13 last). Never merge out of order.**

Each PR's base is the PR below it. When you merge one, GitHub automatically
re-points the next PR's base to `main`. Merging out of order is the only thing
that makes this messy.

> Use the **same merge method for all 13**. Recommended: **"Create a merge
> commit"** (the default green-button option) — for a stacked chain it keeps
> each PR's diff clean as the bases retarget. Don't mix in "Squash" partway
> through.

---

## Exact merge order

| Order | PR | Branch | What it adds |
|---|---|---|---|
| 1 | #1 | `feat/premium-media-architecture` | Media architecture + temp visuals |
| 2 | #2 | `feat/city-service-seo` | City × Service local SEO |
| 3 | #3 | `feat/city-service-seo-batch2` | More city × service pages |
| 4 | #4 | `feat/blog-system` | Blog system + first 6 posts |
| 5 | #5 | `feat/blog-backlinks` | "From the Blog" contextual links |
| 6 | #6 | `feat/publish-garner-chapelhill` | Garner + Chapel Hill |
| 7 | #7 | `feat/launch-readiness` | Real data + remove placeholders |
| 8 | #8 | `feat/launch-polish` | 404, OG image, metadata |
| 9 | #9 | `feat/a11y-pass` | Accessibility pass |
| 10 | #10 | `feat/cwv-perf` | Core Web Vitals tuning |
| 11 | #11 | `feat/premium-polish` | Interactive demos + trust badges |
| 12 | #12 | `feat/launch-prep` | Media README + launch checklist |
| 13 | #13 | `feat/blog-batch-2` | 6 more blog posts (and this plan) |

---

## Step-by-step: repeat for each PR, #1 → #13

**On GitHub (one PR at a time):**

1. Open the PR. Confirm the **base says `main`** (for #1 it already does; for
   the rest it auto-switches to `main` only after the one below it merges —
   that's your signal it's ready).
2. Confirm it says **"This branch has no conflicts with the base branch."**
3. Click **Merge pull request → Confirm merge** (merge commit).
4. *(Optional, tidy)* click **Delete branch**.

**Then locally, sync `main`:**

```bash
git checkout main
git pull origin main
```

**What to check after each merge:**

- The PR shows **Merged** (purple).
- The **next** PR in line now shows **base: main** (the auto-retarget worked).
- No conflict warning on the next PR.

**Run a build after every few merges (and definitely after #7, #11, #13):**

```bash
npm run build
```

Expect `✓ Compiled successfully` and a route count that grows toward
**69 routes** by the end. If a build ever fails, **stop and fix before merging
the next one** — don't stack a broken state.

---

## What could go wrong + how to fix it

### 1. "Base is not `main` yet" on the next PR
That just means the one below it isn't merged. Merge strictly in order and it
resolves itself.

### 2. GitHub says "This branch has conflicts that must be resolved"
Unlikely here (each PR is a clean superset of the one below), but if it happens:

```bash
git checkout main
git pull origin main
git checkout <conflicting-branch>      # e.g. feat/a11y-pass
git merge main
# Git lists the conflicted files. Open each, find the
# <<<<<<< / ======= / >>>>>>> markers, keep the correct version,
# delete the markers, save.
git add .
git commit            # accept the default merge message
git push
```

Then go back to GitHub and merge the PR (it'll now be conflict-free).

> If you're unsure which side to keep, **stop and ask** — don't guess on a
> conflict.

### 3. The merge button is greyed out / "review required"
Repo branch protection is on. Settings → Branches → relax the rule, or merge as
the admin.

### 4. You accidentally merged out of order
Don't panic, don't force-push. Pull `main`, then continue merging the remaining
PRs in number order — GitHub recomputes diffs by content, so the lower-numbered
ones will still merge cleanly (they may show extra commits in the list, but the
file changes are correct). If anything looks wrong, stop and check before
clicking again.

### 5. ⚡ Shortcut (use with caution)
Because the chain is cumulative, `feat/blog-batch-2` (#13) already contains
*everything*. Merging **only #13** would land all 13 PRs in one shot. It's
faster but dumps everything into `main` at once and leaves #1–#12 to be closed
manually. The **in-order merge is recommended** for a clean, reversible
history — but the shortcut exists if you ever need it.

---

## ✅ Final verification — after all 13 are merged

```bash
git checkout main
git pull origin main
npm install
npm run build
```

Then check:

- [ ] Build completes: **69 routes, 0 type errors**
- [ ] `npm run dev` → open `localhost:3000` and spot-check:
  - [ ] Home: hero, **trust strip**, service rows with **interactive demos**
  - [ ] A service page (e.g. `/services/ceramic-coating`) — demo + trust badges
  - [ ] A location page (e.g. `/locations/raleigh/ceramic-coating`)
  - [ ] 2–3 blog posts (e.g. `/blog/paint-correction-vs-wax-raleigh`)
  - [ ] A wrong URL (e.g. `/nope`) → the premium 404
- [ ] Browser console is clean (no red errors)
- [ ] `/sitemap.xml` and `/robots.txt` load
- [ ] All 13 branches show **Merged** on GitHub

If all green, `main` is your production-ready codebase.

---

## 🚀 Launch sequence (do this *after* the 13 PRs are merged & verified)

The order matters — fill in real info **before** the public domain goes live so
the first Google crawl sees real data.

### 1️⃣ Add real launch info → `lib/site.ts` *(do this first)*
Provide your **phone, public email, Square booking URL, Instagram, Google
Business Profile link** (and TikTok/hours if you want). Put them into
`lib/site.ts` as a final **PR #14** and verify — follow `LAUNCH-CHECKLIST.md`.
Merge that PR. *Do this before deploying to the real domain.*

### 2️⃣ Drop in real media *(recommended before launch)*
At minimum `public/posters/hero.jpg`, then the 5 featured service photos. See
`MEDIA-GUIDE.md`. Optional — the site looks finished without it, but real work
is stronger.

### 3️⃣ Deploy to Vercel *(after step 1 is in `main`)*
- vercel.com → sign in with GitHub → **Import** `mohsdieng/moh-shine-detailing`.
- It auto-detects Next.js — no config. Click **Deploy**.
- *(Tip: you can connect Vercel earlier to get a free preview URL for every PR —
  handy, but the real production deploy belongs here.)*

### 4️⃣ Verify the Vercel build *(before touching the domain)*
Open the `*.vercel.app` URL Vercel gives you. Confirm pages load, "Book Now"
opens your real Square page, no console errors. **Only proceed once this looks
right.**

### 5️⃣ Connect the domain *(after step 4 passes)*
Vercel → Project → **Settings → Domains** → add `mohshinedetailing.com`. Add the
DNS records Vercel shows at your registrar. HTTPS is automatic. Wait until the
live domain loads over `https://`.

### 6️⃣ Submit sitemap to Google Search Console *(after the domain is live)*
The sitemap URLs must resolve on the real domain first. In GSC: verify
`mohshinedetailing.com`, then **Sitemaps → submit**
`https://mohshinedetailing.com/sitemap.xml`.

### 7️⃣ Update Google Business Profile *(right after launch)*
Add `https://mohshinedetailing.com` as the website on your Google Business
Profile (create/claim it if you haven't). This is the single biggest lever for
local "detailing near me" searches — do it as soon as the site is live.

---

### Quick timeline view

```text
Merge #1 → … → #13  →  verify main builds
        ↓
  Fill lib/site.ts (PR #14)  →  add hero photo
        ↓
  Deploy to Vercel  →  verify *.vercel.app
        ↓
  Connect mohshinedetailing.com  →  site live
        ↓
  Submit sitemap to GSC  →  add website to Google Business Profile
```

---

_See also: [`LAUNCH-CHECKLIST.md`](LAUNCH-CHECKLIST.md) for the exact fields to
fill, and [`MEDIA-GUIDE.md`](MEDIA-GUIDE.md) for replacing temporary visuals._
