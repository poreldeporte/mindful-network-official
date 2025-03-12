import { eventbriteEvents } from "@/lib/constants";
import { EventDetailsAbout } from "@/routes/events/pages/event-details/components/about";
import { EventDetailsHero } from "@/routes/events/pages/event-details/components/hero";
import { generateSlug } from "@/utilities";
import Head from "next/head";

export default async function EventDetails() {
	const post = eventbriteEvents.events[0];

	return (
		<>
			<Head>
				<title>{post.name.text} | Mindful Network Event</title>
				<meta name="description" content={post.summary} />
				<meta property="og:title" content={post.name.text} />
				<meta property="og:description" content={post.summary} />
				<meta property="og:type" content="article" />
				<meta
					property="og:url"
					content={`https://themindfulnetwork.com/events/${generateSlug(post.name.text)}`}
				/>
				{post.logo.url && <meta property="og:image" content={post.logo.url} />}
				{post.start.utc && (
					<meta property="article:published_time" content={post.start.utc} />
				)}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={post.name.text} />
				<meta name="twitter:description" content={post.description.text} />
				{post.logo.url && <meta name="twitter:image" content={post.logo.url} />}
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
			</Head>

			<EventDetailsHero event={post} />
			<EventDetailsAbout event={post} />
		</>
	);
}
