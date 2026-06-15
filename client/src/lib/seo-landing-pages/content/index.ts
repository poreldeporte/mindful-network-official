import type { LandingPageParams } from "../resolve-slug";
import type { FacetBlock, CityBlock } from "./types";
import { CONDITION_CONTENT } from "./conditions";
import { INSURANCE_CONTENT } from "./insurances";
import { LANGUAGE_CONTENT } from "./languages";
import { CITY_CONTENT } from "./cities";

export type { FacetBlock, CityBlock, FaqItem } from "./types";

// Resolve the authored facet block for a page, if one exists yet. Returns
// undefined for facets/slugs not authored — callers must handle that (the page
// simply omits the block and still renders live stats).
export function getFacetBlock(page: LandingPageParams): FacetBlock | undefined {
	if (page.type === "condition") return CONDITION_CONTENT[page.condition.slug];
	if (page.type === "insurance") return INSURANCE_CONTENT[page.insurance.slug];
	if (page.type === "language") return LANGUAGE_CONTENT[page.language.slug];
	return undefined; // virtual — no facet block authored yet
}

export function getCityBlock(page: LandingPageParams): CityBlock | undefined {
	if (page.type === "virtual") return undefined;
	return CITY_CONTENT[page.city.slug];
}
