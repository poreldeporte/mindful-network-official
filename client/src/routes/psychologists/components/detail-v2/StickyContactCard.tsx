"use client";

import Image from "next/image";
import { Phone, Mail } from "lucide-react";
import type { ListingDetailViewModel } from "./listingDetailMapper";

interface StickyContactCardProps {
	viewModel: ListingDetailViewModel;
	contactAnchor: string;
}

export const StickyContactCard = ({
	viewModel,
	contactAnchor,
}: StickyContactCardProps) => {
	const primaryTag = viewModel.metaTags[0];

	return (
		<aside
			className="hidden lg:block lg:sticky"
			style={{ top: "calc(var(--subnav-top) + var(--subnav-height) + 12px)" }}
			aria-label="Contact"
		>
			<div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
				<div className="flex items-center gap-3">
					<div className="h-12 w-12 overflow-hidden rounded-full border border-gray-100">
						<Image
							src={viewModel.avatar?.src ?? ""}
							alt={viewModel.avatar?.alt ?? viewModel.name}
							width={96}
							height={96}
							className="h-full w-full object-cover"
						/>
					</div>
					<div>
						<p className="text-[14px] font-semibold text-gray-900">
							{viewModel.name}
						</p>
						{viewModel.primaryBadge && (
							<span className="text-[11px] text-blue-600">
								{viewModel.primaryBadge}
							</span>
						)}
					</div>
				</div>

				{viewModel.shortLocation && (
					<p className="mt-3 text-[12px] text-gray-600">
						{viewModel.shortLocation}
					</p>
				)}

				{primaryTag && (
					<div className="mt-3 inline-flex rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-[11px] text-gray-600">
						{primaryTag}
					</div>
				)}

				<div className="mt-4 space-y-2">
					{viewModel.contact.phone && (
						<a
							href={`tel:${viewModel.contact.phone}`}
							className="flex h-10 items-center justify-center gap-2 rounded-full bg-blue-600 text-[12px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
						>
							<Phone className="h-4 w-4" />
							Call
						</a>
					)}
					{viewModel.contact.email && (
						<a
							href={contactAnchor}
							className="flex h-10 items-center justify-center gap-2 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-700 transition hover:border-gray-300"
						>
							<Mail className="h-4 w-4" />
							Email
						</a>
					)}
				</div>

			</div>
		</aside>
	);
};
