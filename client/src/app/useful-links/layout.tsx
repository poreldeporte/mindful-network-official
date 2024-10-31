import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mental Health Useful Links | Mindful Network",
	description:
		"Access curated mental health resources, educational materials, crisis hotlines, support groups, and wellness tools. Find valuable information and support for your mental health journey.",
	keywords: [
		"mental health resources",
		"crisis hotlines",
		"mental wellness tools",
		"therapy resources",
		"mental health education",
		"support groups",
		"self-help resources",
		"mental health articles",
		"wellness guides",
		"mental health support",
		"mindfulness resources",
		"mental health organizations",
		"mental health apps",
		"mental health books",
		"mental health blogs",
	],
	openGraph: {
		title: "Mental Health Useful Links | Mindful Network",
		description:
			"Discover comprehensive mental health resources including crisis support, educational materials, support groups, and wellness tools to support your mental health journey.",
		url: "https://themindfulnetwork.com/useful-links",
		type: "website",
		locale: "en_US",
		siteName: "Mindful Network",
		images: [
			{
				url: "/android-chrome-512x512.png",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Mental Health Resources Directory",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Essential Mental Health Resources & Support",
		description:
			"Access valuable mental health resources, crisis support, educational materials, and wellness tools. Find the support you need for your mental health journey.",
		images: [
			{
				url: "/android-chrome-512x512.png",
				width: 1200,
				height: 630,
				alt: "The Mindful Network - Mental Health Useful Links Hub",
			},
		],
	},
	alternates: {
		canonical: "https://themindfulnetwork.com/useful-links",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	authors: [{ name: "The Mindful Network" }],
	category: "Mental Health Useful Links",
};

export default function UsefulLinksLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
