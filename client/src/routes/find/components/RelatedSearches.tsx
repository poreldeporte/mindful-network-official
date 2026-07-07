import Link from "next/link";
import type { RelatedLink } from "@/lib/seo-landing-pages";

const GROUP_TITLES: Record<RelatedLink["group"], string> = {
	city: "Therapists in nearby cities",
	specialty: "Browse by specialty",
	insurance: "Browse by insurance",
	language: "Browse by language",
	resource: "Browse by service",
};

// Render order — nearby cities and specialties first (highest searcher relevance).
const GROUP_ORDER: RelatedLink["group"][] = ["city", "specialty", "resource", "insurance", "language"];

/**
 * Server-rendered "related searches" block for /find/ landing pages.
 *
 * Intentionally a plain set of anchor links rendered in the SSR HTML (NOT behind
 * the SearchWrapper Suspense boundary) so Googlebot crawls them. This is what
 * connects the ~169 otherwise-orphaned /find/ pages into a topical cluster.
 */
export function RelatedSearches({ links }: { links: RelatedLink[] }) {
	if (!links || links.length === 0) return null;

	const groups = GROUP_ORDER.map((group) => ({
		group,
		items: links.filter((l) => l.group === group),
	})).filter((g) => g.items.length > 0);

	return (
		<section className="page-width pb-16 lg:pb-24" aria-labelledby="related-searches-heading">
			<div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm lg:p-10">
				<h2
					id="related-searches-heading"
					className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl"
				>
					Explore more therapists
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
