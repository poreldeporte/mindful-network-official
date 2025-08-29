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

export default async function LandingPage() {
	const [blogPosts, companyDetails]: [BlogModel[], CompanyDetails] =
		await Promise.all([getLatestBlog(), getCompanyDetails()]);

	return (
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
	);
}
