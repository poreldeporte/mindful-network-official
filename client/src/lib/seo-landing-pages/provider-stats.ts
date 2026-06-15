import { PsychologistModel } from "@/models";
import { VIRTUAL_MODALITY } from "./config";

// Aggregate facts about the providers matched to a landing page. This is the
// uniqueness engine: the numbers differ on every page because the matched set
// differs, so the rendered "About these providers" sentence is genuinely
// distinct per page even though surrounding copy is reused.
export interface ProviderStats {
	count: number;
	withInsurance: number;
	topInsurances: string[];
	telehealth: number;
	spanish: number;
	creole: number;
}

// Entries that appear in the `insurances` field but are not real plans, so they
// must not count toward "accept insurance" or appear in the top-3 list.
const NON_INSURANCE = new Set([
	"self pay",
	"self-pay",
	"private pay",
	"out of network",
	"out-of-network",
	"sliding scale",
]);

function isRealInsurance(name?: string): boolean {
	return !!name && !NON_INSURANCE.has(name.trim().toLowerCase());
}

export function computeProviderStats(matched: PsychologistModel[]): ProviderStats {
	const insuranceFreq = new Map<string, number>();
	let withInsurance = 0;
	let telehealth = 0;
	let spanish = 0;
	let creole = 0;

	for (const p of matched) {
		const realInsurances = (p.insurances ?? []).filter((i) => isRealInsurance(i?.name));
		if (realInsurances.length > 0) withInsurance++;
		for (const i of realInsurances) {
			insuranceFreq.set(i.name, (insuranceFreq.get(i.name) ?? 0) + 1);
		}

		const hasVirtual = (p.therapyOptions ?? []).some(
			(m) => typeof m?.type === "string" && m.type.toLowerCase() === VIRTUAL_MODALITY.toLowerCase()
		);
		if (hasVirtual) telehealth++;

		const langs = (p.languages ?? []).map((l) => l.toLowerCase());
		if (langs.includes("spanish")) spanish++;
		if (langs.includes("creole")) creole++;
	}

	const topInsurances = Array.from(insuranceFreq.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 3)
		.map(([name]) => name);

	return {
		count: matched.length,
		withInsurance,
		topInsurances,
		telehealth,
		spanish,
		creole,
	};
}
