// Authored content blocks for /find/ landing pages. Stored in code (typed
// modules) rather than a CMS — copy edits ship via deploy. See
// docs/find-unique-content-spec.md for the rationale and the full plan.
//
// A page body is composed from: facet block (reused per condition/insurance/
// language) + city block (reused per city) + a live "About these providers"
// sentence (computed per page) + the facet's FAQs. Authoring a block is
// optional — a page with no authored block still renders the live stats, so the
// rollout can proceed facet-by-facet without breaking any page.
//
// Token interpolation: {city} and {count} in any string are replaced at render
// time. Facet blocks are city-agnostic, so use {city} rather than hard-coding a
// city name. City blocks are city-specific and may name the city directly.

export interface FaqItem {
	q: string;
	a: string;
}

// Reusable block for a condition / insurance / language facet (no city baked in).
export interface FacetBlock {
	heading: string;
	paragraphs: string[];
	faqs: FaqItem[];
}

// Reusable block for a city (local context).
export interface CityBlock {
	heading: string;
	paragraphs: string[];
}
