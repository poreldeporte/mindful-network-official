"use client";

import { EventbriteEvent } from "@/models/eventbrite.model";
import { formatEventDate } from "@/utilities/format-event-date.utility";
import { generateSlug } from "@/utilities";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { motion, Variants } from "framer-motion";

const EventCard = ({
	event,
	index,
}: {
	event: EventbriteEvent;
	index: number;
}) => {
	const cardVariants: Variants = {
		offscreen: {
			y: 100,
			scale: 0.9,
		},
		onscreen: {
			y: 0,
			scale: 1,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 0.8,
				delay: 0.05 * index,
			},
		},
	};
	return (
		<motion.article
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.8 }}
			variants={cardVariants}
			className="w-full h-full flex flex-col"
		>
			<Image
				src={event.logo.url}
				alt={event.name.text}
				width={250}
				height={250}
				priority
				className="w-full h-64 object-cover rounded-3xl"
			/>

			<div className="mt-2.5">
				<span className="text-green-500 text-[14px]">
					{formatEventDate(event.start.utc)} -{" "}
					{event.price_range.currency + "$ " + event.price_range.min}
				</span>
				<h2 className="font-bold text-sm leading-tight">{event.name.text}</h2>
				<p className="text-xs">{event.summary}</p>
			</div>

			<div className="flex flex-grow items-end justify-end mt-5">
				<Button
					variant="small"
					className="py-2 rounded-full px-4 bg-green-500 hover:bg-green-600 relative"
					form="primary"
				>
					<Link
						className="expandable-tag-link"
						href={`/events/${generateSlug(event.name.text)}}`}
					>
						See Event
					</Link>
				</Button>
			</div>
		</motion.article>
	);
};

export default EventCard;
