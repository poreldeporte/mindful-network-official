import { getAllProfessionals } from "@/services";
import { PsychologistModel } from "@/models";
import { CITIES, CONDITIONS, INSURANCES, LANGUAGES } from "./config";

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

export interface LandingPageSlug {
	slug: string;
	count: number;
}

export async function getAllLandingPageSlugs(): Promise<LandingPageSlug[]> {
	const allProfessionals = await getAllProfessionals();
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

	return slugs;
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
