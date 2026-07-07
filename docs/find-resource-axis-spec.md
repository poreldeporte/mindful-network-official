# Spec: `/find/` resource axis — new landing pages from the "Level of care" facet

**Goal:** Add a **new page dimension** to the `/find/` programmatic landing pages, driven by the
`professionals.resource` field (the site's "Level of care" facet → `resources` doc type). This field
was previously unused for `/find/` generation and unlocks ~67 new city+statewide pages across ~16
clinical service categories — the largest single expansion of the `/find/` program.

Companion to `find-internal-linking-spec.md` (mesh these new pages in from day one) and
`find-unique-content-spec.md` (each needs unique intro copy). Analysis basis:
`seo/docs/find-internal-linking-funnel-spec.md`, memory `project_find_page_expansion_pending`.
Inventory verified on Sanity `dev` 2026-07-03.

## Why this axis

The `/find/` generator today emits pages from three axes only: **condition** (`conditionSpecialty`),
**insurance** (`insurances`), **language** (`languages`). It never used **`resource`** — yet that field
carries high-intent, distinct-search-intent service categories that aren't therapies or conditions:
**psychiatry/medication management, psychological testing, neuropsych evaluations, gifted evaluations,
life coaching**, etc. "Psychiatrist in Miami" and "psychological testing near me" are their own search
markets with real provider inventory behind them.

## Data model (already in place — no CMS work)

- Field: `professionals.resource` — array of references to the **`resources`** doc type (fieldset
  "Filters"). Label field on the target doc is **`title`**.
- 35 resource categories exist; providers are already tagged. GROQ to count for a (category, city):
  ```groq
  count(*[_type == "professionals"
    && $resourceTitle in resource[]->title
    && address.city == $city])
  ```
  (Prefer filtering by the resource doc `_id` over `title` for stability — resolve the id once in config.)

## Buildable categories & inventory (Sanity `dev`, 2026-07-03)

Same **≥2-provider** validity gate as the existing axes (`getAllLandingPageSlugs()`); only emit a
city page where ≥2 providers match, plus one statewide page per category.

### Tier 1 — build first (high search intent × strong inventory)

**Psychiatry / Medication Management** — 63 providers, 8 cities. Slug: `/find/psychiatrist-{city}`
(primary; "psychiatrist" > "medication management" in search volume — consider a secondary
`/find/medication-management-{city}` alias later).
> Miami (20), Coral Gables (13), Fort Lauderdale (5), Hollywood (4), Lantana (4), Aventura (3), Miramar (2), Weston (2) + `-florida`.

**Psychological Testing** — 64 providers, 8 cities. Slug: `/find/psychological-testing-{city}`.
Aventura is the sweet spot (10 providers + the strongest testing-query demand in GSC).
> Miami (21), Coral Gables (10), Aventura (10), Weston (6), Boca Raton (3), South Miami (3), Fort Lauderdale (2), Hallandale Beach (2) + `-florida`.

### Tier 2 — the evaluation family + wellness (build as a cluster; cross-link to `/students`)

| Category | Slug pattern | Providers | Buildable cities |
|---|---|---|---|
| Psychoeducational Testing | `/find/psychoeducational-testing-{city}` | 28 | Miami 12, Coral Gables 5, Aventura 4, Weston 2, Boca 2 |
| Gifted Evaluations | `/find/gifted-evaluation-{city}` | 18 | Miami 6, Aventura 4, Coral Gables 3, Boca 2 |
| Neuropsychological Evaluations | `/find/neuropsychological-evaluation-{city}` | 14 | Miami 8, Boca 2, Aventura 2 |
| Mind-Body Wellness | `/find/mind-body-wellness-{city}` | 24 | Coral Gables 8, Sunny Isles 5, Miami 4, Miami Beach 2 |
| Life Coach | `/find/life-coach-{city}` | 14 | Miami 5, Coral Gables 3, Boca 2 |
| Innovative Therapies | `/find/innovative-therapy-{city}` | 15 | Fort Lauderdale 5, Hollywood 3, Miami 2 |

The three testing/eval categories (psychological, psychoeducational, neuropsych) + gifted overlap
heavily in Miami/Aventura — build them as a linked cluster and cross-link with the existing
`/students` section (already targets psychoeducational testing).

### Tier 3 — statewide-only / validate demand first
Speech Therapy (13; Miami 9), Occupational Therapy (8), Case Management (13; Boca 6), Interventionist
(7; Boca 5), Registered Dietitian (6), Genetic Testing (2), Pediatric Care (4). Thin per-city — build a
single `-florida` page each, and confirm query demand in GSC/Keyword data before investing.

### Do NOT build
- **Facility categories** (Outpatient/Residential/Inpatient/Detox/Baker Act/Sober Housing/Virtual
  Outpatient/Schools) — these tag the org/facility listings flagged for pruning (SEO repo memory
  `directory-data-quality-issues`); building pages for them works against the de-dilution goal.
  *Useful side effect:* `resource[]->title in [facility categories]` is a clean query to help identify
  the prune set.
- **"Therapy"** (441 providers = ~everyone) — generic, not a differentiator.
- Any category whose name collides with an existing **condition** page (e.g. "Eating Disorders" exists
  as both a resource and a `conditionSpecialty`) — keep the existing condition page; do not create a
  competing resource page for the same term.

## Implementation

Mirror the existing condition/insurance axis end-to-end.

### 1. `config.ts` — add the resource axis
`client/src/lib/seo-landing-pages/config.ts`
- Add a `RESOURCES` array: `{ slug, label, resourceTitle (or resourceId), tier }[]` for the Tier-1/2
  categories above. `slug` is the URL fragment (`psychiatrist`, `psychological-testing`, …);
  `resourceTitle` is the exact `resources.title` to match.
- Keep the existing `CITIES` array as the city axis (reused unchanged).

### 2. `generate-pages.ts` — emit resource×city slugs
`client/src/lib/seo-landing-pages/generate-pages.ts`
- In `getAllLandingPageSlugs()`, add a loop over `RESOURCES × CITIES`, emitting `${resource.slug}-${city.slug}`
  when the (resource, city) provider count ≥2, plus a statewide `${resource.slug}-florida` when the
  category total ≥2. Reuse the existing count/validity mechanism so `sitemap.ts` and the related-links
  validity set pick these up automatically.

### 3. `resolve-slug.ts` — parse the new shape
`client/src/lib/seo-landing-pages/resolve-slug.ts`
- Extend `resolveLandingPageSlug(slug)` to recognize resource slugs (match against `RESOURCES` slugs)
  and return `LandingPageParams` with a new `resource` discriminant + city. Add a `resource` branch to
  the `LandingPageParams` type.

### 4. Provider query — filter by resource
Wherever the page resolves its provider list from params, add the `resource` filter:
`$resourceTitle in resource[]->title && address.city == $city` (statewide: drop the city clause).

### 5. Content — `content/resources.ts`
- Add unique intro copy + FAQ per resource category (do NOT reuse the condition copy — distinct intent).
  Testing/eval categories should explain evaluation ≠ therapy and mention turnaround/what to expect;
  psychiatry copy should mention medication management, prescribing, and med-only vs therapy.
- Follow `find-unique-content-spec.md` so these don't read as thin/duplicate.

### 6. Internal linking — plug into the mesh
- Feed resource pages into `getRelatedSlugs()` (see `find-internal-linking-spec.md`): each resource
  page links to (a) same category in nearby cities, (b) same city other resources + top conditions,
  (c) testing pages cross-link to `/students`. Born meshed, never orphaned.

## Acceptance / verification

- Every emitted resource slug resolves 200 and shows ≥2 providers; no soft-404s (cross-check against
  `getAllLandingPageSlugs()`).
- `view-source` shows resource pages in the sitemap and with server-rendered related links.
- Intro copy is unique per category (not cloned from conditions).
- Re-run `mcp__tmn-seo__search_analytics` (dimension `page`, filter `/find/`) ~3–4 weeks post-deploy;
  psychiatrist-* and psychological-testing-* should begin earning impressions (these are net-new URLs,
  so measure appearance + position, not lift).

## Out of scope
- Facility-category pages and the "Therapy"/generic category (above).
- The org-pruning project itself (SEO repo; parked pending Denise) — only referenced here because the
  facility resource tags help identify that set.
- CMS/tagging work — none required; the `resource` data already exists.
