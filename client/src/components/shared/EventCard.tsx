"use client";

import { EventbriteEvent } from "@/models/eventbrite.model";
import { generateSlug } from "@/utilities";
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

	return (
		<motion.article
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.3 }}
			variants={cardVariants}
			className="w-full h-full flex flex-col"
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
				<span className="text-green-500 text-[14px]">
					{formatEventDate(event.start.utc)}
				</span>
				<h2 className="font-bold text-sm leading-tight">{event.name.text}</h2>
				<p className="text-xs line-clamp-2">{event.summary}</p>
			</div>

			<div className="flex flex-grow items-end justify-end mt-5">
				<Button
					variant="small"
					className="py-2 rounded-full px-4 bg-green-500 hover:bg-green-600 relative transition-all duration-300 hover:shadow-md"
					form="primary"
				>
					<Link
						className="expandable-tag-link"
						href={`/events/${generateSlug(event.name.text)}_${event.id}`}
					>
						See Event
					</Link>
				</Button>
			</div>
		</motion.article>
	);
};

export default EventCard;
