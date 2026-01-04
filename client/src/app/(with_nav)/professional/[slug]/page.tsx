import { ListingDetailPage } from "@/routes/psychologists/components/detail-v2";
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

	const url = `https://themindfulnetwork.com/professional/${params.slug}`;
	const schemaData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: psychologist.name,
		description: psychologist.subtitle || psychologist.description,
		image: psychologist.image,
		jobTitle: "Mental Health Professional",
		url,
		worksFor: {
			"@type": "Organization",
			name: "Mindful Network",
			url: "https://themindfulnetwork.com",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
			/>
			<ListingDetailPage psychologist={psychologist} />
			{/* Legacy layout available at `client/src/routes/psychologists/components/legacy/LegacyProfessionalLayout.tsx`. */}
		</>
	);
}
