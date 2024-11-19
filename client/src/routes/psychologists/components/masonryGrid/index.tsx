"use client";

import Image from "next/image";
import { Typography } from "@/components/ui";
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

const ImageViewer = ({ image, setIsVisible }: ImageViewer) => {
	return (
		<div className="fixed top-0 left-0 z-[100] w-full h-screen bg-black/80">
			<div className="mx-auto flex items-center h-full max-w-7xl flex-col justify-center">
				<div className="relative overflow-hidden">
					<Image
						alt={`Image ${image}`}
						src={image}
						className="aspect-[3/3] object-cover rounded-lg"
						width={720}
						height={480}
					/>
				</div>

				<div
					onClick={() => setIsVisible(false)}
					className="bg-blue-50/30 rounded-full px-4 py-2 flex space-x-2 items-center justify-between mt-5 cursor-pointer hover:bg-blue-50/40"
				>
					<Typography color="white" variant="small">
						Close Image
					</Typography>
				</div>
			</div>
		</div>
	);
};

export function MasonryGrid({ images }: Props) {
	const [aspectRatios, setAspectRatios] = useState({});
	const [isVisible, setIsVisible] = useState(false);
	const [image, setImage] = useState("");

	useEffect(() => {
		images.forEach((src, index) => {
			const img = new window.Image();
			img.onload = () => {
				setAspectRatios((prev) => ({
					...prev,
					[index]: img.width / img.height,
				}));
			};
			img.src = src;
		});
	}, [images]);

	return (
		<div className="columns-1 sm:columns-2 lg:columns-3 gap-2">
			{images.map((src, index) => {
				const isHorizontal = aspectRatios[index] > 1;

				return (
					<div key={index} className="mb-2 break-inside-avoid">
						<Image
							onClick={() => {
								setIsVisible(true);
								setImage(src);
							}}
							alt={`Image ${index}`}
							style={{ transform: "translate3d(0, 0, 0)" }}
							className={`w-full transform rounded-lg brightness-90 transition group-hover:brightness-110 object-cover cursor-pointer duration-200 hover:lg:brightness-[0.8] ${
								isHorizontal ? "h-[196px]" : "h-[400px]"
							}`}
							src={src}
							width={720}
							height={480}
							loading={index < 4 ? "eager" : "lazy"}
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
