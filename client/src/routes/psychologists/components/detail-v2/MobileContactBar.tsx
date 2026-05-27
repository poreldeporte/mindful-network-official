"use client";

import { MessageCircle, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { ProviderListingDisclaimer } from "@/components/shared/ProviderListingDisclaimer";

interface MobileContactBarProps {
	phone?: string;
	contactAnchor: string;
	slug: string;
	providerName: string;
}

export const MobileContactBar = ({
	phone,
	contactAnchor,
	slug,
	providerName,
}: MobileContactBarProps) => {
	if (!phone) {
		return (
			<div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-2 backdrop-blur lg:hidden">
				<ProviderListingDisclaimer
					providerName={providerName}
					className="mb-2"
				/>
				<a
					href={contactAnchor}
					onClick={() =>
						trackEvent("contact_click", {
							method: "email",
							therapist_slug: slug,
						})
					}
					className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
				>
					<MessageCircle className="h-4 w-4" />
					Contact
				</a>
			</div>
		);
	}

	return (
		<div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-2 backdrop-blur lg:hidden">
			<ProviderListingDisclaimer
				providerName={providerName}
				className="mb-2"
			/>
			<div className="flex gap-2">
				<a
					href={`tel:${phone}`}
					onClick={() =>
						trackEvent("contact_click", {
							method: "phone",
							therapist_slug: slug,
						})
					}
					className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
				>
					<Phone className="h-4 w-4" />
					Call
				</a>
				<a
					href={contactAnchor}
					onClick={() =>
						trackEvent("contact_click", {
							method: "email",
							therapist_slug: slug,
						})
					}
					className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-blue-600 text-[12px] font-semibold text-blue-600 transition hover:bg-blue-50"
				>
					<MessageCircle className="h-4 w-4" />
					Message
				</a>
			</div>
		</div>
	);
};
