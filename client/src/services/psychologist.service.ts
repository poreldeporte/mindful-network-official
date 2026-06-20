import { getPsychologistsAdapter } from "@/adapters";
import { sanityClient } from "@/api";
import { PsychologistModel } from "@/models";

export const getPsychologistById = async (
	slug: string
): Promise<PsychologistModel | null> => {
	try {
		const query = `*[_type == 'professionals' && slug.current == $slug][0]{
            ...,
            "slug": slug.current,
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
                type,
                category
            },
					"resource": resource[]->{
						_id,
						title
					},
		            "languages": languages[]->.language,
		            "image": image.asset->url,
            "imageAlt": image.alt,
            "video": video.asset->url,
            "imagesGallery": imagesGallery[]{
                "url": asset->url,
                "alt": alt,
                hotspot,
                fit
            }
        }`;

		// Revalidate hourly instead of no-store. no-store forces the whole
		// /professional/[slug] route to render dynamically on every request,
		// defeating its `revalidate = 3600` + generateStaticParams (433 pages
		// were being SSR'd per hit). Matching the page cadence lets these pages
		// serve from the edge/ISR cache and cuts per-request Sanity reads.
		const data = await sanityClient.fetch(
			query,
			{ slug },
			{ next: { revalidate: 3600 } }
		);

		// console.log(data);
		return getPsychologistsAdapter(data);
	} catch (error) {
		console.error("Error fetching psychologist data:", error);
		return null;
	}
};

export const getAllProfessionals = async () => {
	try {
		const data = await sanityClient.fetch(
			`*[_type == 'professionals'] | order(orderRank asc) {
			...,
			"slug": slug.current, 
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
				type,
				category
			},
					"resource": resource[]->{
						_id,
						title
					},
					"languages": languages[]->.language,
				"image": image.asset->url,
			"imageAlt": image.alt,
			"imagesGallery": imagesGallery[]{
				"url": asset->url,
				"alt": alt,
				hotspot,
				fit
			}
		}`,
			{},
			{ cache: "no-store" }
		);

		if (data) {
			const adaptedData = data.map(getPsychologistsAdapter);

			return adaptedData;
		}
	} catch (error) {
		console.error("Error fetching all schemas:", error);
		return error;
	}
};
