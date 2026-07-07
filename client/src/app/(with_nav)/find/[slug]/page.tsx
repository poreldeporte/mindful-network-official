import { Typography } from "@/components/ui";
import {
	resolveLandingPageSlug,
	getAllLandingPageSlugs,
	computeLandingPageSlugs,
	getRelatedSlugs,
	matchProviders,
	computeProviderStats,
	getPageContent,
	generateIntro,
	VIRTUAL_MODALITY,
} from "@/lib/seo-landing-pages";
import { RelatedSearches } from "@/routes/find/components/RelatedSearches";
import { LandingPageBody, LandingPageFaq } from "@/routes/find/components/LandingPageBody";
import {
	getAllConditions,
	getAllInsurances,
	getAllProfessionals,
	getAllResources,
	getAllTherapyOptions,
} from "@/services";
import { PsychologistModel } from "@/models";
import { SearchWrapper } from "@/routes/search";
import { generateResourceKeys } from "@/utilities/generate-resource.keys.utility";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";

// Revalidate every hour so new providers appear without redeploying
export const revalidate = 3600;

export async function generateStaticParams() {
	const slugs = await getAllLandingPageSlugs();
	return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const page = resolveLandingPageSlug(params.slug);
	if (!page) {
		return {
			title: "Not Found",
			robots: { index: false, follow: false },
		};
	}

	const baseUrl = "https://themindfulnetwork.com";
	const url = `${baseUrl}/find/${params.slug}`;
	const ogImage = `${baseUrl}/images/logo.webp`;

	let title: string;
	let description: string;

	if (page.type === "condition") {
		title = `${page.condition.therapistLabel} in ${page.city.name}, ${page.city.stateAbbr} | The Mindful Network`;
		description = `Browse licensed ${page.condition.therapistLabel.toLowerCase()} in ${page.city.name}, ${page.city.stateAbbr}. Compare specialties, insurance accepted, and treatment approaches on The Mindful Network.`;
	} else if (page.type === "insurance") {
		title = `Therapists Accepting ${page.insurance.name} in ${page.city.name}, ${page.city.stateAbbr} | The Mindful Network`;
		description = `Find ${page.insurance.name}-covered therapists in ${page.city.name}, ${page.city.stateAbbr}. Browse in-network providers by specialty, language, and treatment approach on The Mindful Network.`;
	} else if (page.type === "language") {
		title = `${page.language.name}-Speaking Therapists in ${page.city.name}, ${page.city.stateAbbr} | The Mindful Network`;
		description = `Find ${page.language.name}-speaking therapists in ${page.city.name}, ${page.city.stateAbbr}. Browse licensed bilingual providers by specialty and insurance on The Mindful Network.`;
	} else if (page.type === "resource") {
		title = `${page.resource.label} in ${page.city.name}, ${page.city.stateAbbr} | The Mindful Network`;
		description = `Find ${page.resource.label.toLowerCase()} in ${page.city.name}, ${page.city.stateAbbr}. Browse licensed providers offering ${page.resource.blurb} on The Mindful Network.`;
	} else {
		// virtual
		title = `Online Therapy in Florida — Telehealth Providers | The Mindful Network`;
		description = `Find licensed online therapists serving all of Florida. Browse telehealth providers by specialty, insurance, and treatment approach on The Mindful Network.`;
	}

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			type: "website",
			siteName: "The Mindful Network",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: "The Mindful Network — Mental Health Professional Directory",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
		alternates: {
			canonical: url,
		},
		robots: { index: true, follow: true },
	};
}

export default async function FindPage({
	params,
}: {
	params: { slug: string };
}) {
	const page = resolveLandingPageSlug(params.slug);
	if (!page) notFound();

	const baseUrl = "https://themindfulnetwork.com";
	const url = `${baseUrl}/find/${params.slug}`;

	// Fetch all the data SearchWrapper needs on the server so it ships in the
	// SSR HTML. Without this, the page renders an empty "No results found"
	// placeholder until the client hydrates and re-fetches — which Google sees
	// as the canonical content for the page.
	const [
		allProfessionals,
		allConditions,
		allInsurances,
		allTherapyModalities,
		allResources,
	] = await Promise.all([
		getAllProfessionals(),
		getAllConditions(),
		getAllInsurances(),
		getAllTherapyOptions(),
		getAllResources(),
	]);
	const professionals: PsychologistModel[] = Array.isArray(allProfessionals) ? allProfessionals : [];
	const initialConditions = Array.isArray(allConditions) ? allConditions : [];
	const initialInsurances = Array.isArray(allInsurances) ? allInsurances : [];
	const initialTherapyModalities = Array.isArray(allTherapyModalities) ? allTherapyModalities : [];
	const initialResourceKeys = generateResourceKeys(Array.isArray(allResources) ? allResources : []);

	// Providers matched to this page (variant-aware matcher, same one that decides
	// which pages exist). Drives both the headline count and the live stats, so the
	// two never disagree.
	const matched = matchProviders(professionals, page);
	const stats = computeProviderStats(matched);
	const pageContent = getPageContent(page, stats);

	let heading: string;
	let badgeText: string;
	let badgeColor: string;
	let introText: string;
	let searchProps: Record<string, unknown>;
	const count = matched.length;

	if (page.type === "condition") {
		heading = `${page.condition.therapistLabel} in ${page.city.name}, ${page.city.stateAbbr}`;
		badgeText = `${page.condition.name.toUpperCase()} SPECIALISTS`;
		badgeColor = "emerald";
		introText = generateIntro("condition", {
			condition: page.condition.name,
			city: page.city.name,
			descriptor: page.city.descriptor,
			count,
		});
		searchProps = {
			lockedConditions: [page.condition.filterValue],
			lockedCity: page.city.name,
			titlePrefix: `${page.condition.therapistLabel} in`,
			titleHighlight: page.city.name,
			headingAs: "h2" as const,
		};
	} else if (page.type === "insurance") {
		heading = `Therapists Accepting ${page.insurance.name} in ${page.city.name}, ${page.city.stateAbbr}`;
		badgeText = `${page.insurance.name.toUpperCase()} IN-NETWORK`;
		badgeColor = "blue";
		introText = generateIntro("insurance", {
			insurance: page.insurance.name,
			city: page.city.name,
			descriptor: page.city.descriptor,
			count,
		});
		searchProps = {
			lockedInsurances: [page.insurance.filterValue],
			lockedCity: page.city.name,
			titlePrefix: `${page.insurance.name} Therapists in`,
			titleHighlight: page.city.name,
			headingAs: "h2" as const,
		};
	} else if (page.type === "language") {
		heading = `${page.language.name}-Speaking Therapists in ${page.city.name}, ${page.city.stateAbbr}`;
		badgeText = `${page.language.name.toUpperCase()}-SPEAKING`;
		badgeColor = "purple";
		introText = generateIntro("language", {
			language: page.language.name,
			city: page.city.name,
			descriptor: page.city.descriptor,
			count,
		});
		searchProps = {
			lockedLanguage: page.language.name,
			lockedCity: page.city.name,
			titlePrefix: `${page.language.name}-Speaking Therapists in`,
			titleHighlight: page.city.name,
			headingAs: "h2" as const,
		};
	} else if (page.type === "resource") {
		heading = `${page.resource.label} in ${page.city.name}, ${page.city.stateAbbr}`;
		badgeText = page.resource.name.toUpperCase();
		badgeColor = "amber";
		introText = generateIntro("resource", {
			resource: page.resource.blurb,
			city: page.city.name,
			descriptor: page.city.descriptor,
			count,
		});
		searchProps = {
			lockedResource: page.resource.filterValue,
			lockedCity: page.city.name,
			titlePrefix: `${page.resource.label} in`,
			titleHighlight: page.city.name,
			headingAs: "h2" as const,
		};
	} else {
		// virtual
		heading = `Online Therapy in Florida`;
		badgeText = "TELEHEALTH PROVIDERS";
		badgeColor = "blue";
		introText = generateIntro("virtual", { count });
		searchProps = {
			lockedTherapyModality: VIRTUAL_MODALITY,
			titlePrefix: `Online Therapy in`,
			titleHighlight: "Florida",
			headingAs: "h2" as const,
		};
	}

	const colorMap: Record<string, { badge: string; bg: string; border: string; text: string }> = {
		emerald: { badge: "border-emerald-200 bg-emerald-50", bg: "from-emerald-50", border: "border-emerald-100", text: "text-emerald-600" },
		blue: { badge: "border-blue-200 bg-blue-50", bg: "from-blue-50", border: "border-blue-100", text: "text-blue-600" },
		purple: { badge: "border-purple-200 bg-purple-50", bg: "from-purple-50", border: "border-purple-100", text: "text-purple-600" },
		amber: { badge: "border-amber-200 bg-amber-50", bg: "from-amber-50", border: "border-amber-100", text: "text-amber-600" },
	};
	const colors = colorMap[badgeColor] || colorMap.blue;

	// Related /find/ cross-links. Derive the valid-slug set from the providers we
	// already fetched (no extra Sanity round-trip) so we never link to a page that
	// wouldn't be generated.
	const validSlugs = new Set(computeLandingPageSlugs(professionals).map((s) => s.slug));
	const relatedLinks = getRelatedSlugs(page, validSlugs);

	const schemaData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${url}#collectionpage`,
				url,
				name: heading,
				description: introText.slice(0, 200),
				isPartOf: {
					"@id": "https://themindfulnetwork.com/#website",
				},
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{
						"@type": "ListItem",
						position: 1,
						name: "Home",
						item: "https://themindfulnetwork.com/",
					},
					{
						"@type": "ListItem",
						position: 2,
						name: "Find",
						item: "https://themindfulnetwork.com/find",
					},
					{
						"@type": "ListItem",
						position: 3,
						name: heading,
						item: url,
					},
				],
			},
			...(pageContent.faqs.length > 0
				? [
						{
							"@type": "FAQPage",
							mainEntity: pageContent.faqs.map((f) => ({
								"@type": "Question",
								name: f.q,
								acceptedAnswer: { "@type": "Answer", text: f.a },
							})),
						},
					]
				: []),
		],
	};

	return (
		<main
			className="min-h-screen w-full bg-slate-50"
			aria-labelledby="landing-page-heading"
		>
			<Script
				id="landing-page-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
			/>

			<section className="relative overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-10">
				<div
					className={`absolute inset-0 bg-gradient-to-b ${colors.bg} via-white to-slate-50`}
					aria-hidden
				/>

				<div className="page-width relative">
					<div className={`rounded-[2rem] border ${colors.border} bg-white p-7 shadow-sm lg:p-10`}>
						<div className="flex flex-col gap-5 max-w-3xl">
							<div className={`inline-flex w-max items-center gap-2 rounded-full border ${colors.badge} px-4 py-1.5`}>
								<Typography
									as="span"
									variant="bodyXSmall"
									color="blue"
									className={`font-semibold tracking-wide ${colors.text}`}
								>
									{badgeText}
								</Typography>
							</div>

							<Typography
								id="landing-page-heading"
								as="h1"
								variant="h2"
								color="black"
								className="font-antic leading-none"
							>
								{heading}
							</Typography>

							<Typography as="p" variant="bodyXSmall" color="darkGray">
								{introText}
							</Typography>

							{count > 0 && (
								<div className="flex flex-wrap gap-2 pt-1">
									<span className={`inline-flex items-center rounded-full border ${colors.badge} px-3 py-1 text-[11px] font-medium ${colors.text} sm:text-xs`}>
										{count} provider{count !== 1 ? "s" : ""} available
									</span>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			<LandingPageBody content={pageContent} />

			<section className="page-width pb-16 lg:pb-24">
				<div className={`overflow-hidden rounded-[2rem] border ${colors.border} bg-white shadow-sm`}>
					<Suspense fallback={<div className="p-8">Loading providers...</div>}>
						<SearchWrapper
							{...searchProps}
							initialProfessionals={professionals}
							initialConditions={initialConditions}
							initialInsurances={initialInsurances}
							initialTherapyModalities={initialTherapyModalities}
							initialResourceKeys={initialResourceKeys}
						/>
					</Suspense>
				</div>
			</section>

			<LandingPageFaq faqs={pageContent.faqs} />

			<RelatedSearches links={relatedLinks} />
		</main>
	);
}
