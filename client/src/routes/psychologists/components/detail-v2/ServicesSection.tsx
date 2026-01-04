"use client";

import { DetailSection } from "./DetailSection";

interface ServicesSectionProps {
	id: string;
	serviceTypes: string[];
	therapyOptions: string[];
}

const ServiceList = ({ items }: { items: string[] }) => (
	<ul className="grid gap-2 sm:grid-cols-2">
		{items.map((item) => (
			<li
				key={item}
				className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-[12px] text-gray-700"
			>
				{item}
			</li>
		))}
	</ul>
);

export const ServicesSection = ({
	id,
	serviceTypes,
	therapyOptions,
}: ServicesSectionProps) => {
	if (!serviceTypes.length && !therapyOptions.length) return null;

	return (
		<DetailSection id={id} title="Services">
			{serviceTypes.length > 0 && (
				<div className="space-y-2">
					<p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
						Service types
					</p>
					<ServiceList items={serviceTypes} />
				</div>
			)}

			{therapyOptions.length > 0 && (
				<div className="space-y-2">
					<p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
						Treatment modalities
					</p>
					<ServiceList items={therapyOptions} />
				</div>
			)}
		</DetailSection>
	);
};
