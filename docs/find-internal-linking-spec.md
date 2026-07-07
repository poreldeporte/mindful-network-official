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

**Refreshed 2026-07-03 with GSC 90-day data (2026-04-01→06-30).** Of 140 `/find` pages with ≥10
impressions: 37 already page-1, **44 on page 2 (pos 11–20)** — the target cohort, earning ~2,600
impr/90d at near-zero clicks. Full clustered list + link-source mapping in the SEO repo analysis
(`seo/docs/find-internal-linking-funnel-spec.md`).

**Key routing insight:** every orphaned city *also* has page-1 pages in the **same city** — so the
same-city related-links block should deliberately link page-1 pages *down* to their page-2 same-city
siblings (authority flows from the ranking page into the orphan). Weight the adjacency map / related
selection to exploit this.

**Priority 1 — flagship + near-border (pos 10–13, one nudge from page 1):**

| Page | Impr | Pos |
|------|------|-----|
| `/find/spanish-speaking-therapist-miami` | 292 | 12.6 |
| `/find/autism-therapist-weston` | 122 | 11.4 |
| `/find/therapists-accepting-medicare-miami` | 109 | 11.0 |
| `/find/spanish-speaking-therapist-south-miami` | 88 | 11.4 |
| `/find/anxiety-therapist-south-miami` | 49 | 10.7 |
| `/find/eating-disorders-therapist-aventura` | 48 | 12.9 |
| `/find/lgbtq-therapist-coral-gables` | 37 | 10.1 |
| `/find/relationship-therapist-miami` | 28 | 12.4 |

`spanish-speaking-therapist-miami` is the single biggest prize (292 impr of high-intent Spanish demand).

**Priority 2 — orphan city clusters (fix as whole same-city hubs; page-1 link sources in italics):**
- **Weston** (9 pages, 713 impr): anxiety, trauma, autism, depression, adhd, ocd, womens-issues, bcbs, grief. *from page-1 Weston: spanish-speaking(7), aetna(8), unitedhealthcare(8), cigna(5).*
- **Aventura** (4 pages, 440 impr): trauma(205i@19.9), anxiety(175i), eating-disorders, relationship. *from: autism(8), spanish-speaking(8), medicare(8), ocd(10).*
- **Coral Gables** (6 pages, 298 impr): trauma, ocd, lgbtq, addiction, medicaid, bipolar. *from: parenting(8), autism(8), grief(9), aetna/bcbs/cigna/uhc.*
- **Coral Springs** (8 pages, 211 impr): ocd, womens-issues, parenting, trauma, grief, addiction, eating-disorders, medicare. *from: spanish-speaking(7), aetna(7), cigna(6), uhc(7).*
- **South Miami** (4 pages, 201 impr): spanish-speaking, anxiety, grief, trauma.

## Provider availability & new page types (checked 2026-07-03)

New `/find` page types only rank if Sanity has providers to fill them (same ≥2-provider validity gate
as existing pages). Availability results:

- **Teen / adolescent — READY TO BUILD.** 322 providers tag `ageSpecialty == "Adolescent"` (Miami 117,
  Coral Gables 77, Coral Springs 17, Aventura 16, Weston 15, Boca 13, South Miami 13). Add `teen` (or
  an `age` axis) to the landing-page `config.ts` and build `/find/teen-therapist-{miami,coral-gables,florida}`.
  Born into the link mesh from day one so they don't start orphaned.
- **Psychological testing / evaluations — READY TO BUILD (already tagged).** These live on the
  **`resource`** field (→ `resources` doc type = the site's "Level of care" facet), a *separate axis*
  from `therapyModality`/`conditionSpecialty`. Counts: **Psychological Testing 64** (Miami 21, Coral
  Gables 10, Aventura 10, Weston 6, Boca 3, South Miami 3, Fort Lauderdale 2, Hallandale 2 — 8 cities
  ≥2), Psychoeducational Testing 28 (Miami 12, CG 5, Aventura 4…), Neuropsychological Evaluations 14
  (Miami 8, Boca 2, Aventura 2), Gifted Evaluations 18. Build `/find/psychological-testing-{miami,
  coral-gables,aventura,weston,florida}` off the `resource` axis. Aventura is the sweet spot (10
  providers + the strongest testing-query demand per GSC).
- **NEW /find AXIS — `resource` / "Level of care".** This whole field was previously unused for `/find`
  pages. Beyond testing, buildable clinical categories include Psychiatry/Medication Management (63),
  Life Coach (14), Innovative Therapies (15). (Skip the facility categories — Residential/Inpatient/
  Detox/Baker Act/Sober Housing — those are the org-type listings flagged for pruning.) Extend the
  landing-page `config.ts` with a `resource` axis alongside condition/insurance/language.

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
