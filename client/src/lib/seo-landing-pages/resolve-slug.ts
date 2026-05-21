import {
	CITIES, CONDITIONS, INSURANCES, LANGUAGES, VIRTUAL_SLUG,
	type CityConfig, type ConditionConfig, type InsuranceConfig, type LanguageConfig,
} from "./config";

export type LandingPageParams =
	| { type: "condition"; condition: ConditionConfig; city: CityConfig }
	| { type: "insurance"; insurance: InsuranceConfig; city: CityConfig }
	| { type: "language"; language: LanguageConfig; city: CityConfig }
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

	return null;
}
