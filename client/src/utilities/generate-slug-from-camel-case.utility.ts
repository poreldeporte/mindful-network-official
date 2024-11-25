export const generateSlugFromCamelCase = (input: string): string => {
	const slug = input
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, "")
		.replace(/^-+|-+$/g, "");

	return slug;
};
