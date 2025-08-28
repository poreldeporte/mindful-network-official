import { EventsHero } from "@/routes/events/components/hero";
import { EventsFooter } from "@/routes/events/components/footer";
import { EventsContainer } from "@/routes/events/components/events-container";
import { Suspense } from "react";
import { Eventbrite } from "@/api/Eventbrite";
import { EventbriteKeys } from "@/config/eventbrite.config";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
	try {
		const { privateToken, organizationId } = EventbriteKeys;
		const eventbrite = new Eventbrite(privateToken as string);
		const eventsData = await eventbrite.getAllEvents(organizationId as string);

		const currentDate = new Date();
		const filteredEvents = eventsData.events.filter((event) => {
			const eventStartDate = new Date(event.start.utc);
			return eventStartDate >= currentDate;
		});

		const events = {
			...eventsData,
			events: filteredEvents.reverse(),
		};

		return (
			<>
				<EventsHero />
				<Suspense
					fallback={
						<div className="mx-auto w-11/12 xl:w-3/4 py-20 text-center">
							Loading events...
						</div>
					}
				>
					<EventsContainer events={events || { events: [] }} />
				</Suspense>
				<EventsFooter />
			</>
		);
	} catch (error) {
		console.error("Error fetching events:", error);

		return (
			<>
				<EventsHero />
				<div className="mx-auto w-11/12 xl:w-3/4 py-20 text-center">
					<h2 className="text-xl font-bold mb-4">Unable to load events</h2>
					<p>
						We're having trouble connecting to our event system. Please try
						again later.
					</p>
				</div>
				<EventsFooter />
			</>
		);
	}
}
