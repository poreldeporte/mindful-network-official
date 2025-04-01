import { Eventbrite } from "@/api/Eventbrite";
import { EventbriteKeys } from "@/config/eventbrite.config";
import { EventbriteEvent } from "@/models/eventbrite.model";
import { EventDetailsAbout } from "@/routes/events/pages/event-details/components/about";
import { EventDetailsHero } from "@/routes/events/pages/event-details/components/hero";
import { MoreEvents } from "@/routes/events/pages/event-details/components/more-events";
import { generateSlug } from "@/utilities";
import { Metadata } from "next";

interface Props {
	params: {
		slug: string;
	};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const eventId = params.slug.split("_")[1];
	const { privateToken } = EventbriteKeys;
	const eventbrite = new Eventbrite(privateToken as string);
	const event = await eventbrite.getEventWithVenue(eventId as string);

	if (!event) {
		return {
			title: "Event Not Found | Mindful Network",
			description: "The requested event could not be found.",
			robots: "noindex, follow",
		};
	}

	const locationText = event.venue?.address?.city
		? ` in ${event.venue.address.city}`
		: "";
	const pageTitle = `${event.name.text}${locationText} | Mindful Network Event`;
	const metaDescription =
		event.summary || event.description?.text?.substring(0, 157) + "...";
	const canonicalUrl = `https://themindfulnetwork.com/events/${generateSlug(event.name.text)}_${event.id}`;
	const eventCategory = event.category?.name || "Event";

	return {
		title: pageTitle,
		description: metaDescription,
		keywords: `mindful network, ${eventCategory.toLowerCase()}, ${event.name.text.toLowerCase()}, mindfulness, events${locationText.toLowerCase()}`,
		alternates: {
			canonical: canonicalUrl,
		},
		openGraph: {
			locale: "en_US",
			siteName: "The Mindful Network",
			title: event.name.text,
			description: metaDescription,
			type: "website",
			url: canonicalUrl,
			...(event.logo?.url && {
				images: [
					{
						url: event.logo.url,
						alt: `${event.name.text} event image`,
					},
				],
			}),
		},
		twitter: {
			card: "summary_large_image",
			site: "@mindfulnetwork",
			title: event.name.text,
			description: metaDescription,
			...(event.logo?.url && {
				images: [event.logo.url],
			}),
		},
		robots:
			"index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
		viewport: "width=device-width, initial-scale=1",
	};
}

export default async function EventDetails({ params }: Props) {
	const eventId = params.slug.split("_")[1];

	const { privateToken, organizationId } = EventbriteKeys;
	const eventbrite = new Eventbrite(privateToken as string);
	const event = await eventbrite.getEventWithVenue(eventId as string);

	if (!event) {
		return <div>Event not found</div>;
	}

	const otherEvents = await eventbrite.getAllEvents(organizationId as string);
	const filteredEvents = otherEvents.events.filter(
		(otherEvent: EventbriteEvent) => otherEvent.id !== event.id
	);

	const eventSchema = {
		"@context": "https://schema.org",
		"@type": "Event",
		name: event.name.text,
		description: event.summary || event.description.text,
		startDate: event.start.utc,
		endDate: event.end.utc,
		image: event.logo?.url || "",
		location: event.venue
			? {
					"@type": "Place",
					name: event.venue.name,
					address: {
						"@type": "PostalAddress",
						streetAddress: event.venue.address?.address_1 || "",
						addressLocality: event.venue.address?.city || "",
						postalCode: event.venue.address?.postal_code || "",
						addressCountry: event.venue.address?.country || "",
					},
				}
			: {},
		organizer: {
			"@type": "Organization",
			name: "Mindful Network",
			url: "https://themindfulnetwork.com",
		},
		offers: {
			"@type": "Offer",
			url: event.url,
			availability: "https://schema.org/InStock",
			price: event.ticket_classes?.[0]?.cost?.value || "0",
			priceCurrency: event.ticket_classes?.[0]?.cost?.currency || "USD",
		},
	};

	return (
		<main>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
			/>
			<EventDetailsHero event={event} />
			<EventDetailsAbout event={event} />
			<MoreEvents events={filteredEvents} />
		</main>
	);
}

export const dynamic = "force-dynamic";
