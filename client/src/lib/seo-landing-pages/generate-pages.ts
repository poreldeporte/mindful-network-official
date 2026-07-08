import { getAllProfessionals } from "@/services";
import { PsychologistModel } from "@/models";
import {
	CITIES, CONDITIONS, INSURANCES, LANGUAGES, RESOURCES, POPULATIONS, VIRTUAL_SLUG, VIRTUAL_MODALITY,
	CITY_NEIGHBORS, PRIORITY_INSURANCE_SLUGS, POPULAR_CONDITION_SLUGS, PRIORITY_RESOURCE_SLUGS, PRIORITY_POPULATION_SLUGS, RELATED_CONDITIONS,
	type CityConfig, type ConditionConfig, type InsuranceConfig, type LanguageConfig, type ResourceConfig, type PopulationConfig,
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

function matchesResource(provider: PsychologistModel, filterValue: string): boolean {
	const target = filterValue.toLowerCase();
	return provider.resource?.some(
		(r) => typeof r?.title === "string" && r.title.toLowerCase() === target
	) ?? false;
}

function matchesAgeSpecialty(provider: PsychologistModel, filterValue: string): boolean {
	const target = filterValue.toLowerCase();
	return provider.ageSpecialty?.some(
		(a) => typeof a?.age === "string" && a.age.toLowerCase() === target
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

	// Resource (level of care) + City
	for (const resource of RESOURCES) {
		for (const city of CITIES) {
			const count = allProfessionals.filter(
				(p: PsychologistModel) => matchesCity(p, city.name) && matchesResource(p, resource.filterValue)
			).length;
			if (count >= MIN_PROVIDERS) {
				slugs.push({ slug: `${resource.slug}-${city.slug}`, count });
			}
		}
	}

	// Population (age group) + City
	for (const population of POPULATIONS) {
		for (const city of CITIES) {
			const count = allProfessionals.filter(
				(p: PsychologistModel) => matchesCity(p, city.name) && matchesAgeSpecialty(p, population.filterValue)
			).length;
			if (count >= MIN_PROVIDERS) {
				slugs.push({ slug: `${population.slug}-${city.slug}`, count });
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
	group: "city" | "specialty" | "insurance" | "language" | "resource" | "population";
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
const resourceLink = (r: ResourceConfig, city: CityConfig) => ({
	slug: `${r.slug}-${city.slug}`,
	label: `${r.label} in ${city.name}`,
});
const populationLink = (p: PopulationConfig, city: CityConfig) => ({
	slug: `${p.slug}-${city.slug}`,
	label: `${p.label} in ${city.name}`,
});

const cityBySlug = (slug: string) => CITIES.find((c) => c.slug === slug);
const conditionBySlug = (slug: string) => CONDITIONS.find((c) => c.slug === slug);
const resourceBySlug = (slug: string) => RESOURCES.find((r) => r.slug === slug);
const populationBySlug = (slug: string) => POPULATIONS.find((p) => p.slug === slug);
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
		// Same city, flagship service categories (feeds inbound links to the
		// newer resource-axis pages from this established page)
		for (const resSlug of PRIORITY_RESOURCE_SLUGS) {
			const res = resourceBySlug(resSlug);
			if (res) add("resource", resourceLink(res, city));
		}
		// Same city, population pages (feeds inbound links to the newer
		// population-axis pages from this established page)
		for (const popSlug of PRIORITY_POPULATION_SLUGS) {
			const pop = populationBySlug(popSlug);
			if (pop) add("population", populationLink(pop, city));
		}
		// Same city, language variants
		for (const lang of LANGUAGES) add("language", languageLink(lang, city));
	} else if (current.type === "insurance") {
		for (const nb of neighbors) add("city", insuranceLink(current.insurance, nb));
		for (const condSlug of POPULAR_CONDITION_SLUGS) {
			const cond = conditionBySlug(condSlug);
			if (cond) add("specialty", conditionLink(cond, city));
		}
		// Same city, flagship service categories (inbound links to resource-axis pages)
		for (const resSlug of PRIORITY_RESOURCE_SLUGS) {
			const res = resourceBySlug(resSlug);
			if (res) add("resource", resourceLink(res, city));
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
	} else if (current.type === "resource") {
		// Same service, nearby cities
		for (const nb of neighbors) add("resource", resourceLink(current.resource, nb));
		// Same city, other service categories
		for (const r of RESOURCES) {
			if (r.slug !== current.resource.slug) add("resource", resourceLink(r, city));
		}
		// Same city, popular specialties
		for (const condSlug of POPULAR_CONDITION_SLUGS) {
			const cond = conditionBySlug(condSlug);
			if (cond) add("specialty", conditionLink(cond, city));
		}
	} else if (current.type === "population") {
		// Same population, nearby cities
		for (const nb of neighbors) add("population", populationLink(current.population, nb));
		// Same city, popular specialties (teens often search by specialty too —
		// adhd/anxiety/depression/trauma therapist)
		for (const condSlug of POPULAR_CONDITION_SLUGS) {
			const cond = conditionBySlug(condSlug);
			if (cond) add("specialty", conditionLink(cond, city));
		}
		// Same city, psychological testing (adjacent teen intent — evaluations)
		const testing = resourceBySlug("psychological-testing");
		if (testing) add("resource", resourceLink(testing, city));
		// Same city, other population pages, if any are added later
		for (const p of POPULATIONS) {
			if (p.slug !== current.population.slug) add("population", populationLink(p, city));
		}
	}

	return links.slice(0, MAX_RELATED);
}

// Resolve a provider's city to one of the CITIES configs using the same
// variant-aware matcher that decides which /find/ pages exist.
function providerCity(provider: PsychologistModel): CityConfig | undefined {
	return CITIES.find((c) => matchesCity(provider, c.name));
}

// Profile-anchored /find/ cross-links (the profile → /find funnel — see
// docs/profile-find-funnel-spec.md). For a given provider, surface the landing
// pages that match THIS provider's own conditions / insurance / language /
// service / age group in their city, validated against the real generated-slug
// set so we can never link to a page that wasn't generated. Mirror of
// getRelatedSlugs() but anchored on a profile instead of a /find/ page; reuses
// the same link builders so labels/slugs stay in sync. Covers all five /find
// axes (condition/insurance/language + resource/population).
export function getProviderFindLinks(
	provider: PsychologistModel,
	validSlugs: Set<string>,
): RelatedLink[] {
	const city = providerCity(provider);
	if (!city) return []; // provider not in a covered city → no city-anchored pages

	const links: RelatedLink[] = [];
	const seen = new Set<string>();
	const add = (group: RelatedLink["group"], item: { slug: string; label: string } | undefined) => {
		if (!item || seen.has(item.slug) || !validSlugs.has(item.slug)) return;
		seen.add(item.slug);
		links.push({ ...item, group });
	};

	// Conditions this provider treats → condition+city pages (the primary orphans)
	for (const cond of provider.conditionSpecialty ?? []) {
		const cfg = CONDITIONS.find((c) => c.filterValue.toLowerCase() === cond?.name?.toLowerCase());
		if (cfg) add("specialty", conditionLink(cfg, city));
	}
	// Age groups this provider treats → population+city pages
	for (const age of provider.ageSpecialty ?? []) {
		const cfg = POPULATIONS.find((p) => p.filterValue.toLowerCase() === age?.age?.toLowerCase());
		if (cfg) add("population", populationLink(cfg, city));
	}
	// Level-of-care services this provider offers → resource+city pages
	for (const res of provider.resource ?? []) {
		const cfg = RESOURCES.find((r) => r.filterValue.toLowerCase() === res?.title?.toLowerCase());
		if (cfg) add("resource", resourceLink(cfg, city));
	}
	// Insurances this provider accepts → insurance+city pages
	for (const ins of provider.insurances ?? []) {
		const cfg = INSURANCES.find((i) => i.filterValue.toLowerCase() === ins?.name?.toLowerCase());
		if (cfg) add("insurance", insuranceLink(cfg, city));
	}
	// Languages this provider speaks → language+city pages
	for (const langName of provider.languages ?? []) {
		const cfg = LANGUAGES.find((l) => l.name.toLowerCase() === langName?.toLowerCase());
		if (cfg) add("language", languageLink(cfg, city));
	}

	return links.slice(0, MAX_RELATED);
}

export function getProviderCount(
	professionals: PsychologistModel[],
	params: { type: string; city: string; condition?: string; insurance?: string; language?: string; resource?: string; population?: string }
): number {
	return professionals.filter((p) => {
		if (!matchesCity(p, params.city)) return false;
		if (params.type === "condition" && params.condition) return matchesCondition(p, params.condition);
		if (params.type === "insurance" && params.insurance) return matchesInsurance(p, params.insurance);
		if (params.type === "language" && params.language) return matchesLanguage(p, params.language);
		if (params.type === "resource" && params.resource) return matchesResource(p, params.resource);
		if (params.type === "population" && params.population) return matchesAgeSpecialty(p, params.population);
		return false;
	}).length;
}

// Return the providers matching a resolved landing page, using the same
// (variant-aware) matchers that decide which pages exist. Callers use this for
// both the headline count and the live "About these providers" stats so the two
// never disagree.
export function matchProviders(
	professionals: PsychologistModel[],
	page: LandingPageParams
): PsychologistModel[] {
	if (page.type === "virtual") {
		return professionals.filter((p) => matchesTherapyModality(p, VIRTUAL_MODALITY));
	}
	return professionals.filter((p) => {
		if (!matchesCity(p, page.city.name)) return false;
		if (page.type === "condition") return matchesCondition(p, page.condition.filterValue);
		if (page.type === "insurance") return matchesInsurance(p, page.insurance.filterValue);
		if (page.type === "language") return matchesLanguage(p, page.language.name);
		if (page.type === "resource") return matchesResource(p, page.resource.filterValue);
		if (page.type === "population") return matchesAgeSpecialty(p, page.population.filterValue);
		return false;
	});
}
