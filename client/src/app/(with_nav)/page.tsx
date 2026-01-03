import { GetInTouch } from "@/components/forms";
import { BlogModel, CompanyDetails } from "@/models";
import {
	About,
	BlogContainer,
	CaregiverCoaching,
	Hero,
	MentalHealthCrisis,
	OurMission,
} from "@/routes/homepage/components";
import { CTASection } from "@/components/shared/cta-footer";
import { getLatestBlog } from "@/routes/homepage/services";
import { getCompanyDetails } from "@/services/company-details.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
	alternates: {
		canonical: "/",
	},
};

export default async function LandingPage() {
	const [blogPosts, companyDetails]: [BlogModel[], CompanyDetails] =
		await Promise.all([getLatestBlog(), getCompanyDetails()]);

	const schemaData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": "https://themindfulnetwork.com/#organization",
				name: "The Mindful Network",
				url: "https://themindfulnetwork.com",
				logo: {
					"@type": "ImageObject",
					url: "https://themindfulnetwork.com/images/logo.webp",
				},
			},
			{
				"@type": "WebSite",
				"@id": "https://themindfulnetwork.com/#website",
				name: "The Mindful Network",
				url: "https://themindfulnetwork.com",
				publisher: {
					"@id": "https://themindfulnetwork.com/#organization",
				},
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
			/>
			<main aria-labelledby="Landing Page">
				<Hero companyDetails={companyDetails} />
				<About />
				<MentalHealthCrisis />
				<OurMission />
				<CaregiverCoaching />
				<BlogContainer blogPosts={blogPosts} />
				<CTASection />
				<GetInTouch />
			</main>
		</>
	);
}
