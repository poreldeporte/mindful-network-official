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
	credentials: string[];
}

// The `degree` field is free-text and inconsistent ("M.D.", "LMHC and Life
// Coach", "Licensed Clinical Social Worker, EMDRIA-Certified"). We only surface a
// curated set of recognizable clinical licenses and doctoral/medical credentials
// — the things a patient cares about — and ignore everything else (yoga certs,
// "Life Coach", academic master's, supervisor designations).
//
// Each entry maps a canonical display label to the spellings/aliases seen in the
// data. Short codes are matched against normalized tokens (exact); the multi-word
// aliases are matched as substrings of the whole normalized string.
const CREDENTIALS: Array<{ label: string; codes: string[]; phrases: string[] }> = [
	{ label: "LMHC", codes: ["LMHC"], phrases: ["licensed mental health counselor"] },
	{ label: "LCSW", codes: ["LCSW"], phrases: ["licensed clinical social worker"] },
	{ label: "LMFT", codes: ["LMFT"], phrases: ["licensed marriage and family therapist", "marriage and family therapist"] },
	{ label: "LPC", codes: ["LPC", "LCPC", "LCMHC"], phrases: ["licensed professional counselor"] },
	{ label: "MSW", codes: ["MSW", "DSW"], phrases: [] },
	{ label: "PsyD", codes: ["PSYD"], phrases: ["doctor of psychology"] },
	{ label: "PhD", codes: ["PHD"], phrases: [] },
	{ label: "EdD", codes: ["EDD", "EDS"], phrases: [] },
	{ label: "MD", codes: ["MD"], phrases: ["medical doctor"] },
	{ label: "DO", codes: ["DO"], phrases: ["doctor of osteopathic medicine"] },
	{ label: "PMHNP", codes: ["PMHNP"], phrases: ["psychiatric mental health nurse"] },
	{ label: "APRN", codes: ["APRN", "ARNP"], phrases: [] },
	{ label: "DNP", codes: ["DNP"], phrases: [] },
	{ label: "CAP", codes: ["CAP", "MCAP", "ICADC"], phrases: ["certified addiction professional"] },
	{ label: "BCBA", codes: ["BCBA"], phrases: [] },
];

// Tokenize a degree string and return the canonical credential labels present.
// Tokens are normalized (periods removed, uppercased, trailing board/supervisor
// suffixes like -BC / -QS / -C stripped) before exact-matching the short codes.
function extractCredentials(degree?: string): string[] {
	if (!degree) return [];
	const normalized = degree.toLowerCase().replace(/\./g, "");
	const tokens = degree
		.split(/[,/&]|\band\b/i)
		.map((t) => t.replace(/\./g, "").trim().toUpperCase().replace(/-(BC|QS|C|PC|S)$/i, ""))
		.filter(Boolean);
	const tokenSet = new Set(tokens);

	const found: string[] = [];
	for (const cred of CREDENTIALS) {
		const hit =
			cred.codes.some((c) => tokenSet.has(c)) ||
			cred.phrases.some((p) => normalized.includes(p));
		if (hit) found.push(cred.label);
	}
	return found;
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
	const credentialFreq = new Map<string, number>();
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

		// Count each credential once per provider.
		for (const cred of extractCredentials(p.degree)) {
			credentialFreq.set(cred, (credentialFreq.get(cred) ?? 0) + 1);
		}
	}

	const topInsurances = Array.from(insuranceFreq.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 3)
		.map(([name]) => name);

	const credentials = Array.from(credentialFreq.entries())
		.sort((a, b) => b[1] - a[1])
		.slice(0, 4)
		.map(([label]) => label);

	return {
		count: matched.length,
		withInsurance,
		topInsurances,
		telehealth,
		spanish,
		creole,
		credentials,
	};
}
