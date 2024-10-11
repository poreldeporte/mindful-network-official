import {
	BlogsContent,
	BlogsFooter,
	BlogsHero,
} from "@/routes/blogs-page/components";
import { getTotalAmount } from "@/routes/blogs-page/services/blogs-page.services";
import { Suspense } from "react";

export default async function BlogsPage() {
	const blogAmount = await getTotalAmount();

	return (
		<>
			<BlogsHero />
			<Suspense fallback={<div>loading...</div>}>
				<BlogsContent blogAmount={blogAmount} />
			</Suspense>
			<BlogsFooter blogAmount={blogAmount} />
		</>
	);
}
