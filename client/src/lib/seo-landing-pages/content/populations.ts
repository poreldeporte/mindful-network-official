import type { FacetBlock } from "./types";

// Population ("age group") facet blocks, keyed by PopulationConfig.slug (see
// config.ts POPULATIONS). City-agnostic — use {city}. Copy is general and
// non-prescriptive; specifics defer to individual provider profiles. Authoring is
// optional: a population page with no block here still renders live provider
// stats, so categories can be filled in over time.
export const POPULATION_CONTENT: Record<string, FacetBlock> = {
	"teen-therapist": {
		heading: "What to look for in a teen therapist",
		paragraphs: [
			"Therapy for teenagers isn't just adult therapy scaled down. Adolescents are navigating a specific set of pressures — academic stress, social media, shifting friendships, identity and sexuality, family conflict, and the neurological changes of a still-developing brain. A therapist who works well with teens knows how to build trust with a guarded 15-year-old, balance the teen's need for privacy with a parent's need to stay informed, and meet a young person where they are rather than lecturing them.",
			"The providers on this page in {city} list adolescents among the ages they treat. Common reasons families reach out include anxiety, depression, ADHD, self-esteem, disordered eating, trauma, and behavioral changes. When you contact a provider, it's worth asking about their experience with your teen's specific concern, how they involve parents, and whether they offer in-person or virtual sessions — many teens open up more easily over video from their own room.",
		],
		faqs: [
			{
				q: "How is teen therapy different from therapy for adults?",
				a: "Teen therapists adapt their approach to adolescent development — building rapport differently, respecting a teen's growing need for autonomy, and often coordinating with parents and schools. The providers on this page in {city} work specifically with adolescents.",
			},
			{
				q: "Will the therapist tell me what my teen says in session?",
				a: "Therapists balance a teen's confidentiality (which is what makes therapy work) with keeping parents appropriately informed, and they'll usually explain their policy up front. Safety concerns are always shared. Ask each provider how they handle this before starting.",
			},
			{
				q: "Do these providers accept insurance?",
				a: "Many do. The “About these providers” section above shows how many on this page accept insurance and which plans are most common, and every profile lists the insurers that provider works with.",
			},
			{
				q: "Can my teen see a therapist online?",
				a: "Often, yes — many providers offer telehealth, and some teens find it easier to talk from the comfort of their own space. Check individual profiles in {city} for telehealth availability.",
			},
		],
	},
};
