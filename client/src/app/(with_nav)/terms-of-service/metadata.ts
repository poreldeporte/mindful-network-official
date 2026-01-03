import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Service | The Mindful Network",
	description:
		"Read the terms and conditions for using The Mindful Network, including usage guidelines, limitations of liability, and content policies.",
	alternates: {
		canonical: "/terms-of-service",
	},
	openGraph: {
		title: "Terms of Service | The Mindful Network",
		description:
			"Review the rules and guidelines for using The Mindful Network and its services.",
		url: "/terms-of-service",
		type: "website",
		locale: "en_US",
		siteName: "The Mindful Network",
		images: [
			{
				url: "/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "The Mindful Network - Terms of Service",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Terms of Service | The Mindful Network",
		description:
			"Understand the terms, responsibilities, and usage guidelines for The Mindful Network.",
		images: "/images/logo.webp",
	},
	robots: "index, follow",
};
