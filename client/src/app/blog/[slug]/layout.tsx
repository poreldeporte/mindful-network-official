import { Footer, MobileTopBar, Topbar } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Mental Health and Wellness Blog - Mindful Network",
	description:
		"Explore articles on mental health, wellness, and self-care on our blog. Find resources, tips, and the latest trends in therapy and psychology.",
	keywords: [
		"mental health",
		"wellness",
		"mental health blog",
		"self-care",
		"psychology",
		"therapy tips",
		"wellness articles",
		"mental health resources",
		"Mindful Network blog",
		"therapy and psychology",
		"mental health trends",
	],
	openGraph: {
		title: "Mental Health and Wellness Blog - Mindful Network",
		description:
			"Discover insightful articles and resources on mental health and wellness. Stay updated with the latest in therapy practices and self-care tips.",
		url: "https://themindfulnetwork.com/blog",
		type: "website",
		locale: "en_US",
		siteName: "Mindful Network",
		images: [
			{
				url: "/images/blog-og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Mental Health and Wellness Blog",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Mental Health and Wellness Blog - Mindful Network",
		description:
			"Read our blog for the latest insights on mental health and self-care. Discover articles, tips, and resources tailored to support your well-being.",
		images: "/images/blog-og-image.jpg",
	},
	robots: "index, follow",
};

export default function BlogLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<MobileTopBar />
			<Topbar />
			<main aria-labelledby="blog-page">{children};</main>
			<Footer />
		</>
	);
}
