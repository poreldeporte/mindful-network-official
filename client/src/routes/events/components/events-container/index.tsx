"use client";

import { EventCard } from "@/components/shared";
import { Typography } from "@/components/ui";
import { EventbriteEventsResponse } from "@/models/eventbrite.model";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";

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
	const totalEvents = useMemo(() => eventsList.length, [eventsList]);

	return (
		<div className="mx-auto w-11/12 xl:w-3/4 max-w-[1440px] pb-16 lg:pb-24">
			<header className="py-6 lg:py-8">
				<div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 p-6 lg:p-8">
					<div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
						<CalendarDaysIcon className="h-4 w-4" aria-hidden />
						EVENT CALENDAR
					</div>
					<Typography
						color="black"
						as="h2"
						variant="h3"
						className="font-antic mt-4"
					>
						Upcoming Events and Workshops
					</Typography>
					<Typography
						color="darkGray"
						as="p"
						variant="bodyXSmall"
						className="mt-2"
					>
						Find community events focused on mental health education, support,
						and caregiver wellbeing.
					</Typography>
					<Typography
						color="darkGray"
						as="p"
						variant="bodyXSmall"
						className="mt-3 font-medium"
					>
						{totalEvents} event{totalEvents === 1 ? "" : "s"} available
					</Typography>
				</div>
			</header>

			<section className="h-max gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
				{isLoading ? (
					<div className="col-span-full text-center py-10">
						<div className="inline-block animate-pulse rounded-2xl border border-blue-100 bg-white px-6 py-4 text-sm text-gray-500">
							Loading events...
						</div>
					</div>
				) : eventsList.length > 0 ? (
					eventsList.map((event, eventIdx) => (
						<EventCard key={event.id} event={event} index={eventIdx} />
					))
				) : (
					<div className="col-span-full rounded-3xl border border-blue-100 bg-white py-12 text-center">
						<Typography color="darkGray" as="p" variant="bodySmall">
							No events found. Check back soon for upcoming events.
						</Typography>
					</div>
				)}
			</section>
		</div>
	);
};
