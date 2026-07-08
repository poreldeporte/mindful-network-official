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
	// Natural synonym phrase for the <title> tail, capturing the high-demand
	// "{condition} counseling / treatment" search variants these pages already
	// rank mid-page for but don't word-match (e.g. "anxiety treatment fort
	// lauderdale" — 591 impr, pos 44, 0 clicks). Varied per condition so it reads
	// naturally ("treatment" for clinical conditions, "therapy"/"support" where
	// "treatment" is awkward). See docs/find-* / GSC synonym analysis.
	synonymPhrase: string;
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

// A "Level of care" service category, driven by the professionals.resource field
// (→ resources doc type, matched on its `title`). A distinct axis from condition/
// insurance/language: these are services (testing, psychiatry, coaching), not
// conditions or modalities. `label` is the heading noun ("Psychiatrists"); `blurb`
// is the lowercase service phrase used in intro copy ("psychiatry and medication
// management"); `filterValue` is the exact resources.title in Sanity.
export interface ResourceConfig {
	name: string;
	slug: string;
	filterValue: string;
	label: string;
	blurb: string;
}

// A population / age-group facet, driven by the professionals.ageSpecialty field
// (→ ageSpecialty doc type, matched on its `age` value: Child/Adolescent/Adult/
// Young Adult). A distinct axis from condition/insurance/language/resource: it
// scopes providers by WHO they treat, not what or how. `filterValue` is the exact
// ageSpecialty.age string in Sanity; `label` is the heading noun ("Teen
// Therapists"); `blurb` is the lowercase phrase used in intro/description copy.
export interface PopulationConfig {
	name: string;
	slug: string;
	filterValue: string;
	label: string;
	blurb: string;
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
	{ name: "Anxiety Disorders", slug: "anxiety", therapistLabel: "Anxiety Therapists", filterValue: "anxiety disorders", synonymPhrase: "Anxiety Counseling & Treatment" },
	{ name: "Depression", slug: "depression", therapistLabel: "Depression Therapists", filterValue: "depression", synonymPhrase: "Depression Counseling & Treatment" },
	{ name: "Trauma", slug: "trauma", therapistLabel: "Trauma Therapists", filterValue: "trauma", synonymPhrase: "Trauma Counseling & Treatment" },
	{ name: "PTSD", slug: "ptsd", therapistLabel: "PTSD Therapists", filterValue: "ptsd", synonymPhrase: "PTSD Counseling & Treatment" },
	{ name: "ADHD", slug: "adhd", therapistLabel: "ADHD Therapists", filterValue: "adhd", synonymPhrase: "ADHD Counseling & Treatment" },
	{ name: "Relationship Concerns", slug: "relationship", therapistLabel: "Relationship Therapists", filterValue: "relationship concerns", synonymPhrase: "Relationship & Couples Counseling" },
	{ name: "Grief", slug: "grief", therapistLabel: "Grief Counselors", filterValue: "grief", synonymPhrase: "Grief Counseling & Support" },
	{ name: "Obsessive-Compulsive Disorder", slug: "ocd", therapistLabel: "OCD Therapists", filterValue: "obsessive-compulsive disorder", synonymPhrase: "OCD Counseling & Treatment" },
	{ name: "Eating Disorders", slug: "eating-disorders", therapistLabel: "Eating Disorder Therapists", filterValue: "eating disorders", synonymPhrase: "Eating Disorder Counseling & Treatment" },
	{ name: "Addiction", slug: "addiction", therapistLabel: "Addiction Therapists", filterValue: "addiction", synonymPhrase: "Addiction Counseling & Treatment" },
	{ name: "Autism Spectrum Disorder", slug: "autism", therapistLabel: "Autism Therapists", filterValue: "autism spectrum disorder", synonymPhrase: "Autism Counseling & Therapy" },
	{ name: "Bipolar Disorder", slug: "bipolar", therapistLabel: "Bipolar Therapists", filterValue: "bipolar disorder", synonymPhrase: "Bipolar Counseling & Treatment" },
	{ name: "Parenting", slug: "parenting", therapistLabel: "Parenting Therapists", filterValue: "parenting", synonymPhrase: "Parenting Counseling & Support" },
	{ name: "LGBTQ", slug: "lgbtq", therapistLabel: "LGBTQ-Affirming Therapists", filterValue: "lgbtq", synonymPhrase: "LGBTQ Counseling & Therapy" },
	{ name: "Women's Issues", slug: "womens-issues", therapistLabel: "Women's Issues Therapists", filterValue: "women's issues", synonymPhrase: "Women's Issues Counseling & Therapy" },
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

// "Level of care" service categories with enough provider inventory to justify a
// page (see docs/find-resource-axis-spec.md). filterValue must match the Sanity
// resources.title exactly. Facility categories (Residential/Inpatient/Detox/etc.)
// and the generic "Therapy" are intentionally excluded.
export const RESOURCES: ResourceConfig[] = [
	{ name: "Psychiatry & Medication Management", slug: "psychiatrist", filterValue: "Psychiatry/Medication Management", label: "Psychiatrists", blurb: "psychiatry and medication management" },
	{ name: "Psychological Testing", slug: "psychological-testing", filterValue: "Psychological Testing", label: "Psychological Testing Providers", blurb: "psychological testing and assessment" },
	{ name: "Psychoeducational Testing", slug: "psychoeducational-testing", filterValue: "Psychoeducational Testing", label: "Psychoeducational Testing Providers", blurb: "psychoeducational testing" },
	{ name: "Neuropsychological Evaluations", slug: "neuropsychological-evaluation", filterValue: "Neuropsychological Evaluations", label: "Neuropsychological Evaluation Providers", blurb: "neuropsychological evaluations" },
	{ name: "Gifted Evaluations", slug: "gifted-evaluation", filterValue: "Gifted Evaluations", label: "Gifted Evaluation Providers", blurb: "gifted evaluations" },
	{ name: "Mind-Body Wellness", slug: "mind-body-wellness", filterValue: "Mind-Body Wellness", label: "Mind-Body Wellness Providers", blurb: "mind-body wellness care" },
	{ name: "Life Coaching", slug: "life-coach", filterValue: "Life Coach", label: "Life Coaches", blurb: "life coaching" },
	{ name: "Innovative Therapies", slug: "innovative-therapy", filterValue: "Innovative Therapies", label: "Innovative Therapy Providers", blurb: "innovative therapies" },
];

// Population / age-group categories with enough provider inventory to justify a
// page (see docs/find-expansion-specs). filterValue must match the Sanity
// ageSpecialty.age value exactly. Only "Adolescent" (teen) is built for now —
// the deepest-inventory age tag with clear GSC demand ("teen therapist {city}",
// "adhd therapy for teens"). Child / Young Adult are deliberate follow-ups.
export const POPULATIONS: PopulationConfig[] = [
	{ name: "Teens & Adolescents", slug: "teen-therapist", filterValue: "Adolescent", label: "Teen Therapists", blurb: "therapy for teens and adolescents" },
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

// Flagship service categories surfaced as "browse by service" cross-links from
// the higher-authority condition/insurance pages, so the newer resource-axis
// pages receive inbound links from the established mesh instead of being
// crawl-orphaned. Kept to the two with the deepest provider inventory + authored
// copy (see RESOURCES / content/resources.ts).
export const PRIORITY_RESOURCE_SLUGS = ["psychiatrist", "psychological-testing"];

// Population facets surfaced as "browse by who it's for" cross-links from the
// higher-authority condition pages, so the newer population-axis pages receive
// inbound links from the established mesh instead of being crawl-orphaned.
export const PRIORITY_POPULATION_SLUGS = ["teen-therapist"];

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
	type: "condition" | "insurance" | "language" | "virtual" | "resource" | "population",
	params: { condition?: string; insurance?: string; language?: string; resource?: string; population?: string; city?: string; descriptor?: string; count: number }
): string {
	const { city, descriptor, count } = params;
	const providerText = count > 0 ? `Browse ${count} provider${count !== 1 ? "s" : ""}` : "Browse providers";

	if (type === "condition" && params.condition && city && descriptor) {
		return `Finding the right therapist for ${params.condition.toLowerCase()} in ${city} can feel overwhelming. The Mindful Network connects you with licensed professionals in ${descriptor} who specialize in ${params.condition} — offering therapy, counseling, and treatment. ${providerText} who understand your needs and can help you take the next step toward feeling better.`;
	}

	if (type === "insurance" && params.insurance && city && descriptor) {
		return `Looking for a therapist in ${city} who accepts ${params.insurance}? The Mindful Network makes it easy to find licensed mental health professionals in ${descriptor} who are in-network with your insurance plan. ${providerText} accepting ${params.insurance} so you can focus on your care, not your coverage.`;
	}

	if (type === "language" && params.language && city && descriptor) {
		return `Finding a therapist who speaks ${params.language} in ${city} means getting care in the language you're most comfortable with. The Mindful Network connects you with ${params.language}-speaking mental health professionals in ${descriptor}. ${providerText} ready to support you in ${params.language}.`;
	}

	if (type === "resource" && params.resource && city && descriptor) {
		return `Finding ${params.resource} in ${city} shouldn't be complicated. The Mindful Network connects you with licensed providers in ${descriptor} who offer ${params.resource}. ${providerText} so you can compare approaches and take the next step.`;
	}

	if (type === "population" && params.population && city && descriptor) {
		// Population-agnostic frame driven by `params.population` (the blurb) so
		// adding Child / Young Adult to POPULATIONS produces correct copy without
		// editing this branch. Population-specific depth (what to look for, FAQs)
		// lives in the per-slug facet block in content/populations.ts.
		return `Finding ${params.population} in ${city} means finding a provider who genuinely connects with the person in your care. The Mindful Network connects you with licensed professionals in ${descriptor} who offer ${params.population}. ${providerText} so you can compare approaches and find the right fit.`;
	}

	if (type === "virtual") {
		return `Online therapy in Florida means getting licensed mental health care without commuting — from home, work, or anywhere with a private connection. The Mindful Network connects you with telehealth providers serving the entire state via secure video sessions. ${providerText} offering virtual care, so you can focus on healing instead of logistics.`;
	}

	return `Find licensed mental health professionals${city ? ` in ${city}, ${descriptor}` : " in Florida"}. ${providerText} on The Mindful Network.`;
}
