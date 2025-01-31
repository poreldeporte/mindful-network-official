import { ResourcesModel } from "@/models";

export const generateResourceKeys = (resources: ResourcesModel[]) => {
	const uniqueResources = new Set(
		resources.flatMap((resource) => ({
			key: resource.title.toLowerCase().replace(/\s+/g, "-"),
			label: resource.title,
		}))
	);

	return Array.from(uniqueResources);
};
