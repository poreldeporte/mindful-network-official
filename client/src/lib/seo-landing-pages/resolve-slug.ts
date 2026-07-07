import {
	CITIES, CONDITIONS, INSURANCES, LANGUAGES, RESOURCES, POPULATIONS, VIRTUAL_SLUG,
	type CityConfig, type ConditionConfig, type InsuranceConfig, type LanguageConfig, type ResourceConfig, type PopulationConfig,
} from "./config";

export type LandingPageParams =
	| { type: "condition"; condition: ConditionConfig; city: CityConfig }
	| { type: "insurance"; insurance: InsuranceConfig; city: CityConfig }
	| { type: "language"; language: LanguageConfig; city: CityConfig }
	| { type: "resource"; resource: ResourceConfig; city: CityConfig }
	| { type: "population"; population: PopulationConfig; city: CityConfig }
	| { type: "virtual" };

export function resolveLandingPageSlug(slug: string): LandingPageParams | null {
	if (slug === VIRTUAL_SLUG) {
		return { type: "virtual" };
	}


	// Condition: {condition}-therapist-{city}
	for (const condition of CONDITIONS) {
		for (const city of CITIES) {
			if (slug === `${condition.slug}-therapist-${city.slug}`) {
				return { type: "condition", condition, city };
			}
		}
	}

	// Insurance: therapists-accepting-{insurance}-{city}
	for (const insurance of INSURANCES) {
		for (const city of CITIES) {
			if (slug === `therapists-accepting-${insurance.slug}-${city.slug}`) {
				return { type: "insurance", insurance, city };
			}
		}
	}

	// Language: {language}-speaking-therapist-{city}
	for (const language of LANGUAGES) {
		for (const city of CITIES) {
			if (slug === `${language.slug}-speaking-therapist-${city.slug}`) {
				return { type: "language", language, city };
			}
		}
	}

	// Resource / level-of-care: {resource}-{city}
	for (const resource of RESOURCES) {
		for (const city of CITIES) {
			if (slug === `${resource.slug}-${city.slug}`) {
				return { type: "resource", resource, city };
			}
		}
	}

	// Population / age group: {population}-{city} (e.g. teen-therapist-miami)
	for (const population of POPULATIONS) {
		for (const city of CITIES) {
			if (slug === `${population.slug}-${city.slug}`) {
				return { type: "population", population, city };
			}
		}
	}

	return null;
}
