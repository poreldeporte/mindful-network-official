import { BlogModel } from "@/models";
import { sanityClient } from "@/api";
import { blogQuery, blogByIdQuery, relatedBlogQuery } from "@/lib/queries";
import { getBlogAdapter } from "@/adapters";

export const getLatestBlog = async () => {
	try {
		const result = await sanityClient.fetch(blogQuery);
		const adaptedResult: BlogModel[] = result.map(getBlogAdapter);
		return adaptedResult;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getBlogById = async (slug) => {
	try {
		const result = await sanityClient.fetch(blogByIdQuery, { slug: slug });
		const adaptedPost = getBlogAdapter(result);
		return adaptedPost;
	} catch (error) {
		console.log(error);
	}
};

export interface RelatedBlogSummary {
	title: string;
	slug: string;
	excerpt?: string;
	featuredImage?: string;
	featuredImageAlt?: string;
}

export const getRelatedBlogs = async (slug: string): Promise<RelatedBlogSummary[]> => {
	try {
		const result = await sanityClient.fetch(relatedBlogQuery, { slug });
		return Array.isArray(result) ? result : [];
	} catch (error) {
		console.log(error);
		return [];
	}
};
