import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy | The Mindful Network",
	description:
		"Review how The Mindful Network collects, uses, and protects your information, including details about cookies, analytics, and data security.",
	alternates: {
		canonical: "/privacy-policy",
	},
	openGraph: {
		title: "Privacy Policy | The Mindful Network",
		description:
			"Learn how The Mindful Network handles personal data, cookies, and security practices to protect your privacy.",
		url: "/privacy-policy",
		type: "website",
		locale: "en_US",
		siteName: "The Mindful Network",
		images: [
			{
				url: "/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "The Mindful Network - Privacy Policy",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Privacy Policy | The Mindful Network",
		description:
			"Understand how The Mindful Network collects and protects your information.",
		images: "/images/logo.webp",
	},
	robots: "index, follow",
};
