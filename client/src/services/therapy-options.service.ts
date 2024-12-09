import { sanityClient } from "@/api";
import { allTherapyModalitiesQuery } from "@/app/api/types";

export const getAllTherapyOptions = async () => {
	try {
		const data = await sanityClient.fetch(allTherapyModalitiesQuery);
		return data;
	} catch (error) {
		console.error("Error fetching all therapy options:", error);
		return error;
	}
};
