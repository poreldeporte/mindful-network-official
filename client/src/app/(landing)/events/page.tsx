import { AllBlogsHero } from "@/routes/events/components/hero";
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
		const events = await eventbrite.getAllEvents(organizationId as string);

		return (
			<>
				<AllBlogsHero />
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
				<AllBlogsHero />
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
