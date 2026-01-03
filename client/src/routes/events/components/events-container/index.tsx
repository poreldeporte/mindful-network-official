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
	const [eventsData, setEventsData] = useState<EventbriteEventsResponse>(
		events || {
			pagination: {
				object_count: 0,
				page_number: 1,
				page_size: 0,
				page_count: 0,
				has_more_items: false,
			},
			events: [],
		}
	);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				if (events && events.events) {
					setEventsData(events);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [events]);

	const hasEvents =
		eventsData && eventsData.events && Array.isArray(eventsData.events);
	const eventsList = hasEvents ? eventsData.events : [];

	return (
		<div className="mx-auto w-11/12 xl:w-3/4 pb-20">
			<header className="lg:py-10 py-5">
				<div className="flex flex-col z-10">
					<Typography color="black" as="h2" variant="h3" className="font-bold">
						Events
					</Typography>
					<Typography color="darkGray" as="p" variant="bodySmall">
						Discover expert insights, self-care tips, and the latest trends in
						mental health and wellness.
					</Typography>
				</div>
			</header>
			<section className="h-max gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
				{isLoading ? (
					<div className="col-span-full text-center py-10">
						<div className="inline-block animate-pulse bg-gray-200 rounded-lg p-5">
							Loading events...
						</div>
					</div>
				) : eventsList.length > 0 ? (
					eventsList.map((event, eventIdx) => (
						<EventCard key={event.id} event={event} index={eventIdx} />
					))
				) : (
					<div className="col-span-full text-center py-10">
						<Typography color="darkGray" as="p" variant="bodySmall">
							No events found. Check back soon for upcoming events!
						</Typography>
					</div>
				)}
			</section>
		</div>
	);
};
