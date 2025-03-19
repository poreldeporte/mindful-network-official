"use client";

import { EventCard } from "@/components/shared";
import { Typography } from "@/components/ui";
import { EventbriteEventsResponse } from "@/models/eventbrite.model";
import { useEffect, useState } from "react";

interface Props {
	events: EventbriteEventsResponse;
}

export const EventsContainer = ({ events }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, []);

	return (
		<div className="mx-auto w-11/12 xl:w-3/4 pb-20">
			<header className="py-10">
				<div className="flex flex-col z-10">
					<Typography
						color="black"
						as="h2"
						variant="large"
						className="font-bold"
					>
						Events
					</Typography>
					<Typography color="darkGray" as="p" variant="medium">
						Discover expert insights, self-care tips, and the latest trends in
						mental health and wellness.
					</Typography>
				</div>
			</header>
			<section className="h-max gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
				{isLoading ? (
					<>Loading...</>
				) : events && events.events.length ? (
					events.events.map((event, eventIdx) => (
						<EventCard key={event.id} event={event} index={eventIdx} />
					))
				) : (
					""
				)}
			</section>
		</div>
	);
};
