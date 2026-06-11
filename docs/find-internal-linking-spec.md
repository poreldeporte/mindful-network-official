# Spec: Internal linking for `/find/` landing pages

**Goal:** Push the ~169 `/find/` directory pages from page 2–4 onto page 1 for unbranded local
queries (e.g. "anxiety therapist coral gables", "adhd therapist weston"). They have the impressions
already — GSC shows 5,000+/month across them — but sit at positions 15–47 with near-zero clicks.
Root cause is **thin unique content + no internal links**, not anything technical (titles, canonicals,
robots are all correct — verified 2026-06-11 via `fetch_page_meta`).

This spec covers the internal-linking half. (Unique intro copy is a separate, complementary fix.)

## Why internal linking

Each `/find/` page today is an island: the only outbound links are provider cards →
`/professional/<slug>`. There are no links **between** `/find/` pages. That means:
- Googlebot has no crawl path connecting the 169 pages → they look orphaned/thin.
- No internal PageRank flows between them, so none can build authority.
- Users who land on "anxiety therapist Miami" can't pivot to "anxiety therapist Fort Lauderdale"
  or "Medicaid therapists Miami" — they bounce.

Cross-linking siblings turns the 169 islands into a connected topical cluster. This is the single
highest-leverage on-page change for these URLs.

## Current implementation (as of 2026-06-11)

- **Route:** `client/src/app/(with_nav)/find/[slug]/page.tsx` — dynamic, ISR `revalidate = 3600`,
  pre-rendered via `generateStaticParams()`.
- **Slug config:** `client/src/lib/seo-landing-pages/config.ts` — hardcoded arrays: `CITIES` (15),
  `CONDITIONS` (15), `INSURANCES` (7), `LANGUAGES` (2), plus the statewide virtual page.
- **Slug generation:** `client/src/lib/seo-landing-pages/generate-pages.ts` →
  `getAllLandingPageSlugs()` returns `{ slug, count }[]`, emitting a page only when **≥2 providers**
  match. This is the authoritative "which pages exist" list (also drives `app/sitemap.ts`).
- **Slug → params:** `client/src/lib/seo-landing-pages/resolve-slug.ts` → `resolveLandingPageSlug(slug)`
  returns the `LandingPageParams` (type + condition/insurance/language + city).
- **Page body today:** header (badge + H1 + generated intro + count) then `<SearchWrapper>` with the
  provider list. **No related-links section. No visible breadcrumb UI.**
- **Reusable breadcrumb pattern:** `client/src/routes/psychologists/components/detail-v2/ListingHero.tsx`
  (lines ~21–46) — `<nav aria-label="Breadcrumb"><ol>…`. Copy this markup/styling for consistency.

## Changes

### 1. `getRelatedSlugs()` helper — `generate-pages.ts`

Add a function that, given the current page's resolved params, returns sibling pages **that actually
exist** (reuse the existing ≥2-provider validity check / `getAllLandingPageSlugs()` set — never link
to a page that won't be generated, or we create soft-404 internal links).

```ts
// generate-pages.ts
export function getRelatedSlugs(
  current: LandingPageParams,
  validSlugs: Set<string>,   // from getAllLandingPageSlugs(), passed in or memoized
): Array<{ slug: string; label: string; group: 'city' | 'specialty' | 'insurance' | 'language' }> { … }
```

Selection rules (cap total at ~8–10 links, all must be in `validSlugs`):
- **Same specialty/insurance/language, nearby cities** — 3–4 links. Define a small adjacency map in
  `config.ts` (e.g. Miami ↔ Coral Gables, Aventura, Hialeah; Fort Lauderdale ↔ Hollywood, Pompano).
  Falls back to other valid cities for that facet if no adjacency entry.
- **Same city, related specialties** — 2–3 links. e.g. anxiety → depression, trauma, ADHD.
- **Same city, top insurance pages** — 1–2 links (Medicaid/Medicare/Aetna in this city), since those
  already rank best (pos ~9) and pass the most authority.
- **Same city, language variant** — 1 link if a Spanish/Creole page exists for the city and the
  current page isn't already a language page.

Order matters for crawl priority — emit the highest-ranking siblings (insurance, page-2 specialties)
first.

### 2. `<RelatedSearches>` component — new file

`client/src/routes/find/components/RelatedSearches.tsx`

- Plain `<a>`/`<Link>` text links (real anchors, server-rendered — must be in static HTML, **not**
  client-rendered behind Suspense, or Googlebot may not see them).
- Grouped with `<h2>` subheads: "Therapists in nearby cities", "Other specialties in {City}",
  "By insurance in {City}". Descriptive anchor text = the sibling page's H1 phrasing
  ("Anxiety therapists in Fort Lauderdale"), not "click here".
- Match existing card/badge styling; keep it lightweight (a link grid, not repeated faceted search).

### 3. Render in the page — `find/[slug]/page.tsx`

- After resolving `page` params, call `getRelatedSlugs(page, validSlugs)` **server-side**.
- Render `<RelatedSearches links={…} city={…} />` **before `</main>`, outside the `<SearchWrapper>`
  Suspense boundary**, so the links are in the initial server HTML.
- Add a visible breadcrumb at the top reusing the `ListingHero` pattern: Home → Find → {Specialty} →
  {City}, with the specialty crumb linking to a city-agnostic hub if one exists (else omit that crumb).

### 4. Optional but recommended: `/find` index hub

If no `/find` index page exists, add one linking to all (or the top) landing pages grouped by
city/specialty. A single hub page gives every leaf page one strong, stable internal link and a crawl
entry point. Low effort, high crawl-equity payoff.

## Priority target pages (validate the lift here first)

From GSC 56-day data — high impressions, climbable position, currently 0 clicks:

| Page | Impr | Pos |
|------|------|-----|
| `/find/trauma-therapist-coral-gables` | 90 | 15.4 |
| `/find/adhd-therapist-weston` | 36 | 15.1 |
| `/find/anxiety-therapist-coral-gables` | 52 | 20.6 |
| `/find/adhd-therapist-coral-gables` | 34 | 25.3 |
| `/find/anxiety-therapist-fort-lauderdale` | 544 | 47.6 (volume monster, hardest climb) |

The pos-14–21 cluster is one good content+linking pass from page 1 — measure those.

## Acceptance / verification

- All generated related links resolve 200 (no soft-404s): cross-check every emitted slug against
  `getAllLandingPageSlugs()`.
- `view-source` on a `/find/` page shows the related links in static HTML (not injected client-side).
- Each page has ≥4 and ≤10 internal `/find/` links; anchor text is descriptive and unique.
- Re-run `mcp__tmn-seo__search_analytics` (dimension `page`, filter `/find/`) ~3–4 weeks post-deploy;
  expect the pos-14–21 targets to move toward page 1 and start taking clicks.

## Out of scope (track separately)

- Unique per-page intro copy (the other half of the "thin content" verdict).
- The non-clinical title-template bug (see SEO repo memory `project_title_template_non_clinical`).
- Anything in the SEO/scraper repos — this is entirely a frontend change.
