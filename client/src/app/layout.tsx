import type { Metadata } from "next";
import { Antic_Didone, DM_Sans } from "next/font/google";
import "./globals.css";
import emailjs from "@emailjs/browser";

const anticDidone = Antic_Didone({
	weight: "400",
	subsets: ["latin"],
	display: "auto",
});

const dmSans = DM_Sans({
	weight: ["400", "900", "500", "600", "700", "800"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title:
		"Mindful Network - Your Guide to Mental Health Resources in South Florida",
	description:
		"Mindful Network is your comprehensive guide to finding and connecting with mental health resources in South Florida. Explore therapy options, medication management, outpatient and inpatient programs, and innovative therapies tailored for individuals aged 40 and above.",
	alternates: {
		canonical: "https://themindfulnetwork.com",
	},
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
	],
	openGraph: {
		title:
			"Mindful Network - Your Guide to Mental Health Resources in South Florida",
		description:
			"Discover mental health services tailored to your needs in South Florida. Find therapy options, outpatient programs, and support for various conditions such as depression, anxiety, PTSD, and more.",
		url: "https://themindfulnetwork.com",
		type: "website",
		locale: "en_US",
		siteName: "Mindful Network",
		images: [
			{
				url: "/assets/images/mindful-logos/mindful-imagotype.png",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Mental Health Resources",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		site: "@MindfulNetwork",
		title: "Mindful Network - Your Guide to Mental Health Resources",
		description:
			"Mindful Network helps individuals in South Florida find mental health resources tailored to their needs. Explore our platform to access therapy options, outpatient and inpatient programs, and more.",
		images: [
			{
				url: "/assets/images/mindful-logos/mindful-imagotype.png",
				width: 1200,
				height: 630,
				alt: "Mindful Network - Mental Health Resources",
			},
		],
	},
	robots: "index, follow",
};

emailjs.init(process.env.EMAILJS_PUBLIC_KEY);

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="author" content="Mindful Network Team" />
				<meta name="theme-color" content="#fef9ef" />
				<meta name="msapplication-TileColor" content="#fef9ef" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body
				className={`${anticDidone.className} ${dmSans.className} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
