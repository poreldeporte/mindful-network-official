import { getPsychologistsAdapter } from "@/adapters";
import { sanityClient } from "@/api";
import { PsychologistModel } from "@/models";

export const getPsychologistById = async (
	slug: string
): Promise<PsychologistModel | null> => {
	try {
		const query = `*[slug.current == $slug][0]{
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
};
