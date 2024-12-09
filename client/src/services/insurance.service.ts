import { sanityClient } from "@/api";
import { allInsurancesQuery } from "@/app/api/types";

export const getAllInsurances = async () => {
	try {
		const data = await sanityClient.fetch(allInsurancesQuery);
		return data;
	} catch (error) {
		console.error("Error fetching all insurances:", error);
		return error;
	}
};
