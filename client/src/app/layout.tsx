import type { Metadata } from "next";
import { Antic_Didone, DM_Sans } from "next/font/google";
import Script from "next/script";
import { AttributionTracker } from "@/components/AttributionTracker";
import "./globals.css";

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
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL || "https://themindfulnetwork.com"
	),
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html>
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
				<Script id="ms-clarity" strategy="afterInteractive">
					{`
						(function(c,l,a,r,i,t,y){
							c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
							t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
							y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
						})(window, document, "clarity", "script", "wjbvvlbpnj");
					`}
				</Script>
			</head>
			<body
				className={`${anticDidone.className} ${dmSans.className} antialiased`}
			>
				<AttributionTracker />
				{children}
			</body>
		</html>
	);
}
