"use client";

import { Typography } from "@/components/ui";
import Link from "next/link";
import { useState } from "react";
import { GalleryModal } from "./GalleryModal";
import { GalleryMosaic } from "./GalleryMosaic";
import type { ListingDetailViewModel } from "./listingDetailMapper";

interface ListingHeroProps {
	viewModel: ListingDetailViewModel;
}

export const ListingHero = ({ viewModel }: ListingHeroProps) => {
	const [isGalleryOpen, setIsGalleryOpen] = useState(false);
	const [activeImageIndex, setActiveImageIndex] = useState(0);
	const hasBreadcrumbs = viewModel.breadcrumbs.length > 1;

	return (
		<div className="space-y-4">
			{hasBreadcrumbs && (
				<nav aria-label="Breadcrumb" className="text-[11px] text-gray-500">
					<ol className="flex flex-wrap items-center gap-2">
						{viewModel.breadcrumbs.map((crumb, index) => {
							const isLast = index === viewModel.breadcrumbs.length - 1;
							return (
								<li key={`${crumb.label}-${index}`} className="flex items-center">
									{crumb.href && !isLast ? (
										<Link
											href={crumb.href}
											className="hover:text-blue-600"
										>
											{crumb.label}
										</Link>
									) : (
										<span className={isLast ? "text-gray-700" : ""}>
											{crumb.label}
										</span>
									)}
									{!isLast && <span className="mx-2 text-gray-300">/</span>}
								</li>
							);
						})}
					</ol>
				</nav>
			)}

			<div className="space-y-2">
				<div className="flex flex-wrap items-center gap-2">
					<Typography
						as="h1"
						variant="h2"
						color="black"
						className="font-antic text-[26px] sm:text-[32px]"
					>
						{viewModel.name}
					</Typography>
					{viewModel.primaryBadge && (
						<span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">
							{viewModel.primaryBadge}
						</span>
					)}
				</div>

				{viewModel.shortLocation && (
					<Typography
						as="p"
						variant="bodyXSmall"
						color="darkGray"
						className="text-[12px] text-gray-600"
					>
						{viewModel.shortLocation}
					</Typography>
				)}

				{viewModel.metaTags.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{viewModel.metaTags.map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-gray-600"
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</div>

			<GalleryMosaic
				images={viewModel.images}
				onOpenGallery={(index) => {
					setActiveImageIndex(index);
					setIsGalleryOpen(true);
				}}
			/>

			<GalleryModal
				isOpen={isGalleryOpen}
				images={viewModel.images}
				activeIndex={activeImageIndex}
				onClose={() => setIsGalleryOpen(false)}
			/>
		</div>
	);
};
