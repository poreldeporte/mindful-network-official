import { Eventbrite } from "@/api/Eventbrite";
import { CTASection } from "@/components/shared/cta-footer";
import { EventbriteKeys } from "@/config/eventbrite.config";
import { EventsContainer } from "@/routes/events/components/events-container";
import { EventsHero } from "@/routes/events/components/hero";
import { getCompanyDetails } from "@/services/company-details.service";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
	try {
		const { privateToken, organizationId } = EventbriteKeys;
		const eventbrite = new Eventbrite(privateToken as string);
		const eventsData = await eventbrite.getAllEvents(organizationId as string);
		const companyDetails = await getCompanyDetails();

		const events = {
			...eventsData,
			events: eventsData.events.reverse(),
		};

		return (
			<>
				<EventsHero
					title={companyDetails?.eventsSection?.title}
					subtitle={companyDetails?.eventsSection?.subtitle}
				/>
				<Suspense
					fallback={
						<div className="mx-auto w-11/12 xl:w-3/4 py-20 text-center">
							Loading events...
						</div>
					}
				>
					<EventsContainer events={events || { events: [] }} />
				</Suspense>
				<CTASection />
			</>
		);
	} catch (error) {
		console.error("Error fetching events:", error);
		const companyDetails = await getCompanyDetails();

		return (
			<>
				<EventsHero
					title={companyDetails?.eventsSection?.title}
					subtitle={companyDetails?.eventsSection?.subtitle}
				/>
				<div className="mx-auto w-11/12 xl:w-3/4 py-20 text-center">
					<h2 className="text-xl font-bold mb-4">Unable to load events</h2>
					<p>
						We're having trouble connecting to our event system. Please try
						again later.
					</p>
				</div>
				<CTASection />
			</>
		);
	}
}
