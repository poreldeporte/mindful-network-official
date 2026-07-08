import { Typography } from "@/components/ui";
import {
	getAllLandingPageSlugs,
	CITIES,
	CONDITIONS,
	INSURANCES,
	LANGUAGES,
	RESOURCES,
	POPULATIONS,
	VIRTUAL_SLUG,
} from "@/lib/seo-landing-pages";
import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

// Revalidate hourly so newly-valid landing pages (≥2 providers) appear in the
// hub without a redeploy, matching the leaf /find/[slug] pages.
export const revalidate = 3600;

const baseUrl = "https://themindfulnetwork.com";
const url = `${baseUrl}/find`;
const title = "Find a Therapist in South Florida | The Mindful Network";
const description =
	"Browse licensed therapists across South Florida by specialty, service, insurance, language, and city. Find anxiety, depression, ADHD, teen therapy, psychiatry, and psychological testing on The Mindful Network.";

export const metadata: Metadata = {
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
				url: `${baseUrl}/images/logo.webp`,
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
		images: [`${baseUrl}/images/logo.webp`],
	},
	alternates: { canonical: url },
	robots: { index: true, follow: true },
};

interface HubLink {
	slug: string;
	label: string;
	count: number;
}

interface HubGroup {
	key: string;
	title: string;
	links: HubLink[];
}

// Build a group per facet, listing only the city pages that actually exist
// (present in `valid`). Iterating CONDITIONS/INSURANCES/LANGUAGES × CITIES in
// config order keeps a stable, sensible ordering and — because we filter to the
// authoritative valid-slug set — guarantees every emitted link resolves 200.
function buildGroups(
	valid: Map<string, number>,
	facets: { key: string; title: string; slugFor: (citySlug: string) => string }[]
): HubGroup[] {
	return facets
		.map((facet) => ({
			key: facet.key,
			title: facet.title,
			links: CITIES.map((city) => ({ slug: facet.slugFor(city.slug), label: city.name }))
				.filter((l) => valid.has(l.slug))
				.map((l) => ({ ...l, count: valid.get(l.slug) as number })),
		}))
		.filter((g) => g.links.length > 0);
}

function GroupGrid({ groups }: { groups: HubGroup[] }) {
	return (
		<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{groups.map((group) => (
				<div key={group.key}>
					<h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
						{group.title}
					</h3>
					<ul className="mt-3 flex flex-wrap gap-2">
						{group.links.map((link) => (
							<li key={link.slug}>
								<Link
									href={`/find/${link.slug}`}
									className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
								>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

export default async function FindHubPage() {
	const slugs = await getAllLandingPageSlugs();
	const valid = new Map(slugs.map((s) => [s.slug, s.count]));

	const specialtyGroups = buildGroups(
		valid,
		CONDITIONS.map((c) => ({
			key: c.slug,
			title: c.therapistLabel,
			slugFor: (citySlug: string) => `${c.slug}-therapist-${citySlug}`,
		}))
	);

	const insuranceGroups = buildGroups(
		valid,
		INSURANCES.map((i) => ({
			key: i.slug,
			title: `${i.name} Therapists`,
			slugFor: (citySlug: string) => `therapists-accepting-${i.slug}-${citySlug}`,
		}))
	);

	const languageGroups = buildGroups(
		valid,
		LANGUAGES.map((l) => ({
			key: l.slug,
			title: `${l.name}-Speaking Therapists`,
			slugFor: (citySlug: string) => `${l.slug}-speaking-therapist-${citySlug}`,
		}))
	);

	const populationGroups = buildGroups(
		valid,
		POPULATIONS.map((p) => ({
			key: p.slug,
			title: p.label,
			slugFor: (citySlug: string) => `${p.slug}-${citySlug}`,
		}))
	);

	const resourceGroups = buildGroups(
		valid,
		RESOURCES.map((r) => ({
			key: r.slug,
			title: r.label,
			slugFor: (citySlug: string) => `${r.slug}-${citySlug}`,
		}))
	);

	const hasVirtual = valid.has(VIRTUAL_SLUG);

	const schemaData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${url}#collectionpage`,
				url,
				name: "Find a Therapist in South Florida",
				description,
				isPartOf: { "@id": "https://themindfulnetwork.com/#website" },
			},
			{
				"@type": "BreadcrumbList",
				itemListElement: [
					{ "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
					{ "@type": "ListItem", position: 2, name: "Find", item: url },
				],
			},
		],
	};

	const Section = ({
		id,
		heading,
		children,
	}: {
		id: string;
		heading: string;
		children: React.ReactNode;
	}) => (
		<section className="page-width pb-10" aria-labelledby={id}>
			<div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm lg:p-10">
				<h2
					id={id}
					className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl"
				>
					{heading}
				</h2>
				{children}
			</div>
		</section>
	);

	return (
		<main className="min-h-screen w-full bg-slate-50" aria-labelledby="find-hub-heading">
			<Script
				id="find-hub-schema"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
			/>

			<section className="relative overflow-hidden pt-24 pb-8 lg:pt-32 lg:pb-10">
				<div
					className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-slate-50"
					aria-hidden
				/>
				<div className="page-width relative">
					<div className="rounded-[2rem] border border-emerald-100 bg-white p-7 shadow-sm lg:p-10">
						<div className="flex flex-col gap-5 max-w-3xl">
							<Typography
								id="find-hub-heading"
								as="h1"
								variant="h2"
								color="black"
								className="font-antic leading-none"
							>
								Find a Therapist in South Florida
							</Typography>
							<Typography as="p" variant="bodyXSmall" color="darkGray">
								Browse licensed mental health professionals across South Florida by
								specialty, service, age group, insurance, language, and city. Choose a
								category below to see matching therapists in your area.
							</Typography>
						</div>
					</div>
				</div>
			</section>

			{specialtyGroups.length > 0 && (
				<Section id="find-by-specialty" heading="Browse by specialty">
					<GroupGrid groups={specialtyGroups} />
				</Section>
			)}

			{populationGroups.length > 0 && (
				<Section id="find-by-population" heading="Browse by who it's for">
					<GroupGrid groups={populationGroups} />
				</Section>
			)}

			{resourceGroups.length > 0 && (
				<Section id="find-by-service" heading="Browse by service">
					<GroupGrid groups={resourceGroups} />
				</Section>
			)}

			{insuranceGroups.length > 0 && (
				<Section id="find-by-insurance" heading="Browse by insurance">
					<GroupGrid groups={insuranceGroups} />
				</Section>
			)}

			{languageGroups.length > 0 && (
				<Section id="find-by-language" heading="Browse by language">
					<GroupGrid groups={languageGroups} />
				</Section>
			)}

			{hasVirtual && (
				<Section id="find-telehealth" heading="Online therapy">
					<ul className="mt-6 flex flex-wrap gap-2">
						<li>
							<Link
								href={`/find/${VIRTUAL_SLUG}`}
								className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
							>
								Online Therapy in Florida
							</Link>
						</li>
					</ul>
				</Section>
			)}

			<div className="pb-16 lg:pb-24" />
		</main>
	);
}
