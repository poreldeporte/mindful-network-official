import type { FacetBlock } from "./types";

// Condition facet blocks, keyed by ConditionConfig.slug (see config.ts CONDITIONS).
// Phase 0 pilot: anxiety, trauma, adhd. Remaining conditions render live stats
// only until their block is authored. Keep these city-agnostic — use {city}.
export const CONDITION_CONTENT: Record<string, FacetBlock> = {
	anxiety: {
		heading: "What anxiety therapy involves",
		paragraphs: [
			"Anxiety is one of the most common reasons people seek therapy, and it responds well to treatment. Most anxiety therapists draw on evidence-based approaches such as cognitive behavioral therapy (CBT), which helps you recognize and reframe the thought patterns that fuel worry, and exposure therapy, which gradually reduces the power of the situations you avoid. Others use acceptance and commitment therapy (ACT) or mindfulness-based methods to help you respond to anxious feelings without being controlled by them.",
			"A first session is usually a conversation about what you're experiencing and what you'd like to change — there's nothing to prepare. If anxiety is interfering with sleep, work, relationships, or daily routines, that's a clear sign it's worth talking to someone. The providers listed below all work with anxiety and can help you find an approach that fits.",
		],
		faqs: [
			{
				q: "How much does an anxiety therapist in {city} cost?",
				a: "Fees vary by provider, credentials, and session length. Many therapists in {city} accept insurance or offer sliding-scale rates — check each provider's profile below for their specific fees and accepted plans.",
			},
			{
				q: "Do anxiety therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above shows how many on this page accept insurance and which plans are most common, and every profile lists the insurers that provider works with.",
			},
			{
				q: "Can I see an anxiety therapist online?",
				a: "Yes. Several providers here offer secure telehealth sessions, so you can meet from home anywhere in Florida. Look for telehealth availability on individual profiles.",
			},
		],
	},
	trauma: {
		heading: "Trauma-focused therapy",
		paragraphs: [
			"Trauma therapy helps you process difficult or overwhelming experiences so they have less hold on your present. Common evidence-based approaches include EMDR (eye movement desensitization and reprocessing), trauma-focused CBT, and somatic therapies that work with how trauma is held in the body. A skilled trauma therapist moves at your pace and prioritizes feeling safe before processing anything painful.",
			"You don't need a single dramatic event to benefit from trauma-informed care — ongoing stress, loss, or adverse experiences earlier in life can all leave a mark. If you notice flashbacks, avoidance, hypervigilance, or emotional numbness, the providers below specialize in trauma and can help you understand your options.",
		],
		faqs: [
			{
				q: "What kind of therapy is best for trauma?",
				a: "EMDR and trauma-focused CBT have the strongest research support, but the right fit depends on you. Many trauma therapists in {city} are trained in more than one approach — their profiles below note their specialties.",
			},
			{
				q: "Do trauma therapists in {city} accept insurance?",
				a: "Many do. See the “About these providers” section above for how many on this page accept insurance and the most common plans, and check individual profiles for details.",
			},
			{
				q: "Is online trauma therapy effective?",
				a: "Yes — research supports telehealth for many trauma treatments, including EMDR delivered remotely. Several providers here offer secure online sessions across Florida.",
			},
		],
	},
	adhd: {
		heading: "ADHD assessment and therapy",
		paragraphs: [
			"Therapy for ADHD focuses on practical strategies and support rather than willpower. Providers often combine skills coaching for executive function — planning, time management, follow-through — with cognitive behavioral therapy to address the frustration, procrastination, and self-criticism that frequently come with ADHD. For many people, therapy works alongside medication managed by a prescriber.",
			"ADHD looks different in adults than the classic picture of a restless child: it can show up as chronic disorganization, missed deadlines, emotional intensity, or difficulty starting tasks. Whether you have a formal diagnosis or are just starting to wonder, the providers below work with ADHD and can talk through assessment and treatment.",
		],
		faqs: [
			{
				q: "Can a therapist diagnose ADHD in {city}?",
				a: "Some licensed providers offer ADHD evaluations; others focus on therapy and coordinate with a physician or psychiatrist for diagnosis and any medication. Each profile below describes the services that provider offers.",
			},
			{
				q: "Do ADHD therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and individual profiles list accepted plans.",
			},
			{
				q: "Can ADHD therapy be done online?",
				a: "Yes. ADHD coaching and therapy translate well to telehealth, and several providers here offer secure online sessions throughout Florida.",
			},
		],
	},
};
