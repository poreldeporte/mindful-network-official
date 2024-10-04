export interface BlogModel {
	id: string;
	title: string;
	slug: string;
	author: string;
	publishDate: string;
	category: string;
	isInternal: boolean;
	externalLink?: string;
	body: string;
	excerpt: string;
	featuredImage: string;
	tags?: string[];
	seo?: {
		metaTitle: string;
		metaDescription: string;
		openGraphImage?: {
			asset: {
				_ref: string;
				_type: string;
			};
		};
	};
}
