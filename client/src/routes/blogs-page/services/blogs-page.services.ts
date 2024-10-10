import { getBlogAdapter } from "@/adapters";
import { sanityClient } from "@/api";
import { blogsWithOffsetQuery, countBlogsQuery } from "@/lib/queries";
import { BlogModel } from "@/models";

export const getBlogsWithOffset = async ({
	page,
	limit,
}: {
	page: number;
	limit: number;
}) => {
	try {
		const result = await sanityClient.fetch(
			blogsWithOffsetQuery({ page, limit })
		);
		const adaptedResult: BlogModel[] = result.map(getBlogAdapter);
		return adaptedResult;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getTotalAmount = async () => {
	try {
		const result = await sanityClient.fetch(countBlogsQuery);
		return result;
	} catch (error) {
		console.log(error);
		return [];
	}
};
