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
					alt: psychologist.name,
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

	return (
		<div className="min-h-screen mx-auto w-11/12 xl:w-3/4 lg:grid lg:grid-cols-6 lg:items-start lg:mt-28 lg:gap-x-10">
			<div className="lg:col-span-4">
				<ProfileCard {...psychologist} />
				<PsychologistAbout {...psychologist} />
			</div>
			<div className="lg:col-span-2 lg:relative h-full">
				<StickyButton />
			</div>
			<GetInTouch {...psychologist} />
		</div>
	);
}
