import { PsychologistModel } from "@/models";
import { SearchWrapper } from "@/routes/search";
import {
	getAllConditions,
	getAllInsurances,
	getAllProfessionals,
	getAllResources,
	getAllTherapyOptions,
} from "@/services";
import { generateResourceKeys } from "@/utilities/generate-resource.keys.utility";
import { Suspense } from "react";

// Match the /find/[slug] cadence so the search page is ISR'd hourly instead of
// re-fetching on every request, and so the client doesn't have to wait on a
// post-hydration round-trip before any results paint.
export const revalidate = 3600;

export default async function Search() {
	const [
		allProfessionals,
		allConditions,
		allInsurances,
		allTherapyModalities,
		allResources,
	] = await Promise.all([
		getAllProfessionals(),
		getAllConditions(),
		getAllInsurances(),
		getAllTherapyOptions(),
		getAllResources(),
	]);

	const professionals: PsychologistModel[] = Array.isArray(allProfessionals)
		? allProfessionals
		: [];
	const initialConditions = Array.isArray(allConditions) ? allConditions : [];
	const initialInsurances = Array.isArray(allInsurances) ? allInsurances : [];
	const initialTherapyModalities = Array.isArray(allTherapyModalities)
		? allTherapyModalities
		: [];
	const initialResourceKeys = generateResourceKeys(
		Array.isArray(allResources) ? allResources : []
	);

	return (
		<main className="min-h-screen w-full bg-slate-50" aria-labelledby="search-page">
			<section className="page-width pt-24 pb-10 lg:pt-32 lg:pb-14">
				<div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm">
					<Suspense fallback={<div>loading...</div>}>
						<SearchWrapper
							initialProfessionals={professionals}
							initialConditions={initialConditions}
							initialInsurances={initialInsurances}
							initialTherapyModalities={initialTherapyModalities}
							initialResourceKeys={initialResourceKeys}
						/>
					</Suspense>
				</div>
			</section>
		</main>
	);
}
