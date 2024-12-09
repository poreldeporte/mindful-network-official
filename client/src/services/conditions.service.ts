import { sanityClient } from "@/api";
import { allConditionSpecialtiesQuery } from "@/app/api/types";

export const getAllConditions = async () => {
	try {
		const data = await sanityClient.fetch(allConditionSpecialtiesQuery);
		return data;
	} catch (error) {
		console.error("Error fetching all schemas:", error);
		return error;
	}
};
