import { getAllProfessionals } from "@/services";
import { PsychologistModel } from "@/models";
import {
	CITIES, CONDITIONS, INSURANCES, LANGUAGES, VIRTUAL_SLUG, VIRTUAL_MODALITY,
	CITY_NEIGHBORS, PRIORITY_INSURANCE_SLUGS, POPULAR_CONDITION_SLUGS, RELATED_CONDITIONS,
	type CityConfig, type ConditionConfig, type InsuranceConfig, type LanguageConfig,
} from "./config";
import type { LandingPageParams } from "./resolve-slug";

const MIN_PROVIDERS = 2;

function normalizeCity(city: string): string {
	return city.trim().toLowerCase();
}

function matchesCity(provider: PsychologistModel, cityName: string): boolean {
	const providerCity = normalizeCity(provider.address?.city || "");
	const target = normalizeCity(cityName);
	// Handle variants like "Coral Gables" vs "Coral Gable" or "Ft. Lauderdale"
	if (providerCity === target) return true;
	if (target === "fort lauderdale" && (providerCity === "ft. lauderdale" || providerCity.includes("fort lauderdale"))) return true;
	if (target === "coral gables" && providerCity.startsWith("coral gable")) return true;
	return false;
}

function matchesCondition(provider: PsychologistModel, filterValue: string): boolean {
	return provider.conditionSpecialty?.some(
		(c) => c.name.toLowerCase() === filterValue.toLowerCase()
	) ?? false;
}

function matchesInsurance(provider: PsychologistModel, filterValue: string): boolean {
	return provider.insurances?.some(
		(i) => i.name.toLowerCase() === filterValue.toLowerCase()
	) ?? false;
}

function matchesLanguage(provider: PsychologistModel, language: string): boolean {
	return provider.languages?.some(
		(l) => l.toLowerCase() === language.toLowerCase()
	) ?? false;
}

function matchesTherapyModality(provider: PsychologistModel, modality: string): boolean {
	const target = modality.toLowerCase();
	return provider.therapyOptions?.some(
		(m) => typeof m?.type === "string" && m.type.toLowerCase() === target
	) ?? false;
}

export interface LandingPageSlug {
	slug: string;
	count: number;
}

// Pure slug computation over an already-fetched provider list. Extracted so
// callers that already hold the professionals array (the /find/ page) can derive
// the valid-slug set without re-fetching from Sanity.
export function computeLandingPageSlugs(allProfessionals: PsychologistModel[]): LandingPageSlug[] {
	if (!allProfessionals || !Array.isArray(allProfessionals)) return [];

	const slugs: LandingPageSlug[] = [];

	// Condition + City
	for (const condition of CONDITIONS) {
		for (const city of CITIES) {
			const count = allProfessionals.filter(
				(p: PsychologistModel) => matchesCity(p, city.name) && matchesCondition(p, condition.filterValue)
			).length;
			if (count >= MIN_PROVIDERS) {
				slugs.push({ slug: `${condition.slug}-therapist-${city.slug}`, count });
			}
		}
	}

	// Insurance + City
	for (const insurance of INSURANCES) {
		for (const city of CITIES) {
			const count = allProfessionals.filter(
				(p: PsychologistModel) => matchesCity(p, city.name) && matchesInsurance(p, insurance.filterValue)
			).length;
			if (count >= MIN_PROVIDERS) {
				slugs.push({ slug: `therapists-accepting-${insurance.slug}-${city.slug}`, count });
			}
		}
	}

	// Language + City
	for (const language of LANGUAGES) {
		for (const city of CITIES) {
			const count = allProfessionals.filter(
				(p: PsychologistModel) => matchesCity(p, city.name) && matchesLanguage(p, language.name)
			).length;
			if (count >= MIN_PROVIDERS) {
				slugs.push({ slug: `${language.slug}-speaking-therapist-${city.slug}`, count });
			}
		}
	}

	// Virtual / online therapy — statewide, no city
	const virtualCount = allProfessionals.filter(
		(p: PsychologistModel) => matchesTherapyModality(p, VIRTUAL_MODALITY)
	).length;
	if (virtualCount >= MIN_PROVIDERS) {
		slugs.push({ slug: VIRTUAL_SLUG, count: virtualCount });
	}

	return slugs;
}

export async function getAllLandingPageSlugs(): Promise<LandingPageSlug[]> {
	const allProfessionals = await getAllProfessionals();
	return computeLandingPageSlugs(Array.isArray(allProfessionals) ? allProfessionals : []);
}

// --- Related-page cross-linking --------------------------------------------

export interface RelatedLink {
	slug: string;
	label: string;
	group: "city" | "specialty" | "insurance" | "language";
}

const MAX_RELATED = 10;

const conditionLink = (c: ConditionConfig, city: CityConfig) => ({
	slug: `${c.slug}-therapist-${city.slug}`,
	label: `${c.therapistLabel} in ${city.name}`,
});
const insuranceLink = (i: InsuranceConfig, city: CityConfig) => ({
	slug: `therapists-accepting-${i.slug}-${city.slug}`,
	label: `Therapists Accepting ${i.name} in ${city.name}`,
});
const languageLink = (l: LanguageConfig, city: CityConfig) => ({
	slug: `${l.slug}-speaking-therapist-${city.slug}`,
	label: `${l.name}-Speaking Therapists in ${city.name}`,
});

const cityBySlug = (slug: string) => CITIES.find((c) => c.slug === slug);
const conditionBySlug = (slug: string) => CONDITIONS.find((c) => c.slug === slug);
const insuranceBySlug = (slug: string) => INSURANCES.find((i) => i.slug === slug);

// Given the current page, return sibling /find/ pages that actually exist
// (validated against `validSlugs`, so we never emit a link to a page that won't
// be generated). Capped at MAX_RELATED, ordered by descending authority value.
export function getRelatedSlugs(current: LandingPageParams, validSlugs: Set<string>): RelatedLink[] {
	const links: RelatedLink[] = [];
	const seen = new Set<string>();
	const add = (group: RelatedLink["group"], item: { slug: string; label: string } | undefined) => {
		if (!item || seen.has(item.slug) || !validSlugs.has(item.slug)) return;
		seen.add(item.slug);
		links.push({ ...item, group });
	};

	if (current.type === "virtual") {
		// No city anchor — surface popular specialty pages in the largest markets.
		for (const citySlug of ["miami", "fort-lauderdale", "boca-raton"]) {
			const city = cityBySlug(citySlug);
			if (!city) continue;
			for (const condSlug of POPULAR_CONDITION_SLUGS) {
				const cond = conditionBySlug(condSlug);
				if (cond) add("specialty", conditionLink(cond, city));
			}
		}
		return links.slice(0, MAX_RELATED);
	}

	const city = current.city;
	const neighbors = (CITY_NEIGHBORS[city.slug] ?? []).map(cityBySlug).filter(Boolean) as CityConfig[];

	if (current.type === "condition") {
		// Same specialty, nearby cities
		for (const nb of neighbors) add("city", conditionLink(current.condition, nb));
		// Same city, clinically related specialties
		const related = RELATED_CONDITIONS[current.condition.slug] ?? POPULAR_CONDITION_SLUGS;
		for (const condSlug of related) {
			const cond = conditionBySlug(condSlug);
			if (cond) add("specialty", conditionLink(cond, city));
		}
		// Same city, highest-authority insurance pages
		for (const insSlug of PRIORITY_INSURANCE_SLUGS) {
			const ins = insuranceBySlug(insSlug);
			if (ins) add("insurance", insuranceLink(ins, city));
		}
		// Same city, language variants
		for (const lang of LANGUAGES) add("language", languageLink(lang, city));
	} else if (current.type === "insurance") {
		for (const nb of neighbors) add("city", insuranceLink(current.insurance, nb));
		for (const condSlug of POPULAR_CONDITION_SLUGS) {
			const cond = conditionBySlug(condSlug);
			if (cond) add("specialty", conditionLink(cond, city));
		}
		for (const ins of INSURANCES) {
			if (ins.slug !== current.insurance.slug) add("insurance", insuranceLink(ins, city));
		}
	} else if (current.type === "language") {
		for (const nb of neighbors) add("city", languageLink(current.language, nb));
		for (const condSlug of POPULAR_CONDITION_SLUGS) {
			const cond = conditionBySlug(condSlug);
			if (cond) add("specialty", conditionLink(cond, city));
		}
	}

	return links.slice(0, MAX_RELATED);
}

export function getProviderCount(
	professionals: PsychologistModel[],
	params: { type: string; city: string; condition?: string; insurance?: string; language?: string }
): number {
	return professionals.filter((p) => {
		if (!matchesCity(p, params.city)) return false;
		if (params.type === "condition" && params.condition) return matchesCondition(p, params.condition);
		if (params.type === "insurance" && params.insurance) return matchesInsurance(p, params.insurance);
		if (params.type === "language" && params.language) return matchesLanguage(p, params.language);
		return false;
	}).length;
}
