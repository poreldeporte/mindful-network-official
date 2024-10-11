import {
	BlogsContent,
	BlogsFooter,
	BlogsHero,
} from "@/routes/blogs-page/components";
import { getTotalAmount } from "@/routes/blogs-page/services/blogs-page.services";

export default async function BlogsPage() {
	const blogAmount = await getTotalAmount();

	return (
		<>
			<BlogsHero />
			<BlogsContent blogAmount={blogAmount} />
			<BlogsFooter blogAmount={blogAmount} />
		</>
	);
}
