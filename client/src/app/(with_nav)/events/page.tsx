import { Eventbrite } from "@/api/Eventbrite";
import { CTAFooter } from "@/components/shared";
import { EventbriteKeys } from "@/config/eventbrite.config";
import { AvailableArticlesImage, SearchCtaBlogImage } from "@/lib/images";
import { EventsContainer } from "@/routes/events/components/events-container";
import { EventsHero } from "@/routes/events/components/hero";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
	try {
		const { privateToken, organizationId } = EventbriteKeys;
		const eventbrite = new Eventbrite(privateToken as string);
		const eventsData = await eventbrite.getAllEvents(organizationId as string);

		const events = {
			...eventsData,
			events: eventsData.events.reverse(),
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
				<CTAFooter
					image1={SearchCtaBlogImage}
					image2={AvailableArticlesImage}
					title1="Need assistance?"
					buttonText1="Start Search"
					path1="/search"
					description1="Start by exploring our mental health professionals database."
					title2="Find what you need"
					buttonText2="Start Learning"
					path2="/support-links"
					description2="Search through support groups, services, books, and the latest inmental health research."
				/>
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
				<CTAFooter
					image1={SearchCtaBlogImage}
					image2={AvailableArticlesImage}
					title1="Need assistance?"
					buttonText1="Start Search"
					path1="/search"
					description1="Start by exploring our mental health professionals database."
					title2="Find what you need"
					buttonText2="Start Learning"
					path2="/support-links"
					description2="Search through support groups, services, books, and the latest inmental health research."
				/>
			</>
		);
	}
}
