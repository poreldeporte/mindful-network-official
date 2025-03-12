import { Footer, MobileTopBar, Topbar } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Comprehensive Mental Health Blog - Mindful Network",
	description:
		"Explore in-depth articles on mental health, well-being, and self-care. Find expert resources, therapy insights, and the latest trends in psychology.",
	keywords: [
		"mental health",
		"wellness",
		"mental health blog",
		"self-care tips",
		"psychology insights",
		"therapy resources",
		"well-being articles",
		"mental health support",
		"Mindful Network blog",
		"therapy trends",
		"emotional wellness",
		"mental health awareness",
		"stress management",
		"anxiety tips",
		"mindfulness practices",
	],
	openGraph: {
		title: "Comprehensive Mental Health Blog - Mindful Network",
		description:
			"Access insightful articles and professional resources on mental health, therapy, and self-care. Stay informed with the latest updates and trends in the field.",
		url: "https://themindfulnetwork.com/blog",
		type: "website",
		locale: "en_US",
		siteName: "Mindful Network",
		images: [
			{
				url: "/assets/images/mindful-logos/mindful-imagotype.png",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Comprehensive Mental Health Blog",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Comprehensive Mental Health Blog - Mindful Network",
		description:
			"Stay updated with expert insights and resources on mental health and wellness. Explore our blog for tips, articles, and therapeutic advice.",
		images: "/assets/images/mindful-logos/mindful-imagotype.png",
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
