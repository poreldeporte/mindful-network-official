import type { FacetBlock } from "./types";

// Language facet blocks, keyed by LanguageConfig.slug (see config.ts LANGUAGES).
// The language is fixed per block; the city varies, so use {city}.
export const LANGUAGE_CONTENT: Record<string, FacetBlock> = {
	spanish: {
		heading: "Therapy in Spanish",
		paragraphs: [
			"Working with a Spanish-speaking therapist means you can express yourself fully, in the language you think and feel in, without translating as you go. Beyond fluency, many bilingual therapists share or understand the cultural context — family expectations, immigration experiences, identity across two cultures — that can shape what you're going through. That shared understanding often makes it easier to build trust and get to the heart of things faster.",
			"South Florida has a large Spanish-speaking community and many bilingual providers. The therapists below offer sessions in Spanish across a range of specialties, so you can find someone who fits both your language and your needs.",
		],
		faqs: [
			{
				q: "How do I find a Spanish-speaking therapist in {city}?",
				a: "The providers on this page offer therapy in Spanish. Their profiles below show their specialties, insurance accepted, and whether they offer in-person or online sessions.",
			},
			{
				q: "Do Spanish-speaking therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Can I have therapy in Spanish online?",
				a: "Yes. Several Spanish-speaking providers here offer secure telehealth across Florida, so you can meet in Spanish from anywhere in the state.",
			},
		],
	},
	creole: {
		heading: "Therapy in Haitian Creole",
		paragraphs: [
			"Seeing a therapist who speaks Haitian Creole lets you talk about what matters in your own language, without losing nuance in translation. Many Creole-speaking providers also understand the cultural and community context — including the experiences of Haitian and Haitian-American families and the realities of immigration — which can make therapy feel more understood and more effective.",
			"South Florida is home to a large Haitian community, and Creole-speaking therapists help make quality mental health care more accessible. The providers below offer sessions in Haitian Creole; their profiles show specialties, insurance, and session options.",
		],
		faqs: [
			{
				q: "How do I find a Creole-speaking therapist in {city}?",
				a: "The providers on this page offer therapy in Haitian Creole. Their profiles below show specialties, insurance accepted, and in-person or online availability.",
			},
			{
				q: "Do Creole-speaking therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Can I have therapy in Creole online?",
				a: "Yes. Several Creole-speaking providers here offer secure telehealth across Florida, so you can meet from anywhere in the state.",
			},
		],
	},
};
