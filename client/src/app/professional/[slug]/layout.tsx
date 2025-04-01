import { Footer, Topbar, MobileTopBar } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"Find & Connect with Mental Health Professionals in South Florida | Mindful Network",
	description:
		"Discover and connect with licensed mental health professionals in South Florida. View detailed profiles, education, specialties, accepted insurance, and contact information. Find the perfect match for your mental health needs.",
	keywords: [
		"mental health professionals South Florida",
		"therapist profiles",
		"psychologist directory",
		"contact mental health providers",
		"therapist education background",
		"accepted insurance mental health",
		"age group specialty therapy",
		"South Florida counselors",
		"mental health specialist search",
		"licensed psychologists near me",
		"therapy options South Florida",
		"mental health professional finder",
	],
	openGraph: {
		title:
			"Connect with Mental Health Professionals in South Florida | Mindful Network",
		description:
			"Explore detailed profiles of licensed mental health professionals in South Florida. View education, specialties, accepted insurance, and easily connect with the right therapist for your needs.",
		url: "https://themindfulnetwork.com/psychologist",
		type: "website",
		locale: "en_US",
		siteName: "Mindful Network",
		images: [
			{
				url: "https://themindfulnetwork.com/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Mental Health Professional Directory",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Find Your Ideal Mental Health Professional in South Florida",
		description:
			"Browse comprehensive profiles of licensed therapists and psychologists. Compare specialties, education, and accepted insurance to find your perfect mental health match.",
		images: [
			{
				url: "https://themindfulnetwork.com/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Mental Health Professional Search",
			},
		],
	},
	robots: "index, follow",
};

export default function PsychologistLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<MobileTopBar />
			<Topbar />
			<main aria-labelledby="Mental Health Professional Search">
				{children}
			</main>
			<Footer />
		</>
	);
}
