import type { FacetBlock } from "./types";

// Insurance facet blocks, keyed by InsuranceConfig.slug (see config.ts INSURANCES).
// The insurance is fixed per block, so naming it in the copy is fine; the city
// varies, so use {city}. Keep coverage statements GENERAL — never promise
// specific benefits, copays, or dollar amounts, since plans differ. Always defer
// to the member's own plan and the provider's profile.
export const INSURANCE_CONTENT: Record<string, FacetBlock> = {
	bcbs: {
		heading: "Using Blue Cross Blue Shield for therapy",
		paragraphs: [
			"Blue Cross Blue Shield (in Florida, often Florida Blue) plans commonly include outpatient mental health benefits, and seeing an in-network therapist usually means a lower cost than going out of network. Exact coverage — copays, deductibles, session limits, and whether a plan requires a referral — depends on your specific policy.",
			"The simplest way to confirm coverage is to check the back of your insurance card or your member portal, and to confirm with the provider that they're in network for your plan. The therapists below list BCBS among the insurers they accept; their profiles have the details.",
		],
		faqs: [
			{
				q: "Does Blue Cross Blue Shield cover therapy in {city}?",
				a: "Most BCBS plans include outpatient mental health benefits, but the specifics depend on your policy. The providers below accept BCBS — confirm copays and any requirements with your plan and the provider.",
			},
			{
				q: "How do I find an in-network BCBS therapist in {city}?",
				a: "The providers listed on this page accept BCBS. To be sure a given therapist is in network for your specific plan, check their profile and confirm directly before your first session.",
			},
			{
				q: "Can I use my BCBS plan for online therapy?",
				a: "Many BCBS plans cover telehealth therapy, and several providers here offer secure online sessions across Florida. Confirm telehealth coverage with your plan.",
			},
		],
	},
	aetna: {
		heading: "Using Aetna for therapy",
		paragraphs: [
			"Aetna plans commonly include outpatient mental health coverage, and choosing an in-network therapist typically lowers your out-of-pocket cost. The details — copay, deductible, and any pre-authorization — vary by your specific plan, so it's worth checking before you start.",
			"You can verify your benefits through the Aetna member portal or the number on your card, and confirm network status with the provider. The therapists below list Aetna among the plans they accept.",
		],
		faqs: [
			{
				q: "Does Aetna cover therapy in {city}?",
				a: "Most Aetna plans include outpatient mental health benefits, though specifics depend on your policy. The providers below accept Aetna — confirm your copay and any requirements with your plan.",
			},
			{
				q: "How do I find an in-network Aetna therapist in {city}?",
				a: "The providers on this page accept Aetna. Confirm a given therapist is in network for your specific plan via their profile and a quick call before your first visit.",
			},
			{
				q: "Can I use Aetna for online therapy?",
				a: "Many Aetna plans cover telehealth, and several providers here offer secure online sessions across Florida. Confirm telehealth coverage with your plan.",
			},
		],
	},
	unitedhealthcare: {
		heading: "Using UnitedHealthcare for therapy",
		paragraphs: [
			"UnitedHealthcare plans (behavioral health is often administered through Optum) commonly include outpatient therapy benefits, with lower costs when you see an in-network provider. Copays, deductibles, and any authorization requirements depend on your specific plan.",
			"Check your benefits through your member portal or the number on your card, and confirm network status with the therapist. The providers below list UnitedHealthcare among the plans they accept.",
		],
		faqs: [
			{
				q: "Does UnitedHealthcare cover therapy in {city}?",
				a: "Most UnitedHealthcare plans include outpatient mental health benefits, though specifics depend on your policy. The providers below accept UnitedHealthcare — confirm details with your plan.",
			},
			{
				q: "How do I find an in-network UnitedHealthcare therapist in {city}?",
				a: "The providers on this page accept UnitedHealthcare. Confirm a given therapist is in network for your specific plan via their profile before your first session.",
			},
			{
				q: "Can I use UnitedHealthcare for online therapy?",
				a: "Many plans cover telehealth, and several providers here offer secure online sessions across Florida. Confirm telehealth coverage with your plan.",
			},
		],
	},
	cigna: {
		heading: "Using Cigna for therapy",
		paragraphs: [
			"Cigna plans commonly include outpatient behavioral health benefits, and seeing an in-network therapist usually keeps your costs lower. The exact copay, deductible, and any requirements depend on your specific plan.",
			"You can confirm your benefits through the Cigna member portal or the number on your card, and verify network status with the provider. The therapists below list Cigna among the insurers they accept.",
		],
		faqs: [
			{
				q: "Does Cigna cover therapy in {city}?",
				a: "Most Cigna plans include outpatient mental health benefits, though the specifics depend on your policy. The providers below accept Cigna — confirm your copay and any requirements with your plan.",
			},
			{
				q: "How do I find an in-network Cigna therapist in {city}?",
				a: "The providers on this page accept Cigna. Confirm a given therapist is in network for your specific plan via their profile before booking.",
			},
			{
				q: "Can I use Cigna for online therapy?",
				a: "Many Cigna plans cover telehealth, and several providers here offer secure online sessions across Florida. Confirm telehealth coverage with your plan.",
			},
		],
	},
	humana: {
		heading: "Using Humana for therapy",
		paragraphs: [
			"Humana plans commonly include outpatient mental health benefits, with lower costs for in-network care. Because Humana offers a range of plans, including Medicare Advantage options, coverage details like copays and any referral or authorization requirements depend on your specific plan.",
			"Verify your benefits through your Humana member portal or the number on your card, and confirm network status with the provider. The therapists below list Humana among the plans they accept.",
		],
		faqs: [
			{
				q: "Does Humana cover therapy in {city}?",
				a: "Most Humana plans include outpatient mental health benefits, though specifics depend on your policy. The providers below accept Humana — confirm details with your plan.",
			},
			{
				q: "How do I find an in-network Humana therapist in {city}?",
				a: "The providers on this page accept Humana. Confirm a given therapist is in network for your specific plan via their profile before your first visit.",
			},
			{
				q: "Can I use Humana for online therapy?",
				a: "Many Humana plans cover telehealth, and several providers here offer secure online sessions across Florida. Confirm telehealth coverage with your plan.",
			},
		],
	},
	medicare: {
		heading: "Using Medicare for therapy",
		paragraphs: [
			"Medicare Part B covers outpatient mental health services, including therapy, when provided by an eligible professional who accepts Medicare. As of 2024, the range of professionals who can bill Medicare expanded to include licensed mental health counselors and marriage and family therapists, alongside psychologists and clinical social workers. You typically pay a portion (coinsurance) after meeting the Part B deductible, and Medicare Advantage plans may work differently.",
			"To use your benefits, look for a provider who accepts Medicare and confirm before your first appointment. The therapists below list Medicare among the plans they accept.",
		],
		faqs: [
			{
				q: "Does Medicare cover therapy in {city}?",
				a: "Yes — Medicare Part B covers outpatient therapy from eligible professionals who accept Medicare. The providers below accept Medicare; confirm your costs and coverage details with your plan.",
			},
			{
				q: "Which therapists can accept Medicare?",
				a: "Psychologists, clinical social workers, and — as of 2024 — licensed mental health counselors and marriage and family therapists can bill Medicare. The providers on this page accept it; their profiles have details.",
			},
			{
				q: "Can I use Medicare for online therapy?",
				a: "Medicare has expanded telehealth coverage for mental health, and several providers here offer secure online sessions across Florida. Confirm current telehealth rules with your plan.",
			},
		],
	},
	medicaid: {
		heading: "Using Medicaid for therapy",
		paragraphs: [
			"Florida Medicaid covers mental health services, usually at little or no cost to you, most often through a managed care plan. Because care is delivered through these plans, the right first step is to find a therapist who accepts your specific Medicaid plan. Coverage and any requirements are set by the plan and the state program.",
			"If you're unsure which plan you have or whether you're eligible, your Medicaid member materials or plan customer service can help. The therapists below list Medicaid among the plans they accept.",
		],
		faqs: [
			{
				q: "Does Medicaid cover therapy in {city}?",
				a: "Yes — Florida Medicaid covers mental health services, typically at little or no cost, usually through a managed care plan. The providers below accept Medicaid; confirm they take your specific plan.",
			},
			{
				q: "How do I find a therapist who takes my Medicaid plan in {city}?",
				a: "The providers on this page accept Medicaid. Since Medicaid is delivered through managed care plans, confirm a given therapist takes your specific plan via their profile before booking.",
			},
			{
				q: "Is online therapy covered by Medicaid?",
				a: "Florida Medicaid covers many telehealth services, and several providers here offer secure online sessions across Florida. Confirm telehealth coverage with your plan.",
			},
		],
	},
};
