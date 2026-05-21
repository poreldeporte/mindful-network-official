import { ListingDetailPage } from "@/routes/psychologists/components/detail-v2";
import { getPsychologistById } from "@/services";
import { sanityClient } from "@/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Revalidate every hour so updated provider data appears without redeploying
export const revalidate = 3600;

export async function generateStaticParams() {
	try {
		const professionals = await sanityClient.fetch(
			`*[_type == 'professionals']{ "slug": slug.current }`
		);
		return professionals.map((p: { slug: string }) => ({ slug: p.slug }));
	} catch (error) {
		console.error("Failed to fetch professional slugs for static generation:", error);
		return [];
	}
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
			description: "The requested psychologist profile is not available.",
		};
	}

	const city = psychologist.address?.city;
	const state = psychologist.address?.state?.toUpperCase();
	const cityState = [city, state].filter(Boolean).join(", ");
	const nameWithDegree = psychologist.degree
		? `${psychologist.name}, ${psychologist.degree}`
		: psychologist.name;
	const profession = psychologist.degree ? "Therapist" : "Mental Health Practice";
	const locPart = cityState
		? `${profession} in ${cityState}`
		: `${profession} in South Florida`;
	const title = `${nameWithDegree} — ${locPart} | The Mindful Network`;

	// Build a unique description from actual provider data, fitting within ~155 chars
	// Priority: name+degree, conditions, location, modalities (how they work), insurance
	const MAX_LENGTH = 155;
	const location = cityState;

	const conditions = psychologist.conditionSpecialty?.map((c) => c.name) || [];
	const modalities = psychologist.therapyOptions?.map((t) => t.type) || [];

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
	let description = nameWithDegree;

	// Add conditions — as many as fit, reserving budget for modalities + insurance sentences
	if (conditions.length > 0) {
		let condStr = ` specializes in ${conditions[0]}`;
		for (let i = 1; i < conditions.length; i++) {
			const next = `, ${conditions[i]}`;
			if ((description + condStr + next).length > MAX_LENGTH - 70) break;
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

	// Add modalities — up to 2, only if there's room left for at least a short insurance line
	if (modalities.length > 0) {
		let modStr = ` Offers ${modalities[0]}`;
		if (modalities.length > 1) {
			const next = ` and ${modalities[1]}`;
			if ((description + modStr + next + ".").length <= MAX_LENGTH - 25) {
				modStr += next;
			}
		}
		if ((description + modStr + ".").length <= MAX_LENGTH - 15) {
			description += modStr + ".";
		}
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
	const schemaData: Record<string, unknown> = {
		"@context": "https://schema.org",
		"@type": "MedicalBusiness",
		name: psychologist.name,
		description: psychologist.subtitle || psychologist.description,
		image: psychologist.image,
		url,
		isPartOf: {
			"@type": "Organization",
			name: "The Mindful Network",
			url: "https://themindfulnetwork.com",
		},
	};

	if (psychologist.phone) {
		schemaData.telephone = psychologist.phone;
	}

	if (psychologist.email) {
		schemaData.email = psychologist.email;
	}

	if (psychologist.degree) {
		schemaData.jobTitle = psychologist.degree;
	} else {
		schemaData.jobTitle = "Mental Health Professional";
	}

	if (psychologist.address?.address) {
		schemaData.address = {
			"@type": "PostalAddress",
			streetAddress: psychologist.address.address,
			addressLocality: psychologist.address.city,
			addressRegion: psychologist.address.state,
			postalCode: psychologist.address.zip,
			addressCountry: "US",
		};
	}

	if (psychologist.insurances?.length > 0) {
		schemaData.paymentAccepted = psychologist.insurances.map((i) => i.name).join(", ");
	}

	if (psychologist.conditionSpecialty?.length > 0) {
		schemaData.medicalSpecialty = psychologist.conditionSpecialty.map((c) => c.name).join(", ");
	}

	if (psychologist.languages?.length > 0) {
		schemaData.knowsLanguage = psychologist.languages;
	}

	if (psychologist.therapyOptions?.length > 0) {
		schemaData.hasOfferCatalog = {
			"@type": "OfferCatalog",
			name: "Therapy Services",
			itemListElement: psychologist.therapyOptions.map((t) => ({
				"@type": "Offer",
				itemOffered: {
					"@type": "MedicalTherapy",
					name: t.type,
				},
			})),
		};
	}

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
