import Link from "next/link";
import type { RelatedLink } from "@/lib/seo-landing-pages";

const GROUP_TITLES: Record<RelatedLink["group"], string> = {
	specialty: "By specialty",
	population: "By who it's for",
	resource: "By service",
	insurance: "By insurance",
	language: "By language",
	city: "Nearby", // unused here — city-hub links are all the current city
};
const GROUP_ORDER: RelatedLink["group"][] = ["specialty", "population", "resource", "insurance", "language"];

/**
 * Server-rendered "More therapists in {city}" hub block for /find/ landing pages.
 * The comprehensive same-city index (funnel spec link-type #1): every other /find/
 * page in this city, so the same-city pages form a complete internal-link mesh and
 * page-1 pages route authority down to their page-2 siblings. Plain crawlable
 * anchors in SSR HTML (NOT behind the SearchWrapper Suspense boundary), the
 * counterpart to RelatedSearches ("Explore more" is curated/cross-city; this is
 * the full same-city grid).
 */
export function CityHub({ links, cityName }: { links: RelatedLink[]; cityName: string }) {
	if (!links?.length) return null;

	const groups = GROUP_ORDER.map((group) => ({
		group,
		items: links.filter((l) => l.group === group),
	})).filter((g) => g.items.length > 0);

	if (groups.length === 0) return null;

	return (
		<section className="page-width pb-16 lg:pb-24" aria-labelledby="city-hub-heading">
			<div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm lg:p-10">
				<h2
					id="city-hub-heading"
					className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl"
				>
					More therapists in {cityName}
				</h2>
				<div className="mt-6 space-y-6">
					{groups.map(({ group, items }) => (
						<div key={group}>
							<h3 className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
								{GROUP_TITLES[group]}
							</h3>
							<ul className="mt-3 flex flex-wrap gap-2">
								{items.map((item) => (
									<li key={item.slug}>
										<Link
											href={`/find/${item.slug}`}
											className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
										>
											{item.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
