import type { Metadata } from "next";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";

export const metadata: Metadata = {
	title: "About Us - Mindful Network: Mental Health Support in South Florida",
	description:
		"Learn about Mindful Network, our mission to provide accessible mental health resources in South Florida, and how we're working to end the stigma around mental health. Discover our team, values, and vision for a thriving, supportive community.",
	keywords: [
		"about Mindful Network",
		"mental health organization",
		"South Florida mental health support",
		"mission of Mindful Network",
		"mental health advocacy",
		"mental health community",
		"mental health awareness",
		"team behind Mindful Network",
		"mental health resources South Florida",
		"mental health support network",
	],
	openGraph: {
		title: "About Us - Mindful Network: Mental Health Support in South Florida",
		description:
			"Get to know Mindful Network, our mission to provide accessible and supportive mental health resources in South Florida. We aim to build a stigma-free community with a focus on mental well-being.",
		url: "https://themindfulnetwork.com/about",
		type: "website",
		locale: "en_US",
		siteName: "Mindful Network",
		images: [
			{
				url: "/assets/about-mindful-network.png",
				width: 1200,
				height: 630,
				alt: "About Mindful Network - Mental Health Support",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "About Us - Mindful Network: Mental Health Support",
		description:
			"Discover Mindful Network's mission and vision. We are committed to providing accessible mental health resources and building a supportive, stigma-free community in South Florida.",
		images: [
			{
				url: "/assets/about-mindful-network.png",
				width: 1200,
				height: 630,
				alt: "About Mindful Network - Mental Health Support",
			},
		],
	},
	robots: "index, follow",
};

export default function AboutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Topbar />
			<MobileTopBar />
			<main
				role="main"
				aria-label="About Mindful Network"
				className={`antialiased`}
			>
				{children}
			</main>
			<Footer />
		</>
	);
}
