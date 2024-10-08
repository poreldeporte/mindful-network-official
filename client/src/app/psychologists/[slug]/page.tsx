"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import { PsychologistModel } from "@/models";
import {
	PsychologistAbout,
	ProfileCard,
	GetInTouch,
	StickyButton,
} from "@/routes/psychologists/components";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";
import { sanityClient } from "@/api";
import { getPsychologistsAdapter } from "@/adapters";

export default function PsychologistPage() {
	const { slug } = useParams();
	const [psychologist, setPsychologist] = useState<PsychologistModel | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (slug) {
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
					const adaptedData = getPsychologistsAdapter(data);

					if (adaptedData) setPsychologist(adaptedData);
				} catch (error) {
					console.log(error);
					setError(error as string);
				}
			}
		};
		fetchData();
	}, [slug]);

	if (error) {
		return <div>Error: {error}</div>;
	}

	if (!psychologist) {
		return <div>Loading...</div>;
	}

	const schemaData = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: psychologist.name,
		jobTitle: psychologist.name || "Psychologist",
		worksFor: {
			"@type": "Organization",
			name: psychologist.facility,
		},
		address: {
			"@type": "PostalAddress",
			streetAddress: psychologist.address.address,
			addressLocality: psychologist.address.city,
			addressRegion: psychologist.address.state,
			postalCode: psychologist.address.zip,
			addressCountry: "US",
		},
		telephone: psychologist.phone,
		image: psychologist.image,
		areaServed: "South Florida",
	};

	return (
		<main aria-labelledby="psychologist-profile-page">
			<Head>
				<title>{`${psychologist.name} - Mindful Network`}</title>
				<meta
					name="description"
					content={`Learn about ${psychologist.name}, a mental health professional specializing in ${psychologist.conditionSpecialty
						.map((specialty) => specialty.name)
						.join(
							", "
						)}. Located in ${psychologist.address.city}, ${psychologist.address.state}, ${psychologist.name} offers ${psychologist.therapyOptions
						.map((option) => option.type)
						.join(", ")} therapy.`}
				/>
				<meta
					property="og:title"
					content={`${psychologist.name} - Mental Health Professional`}
				/>
				<meta
					property="og:description"
					content={`Discover the services offered by ${psychologist.name} in ${psychologist.address.city}. Specialties include ${psychologist.conditionSpecialty
						.map((specialty) => specialty.name)
						.join(", ")}.`}
				/>
				<meta property="og:type" content="profile" />
				<meta
					property="og:url"
					content={`https://www.mindfulnetwork.com/psychologists/${slug}`}
				/>
				{psychologist.image && (
					<meta property="og:image" content={psychologist.image} />
				)}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content={`${psychologist.name} - Mental Health Professional`}
				/>
				<meta
					name="twitter:description"
					content={`Learn more about ${psychologist.name} and their specialties in ${psychologist.address.city}, ${psychologist.address.state}.`}
				/>
				{psychologist.image && (
					<meta name="twitter:image" content={psychologist.image} />
				)}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
			</Head>

			<Topbar />
			<MobileTopBar />

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

			<Footer />
		</main>
	);
}
