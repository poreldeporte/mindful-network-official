import { ContentHeader } from "./header";
import { BlogsPagination } from "./pagination";

export const BlogsContent = () => {
	return (
		<>
			<ContentHeader />
			<section>blogs</section>
			<BlogsPagination />
		</>
	);
};
