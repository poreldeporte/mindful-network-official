import { sanityClient } from "@/api";
import { allStudentResourcesQuery } from "@/app/api/types";

export const getAllStudentResources = async () => {
	try {
		const data = await sanityClient.fetch(allStudentResourcesQuery);
		return data;
	} catch (error) {
		console.error("Error fetching all student resources:", error);
		return error;
	}
};
