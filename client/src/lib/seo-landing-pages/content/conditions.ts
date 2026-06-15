import type { FacetBlock } from "./types";

// Condition facet blocks, keyed by ConditionConfig.slug (see config.ts CONDITIONS).
// City-agnostic — use {city}. Clinical copy is intentionally general,
// evidence-based, and non-prescriptive; it describes common approaches and when
// to seek help, and defers specifics to individual provider profiles.
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
	depression: {
		heading: "What depression therapy involves",
		paragraphs: [
			"Therapy is one of the most effective treatments for depression. Common evidence-based approaches include cognitive behavioral therapy (CBT), which targets the negative thought patterns that keep low mood going, and behavioral activation, which helps you re-engage with activities that bring meaning and energy. Interpersonal therapy (IPT) focuses on the relationships and life changes that can contribute to depression. For some people, therapy works best alongside medication managed by a physician or psychiatrist.",
			"Depression can look like persistent sadness, but it also shows up as numbness, irritability, fatigue, or losing interest in things you used to enjoy. If low mood has lasted more than a couple of weeks or is affecting daily life, it's worth reaching out. The providers below work with depression and can talk through what might help. If you are in crisis or thinking about harming yourself, call or text 988 for the Suicide and Crisis Lifeline.",
		],
		faqs: [
			{
				q: "How much does a depression therapist in {city} cost?",
				a: "Fees vary by provider and session length. Many therapists in {city} accept insurance or offer sliding-scale rates — see each provider's profile below for specifics.",
			},
			{
				q: "Do I need medication for depression, or is therapy enough?",
				a: "Many people improve with therapy alone; others benefit from combining it with medication prescribed by a physician. A therapist can help you weigh the options and coordinate care if medication makes sense for you.",
			},
			{
				q: "Can depression therapy be done online?",
				a: "Yes. Research supports telehealth for depression, and several providers here offer secure online sessions across Florida.",
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
	ptsd: {
		heading: "Therapy for PTSD",
		paragraphs: [
			"Post-traumatic stress disorder is treatable, and several therapies have strong research support. These include prolonged exposure (PE), cognitive processing therapy (CPT), trauma-focused CBT, and EMDR. Each helps you process traumatic memories and reduce the symptoms — intrusive memories, nightmares, avoidance, and feeling constantly on edge — that can follow a frightening or life-threatening experience.",
			"PTSD can develop after combat, an accident, assault, a medical event, or any experience that overwhelmed your ability to cope. Symptoms sometimes appear months or years later. If that sounds familiar, the providers below work with PTSD and can help you find an evidence-based approach at a pace that feels manageable.",
		],
		faqs: [
			{
				q: "What therapy works best for PTSD?",
				a: "Prolonged exposure, cognitive processing therapy, and EMDR are among the most strongly supported treatments. PTSD therapists in {city} often offer more than one — their profiles describe their training.",
			},
			{
				q: "Do PTSD therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Can PTSD be treated with online therapy?",
				a: "Yes. Evidence supports delivering PTSD treatments by secure video, and several providers here offer telehealth across Florida.",
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
	relationship: {
		heading: "Relationship and couples therapy",
		paragraphs: [
			"Relationship therapy helps partners understand recurring conflicts, rebuild trust, and communicate in ways that actually land. Many therapists use structured, well-researched models such as the Gottman Method or emotionally focused therapy (EFT), which focus on the patterns underneath an argument rather than just the argument itself. You don't have to be in crisis to benefit — plenty of couples come in to strengthen a relationship that's basically working.",
			"Relationship concerns can also be worked on individually, whether you're navigating a breakup, dating, family dynamics, or your own patterns in relationships. The providers below work with couples and individuals on relationship issues and can help you decide on the right format.",
		],
		faqs: [
			{
				q: "How much does couples therapy in {city} cost?",
				a: "Fees vary by provider and session length, and couples sessions are sometimes priced differently from individual ones. Check each provider's profile below for fees and accepted insurance.",
			},
			{
				q: "Does insurance cover couples therapy in {city}?",
				a: "Coverage for relationship therapy varies by plan, since it isn't always billed the same way as individual treatment. The providers below list the insurers they accept — and it's worth confirming relationship-therapy coverage with your plan directly.",
			},
			{
				q: "Can we do couples therapy online?",
				a: "Yes. Many couples find video sessions convenient, especially when schedules differ. Several providers here offer secure telehealth across Florida.",
			},
		],
	},
	grief: {
		heading: "Grief counseling and support",
		paragraphs: [
			"Grief counseling gives you space to process a loss with someone trained to help. There's no single right way or timeline to grieve, and a good grief counselor won't try to rush you through it. When grief becomes prolonged or stuck — sometimes called complicated grief — specific therapeutic approaches can help you carry the loss while re-engaging with life.",
			"Grief isn't only about death: it can follow divorce, a serious diagnosis, job loss, or any major life change. If you're feeling overwhelmed, numb, or stuck weeks or months after a loss, the providers below offer grief support and can help you find your footing.",
		],
		faqs: [
			{
				q: "How much does grief counseling in {city} cost?",
				a: "Fees vary by provider and session length. Many counselors in {city} accept insurance or offer sliding-scale rates — see each profile below for specifics.",
			},
			{
				q: "When should I see a grief counselor?",
				a: "There's no fixed timeline, but if grief is interfering with daily life, sleep, or relationships for an extended period, or you feel stuck, talking to a counselor can help. The providers below specialize in grief.",
			},
			{
				q: "Is online grief counseling available?",
				a: "Yes. Several providers here offer secure telehealth sessions, so you can get support from home anywhere in Florida.",
			},
		],
	},
	ocd: {
		heading: "Therapy for OCD",
		paragraphs: [
			"The most effective treatment for obsessive-compulsive disorder is a specialized form of CBT called exposure and response prevention (ERP). ERP helps you gradually face the thoughts and situations that trigger anxiety while resisting the compulsions or rituals that normally provide short-term relief. Over time this breaks the cycle that keeps OCD going. Finding a therapist specifically trained in ERP matters, because general talk therapy alone is often less effective for OCD.",
			"OCD involves unwanted intrusive thoughts (obsessions) and repetitive behaviors or mental acts (compulsions) done to reduce distress. It can center on contamination, harm, symmetry, taboo thoughts, and much more. If this resonates, the providers below work with OCD and can talk through ERP and related approaches.",
		],
		faqs: [
			{
				q: "What therapy is best for OCD?",
				a: "Exposure and response prevention (ERP), a specialized form of CBT, has the strongest evidence for OCD. When choosing among the providers in {city} below, look for ERP training on their profiles.",
			},
			{
				q: "Do OCD therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Can OCD be treated online?",
				a: "Yes. ERP can be delivered effectively by secure video, and several providers here offer telehealth across Florida.",
			},
		],
	},
	"eating-disorders": {
		heading: "Therapy for eating disorders",
		paragraphs: [
			"Eating disorders are serious but treatable, and care often involves a team. Therapists may use enhanced cognitive behavioral therapy (CBT-E), and family-based treatment (FBT) is well supported for adolescents. Because eating disorders affect the body as well as the mind, therapists frequently coordinate with a physician and a registered dietitian to keep care safe and complete.",
			"Eating disorders include anorexia, bulimia, binge eating disorder, and other patterns of disordered eating, and they affect people of every body size, gender, and background. Early support improves outcomes, so if eating, exercise, or body image is taking up a lot of mental space, the providers below work with eating disorders and can help you take a first step. If you need immediate support, the National Alliance for Eating Disorders helpline is available at 1-866-662-1235.",
		],
		faqs: [
			{
				q: "How much does eating-disorder therapy in {city} cost?",
				a: "Fees vary by provider, and team-based care may involve other professionals. Check each provider's profile below for fees and accepted insurance.",
			},
			{
				q: "Do eating-disorder therapists in {city} accept insurance?",
				a: "Many do. See the “About these providers” section above for insurance acceptance on this page, and each profile for accepted plans.",
			},
			{
				q: "Can eating disorders be treated with online therapy?",
				a: "Telehealth can work well for many people, often as part of coordinated care with a physician and dietitian. Several providers here offer secure online sessions across Florida.",
			},
		],
	},
	addiction: {
		heading: "Therapy for addiction and substance use",
		paragraphs: [
			"Addiction therapy helps you understand the patterns behind substance use or compulsive behaviors and build sustainable change. Common evidence-based approaches include motivational interviewing, cognitive behavioral therapy, and relapse-prevention skills. Therapists often coordinate with medical providers for medication-assisted treatment when appropriate, and many support clients alongside recovery communities and peer support.",
			"You don't have to hit a particular low point to seek help, and treatment isn't all-or-nothing — goals can range from cutting back to full abstinence. Addiction can involve alcohol, drugs, or behaviors like gambling. The providers below work with addiction and substance use and can meet you wherever you are. If you need help now, the SAMHSA National Helpline is free and confidential at 1-800-662-4357.",
		],
		faqs: [
			{
				q: "How much does addiction counseling in {city} cost?",
				a: "Fees vary by provider and level of care. Many counselors in {city} accept insurance or offer sliding-scale rates — see each profile below for specifics.",
			},
			{
				q: "Do addiction counselors in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Can I get addiction counseling online?",
				a: "Yes. Telehealth counseling is widely available and effective for many people; several providers here offer secure online sessions across Florida.",
			},
		],
	},
	autism: {
		heading: "Autism-informed therapy and assessment",
		paragraphs: [
			"Therapy related to autism spans assessment, support for social and communication differences, help with anxiety or burnout, and guidance for families. Many providers take a neurodiversity-affirming approach — the goal is understanding and accommodating how an autistic person experiences the world, building on strengths, and supporting well-being, rather than changing who someone is.",
			"Autism presents differently across individuals and ages, and many people, especially adults and women, are identified later in life. Some providers below offer formal evaluations while others focus on therapy and support; each profile describes what that provider offers, so you can find the right fit for you or your family.",
		],
		faqs: [
			{
				q: "Can I get an autism assessment in {city}?",
				a: "Some providers offer autism evaluations; others focus on therapy and support and can refer you for assessment. Check each provider's profile below to see which services they offer.",
			},
			{
				q: "Do autism-informed therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Is online support available?",
				a: "Yes. Many autism-related therapy and support services work well by secure video, and several providers here offer telehealth across Florida.",
			},
		],
	},
	bipolar: {
		heading: "Therapy for bipolar disorder",
		paragraphs: [
			"Bipolar disorder is highly treatable, and therapy works best as part of a plan that usually includes medication managed by a physician or psychiatrist. Helpful approaches include psychoeducation, cognitive behavioral therapy, and interpersonal and social rhythm therapy (IPSRT), which supports steady daily routines and sleep. Therapy helps you recognize early warning signs of mood shifts, manage stress, and stay consistent with treatment.",
			"Bipolar disorder involves episodes of elevated mood or energy (mania or hypomania) and periods of depression. Because the manic side isn't always obvious, it can take time to identify. The providers below work with bipolar disorder and can support the therapy side of care and coordinate with your prescriber.",
		],
		faqs: [
			{
				q: "Can therapy alone treat bipolar disorder?",
				a: "Therapy is an important part of care, but bipolar disorder typically also requires medication managed by a physician. The providers below can provide therapy and coordinate with your prescriber.",
			},
			{
				q: "Do bipolar therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Is online therapy an option for bipolar disorder?",
				a: "Yes. Many people manage the therapy side of care by secure video; several providers here offer telehealth across Florida.",
			},
		],
	},
	parenting: {
		heading: "Parenting support and therapy",
		paragraphs: [
			"Parenting therapy gives you practical, judgment-free support for the hardest job there is. Providers may use parent coaching, evidence-based programs like parent-child interaction therapy (PCIT) for younger children, and family-systems approaches that look at how everyone interacts. The focus is on concrete strategies for behavior, communication, and connection — and on supporting you, the parent, too.",
			"Common reasons families reach out include defiant or difficult behavior, big transitions like divorce or a new sibling, co-parenting challenges, and worries about a child's mood or development. The providers below work with parents and families and can help you find an approach that fits your situation.",
		],
		faqs: [
			{
				q: "How much does parenting therapy in {city} cost?",
				a: "Fees vary by provider and format. Many providers in {city} accept insurance or offer sliding-scale rates — see each profile below for specifics.",
			},
			{
				q: "Does the child need to attend sessions?",
				a: "It depends on the approach. Some work is parent-only coaching; other programs involve the child directly. Each provider's profile below describes how they work.",
			},
			{
				q: "Can parenting support be done online?",
				a: "Yes. Many families find video sessions convenient, and several providers here offer secure telehealth across Florida.",
			},
		],
	},
	lgbtq: {
		heading: "LGBTQ-affirming therapy",
		paragraphs: [
			"LGBTQ-affirming therapy means working with a provider who understands and respects your identity and creates a safe, non-judgmental space. Affirming therapists are familiar with experiences like minority stress, identity exploration, coming out, family and relationship dynamics, and the impact of discrimination — and they support your goals on your terms. You can bring any concern to affirming therapy, whether or not it relates directly to your identity.",
			"Finding the right fit matters, and you deserve a provider who gets it. The therapists below offer LGBTQ-affirming care and welcome clients across the LGBTQ+ community; their profiles can help you find someone who feels like a good match.",
		],
		faqs: [
			{
				q: "What makes a therapist LGBTQ-affirming?",
				a: "An affirming therapist respects your identity, understands LGBTQ+ experiences and minority stress, and supports your goals without judgment. The providers below offer affirming care — their profiles describe their approach.",
			},
			{
				q: "Do LGBTQ-affirming therapists in {city} accept insurance?",
				a: "Many do. The “About these providers” section above summarizes insurance acceptance on this page, and each profile lists accepted plans.",
			},
			{
				q: "Is online affirming therapy available?",
				a: "Yes. Several providers here offer secure telehealth across Florida, which can be a comfortable option for many clients.",
			},
		],
	},
	"womens-issues": {
		heading: "Therapy for women's issues",
		paragraphs: [
			"Therapy focused on women's issues addresses concerns that women often bring to care — life transitions, identity and self-worth, relationships and caregiving roles, work-life balance, and reproductive and perinatal mental health such as pregnancy, postpartum, and hormonal changes. Providers tailor their approach to your situation, drawing on evidence-based methods like CBT and trauma-informed care where relevant.",
			"Whether you're navigating a specific transition or simply want support that understands your experience, the providers below work with women's issues and can help. If you are struggling during pregnancy or postpartum, you can also reach the National Maternal Mental Health Hotline anytime at 1-833-852-6262.",
		],
		faqs: [
			{
				q: "How much does therapy for women's issues in {city} cost?",
				a: "Fees vary by provider and session length. Many providers in {city} accept insurance or offer sliding-scale rates — see each profile below for specifics.",
			},
			{
				q: "Do these therapists in {city} help with postpartum concerns?",
				a: "Many do. Perinatal and postpartum mental health is a common focus area — check individual profiles below to find providers with that specialty.",
			},
			{
				q: "Is online therapy available?",
				a: "Yes. Several providers here offer secure telehealth across Florida, which many women find easier to fit around work and family.",
			},
		],
	},
};
