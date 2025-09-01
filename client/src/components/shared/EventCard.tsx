"use client";

import { EventbriteEvent } from "@/models/eventbrite.model";
import { generateSlug, isEventExpired } from "@/utilities";
import { formatEventDate } from "@/utilities/format-event-date.utility";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";

const EventCard = ({
	event,
	index,
}: {
	event: EventbriteEvent;
	index: number;
}) => {
	const cardVariants: Variants = {
		offscreen: {
			y: 50,
			opacity: 0,
		},
		onscreen: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.3,
				duration: 0.8,
				delay: 0.05 * index,
			},
		},
	};

	const imageVariants: Variants = {
		offscreen: {
			scale: 0.9,
			opacity: 0.8,
		},
		onscreen: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.3,
				duration: 0.6,
				delay: 0.05 * index + 0.1,
			},
		},
	};

	const eventUrl = `/events/${generateSlug(event.name.text)}-${event.id}`;
	const isExpired = isEventExpired(event.end.utc);

	const CardContent = (
		<motion.article
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.3 }}
			variants={cardVariants}
			className={`w-full h-full flex flex-col ${
				isExpired ? "opacity-60 cursor-not-allowed" : ""
			}`}
		>
			<motion.div
				variants={imageVariants}
				className="w-full h-64 overflow-hidden rounded-3xl border"
			>
				<Image
					src={event.logo.url}
					alt={event.name.text}
					width={250}
					height={250}
					loading="lazy"
					className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
				/>
			</motion.div>

			<div className="mt-2.5">
				<span
					className={`text-[14px] ${isExpired ? "text-gray-400" : "text-blue-500"}`}
				>
					{formatEventDate(event.start.utc)}
					{isExpired && " (Event Ended)"}
				</span>
				<h2
					className={`font-bold text-sm leading-tight ${isExpired ? "text-gray-600" : ""}`}
				>
					{event.name.text}
				</h2>
				<p
					className={`text-xs line-clamp-2 ${isExpired ? "text-gray-500" : ""}`}
				>
					{event.summary}
				</p>
			</div>

			<div className="flex flex-grow items-end justify-end mt-5">
				<Button
					variant="bodySmall"
					form="outline"
					className={isExpired ? "opacity-50 cursor-not-allowed" : ""}
				>
					{isExpired ? "Event Ended" : "See Event"}
				</Button>
			</div>
		</motion.article>
	);

	return isExpired ? (
		<div className="relative">
			{CardContent}
			<div className="absolute inset-0 bg-transparent cursor-not-allowed" />
		</div>
	) : (
		<Link href={eventUrl}>{CardContent}</Link>
	);
};

export default EventCard;
