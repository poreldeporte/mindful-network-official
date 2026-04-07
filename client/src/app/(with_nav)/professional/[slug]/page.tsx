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

	// Build a unique description from actual provider data, fitting within ~155 chars
	// Priority: name+degree, conditions (differentiator), location, then insurance (most common first)
	const MAX_LENGTH = 155;
	const location = [psychologist.address?.city, psychologist.address?.state].filter(Boolean).join(", ");

	const conditions = psychologist.conditionSpecialty?.map((c) => c.name) || [];

	// Sort insurances by popularity — most-searched plans first
	const INSURANCE_PRIORITY = [
		"BCBS", "Aetna", "UnitedHealthcare", "Cigna", "Humana", "Medicare",
		"Medicaid", "Tricare", "FloridaBlue", "Optum", "Magellan", "AvMed",
	];
	const sortedInsurances = [...(psychologist.insurances || [])].sort((a, b) => {
		const aIdx = INSURANCE_PRIORITY.indexOf(a.name);
		const bIdx = INSURANCE_PRIORITY.indexOf(b.name);
		return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
	}).map((i) => i.name).filter((n) => n !== "Self Pay");

	// Start with name + degree
	let description = psychologist.degree
		? `${psychologist.name}, ${psychologist.degree}`
		: psychologist.name;

	// Add conditions — as many as fit
	if (conditions.length > 0) {
		let condStr = ` specializes in ${conditions[0]}`;
		for (let i = 1; i < conditions.length; i++) {
			const next = `, ${conditions[i]}`;
			if ((description + condStr + next).length > MAX_LENGTH - 40) break;
			condStr += next;
		}
		description += condStr;
	}

	// Add location
	if (location) {
		description += ` in ${location}.`;
	} else {
		description += " in South Florida.";
	}

	// Add insurance — as many as fit
	if (sortedInsurances.length > 0) {
		let insStr = ` Accepts ${sortedInsurances[0]}`;
		for (let i = 1; i < sortedInsurances.length; i++) {
			const next = `, ${sortedInsurances[i]}`;
			if ((description + insStr + next + ".").length > MAX_LENGTH) break;
			insStr += next;
		}
		description += insStr + ".";
	}

	// Fallback if we somehow have no data
	if (description === psychologist.name || description.length < 40) {
		description = `Connect with ${psychologist.name}, a licensed mental health professional in South Florida.`;
	}

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
