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
	const showInsuranceNote = showInsurances && !hasInsuranceList;
	const normalizedSlidingScale = (slidingScale || "").trim().toLowerCase();
	const hasSlidingScale =
		Boolean(slidingScale) &&
		!["no", "false", "0", "n/a", "na"].includes(normalizedSlidingScale);
	const showSelfPay = !showInsurances;
	const paymentOptions = [
		...(showSelfPay ? ["Self pay"] : []),
		...(hasSlidingScale ? ["Sliding scale"] : []),
	];
	const isVisible = showInsurances || paymentOptions.length > 0;

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
			) : showInsuranceNote ? (
				<p className="text-[12px] text-gray-600">
					Contact to verify accepted insurance.
				</p>
			) : null}

			{paymentOptions.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{paymentOptions.map((option) => (
						<span
							key={option}
							className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] font-medium text-gray-700"
						>
							{option}
						</span>
					))}
				</div>
			)}

		</DetailSection>
	);
};
