"use client";

import { Typography } from "@/components/ui";
import { DetailSection } from "./DetailSection";
import type { OverviewItem } from "./listingDetailMapper";

interface OverviewSpecProps {
	id: string;
	items: OverviewItem[];
}

const renderValue = (value: string | string[]) => {
	if (Array.isArray(value)) {
		return value.join(", ");
	}
	return value;
};

export const OverviewSpec = ({ id, items }: OverviewSpecProps) => {
	if (!items.length) return null;

	return (
		<DetailSection id={id} title="At a glance">
			<dl className="grid gap-4 md:grid-cols-2">
				{items.map((item) => (
					<div key={item.label} className="space-y-1">
						<dt className="text-[11px] uppercase tracking-wide text-gray-500">
							{item.label}
						</dt>
						<dd className="text-[12px] text-gray-700">
							<Typography
								as="span"
								variant="bodyXSmall"
								color="darkGray"
								className="text-[12px]"
							>
								{renderValue(item.value)}
							</Typography>
							{item.actionLabel && item.actionHref && (
								<a
									href={item.actionHref}
									target="_blank"
									rel="noreferrer"
									className="ml-2 text-[11px] font-medium text-blue-600 hover:text-blue-700"
								>
									{item.actionLabel}
								</a>
							)}
						</dd>
					</div>
				))}
			</dl>
		</DetailSection>
	);
};
