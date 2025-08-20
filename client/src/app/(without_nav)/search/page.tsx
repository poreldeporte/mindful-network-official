import { SearchWrapper } from "@/routes/search";
import { Suspense } from "react";

export default function Search() {
	return (
		<main aria-labelledby="Search Page">
			<section className="min-h-screen lg:h-screen max-h-max relative">
				<Suspense fallback={<div>loading...</div>}>
					<SearchWrapper />
				</Suspense>
			</section>
		</main>
	);
}
