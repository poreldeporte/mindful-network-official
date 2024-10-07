import { BlogModel } from "@/models";
import { sanityClient } from "@/api";
import { blogQuery, blogByIdQuery } from "@/lib/queries";
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
