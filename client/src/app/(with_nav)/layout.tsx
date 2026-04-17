import { Topbar, MobileTopBar, Footer } from "@/components/shared";
import { getCompanyDetails } from "@/services/company-details.service";
import { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"Find a Therapist in South Florida | The Mindful Network",
	description:
		"Find licensed therapists in Miami, Coral Gables, Boca Raton, Palm Beach, and South Florida. Filter by insurance, condition, and language.",
	keywords: [
		"mental health resources",
		"South Florida mental health",
		"therapy options",
		"medication management",
		"outpatient programs",
		"inpatient programs",
		"mental health support",
		"therapy for adults",
		"mental health services South Florida",
		"psychological assessment",
		"innovative therapies",
		"mind-body practices",
		"mental health legal support",
		"Facilities",
		"Services",
		"Clinics",
		"Counselor",
		"Hospitals",
		"Retreats",
	],
	openGraph: {
		title:
			"Find a Therapist in South Florida | The Mindful Network",
		description:
			"Search licensed therapists, psychiatrists, and mental health professionals across South Florida. Filter by insurance, condition, and language.",
		url: "https://themindfulnetwork.com",
		type: "website",
		locale: "en_US",
		siteName: "The Mindful Network",
		images: [
			{
				url: "https://themindfulnetwork.com/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "The Mindful Network - Mental Health Resources",
				type: "image/webp",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Find a Therapist in South Florida | The Mindful Network",
		description:
			"Search licensed therapists and mental health professionals in South Florida. Filter by insurance, condition, and language.",
		images: [
			{
				url: "https://themindfulnetwork.com/images/logo.webp",
				width: 1200,
				height: 630,
				alt: "The Mindful Network - Mental Health Resources",
				type: "image/webp",
			},
		],
	},
	robots: "index, follow",
	authors: [{ name: "Viola Creative", url: "https://www.violacreative.com/" }],
};
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const companyDetails = await getCompanyDetails();

	return (
		<>
			<Topbar companyDetails={companyDetails} />
			<MobileTopBar companyDetails={companyDetails} />
			<main>{children}</main>
			<Footer companyDetails={companyDetails} />
		</>
	);
}
