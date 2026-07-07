import type { FacetBlock } from "./types";

// Resource ("Level of care") facet blocks, keyed by ResourceConfig.slug (see
// config.ts RESOURCES). City-agnostic — use {city}. Copy is general and
// non-prescriptive; specifics defer to individual provider profiles. Authoring is
// optional: a resource page with no block here still renders live provider stats,
// so categories can be filled in over time.
export const RESOURCE_CONTENT: Record<string, FacetBlock> = {
	psychiatrist: {
		heading: "What a psychiatrist provides",
		paragraphs: [
			"Psychiatrists are medical doctors (MD or DO) who can diagnose mental health conditions, prescribe medication, and manage it over time. Some also provide therapy, but their distinctive role is medication management — starting, adjusting, and monitoring prescriptions for conditions like depression, anxiety, ADHD, bipolar disorder, and more. Psychiatric nurse practitioners (PMHNPs) offer similar prescribing care and are included here where listed.",
			"A first appointment is usually an evaluation of your history and symptoms to decide whether medication may help and, if so, which. Many people work with a psychiatrist for medication alongside a separate therapist for talk therapy. If you're weighing medication or need an existing prescription managed, the providers below in {city} can help.",
		],
		faqs: [
			{
				q: "What's the difference between a psychiatrist and a therapist?",
				a: "A psychiatrist is a medical doctor who can prescribe and manage medication; a therapist provides talk therapy but generally cannot prescribe. Many people see both. The providers on this page in {city} offer psychiatric and medication-management care.",
			},
			{
				q: "Do psychiatrists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above shows how many on this page accept insurance and which plans are most common, and every profile lists the insurers that provider works with.",
			},
			{
				q: "Can I see a psychiatrist online?",
				a: "Often, yes — many providers offer telehealth for medication management, though some require an initial in-person visit. Check individual profiles for telehealth availability.",
			},
		],
	},
	"psychological-testing": {
		heading: "What psychological testing involves",
		paragraphs: [
			"Psychological testing (also called assessment) is a structured evaluation — not ongoing therapy — that uses standardized tests, interviews, and questionnaires to answer a specific question: clarifying a diagnosis, identifying ADHD or a learning difference, assessing cognitive or emotional functioning, or informing a treatment plan. It typically produces a written report with findings and recommendations.",
			"An assessment usually spans one or more sessions and is conducted by a licensed psychologist or qualified evaluator. It's often requested by a school, physician, attorney, or the person themselves to understand what's going on and what to do next. If you need answers rather than (or before) treatment, the providers below in {city} offer testing and assessment services.",
		],
		faqs: [
			{
				q: "How is psychological testing different from therapy?",
				a: "Testing is a time-limited evaluation that answers a specific question and produces a report; therapy is ongoing treatment. Some people do testing first to guide the therapy that follows. Providers on this page in {city} offer assessment services.",
			},
			{
				q: "How long does psychological testing take?",
				a: "It varies by the type and depth of the evaluation — often one to several sessions plus report time. Ask each provider about their process and turnaround when you reach out.",
			},
			{
				q: "Does insurance cover psychological testing in {city}?",
				a: "Coverage varies by plan and the reason for testing. Check the “About these providers” section above and each provider's profile for accepted insurance, and confirm testing coverage directly with the provider.",
			},
		],
	},
};
