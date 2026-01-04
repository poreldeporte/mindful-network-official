"use client";

import Image from "next/image";
import type { ListingImage } from "./listingDetailMapper";

interface GalleryMosaicProps {
	images: ListingImage[];
	onOpenGallery: (index: number) => void;
	isProfileImage?: boolean;
}

const Tile = ({
	image,
	className,
	onOpenGallery,
	isProfileImage,
}: {
	image: ListingImage;
	className: string;
	onOpenGallery: () => void;
	isProfileImage?: boolean;
}) => (
	<button
		type="button"
		onClick={onOpenGallery}
		className={`group relative block overflow-hidden rounded-2xl ${className}`}
		aria-label="Open gallery"
	>
		<Image
			src={image.src}
			alt={image.alt}
			fill
			className={`transition-transform duration-200 group-hover:scale-[1.02] ${
				isProfileImage ? "object-contain" : "object-cover"
			}`}
			sizes="(max-width: 768px) 100vw, 50vw"
		/>
	</button>
);

export const GalleryMosaic = ({
	images,
	onOpenGallery,
	isProfileImage = false,
}: GalleryMosaicProps) => {
	const visibleImages = images.slice(0, 5);
	const useContain = isProfileImage && visibleImages.length <= 1;

	if (visibleImages.length <= 1) {
		return (
			<div className="relative aspect-[16/6.3] w-full overflow-hidden rounded-2xl">
				<Tile
					image={visibleImages[0]}
					onOpenGallery={() => onOpenGallery(0)}
					className="h-full w-full"
					isProfileImage={useContain}
				/>
			</div>
		);
	}

	if (visibleImages.length === 2) {
		return (
			<div className="grid gap-2 sm:grid-cols-2">
				{visibleImages.map((image, index) => (
					<div
						key={`${image.alt}-${index}`}
						className="relative aspect-[4/2.1]"
					>
						<Tile
							image={image}
							onOpenGallery={() => onOpenGallery(index)}
							className="h-full w-full"
							isProfileImage={false}
						/>
					</div>
				))}
			</div>
		);
	}

	if (visibleImages.length === 3) {
		const [first, second, third] = visibleImages;
		return (
			<div className="grid gap-2 lg:grid-cols-[2fr_1fr] lg:aspect-[16/7]">
				<div className="relative aspect-[16/7] lg:aspect-auto lg:h-full">
					<Tile
						image={first}
						onOpenGallery={() => onOpenGallery(0)}
						className="h-full w-full"
						isProfileImage={false}
					/>
				</div>
				<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 lg:h-full">
					<div className="relative aspect-[4/2.1] lg:aspect-auto lg:h-full">
						<Tile
							image={second}
							onOpenGallery={() => onOpenGallery(1)}
							className="h-full w-full"
							isProfileImage={false}
						/>
					</div>
					<div className="relative aspect-[4/2.1] lg:aspect-auto lg:h-full">
						<Tile
							image={third}
							onOpenGallery={() => onOpenGallery(2)}
							className="h-full w-full"
							isProfileImage={false}
						/>
					</div>
				</div>
			</div>
		);
	}

	const [main, ...rest] = visibleImages;

	return (
		<div className="grid gap-2 lg:grid-cols-[2fr_1fr] lg:aspect-[16/7]">
			<div className="relative aspect-[16/7] lg:aspect-auto lg:h-full">
				<Tile
					image={main}
					onOpenGallery={() => onOpenGallery(0)}
					className="h-full w-full"
					isProfileImage={false}
				/>
			</div>
			<div className="grid grid-cols-2 gap-2 lg:grid-rows-2 lg:h-full">
				{rest.map((image, index) => (
					<div
						key={`${image.alt}-${index}`}
						className="relative aspect-[4/2.1] lg:aspect-auto lg:h-full"
					>
						<Tile
							image={image}
							onOpenGallery={() => onOpenGallery(index + 1)}
							className="h-full w-full"
							isProfileImage={false}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
