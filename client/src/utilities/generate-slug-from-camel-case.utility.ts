export const generateSlugFromCamelCase = (input: string): string => {
	const slug = input
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, "")
		.replace(/^-+|-+$/g, "");

	return slug;
};

export const generateSlug = (input: string): string => {
	const slug = input
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/([a-z0-9])([A-Z])/g, "$1-$2")
		.replace(/[^a-z0-9-]/g, "")
		.replace(/-+/g, "-")
		.replace(/^-+|-+$/g, "");

	return slug;
};

export const extractEventIdFromSlug = (slug: string): string => {
	const slugParts = slug.split("-");
	return slugParts[slugParts.length - 1];
};
