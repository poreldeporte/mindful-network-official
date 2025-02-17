import { sanityClient } from "@/api";

export const getAllResources = async () => {
	try {
		const data = await sanityClient.fetch(`*[_type == 'resources']`);

		return data;
	} catch (error) {
		console.error("Error fetching all schemas:", error);
		return error;
	}
};
