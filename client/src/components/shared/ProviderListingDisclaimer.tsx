import { Info } from "lucide-react";

interface ProviderListingDisclaimerProps {
	className?: string;
}

export const ProviderListingDisclaimer = ({
	className = "",
}: ProviderListingDisclaimerProps) => {
	return (
		<div
			className={`flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] leading-snug text-gray-600 ${className}`}
			role="note"
		>
			<Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" aria-hidden="true" />
			<p>
				Details including availability, insurance, and services may have changed.
				This listing was independently sourced — The Mindful Network is not
				affiliated with or endorsing this provider.
			</p>
		</div>
	);
};
