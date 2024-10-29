type UsefulLinksType = "external" | "internal";

export type UseFulLink = {
	label: string;
	type: UsefulLinksType;
	url: string;
};

export type UseFulLinkSection = {
	sectionTitle: string;
	links: UseFulLink[];
};
