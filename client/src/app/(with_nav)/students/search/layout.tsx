import type { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"Student Mental Health Directory (Child & Adolescent) | The Mindful Network",
	description:
		"Browse student-focused mental health professionals in South Florida for children and adolescents.",
	alternates: {
		canonical: "/students/search",
	},
	keywords: [
		"child therapist directory",
		"adolescent therapist directory",
		"student mental health directory",
		"South Florida child psychologist",
		"South Florida teen counseling",
		"student counseling professionals",
		"child and adolescent mental health providers",
	],
	openGraph: {
		title:
			"Student Mental Health Directory (Child & Adolescent) | The Mindful Network",
		description:
			"Student-focused directory for Child and Adolescent support in South Florida.",
		url: "https://themindfulnetwork.com/students/search",
		type: "website",
		locale: "en_US",
		siteName: "The Mindful Network",
		images: [
			{
				url: "https://themindfulnetwork.com/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "Student Mental Health Directory - The Mindful Network",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title:
			"Student Mental Health Directory (Child & Adolescent) | The Mindful Network",
		description:
			"Find Child and Adolescent-focused professionals in South Florida.",
		images: ["https://themindfulnetwork.com/images/logo.webp"],
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function StudentSearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
