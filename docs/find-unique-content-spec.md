# Spec: Unique per-page content for `/find/` landing pages

**Goal:** Clear the "Crawled - currently not indexed" / thin-content verdict on the ~169 `/find/`
pages by giving each one genuinely distinct, substantive body content. This is the second half of the
`/find/` fix — pair it with `find-internal-linking-spec.md`. Internal links fix crawl/authority;
unique content fixes the "this page is a near-duplicate template" judgment that keeps Google from
indexing or ranking them.

## The problem, precisely

All page copy comes from a **single templated function**:
`client/src/lib/seo-landing-pages/config.ts` → `generateIntro()` (lines 85–109).

It emits **one ~3-sentence paragraph** with city/condition/descriptor string-swapped in. Every
condition page is the same sentence skeleton:

> "Finding the right therapist for {condition} in {city} can feel overwhelming. The Mindful Network
> connects you with licensed professionals in {descriptor} who specialize in treating {condition}.
> Browse {N} providers who understand your needs…"

So `/find/anxiety-therapist-miami` and `/find/depression-therapist-boca-raton` are ~90% identical
character-for-character. To Google these read as boilerplate doorway pages → not indexed, or indexed
but ranked at position 30+. The city `descriptor` field (e.g. "South Florida's largest city") is a
good start but it's the only varying clause in an otherwise fixed template.

**Below the intro there is no body content at all** — the page goes straight into the provider list
(`<SearchWrapper>`). There's nothing for Google to index as unique, topical, helpful content.

## What "unique enough" means

The bar is not "spin the words." It's **substantive content a searcher actually wants** that
naturally differs per page because the facts differ. Target ~300–500 words of unique body copy per
page, built from real, page-specific data:

1. **Condition/insurance/language-specific guidance** — what this kind of therapy involves, what to
   look for, common approaches. Varies by facet, not by city. (~15 condition variants, 7 insurance,
   2 language → a finite, writeable set of "topic blocks.")
2. **City-specific context** — local angle: neighborhoods/counties served, in-person vs telehealth
   mix, the existing `descriptor`. Varies by city (15 variants).
3. **Live provider-derived facts** — pull from the already-fetched provider list: "N providers,
   M accept {insurance}, K offer telehealth, common specialties include …". This is genuinely unique
   per page because it reflects real matched data, and it updates automatically via ISR.
4. **FAQ block** (3–5 Q&A) — e.g. "How much does an anxiety therapist in Miami cost?", "Do these
   therapists take {insurance}?", "Can I see a {language}-speaking therapist online?". Drives
   FAQ rich-result eligibility and adds long-tail keyword surface. Answers templated per
   facet+city from real data.

The combination — facet topic block × city block × live provider stats × FAQ — makes each page's body
materially different even though they share a system.

## Recommended approach: hybrid (curated blocks + live data), not pure AI-per-page

Do **not** AI-generate 169 freeform pages — that risks the same homogeneity plus hallucinated local
claims, and it's unmaintainable. Instead:

### A. Author a finite set of reusable, fact-rich blocks (one-time content work)
- **One condition block per condition** (15), one per insurance (7), one per language (2): 2–3
  paragraphs of real guidance about that topic. Stored as structured content, NOT inline template
  strings. Two options:
  - **Sanity** (preferred): a new `landingPageContent` document type keyed by facet slug, so
    marketing/Denise can edit copy without a deploy. Fits the "reads from Sanity `dev` dataset"
    architecture.
  - Or a typed config module (`seo-landing-pages/content/conditions.ts` …) if CMS editing isn't
    needed yet. Lower lift, but copy changes require a deploy.
- **One city block per city** (15): local context paragraph, expanding the `descriptor`.
- This is ~24 short authored pieces total — finite and human-quality. A page = facet block + city
  block + live stats + FAQ, so 15×15 condition×city pages are all distinct combinations of real text.

> On-brand option for drafting the 24 blocks: reuse the CCA-F Claude prompt-chain pattern from the
> SEO repo's `fill-gaps.js` — generate drafts, then **human-review before publish** (same triple-check
> discipline). Generation is fine; unreviewed publish is not.

### B. Compose them at render time with live provider data
- In `find/[slug]/page.tsx`, after fetching providers, compute page-specific stats
  (count, % accepting each insurance, telehealth count, top 3 specialties among matches).
- Render: city-aware intro → facet topic block → city block → "About these N providers" live-stats
  paragraph → provider list (`<SearchWrapper>`) → FAQ → related links (from the linking spec).
- All body content must be **server-rendered in static HTML**, outside the `<SearchWrapper>` Suspense
  boundary, so Googlebot indexes it.

### C. Differentiate the meta description too
Today descriptions are byte-identical boilerplate (confirmed via `fetch_page_meta` 2026-06-11). Derive
each from the live stats ("N anxiety therapists in Miami, M accepting insurance, offering in-person &
telehealth") so SERP snippets differ per page.

## Schema markup
- Add **FAQPage** structured data for the FAQ block (eligible for rich results).
- Keep the existing CollectionPage + BreadcrumbList schema.

## Changes summary

| File | Change |
|------|--------|
| `config.ts` | Replace single `generateIntro()` with a composer that pulls authored blocks; keep city `descriptor` usage |
| New: Sanity `landingPageContent` type (or `content/*.ts`) | Authored facet + city blocks |
| New: `seo-landing-pages/content.ts` | `getPageContent(params, providers)` → assembles intro + blocks + live stats + FAQ |
| `find/[slug]/page.tsx` | Render composed body server-side before/around `<SearchWrapper>`; emit FAQPage schema; build meta description from live stats |
| (with linking spec) | `<RelatedSearches>` at bottom |

## Acceptance / verification
- Two arbitrary `/find/` pages share <30% body text (spot-check anxiety-miami vs depression-boca).
- `view-source` shows the full body copy + FAQ in static HTML (not client-injected).
- Each page body ≥300 words of facet/city/stat-derived content; no two FAQs identical across facets.
- FAQPage schema validates (Google Rich Results Test).
- ~4–8 weeks post-deploy, re-check the target pages with `mcp__tmn-seo__inspect_batch`
  (`page_type: find`) — expect "Crawled - not indexed" pages to flip to indexed, and
  `mcp__tmn-seo__search_analytics` positions to climb.

## Sequencing
Ship **internal linking first** (cheaper, helps crawl immediately), then this content pass. Together
they address both halves of the verdict: orphaned (links) + thin (content). Validate on the priority
target pages from the linking spec (`trauma-coral-gables` pos 15, `adhd-weston` pos 15) before rolling
to all 169.

## Out of scope
- Provider-page (`/professional/`) content — different template, different fix.
- The non-clinical title-template bug (SEO repo memory `project_title_template_non_clinical`).
