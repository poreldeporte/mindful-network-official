import { getPsychologistsAdapter } from "@/adapters";
import { sanityClient } from "@/api";
import { PsychologistModel } from "@/models";

export const getPsychologistById = async (
	slug: string
): Promise<PsychologistModel | null> => {
	try {
		const query = `*[_type == 'professionals' && slug.current == $slug][0]{
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
                "alt": alt
            }
        }`;

		const data = await sanityClient.fetch(
			query,
			{ slug },
			{ cache: "no-store" }
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
				type
			},
			"resource": resource[]->{
				_id,
				title
			},
			"image": image.asset->url,
			"imageAlt": image.alt
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
