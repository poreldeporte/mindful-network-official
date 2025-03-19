import { AllBlogsHero } from "@/routes/events/components/hero";
import { EventsFooter } from "@/routes/events/components/footer";
import { EventsContainer } from "@/routes/events/components/events-container";
import { Suspense } from "react";
import { Eventbrite } from "@/api/Eventbrite";
import { EventbriteKeys } from "@/config/eventbrite.config";

export default async function EventsPage() {
	const { privateToken, organizationId } = EventbriteKeys;
	const eventbrite = new Eventbrite(privateToken as string);
	const events = await eventbrite.getAllEvents(organizationId as string);

	return (
		<>
			<AllBlogsHero />
			<Suspense fallback={<div>loading...</div>}>
				<EventsContainer events={events} />
			</Suspense>
			<EventsFooter />
		</>
	);
}
