"use client";

import { useState, useRef, useEffect } from "react";
import { EventbriteEvent } from "@/models/eventbrite.model";
import { EventCard } from "@/components/shared";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export const MoreEvents = ({ events = [] }: { events: EventbriteEvent[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsToShow, setItemsToShow] = useState(4);
	const carouselRef = useRef<HTMLDivElement>(null);
	const showSlider = events && events.length > 4;

	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== "undefined" && showSlider) {
				if (window.innerWidth < 640) setItemsToShow(1);
				else if (window.innerWidth < 1024) setItemsToShow(2);
				else if (window.innerWidth < 1440) setItemsToShow(3);
				else setItemsToShow(4);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [showSlider]);

	const nextSlide = () => {
		if (currentIndex < events.length - itemsToShow) {
			setCurrentIndex(currentIndex + 1);
		} else {
			setCurrentIndex(0);
		}
	};

	const prevSlide = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		} else {
			setCurrentIndex(events.length - itemsToShow);
		}
	};

	return (
		<section className="bg-white w-full min-h-auto mt-20">
			<div className="mx-auto w-11/12 xl:w-3/4 py-20">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold">Other events you may like</h2>
					{showSlider && (
						<div className="flex gap-2">
							<Button
								variant="small"
								className="p-2 rounded-full bg-green-400 hover:bg-green-600"
								onClick={prevSlide}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M15 18l-6-6 6-6" />
								</svg>
							</Button>
							<Button
								variant="small"
								className="p-2 rounded-full bg-green-400 hover:bg-green-600"
								onClick={nextSlide}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<path d="M9 18l6-6-6-6" />
								</svg>
							</Button>
						</div>
					)}
				</div>

				{!showSlider ? (
					// Grid estático para 4 eventos o menos
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
						{events.map((event, index) => (
							<div key={event.id}>
								<EventCard event={event} index={index} />
							</div>
						))}
					</div>
				) : (
					// Slider para más de 4 eventos
					<div className="overflow-hidden">
						<motion.div
							ref={carouselRef}
							className="flex gap-4"
							animate={{
								x: -currentIndex * (100 / itemsToShow) + "%",
							}}
							transition={{
								type: "spring",
								damping: 20,
								stiffness: 100,
							}}
						>
							{events.map((event, index) => (
								<motion.div
									key={event.id}
									className="min-w-[calc(100%/4-12px)] sm:min-w-[calc(100%/2-12px)] lg:min-w-[calc(100%/3-12px)] xl:min-w-[calc(100%/4-12px)]"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.1 * index }}
								>
									<EventCard event={event} index={index} />
								</motion.div>
							))}
						</motion.div>
					</div>
				)}

				{showSlider && (
					<div className="flex justify-center mt-6">
						{Array.from({
							length: Math.ceil(events.length - itemsToShow + 1),
						}).map((_, index) => (
							<button
								key={index}
								className={`w-3 h-3 mx-1 rounded-full ${
									index === currentIndex ? "bg-green-500" : "bg-gray-300"
								}`}
								onClick={() => setCurrentIndex(index)}
							/>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default MoreEvents;
