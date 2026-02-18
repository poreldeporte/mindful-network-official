import type { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"Student Mental Health Resources in South Florida | The Mindful Network",
	description:
		"Designed for parents, educators, and school communities, this section connects you to vetted professionals offering testing, mental health care, learning support, and family resources in South Florida.",
	alternates: {
		canonical: "/students",
	},
	keywords: [
		"student mental health support",
		"child therapist South Florida",
		"adolescent therapist South Florida",
		"school mental health resources",
		"psychological testing for students",
		"psychoeducational testing",
		"learning support services",
		"family mental health resources",
		"mental health providers for children",
		"mental health providers for teens",
		"school counseling referrals",
		"student counseling services",
	],
	openGraph: {
		title:
			"Student Mental Health Resources in South Florida | The Mindful Network",
		description:
			"Vetted child and adolescent professionals, testing pathways, learning support, and family resources for student wellbeing.",
		url: "https://themindfulnetwork.com/students",
		type: "website",
		locale: "en_US",
		siteName: "The Mindful Network",
		images: [
			{
				url: "https://themindfulnetwork.com/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "Student Mental Health Resources - The Mindful Network",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title:
			"Student Mental Health Resources in South Florida | The Mindful Network",
		description:
			"Find vetted support for children and adolescents, including testing and family-focused care pathways.",
		images: ["https://themindfulnetwork.com/images/logo.webp"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function StudentsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
