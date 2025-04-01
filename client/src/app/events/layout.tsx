import { Footer, MobileTopBar, Topbar } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mental Health Events & Workshops - The Mindful Network",
	description:
		"Discover upcoming mental health events, workshops, and support groups in South Florida. Find valuable resources and community connections for your mental health journey.",
	keywords: [
		"mental health events",
		"therapy workshops",
		"support groups",
		"South Florida mental health",
		"community resources",
		"wellness seminars",
		"mental health education",
		"psychology conferences",
		"The Mindful Network events",
		"mental health support",
		"therapy sessions",
		"mental health awareness",
		"local mental health resources",
		"Florida psychology events",
		"mindfulness workshops",
	],
	openGraph: {
		title: "Mental Health Events & Workshops - The Mindful Network",
		description:
			"Connect with mental health professionals and community resources through our curated events, workshops, and support groups in South Florida.",
		url: "https://themindfulnetwork.com/events",
		type: "website",
		locale: "en_US",
		siteName: "The Mindful Network",
		images: [
			{
				url: "https://themindfulnetwork.com/images/logo.png",
				width: 1200,
				height: 630,
				alt: "The Mindful Network - Mental Health Events",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Mental Health Events & Workshops - The Mindful Network",
		description:
			"Join our community events, workshops, and support groups focused on mental health awareness and education in South Florida.",
		images: "https://themindfulnetwork.com/images/logo.png",
	},
	robots: "index, follow",
};

export default function EventsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<MobileTopBar />
			<Topbar />
			<main aria-labelledby="mindful-events-page">{children}</main>
			<Footer />
		</>
	);
}
