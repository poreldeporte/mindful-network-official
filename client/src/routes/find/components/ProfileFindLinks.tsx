import Link from "next/link";
import type { RelatedLink } from "@/lib/seo-landing-pages";

const GROUP_TITLES: Record<RelatedLink["group"], string> = {
	specialty: "By specialty",
	population: "By who it's for",
	resource: "By service",
	insurance: "By insurance",
	language: "By language",
	city: "Nearby", // unused here (profile links are all same-city), kept for type completeness
};

// Specialty first (the primary page-2 orphans), then the other axes.
const GROUP_ORDER: RelatedLink["group"][] = ["specialty", "population", "resource", "insurance", "language"];

/**
 * Server-rendered "Find more therapists like this" block for /professional/ pages.
 * Plain anchors in SSR HTML (NOT behind any Suspense/client boundary) so Googlebot
 * crawls them — this is the profile → /find/ link funnel (see profile-find-funnel-spec.md).
 * The profile-anchored mirror of the /find/ page's RelatedSearches.
 */
export function ProfileFindLinks({ links }: { links: RelatedLink[] }) {
	if (!links?.length) return null;

	const groups = GROUP_ORDER.map((group) => ({
		group,
		items: links.filter((l) => l.group === group),
	})).filter((g) => g.items.length > 0);

	if (groups.length === 0) return null;

	return (
		<section className="page-width pb-16 lg:pb-24" aria-labelledby="profile-find-links-heading">
			<div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-sm lg:p-10">
				<h2
					id="profile-find-links-heading"
					className="font-antic text-2xl leading-none text-slate-900 lg:text-3xl"
				>
					Find more therapists like this
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
