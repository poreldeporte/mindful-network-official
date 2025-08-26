import { PortableTextBlock } from "@portabletext/types";

export interface BlogCategory {
	title: string;
	slug: string;
}

export interface TOCSettings {
	enableTOC: boolean;
	tocPosition: "before" | "after" | "sidebar" | "floating";
	includeLevels: string[];
}

export interface BlogModel {
	id: string;
	title: string;
	slug: string;
	author: string;
	publishDate: string;
	category: BlogCategory;
	isInternal: boolean;
	externalLink?: string;
	content: PortableTextBlock;
	excerpt: string;
	featuredImage: string;
	featuredImageAlt?: string;
	tags?: string[];
	authorImage?: string;
	authorImageAlt?: string;
	tocSettings?: TOCSettings;
	seo?: {
		metaTitle: string;
		metaDescription: string;
		openGraphImage?: string;
	};
}
