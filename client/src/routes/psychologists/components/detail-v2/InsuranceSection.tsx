"use client";

import { DetailSection } from "./DetailSection";

interface InsuranceSectionProps {
	id: string;
	insurances: string[];
	slidingScale?: string;
	showInsurances: boolean;
}

export const InsuranceSection = ({
	id,
	insurances,
	slidingScale,
	showInsurances,
}: InsuranceSectionProps) => {
	const hasInsuranceList = showInsurances && insurances.length > 0;
	const normalizedSlidingScale = (slidingScale || "").trim().toLowerCase();
	const hasSlidingScale =
		Boolean(slidingScale) &&
		!["no", "false", "0", "n/a", "na"].includes(normalizedSlidingScale);
	const shouldShowPayment = showInsurances || Boolean(slidingScale);
	const isVisible = showInsurances || shouldShowPayment;

	if (!isVisible) return null;

	return (
		<DetailSection id={id} title="Insurance / Pricing">
			{hasInsuranceList ? (
				<div className="flex flex-wrap gap-2">
					{insurances.map((insurance) => (
						<span
							key={insurance}
							className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-gray-700"
						>
							{insurance}
						</span>
					))}
				</div>
			) : (
				<p className="text-[12px] text-gray-600">
					Contact to verify accepted insurance.
				</p>
			)}

			{shouldShowPayment && (
				<div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-[12px] text-gray-700">
					<span className="font-medium">
						{hasSlidingScale ? "Sliding scale" : "Self pay"}
					</span>
				</div>
			)}

		</DetailSection>
	);
};
