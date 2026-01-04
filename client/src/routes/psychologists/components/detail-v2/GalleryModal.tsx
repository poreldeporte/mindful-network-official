"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ListingImage } from "./listingDetailMapper";

interface GalleryModalProps {
	isOpen: boolean;
	images: ListingImage[];
	activeIndex: number;
	onClose: () => void;
}

export const GalleryModal = ({
	isOpen,
	images,
	activeIndex,
	onClose,
}: GalleryModalProps) => {
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	const [currentIndex, setCurrentIndex] = useState(activeIndex);

	useEffect(() => {
		if (!isOpen) return;
		if (!images.length) return;
		const boundedIndex = Math.min(Math.max(activeIndex, 0), images.length - 1);
		setCurrentIndex(boundedIndex);
	}, [activeIndex, images.length, isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		closeButtonRef.current?.focus();

		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen || !images.length) return null;

	const currentImage = images[currentIndex] ?? images[0];

	return (
		<div
			className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-4 sm:p-6"
			role="dialog"
			aria-modal="true"
			aria-label="Listing gallery"
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="relative w-full max-w-5xl rounded-3xl bg-white p-4 shadow-xl sm:p-6">
				<div className="flex items-center justify-between pb-4">
					<p className="text-[12px] font-medium text-gray-600">
						{images.length} photos
					</p>
					<button
						ref={closeButtonRef}
						type="button"
						onClick={onClose}
						className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-gray-300 hover:text-gray-800"
						aria-label="Close gallery"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100">
					<Image
						src={currentImage.src}
						alt={currentImage.alt}
						fill
						className="object-cover"
						sizes="(max-width: 768px) 100vw, 80vw"
						priority
					/>
				</div>

				<div className="mt-4 grid max-h-52 gap-3 overflow-y-auto sm:grid-cols-4 lg:grid-cols-6">
					{images.map((image, index) => {
						const isActive = index === currentIndex;
						return (
							<button
								key={`${image.alt}-${index}`}
								type="button"
								onClick={() => setCurrentIndex(index)}
								className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl border transition ${
									isActive
										? "border-blue-500 ring-2 ring-blue-200"
										: "border-gray-200 hover:border-gray-300"
								}`}
								aria-label={`View photo ${index + 1}`}
								aria-current={isActive ? "true" : undefined}
							>
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 25vw, 12vw"
								/>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};
