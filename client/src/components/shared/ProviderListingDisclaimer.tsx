import { Info } from "lucide-react";

interface ProviderListingDisclaimerProps {
	providerName: string;
	className?: string;
}

export const ProviderListingDisclaimer = ({
	providerName,
	className = "",
}: ProviderListingDisclaimerProps) => {
	return (
		<div
			className={`flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-[11px] leading-snug text-gray-600 ${className}`}
			role="note"
		>
			<Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" aria-hidden="true" />
			<p>
				Listing details including availability, insurance accepted, and services
				offered may have changed. Please contact{" "}
				<span className="font-semibold text-gray-800">{providerName}</span>{" "}
				directly to confirm current information and determine if they are the
				right fit for your needs. The Mindful Network does not endorse any
				listed provider.
			</p>
		</div>
	);
};
