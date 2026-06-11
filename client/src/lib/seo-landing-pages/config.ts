export interface CityConfig {
	name: string;
	slug: string;
	state: string;
	stateAbbr: string;
	descriptor: string;
}

export interface ConditionConfig {
	name: string;
	slug: string;
	therapistLabel: string;
	filterValue: string;
}

export interface InsuranceConfig {
	name: string;
	slug: string;
	filterValue: string;
}

export interface LanguageConfig {
	name: string;
	slug: string;
}

export const CITIES: CityConfig[] = [
	{ name: "Miami", slug: "miami", state: "Florida", stateAbbr: "FL", descriptor: "South Florida's largest city" },
	{ name: "Fort Lauderdale", slug: "fort-lauderdale", state: "Florida", stateAbbr: "FL", descriptor: "the heart of Broward County" },
	{ name: "Boca Raton", slug: "boca-raton", state: "Florida", stateAbbr: "FL", descriptor: "southern Palm Beach County" },
	{ name: "Coral Gables", slug: "coral-gables", state: "Florida", stateAbbr: "FL", descriptor: "Miami-Dade's City Beautiful" },
	{ name: "West Palm Beach", slug: "west-palm-beach", state: "Florida", stateAbbr: "FL", descriptor: "Palm Beach County's urban center" },
	{ name: "Hollywood", slug: "hollywood", state: "Florida", stateAbbr: "FL", descriptor: "located between Miami and Fort Lauderdale" },
	{ name: "Aventura", slug: "aventura", state: "Florida", stateAbbr: "FL", descriptor: "northeast Miami-Dade" },
	{ name: "Pembroke Pines", slug: "pembroke-pines", state: "Florida", stateAbbr: "FL", descriptor: "one of Broward County's largest communities" },
	{ name: "Hialeah", slug: "hialeah", state: "Florida", stateAbbr: "FL", descriptor: "Miami-Dade's second largest city" },
	{ name: "Coral Springs", slug: "coral-springs", state: "Florida", stateAbbr: "FL", descriptor: "northwest Broward County" },
	{ name: "Weston", slug: "weston", state: "Florida", stateAbbr: "FL", descriptor: "western Broward County" },
	{ name: "Delray Beach", slug: "delray-beach", state: "Florida", stateAbbr: "FL", descriptor: "central Palm Beach County" },
	{ name: "South Miami", slug: "south-miami", state: "Florida", stateAbbr: "FL", descriptor: "the heart of southern Miami-Dade" },
	{ name: "Sunny Isles Beach", slug: "sunny-isles-beach", state: "Florida", stateAbbr: "FL", descriptor: "northeast Miami-Dade's beachfront" },
	{ name: "Miami Beach", slug: "miami-beach", state: "Florida", stateAbbr: "FL", descriptor: "Miami's barrier island" },
];

export const CONDITIONS: ConditionConfig[] = [
	{ name: "Anxiety Disorders", slug: "anxiety", therapistLabel: "Anxiety Therapists", filterValue: "anxiety disorders" },
	{ name: "Depression", slug: "depression", therapistLabel: "Depression Therapists", filterValue: "depression" },
	{ name: "Trauma", slug: "trauma", therapistLabel: "Trauma Therapists", filterValue: "trauma" },
	{ name: "PTSD", slug: "ptsd", therapistLabel: "PTSD Therapists", filterValue: "ptsd" },
	{ name: "ADHD", slug: "adhd", therapistLabel: "ADHD Therapists", filterValue: "adhd" },
	{ name: "Relationship Concerns", slug: "relationship", therapistLabel: "Relationship Therapists", filterValue: "relationship concerns" },
	{ name: "Grief", slug: "grief", therapistLabel: "Grief Counselors", filterValue: "grief" },
	{ name: "Obsessive-Compulsive Disorder", slug: "ocd", therapistLabel: "OCD Therapists", filterValue: "obsessive-compulsive disorder" },
	{ name: "Eating Disorders", slug: "eating-disorders", therapistLabel: "Eating Disorder Therapists", filterValue: "eating disorders" },
	{ name: "Addiction", slug: "addiction", therapistLabel: "Addiction Therapists", filterValue: "addiction" },
	{ name: "Autism Spectrum Disorder", slug: "autism", therapistLabel: "Autism Therapists", filterValue: "autism spectrum disorder" },
	{ name: "Bipolar Disorder", slug: "bipolar", therapistLabel: "Bipolar Therapists", filterValue: "bipolar disorder" },
	{ name: "Parenting", slug: "parenting", therapistLabel: "Parenting Therapists", filterValue: "parenting" },
	{ name: "LGBTQ", slug: "lgbtq", therapistLabel: "LGBTQ-Affirming Therapists", filterValue: "lgbtq" },
	{ name: "Women's Issues", slug: "womens-issues", therapistLabel: "Women's Issues Therapists", filterValue: "women's issues" },
];

export const INSURANCES: InsuranceConfig[] = [
	{ name: "BCBS", slug: "bcbs", filterValue: "bcbs" },
	{ name: "Aetna", slug: "aetna", filterValue: "aetna" },
	{ name: "UnitedHealthcare", slug: "unitedhealthcare", filterValue: "unitedhealthcare" },
	{ name: "Cigna", slug: "cigna", filterValue: "cigna" },
	{ name: "Humana", slug: "humana", filterValue: "humana" },
	{ name: "Medicare", slug: "medicare", filterValue: "medicare" },
	{ name: "Medicaid", slug: "medicaid", filterValue: "medicaid" },
];

export const LANGUAGES: LanguageConfig[] = [
	{ name: "Spanish", slug: "spanish" },
	{ name: "Creole", slug: "creole" },
];

// Single statewide landing page for telehealth providers. Targets queries like
// "online therapy florida" / "virtual therapist florida" — high-intent searches
// that aren't well-served by city-based pages because virtual providers serve
// the whole state.
export const VIRTUAL_SLUG = "online-therapy-florida";
export const VIRTUAL_MODALITY = "Virtual";

// --- Internal-linking data -------------------------------------------------
// Drives the "related searches" cross-links between /find/ pages so the ~169
// pages form a connected topical cluster instead of crawl-orphaned islands.

// Geographic adjacency by city slug. Used to surface "same facet, nearby city"
// links (e.g. anxiety in Miami → anxiety in Coral Gables). Kept hand-curated for
// real South Florida proximity rather than computed from coordinates.
export const CITY_NEIGHBORS: Record<string, string[]> = {
	"miami": ["coral-gables", "miami-beach", "south-miami", "hialeah", "aventura"],
	"fort-lauderdale": ["hollywood", "pembroke-pines", "coral-springs", "weston"],
	"boca-raton": ["delray-beach", "west-palm-beach", "coral-springs"],
	"coral-gables": ["miami", "south-miami", "miami-beach"],
	"west-palm-beach": ["boca-raton", "delray-beach"],
	"hollywood": ["fort-lauderdale", "pembroke-pines", "aventura"],
	"aventura": ["sunny-isles-beach", "miami-beach", "hollywood", "miami"],
	"pembroke-pines": ["hollywood", "fort-lauderdale", "weston"],
	"hialeah": ["miami", "coral-gables"],
	"coral-springs": ["fort-lauderdale", "boca-raton", "weston"],
	"weston": ["pembroke-pines", "fort-lauderdale", "coral-springs"],
	"delray-beach": ["boca-raton", "west-palm-beach"],
	"south-miami": ["coral-gables", "miami"],
	"sunny-isles-beach": ["aventura", "miami-beach"],
	"miami-beach": ["miami", "aventura", "sunny-isles-beach", "coral-gables"],
};

// Insurance pages that historically rank best (≈ position 9) and so pass the
// most internal authority — surfaced first in same-city cross-links.
export const PRIORITY_INSURANCE_SLUGS = ["medicaid", "medicare", "aetna"];

// Highest-demand specialties, used as the fallback set of "browse by specialty"
// links and for non-condition pages that have no inherent related specialty.
export const POPULAR_CONDITION_SLUGS = ["anxiety", "depression", "trauma", "adhd"];

// Clinically adjacent specialties by condition slug. Drives "same city, related
// specialty" links so a searcher on the anxiety page sees depression/trauma/OCD.
export const RELATED_CONDITIONS: Record<string, string[]> = {
	"anxiety": ["depression", "trauma", "ocd"],
	"depression": ["anxiety", "trauma", "grief"],
	"trauma": ["ptsd", "anxiety", "depression"],
	"ptsd": ["trauma", "anxiety", "depression"],
	"adhd": ["anxiety", "autism", "parenting"],
	"relationship": ["anxiety", "depression", "parenting"],
	"grief": ["depression", "trauma", "anxiety"],
	"ocd": ["anxiety", "ptsd", "trauma"],
	"eating-disorders": ["anxiety", "depression", "trauma"],
	"addiction": ["depression", "anxiety", "trauma"],
	"autism": ["adhd", "parenting", "anxiety"],
	"bipolar": ["depression", "anxiety", "ptsd"],
	"parenting": ["relationship", "adhd", "anxiety"],
	"lgbtq": ["anxiety", "depression", "relationship"],
	"womens-issues": ["anxiety", "depression", "trauma"],
};

export function generateIntro(
	type: "condition" | "insurance" | "language" | "virtual",
	params: { condition?: string; insurance?: string; language?: string; city?: string; descriptor?: string; count: number }
): string {
	const { city, descriptor, count } = params;
	const providerText = count > 0 ? `Browse ${count} provider${count !== 1 ? "s" : ""}` : "Browse providers";

	if (type === "condition" && params.condition && city && descriptor) {
		return `Finding the right therapist for ${params.condition.toLowerCase()} in ${city} can feel overwhelming. The Mindful Network connects you with licensed professionals in ${descriptor} who specialize in treating ${params.condition.toLowerCase()}. ${providerText} who understand your needs and can help you take the next step toward feeling better.`;
	}

	if (type === "insurance" && params.insurance && city && descriptor) {
		return `Looking for a therapist in ${city} who accepts ${params.insurance}? The Mindful Network makes it easy to find licensed mental health professionals in ${descriptor} who are in-network with your insurance plan. ${providerText} accepting ${params.insurance} so you can focus on your care, not your coverage.`;
	}

	if (type === "language" && params.language && city && descriptor) {
		return `Finding a therapist who speaks ${params.language} in ${city} means getting care in the language you're most comfortable with. The Mindful Network connects you with ${params.language}-speaking mental health professionals in ${descriptor}. ${providerText} ready to support you in ${params.language}.`;
	}

	if (type === "virtual") {
		return `Online therapy in Florida means getting licensed mental health care without commuting — from home, work, or anywhere with a private connection. The Mindful Network connects you with telehealth providers serving the entire state via secure video sessions. ${providerText} offering virtual care, so you can focus on healing instead of logistics.`;
	}

	return `Find licensed mental health professionals${city ? ` in ${city}, ${descriptor}` : " in Florida"}. ${providerText} on The Mindful Network.`;
}
