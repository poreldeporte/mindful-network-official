"use client";

import { useState, useRef } from "react";
import { EventbriteEvent } from "@/models/eventbrite.model";
import { EventCard } from "@/components/shared";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";

export const MoreEvents = ({ events }: { events: EventbriteEvent[] }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef<HTMLDivElement>(null);

	const nextSlide = () => {
		if (currentIndex < events.length - 1) {
			setCurrentIndex(currentIndex + 1);
		} else {
			setCurrentIndex(0);
		}
	};

	const prevSlide = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		} else {
			setCurrentIndex(events.length - 1);
		}
	};

	const getItemsToShow = () => {
		if (typeof window !== "undefined") {
			if (window.innerWidth < 640) return 1;
			if (window.innerWidth < 1024) return 2;
			if (window.innerWidth < 1440) return 3;
			return 4;
		}
		return 4;
	};

	return (
		<section className="bg-white w-full min-h-auto mt-20">
			<div className="mx-auto w-11/12 xl:w-3/4 py-20">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold">Other events you may like</h2>
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
				</div>

				<div className="overflow-hidden">
					<motion.div
						ref={carouselRef}
						className="flex gap-4"
						animate={{
							x: -currentIndex * (100 / getItemsToShow()) + "%",
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
								className="min-w-[calc(100%/3-16px)] sm:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-16px)]"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.1 * index }}
							>
								<EventCard event={event} index={index} />
							</motion.div>
						))}
					</motion.div>
				</div>

				<div className="flex justify-center mt-6">
					{events.map((_, index) => (
						<button
							key={index}
							className={`w-3 h-3 mx-1 rounded-full ${
								index === currentIndex ? "bg-green-500" : "bg-gray-300"
							}`}
							onClick={() => setCurrentIndex(index)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default MoreEvents;
