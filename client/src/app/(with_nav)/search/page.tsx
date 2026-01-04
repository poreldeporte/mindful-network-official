import { SearchWrapper } from "@/routes/search";
import { Suspense } from "react";

export default function Search() {
	return (
		<main className="min-h-screen w-full bg-white" aria-labelledby="Search Page">
			<section className="min-h-screen mx-auto w-11/12 xl:w-3/4 mt-24 lg:mt-28">
				<Suspense fallback={<div>loading...</div>}>
					<SearchWrapper />
				</Suspense>
			</section>
		</main>
	);
}
