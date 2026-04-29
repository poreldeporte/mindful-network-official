import { Typography } from "@/components/ui";
import {
	resolveLandingPageSlug,
	getAllLandingPageSlugs,
	generateIntro,
} from "@/lib/seo-landing-pages";
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

	let title: string;
	let description: string;

	if (page.type === "condition") {
		title = `${page.condition.therapistLabel} in ${page.city.name}, ${page.city.stateAbbr} | The Mindful Network`;
		description = `Find licensed ${page.condition.therapistLabel.toLowerCase()} in ${page.city.name}, ${page.city.state}. Browse therapists who specialize in ${page.condition.name.toLowerCase()} treatment on The Mindful Network.`;
	} else if (page.type === "insurance") {
		title = `Therapists Accepting ${page.insurance.name} in ${page.city.name}, ${page.city.stateAbbr} | The Mindful Network`;
		description = `Find therapists in ${page.city.name} who accept ${page.insurance.name} insurance. Browse in-network mental health professionals on The Mindful Network.`;
	} else {
		title = `${page.language.name}-Speaking Therapists in ${page.city.name}, ${page.city.stateAbbr} | The Mindful Network`;
		description = `Find ${page.language.name}-speaking therapists in ${page.city.name}, ${page.city.state}. Connect with mental health professionals who provide care in ${page.language.name}.`;
	}

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			type: "website",
		},
		twitter: {
			card: "summary",
			title,
			description,
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

	let heading: string;
	let badgeText: string;
	let badgeColor: string;
	let introText: string;
	let searchProps: Record<string, unknown>;
	let count = 0;

	if (page.type === "condition") {
		heading = `${page.condition.therapistLabel} in ${page.city.name}, ${page.city.stateAbbr}`;
		badgeText = `${page.condition.name.toUpperCase()} SPECIALISTS`;
		badgeColor = "emerald";
		count = professionals.filter(
			(p) =>
				p.conditionSpecialty?.some((c) => c.name.toLowerCase() === page.condition.filterValue) &&
				(p.address?.city || "").trim().toLowerCase() === page.city.name.toLowerCase()
		).length;
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
		count = professionals.filter(
			(p) =>
				p.insurances?.some((i) => i.name.toLowerCase() === page.insurance.filterValue) &&
				(p.address?.city || "").trim().toLowerCase() === page.city.name.toLowerCase()
		).length;
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
	} else {
		heading = `${page.language.name}-Speaking Therapists in ${page.city.name}, ${page.city.stateAbbr}`;
		badgeText = `${page.language.name.toUpperCase()}-SPEAKING`;
		badgeColor = "purple";
		count = professionals.filter(
			(p) =>
				p.languages?.some((l) => l.toLowerCase() === page.language.name.toLowerCase()) &&
				(p.address?.city || "").trim().toLowerCase() === page.city.name.toLowerCase()
		).length;
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
	}

	const colorMap: Record<string, { badge: string; bg: string; border: string; text: string }> = {
		emerald: { badge: "border-emerald-200 bg-emerald-50", bg: "from-emerald-50", border: "border-emerald-100", text: "text-emerald-600" },
		blue: { badge: "border-blue-200 bg-blue-50", bg: "from-blue-50", border: "border-blue-100", text: "text-blue-600" },
		purple: { badge: "border-purple-200 bg-purple-50", bg: "from-purple-50", border: "border-purple-100", text: "text-purple-600" },
	};
	const colors = colorMap[badgeColor] || colorMap.blue;

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
		</main>
	);
}
