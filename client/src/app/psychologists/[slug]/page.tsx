import {
	GetInTouch,
	ProfileCard,
	PsychologistAbout,
	StickyButton,
} from "@/routes/psychologists/components";
import { getPsychologistById } from "@/services";
import { Metadata } from "next";
import { notFound } from "next/navigation";

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

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const psychologist = await getPsychologistById(params.slug);

	if (!psychologist) {
		return {
			title: "Psychologist Not Found",
			description:
				"No psychologist data available for the provided identifier.",
		};
	}

	return {
		title: `Mindful Network - ${psychologist.name}`,
		description: psychologist.subtitle,
		openGraph: {
			title: `Mindful Network - ${psychologist.name}`,
			description: psychologist.description,
			images: [
				{
					url: psychologist.image,
					width: 800,
					height: 600,
					alt: psychologist.name,
				},
			],
		},
	};
}
