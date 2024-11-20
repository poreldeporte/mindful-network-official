"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

interface Props {
	images: string[];
}

interface ImageViewer {
	image: string;
	setIsVisible: (boolean) => void;
}

// interface GalleryCarouselProps {
// 	images: string[];
// 	setIsVisible: (boolean) => void;
// }

// const GalleryCarousel = ({ images, setIsVisible }: GalleryCarouselProps) => {
// 	const [index, setIndex] = useState(0);

// 	return (
// 		<div className="fixed -top-5 left-0 z-[100] w-full h-screen bg-black/80">
// 			<div className="mx-auto flex items-center h-full max-w-7xl flex-col justify-center">
// 				<div className="relative overflow-hidden">
// 					<motion.div
// 						className="flex items-center"
// 						animate={{ x: `-${index * 100}%` }}
// 					>
// 						{images.map((src, i) => (
// 							<div
// 								key={i}
// 								className="flex items-center justify-center min-w-full"
// 							>
// 								<Image
// 									alt={`Image ${i}`}
// 									src={src}
// 									className="aspect-[3/3] object-cover rounded-lg"
// 									width={720}
// 									height={480}
// 								/>
// 							</div>
// 						))}
// 					</motion.div>

// 					{index > 0 && (
// 						<button
// 							className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full"
// 							onClick={() => setIndex(index - 1)}
// 						>
// 							<ChevronLeftIcon className="h-12 w-12 text-white" />
// 						</button>
// 					)}

// 					{index + 1 < images.length && (
// 						<button
// 							className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full"
// 							onClick={() => setIndex(index + 1)}
// 						>
// 							<ChevronLeftIcon className="h-12 w-12 text-white rotate-180" />
// 						</button>
// 					)}
// 				</div>
// 				<div
// 					onClick={() => setIsVisible(false)}
// 					className="bg-blue-50/30 rounded-full px-4 py-2 flex space-x-2 items-center justify-between mt-5 cursor-pointer"
// 				>
// 					<Typography color="white" variant="small">
// 						Close Gallery
// 					</Typography>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

const ImageViewer = ({ image, setIsVisible }) => {
	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			setIsVisible(false);
		}
	};

	return (
		<div
			className="fixed top-0 left-0 z-[100] w-full h-screen bg-black/80"
			onClick={handleBackdropClick}
		>
			<div
				className="mx-auto flex items-center h-full max-w-7xl flex-col justify-center"
				onClick={handleBackdropClick}
			>
				<div className="relative overflow-hidden">
					<Image
						alt={`Image ${image}`}
						src={image}
						className="aspect-[3/3] object-cover rounded-lg"
						width={720}
						height={480}
					/>
					<div
						onClick={(e) => {
							e.stopPropagation();
							setIsVisible(false);
						}}
						className="absolute top-0 right-5 bg-blue-50/30 shadow-sm rounded-full p-3 flex space-x-2 items-center justify-between mt-5 cursor-pointer hover:bg-blue-50/40"
					>
						<X className="w-6 h-6" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageViewer;

export function MasonryGrid({ images }: Props) {
	const [aspectRatios, setAspectRatios] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [sortedImages, setSortedImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState("");

	useEffect(() => {
		setIsLoading(true);
		const tempRatios = [];
		let loadedCount = 0;

		images.forEach((src, index) => {
			const img = new window.Image();
			img.onload = () => {
				tempRatios[index] = img.width / img.height;
				loadedCount++;

				if (loadedCount === images.length) {
					const sorted = [...images].sort((a, b) => {
						const indexA = images.indexOf(a);
						const indexB = images.indexOf(b);
						const isVerticalA = tempRatios[indexA] < 1;
						const isVerticalB = tempRatios[indexB] < 1;

						if (isVerticalA && !isVerticalB) return -1;
						if (!isVerticalA && isVerticalB) return 1;
						return tempRatios[indexA] - tempRatios[indexB];
					});

					setAspectRatios(tempRatios);
					setSortedImages(sorted);
					setIsLoading(false);
				}
			};
			img.src = src;
		});
	}, [images]);

	return (
		<div
			className={`columns-1 sm:columns-2 ${
				images.length === 4 &&
				(aspectRatios.every((ratio) => ratio > 1 === aspectRatios[0] > 1)
					? "lg:columns-4"
					: aspectRatios.filter((ratio) => ratio > 1 === aspectRatios[0] > 1)
								.length >= 3
						? "lg:columns-2"
						: "lg:columns-3")
			} ${
				images.length === 3 &&
				aspectRatios.every((ratio) => ratio > 1 === aspectRatios[0] > 1)
					? "lg:columns-3"
					: aspectRatios.filter((ratio) => ratio > 1 === aspectRatios[0] > 1)
								.length >= 2
						? "lg:columns-3"
						: "lg:columns-2"
			} ${images.length === 2 ? "lg:columns-2" : ""} gap-2`}
		>
			{!isLoading &&
				sortedImages.map((src, index) => {
					const originalIndex = images.indexOf(src);
					const isHorizontal = aspectRatios[originalIndex] > 1;

					return (
						<div key={index} className="mb-2 break-inside-avoid">
							<Image
								onClick={() => {
									setIsVisible(true);
									setImage(src);
								}}
								alt={`Image ${index}`}
								style={{ transform: "translate3d(0, 0, 0)" }}
								className={`h-[196px] w-full transform rounded-lg brightness-90 transition group-hover:brightness-110 object-cover cursor-pointer duration-200 hover:lg:brightness-[0.8] ${
									isHorizontal ? "h-[196px]" : "lg:h-[400px]"
								}`}
								src={src}
								width={720}
								height={480}
							/>
						</div>
					);
				})}
			{/* <div className="flex items-center justify-end">
				<Button
					variant="small"
					className="py-2 rounded-full px-4 bg-green-500 hover:bg-green-600"
					form="primary"
					onClick={() => {
						setIsVisible(true);
					}}
				>
					View all images
				</Button>
			</div> */}
			{isVisible && <ImageViewer image={image} setIsVisible={setIsVisible} />}
		</div>
	);
}
