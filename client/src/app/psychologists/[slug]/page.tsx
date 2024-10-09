import { getPsychologistsAdapter } from "@/adapters";
import { sanityClient } from "@/api";
import { PsychologistModel } from "@/models";
import {
	GetInTouch,
	ProfileCard,
	PsychologistAbout,
	StickyButton,
} from "@/routes/psychologists/components";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export default async function PsychologistPage({
	params,
}: {
	params: { slug: string };
}) {
	const psychologist = await fetchPsychologistData(params.slug);

	if (!psychologist) {
		notFound();
	}

	return (
		<div className="min-h-screen mx-auto w-11/12 xl:w-3/4 lg:grid lg:grid-cols-6 lg:items-start lg:mt-56 lg:gap-x-10">
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

async function fetchPsychologistData(
	slug: string
): Promise<PsychologistModel | null> {
	try {
		const query = `*[_id == $slug][0]{
            ..., 
            "conditionSpecialty": conditionSpecialty[]->{
                "id": _id,
                name
            },
            "insurances": insurances[]->{
                "id": _id,
                name
            },
            "ageSpecialty": ageSpecialty[]->{
                "id": _id,
                age
            },
            "therapyOptions": therapyOptions[]->{
                "id": _id,
                type
            },
            "image": image.asset->url
        }`;

		const data = await sanityClient.fetch(query, { slug });
		return getPsychologistsAdapter(data);
	} catch (error) {
		console.error("Error fetching psychologist data:", error);
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const psychologist = await fetchPsychologistData(params.slug);

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
