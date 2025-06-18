import type { Metadata } from "next";
import { Antic_Didone, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Script from "next/script";

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
				type: "image/png",
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
				type: "image/png",
			},
		],
	},
	robots: "index, follow",
	authors: [{ name: "Viola Creative", url: "https://www.violacreative.com/" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="author" content="The Mindful Network" />
				<meta name="theme-color" content="#fef9ef" />
				<meta name="msapplication-TileColor" content="#fef9ef" />
				<meta name="developer" content="Viola Creative" />
				<meta name="developer-url" content="https://www.violacreative.com/" />
				<meta name="developer-email" content="franco@violacreative.com" />
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
				<meta
					name="google-site-verification"
					content="MRYzoaKzfBfpS_gQkReJAjD6Q_b7IXW2G-QFSp_vYeE"
				/>
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-TLP8D1GLB5"
					strategy="afterInteractive"
				/>
				<Script id="gtag-init" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-TLP8D1GLB5');
					`}
				</Script>
			</head>
			<body
				className={`${anticDidone.className} ${dmSans.className} antialiased`}
			>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
