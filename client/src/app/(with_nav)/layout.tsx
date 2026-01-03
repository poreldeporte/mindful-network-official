import { Topbar, MobileTopBar, Footer } from "@/components/shared";
import { getCompanyDetails } from "@/services/company-details.service";
import { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"The Mindful Network - Your Guide to Mental Health Resources in South Florida",
	description:
		"The Mindful Network is your comprehensive guide to finding and connecting with mental health resources in South Florida. Explore therapy options, medication management, outpatient and inpatient programs, and innovative therapies tailored for individuals aged 40 and above.",
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
			"The Mindful Network - Your Guide to Mental Health Resources in South Florida",
		description:
			"Discover mental health services tailored to your needs in South Florida. Find therapy options, outpatient programs, and support for various conditions such as depression, anxiety, PTSD, and more.",
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
		title: "The Mindful Network - Your Guide to Mental Health Resources",
		description:
			"The Mindful Network helps individuals in South Florida find mental health resources tailored to their needs. Explore our platform to access therapy options, outpatient and inpatient programs, and more.",
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
