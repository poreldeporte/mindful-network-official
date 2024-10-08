import { BlogModel } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface BlogModelExtended extends SanityDocument, BlogModel {}

export const getBlogAdapter = (blog: BlogModelExtended) => ({
	...blog,
	id: blog._id,
});
