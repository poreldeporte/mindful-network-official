import {
	GetInTouch,
	ProfileCard,
	PsychologistAbout,
	StickyButton,
} from "@/routes/psychologists/components";
import { getPsychologistById } from "@/services";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatType } from "@/utilities";
import ProfessionalTOC from "@/components/shared/ProfessionalTOC";
import { getTOCPosition } from "@/utilities/toc.utility";

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const psychologist = await getPsychologistById(params.slug);

	if (!psychologist) {
		return {
			title: "Psychologist Not Found",
			description: "The requested psychologist profile is not available.",
		};
	}

	const title = `${psychologist.name} - ${formatType(psychologist._type)}`;
	const description = `Connect with ${psychologist.name}, a licensed mental health professional in South Florida.`;
	const url = `https://themindfulnetwork.com/professional/${params.slug}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			images: [
				{
					url: psychologist.image,
					width: 800,
					height: 600,
					alt: psychologist.imageAlt || psychologist.name,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [psychologist.image],
		},
		alternates: {
			canonical: url,
		},
		other: {
			"application/ld+json": JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Person",
				name: psychologist.name,
				description: psychologist.subtitle,
				image: psychologist.image,
				jobTitle: "Mental Health Professional",
				url: url,
				worksFor: {
					"@type": "Organization",
					name: "Mindful Network",
					url: "https://themindfulnetwork.com",
				},
			}),
		},
	};
}

export default async function PsychologistPage({
	params,
}: {
	params: { slug: string };
}) {
	const psychologist = await getPsychologistById(params.slug);

	if (!psychologist) {
		notFound();
	}

	const tocSettings = psychologist.tocSettings || {
		enableTOC: true,
		tocPosition: "before",
		includeLevels: ["h1", "h2", "h3"],
	};

	const tocPositionClass = getTOCPosition(tocSettings.tocPosition);

	return (
		<div className="min-h-screen mx-auto w-11/12 xl:w-3/4 lg:grid lg:grid-cols-6 lg:items-start lg:mt-28 lg:gap-x-10">
			<div className="lg:col-span-4">
				{tocSettings.enableTOC && tocSettings.tocPosition === "before" && (
					<div className={`${tocPositionClass} mb-8`}>
						<ProfessionalTOC psychologist={psychologist} />
					</div>
				)}

				<ProfileCard {...psychologist} />
				<PsychologistAbout {...psychologist} />

				{tocSettings.enableTOC && tocSettings.tocPosition === "after" && (
					<div className={`${tocPositionClass} mt-8`}>
						<ProfessionalTOC psychologist={psychologist} />
					</div>
				)}
			</div>
			<div className="lg:col-span-2 lg:relative h-full">
				<div className="sticky top-28 space-y-5">
					{tocSettings.enableTOC && tocSettings.tocPosition === "sidebar" && (
						<ProfessionalTOC psychologist={psychologist} />
					)}

					<StickyButton />
				</div>
			</div>
			<GetInTouch {...psychologist} />
		</div>
	);
}
