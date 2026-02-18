import { SearchWrapper } from "@/routes/search";
import { Suspense } from "react";

export default function Search() {
	return (
		<main className="min-h-screen w-full bg-slate-50" aria-labelledby="search-page">
			<section className="page-width pt-24 pb-10 lg:pt-32 lg:pb-14">
				<div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm">
					<Suspense fallback={<div>loading...</div>}>
						<SearchWrapper />
					</Suspense>
				</div>
			</section>
		</main>
	);
}
