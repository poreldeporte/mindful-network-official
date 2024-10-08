import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Find Mental Health Professionals in South Florida - Mindful Network",
	description:
		"Search for licensed mental health professionals in South Florida. Filter by location, insurance, specialties, and more to find the right support for your needs.",
	keywords: [
		"mental health professionals",
		"South Florida therapists",
		"mental health services",
		"therapy options",
		"licensed psychologists",
		"find a therapist",
		"mental health support",
		"insurance accepted mental health",
		"therapy for adults",
		"mental health resources South Florida",
		"counseling services",
		"mental health providers",
	],
	openGraph: {
		title:
			"Find Mental Health Professionals in South Florida - Mindful Network",
		description:
			"Discover mental health professionals in South Florida. Use our advanced search filters to find the best match based on location, insurance, age specialty, and condition specialty.",
		url: "https://www.mindfulnetwork.com/search",
		type: "website",
		locale: "en_US",
		siteName: "Mindful Network",
		images: [
			{
				url: "/images/search-og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Search Mental Health Professionals",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title:
			"Find Mental Health Professionals in South Florida - Mindful Network",
		description:
			"Find the right mental health support in South Florida. Explore licensed professionals with our comprehensive search filters tailored to your needs.",
		images: "/images/search-og-image.jpg", // Twitter preview image for the search section.
	},
	viewport: "width=device-width, initial-scale=1",
	robots: "index, follow",
};

export default function SearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
