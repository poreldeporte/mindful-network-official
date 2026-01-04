"use client";

import type { ListingHighlight } from "./listingDetailMapper";

interface HighlightsRowProps {
	highlights: ListingHighlight[];
}

export const HighlightsRow = ({ highlights }: HighlightsRowProps) => {
	if (!highlights.length) return null;

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
			<div className="flex flex-wrap gap-3">
				{highlights.map((highlight, index) => {
					const Icon = highlight.icon;
					return (
						<span
							key={`${highlight.label}-${index}`}
							className="inline-flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-700"
						>
							<Icon className={highlight.iconClassName ?? "h-4 w-4"} />
							{highlight.label}
						</span>
					);
				})}
			</div>
		</div>
	);
};
