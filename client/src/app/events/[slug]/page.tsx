import { Eventbrite } from "@/api/Eventbrite";
import { EventbriteKeys } from "@/config/eventbrite.config";
import { EventbriteEvent } from "@/models/eventbrite.model";
import { EventDetailsAbout } from "@/routes/events/pages/event-details/components/about";
import { EventDetailsHero } from "@/routes/events/pages/event-details/components/hero";
import { MoreEvents } from "@/routes/events/pages/event-details/components/more-events";
import { generateSlug } from "@/utilities";
import { formatEventDate } from "@/utilities/format-event-date.utility";
import { truncateText } from "@/utilities/truncate-text.utility";
import Head from "next/head";

interface Props {
	params: {
		slug: string;
	};
}

const generateEventSchema = (event: any) => {
	return {
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
			name: "The Mindful Network",
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
};

export const generateMetadata = async ({ params }: Props) => {
	const eventId = params.slug.split("_")[1];
	const { privateToken } = EventbriteKeys;
	const eventbrite = new Eventbrite(privateToken as string);
	const event = await eventbrite.getEventWithVenue(eventId as string);

	if (!event) return { title: "Event Not Found" };

	const description =
		event.summary || truncateText(event.description.text, 160);
	const url = `https://themindfulnetwork.com/events/${generateSlug(event.name.text)}_${event.id}`;

	return {
		title: `${event.name.text} | Mindful Network Event`,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title: event.name.text,
			description,
			url,
			images: event.logo?.url ? [{ url: event.logo.url }] : [],
			publishedTime: event.start.utc,
		},
		twitter: {
			card: "summary_large_image",
			title: event.name.text,
			description,
			images: event.logo?.url ? [event.logo.url] : [],
		},
	};
};

export default async function EventDetails({ params }: Props) {
	const eventId = params.slug.split("_")[1];

	const { privateToken, organizationId } = EventbriteKeys;
	const eventbrite = new Eventbrite(privateToken as string);
	const event = await eventbrite.getEventWithVenue(eventId as string);

	if (!event) {
		return (
			<>
				<Head>
					<title>Event Not Found | Mindful Network</title>
					<meta
						name="description"
						content="The requested event could not be found."
					/>
					<meta name="robots" content="noindex, follow" />
				</Head>
				<div>Event not found</div>
			</>
		);
	}

	const eventCategory = event.category?.name || "Event";

	const eventDate = event.start?.utc ? formatEventDate(event.start.utc) : "";

	const locationText = event.venue?.address?.city
		? ` in ${event.venue.address.city}`
		: "";
	const pageTitle = `${event.name.text}${locationText} | ${eventDate} | Mindful Network`;

	const metaDescription =
		event.summary ||
		truncateText(
			`Join us for ${event.name.text}${locationText} on ${eventDate}. ${event.description.text}`,
			160
		);

	const eventSchema = generateEventSchema(event);

	const otherEvents = await eventbrite.getAllEvents(organizationId as string);
	const filteredEvents = otherEvents.events.filter(
		(otherEvent: EventbriteEvent) => otherEvent.id !== event.id
	);

	const canonicalUrl = `https://themindfulnetwork.com/events/${generateSlug(event.name.text)}_${event.id}`;

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content={metaDescription} />
				<meta
					name="keywords"
					content={`mindful network, ${eventCategory.toLowerCase()}, ${event.name.text.toLowerCase()}, mindfulness, events${locationText.toLowerCase()}`}
				/>
				<link rel="canonical" href={canonicalUrl} />

				<meta property="og:locale" content="en_US" />

				<meta property="og:site_name" content="Mindful Network" />
				<meta property="og:title" content={event.name.text} />
				<meta property="og:description" content={metaDescription} />
				<meta property="og:type" content="event" />
				<meta property="og:url" content={canonicalUrl} />
				{event.logo?.url && (
					<meta property="og:image" content={event.logo.url} />
				)}
				{event.logo?.url && (
					<meta
						property="og:image:alt"
						content={`${event.name.text} event image`}
					/>
				)}
				{event.start?.utc && (
					<meta property="article:published_time" content={event.start.utc} />
				)}

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:site" content="@mindfulnetwork" />
				<meta name="twitter:title" content={event.name.text} />
				<meta name="twitter:description" content={metaDescription} />
				{event.logo?.url && (
					<meta name="twitter:image" content={event.logo.url} />
				)}

				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="robots"
					content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
				/>
			</Head>

			<main>
				<h1 className="sr-only">{event.name.text} - Mindful Network Event</h1>
				<EventDetailsHero event={event} />
				<EventDetailsAbout event={event} />
				<MoreEvents events={filteredEvents} />
			</main>
		</>
	);
}

export async function generateStaticParams() {
	const { privateToken, organizationId } = EventbriteKeys;
	const eventbrite = new Eventbrite(privateToken as string);

	try {
		const events = await eventbrite.getAllEvents(organizationId as string);
		return events.events.map((event: EventbriteEvent) => ({
			slug: `${generateSlug(event.name.text)}_${event.id}`,
		}));
	} catch (error) {
		console.error("Error fetching events for static generation:", error);
		return [];
	}
}
