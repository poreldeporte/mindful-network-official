import type { LandingPageParams } from "./resolve-slug";
import type { ProviderStats } from "./provider-stats";
import type { FaqItem } from "./content";
import { getFacetBlock, getCityBlock } from "./content";

// Assembled, render-ready content for one landing page. Any field may be empty:
// facet/city blocks are only present once authored, faqs only when the facet has
// them, and statsSentence is empty when no providers match.
export interface PageContent {
	facet?: { heading: string; paragraphs: string[] };
	city?: { heading: string; paragraphs: string[] };
	statsSentence: string;
	faqs: FaqItem[];
}

function interpolate(text: string, tokens: Record<string, string>): string {
	return text.replace(/\{(\w+)\}/g, (match, key) => tokens[key] ?? match);
}

// "a" | "a and b" | "a, b and c"
function formatList(items: string[]): string {
	if (items.length === 0) return "";
	if (items.length === 1) return items[0];
	return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function buildStatsSentence(stats: ProviderStats, cityName?: string): string {
	if (stats.count === 0) return "";
	const where = cityName ? ` in ${cityName}` : " across Florida";
	const lead = `This page lists ${stats.count} licensed provider${stats.count !== 1 ? "s" : ""}${where}.`;

	const clauses: string[] = [];
	if (stats.withInsurance > 0) {
		const list = stats.topInsurances.length ? ` including ${formatList(stats.topInsurances)}` : "";
		clauses.push(`${stats.withInsurance} accept insurance${list}`);
	}
	if (stats.telehealth > 0) clauses.push(`${stats.telehealth} offer telehealth sessions`);
	if (stats.spanish > 0) {
		clauses.push(
			`${stats.spanish} provide care in Spanish${stats.creole > 0 ? ` and ${stats.creole} in Creole` : ""}`
		);
	} else if (stats.creole > 0) {
		clauses.push(`${stats.creole} provide care in Creole`);
	}

	const body = clauses.length ? ` Of these, ${clauses.join("; ")}.` : "";
	const creds = stats.credentials.length
		? ` Credentials among them include ${formatList(stats.credentials)}.`
		: "";
	return `${lead}${body}${creds}`;
}

export function getPageContent(page: LandingPageParams, stats: ProviderStats): PageContent {
	const cityName = page.type === "virtual" ? undefined : page.city.name;
	const tokens = { city: cityName ?? "Florida", count: String(stats.count) };

	const facetBlock = getFacetBlock(page);
	const cityBlock = getCityBlock(page);

	return {
		facet: facetBlock
			? {
					heading: facetBlock.heading,
					paragraphs: facetBlock.paragraphs.map((p) => interpolate(p, tokens)),
				}
			: undefined,
		city: cityBlock
			? { heading: cityBlock.heading, paragraphs: cityBlock.paragraphs.map((p) => interpolate(p, tokens)) }
			: undefined,
		statsSentence: buildStatsSentence(stats, cityName),
		faqs: (facetBlock?.faqs ?? []).map((f) => ({
			q: interpolate(f.q, tokens),
			a: interpolate(f.a, tokens),
		})),
	};
}
