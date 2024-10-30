import { ResourcesModel, ResourcesKey } from "@/models";

export const generateResourceKeys = (resources: ResourcesModel) => {
	return Object.keys(resources).map((key) => {
		const label = key
			.replace(/([A-Z])/g, " $1")
			.replace(/^./, (str) => str.toUpperCase());

		const urlKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
		const resource: ResourcesKey = { key: urlKey, label };
		return resource;
	});
};
