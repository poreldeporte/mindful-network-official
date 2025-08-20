import { GetInTouch } from "@/components/forms";
import {
	About,
	BlogContainer,
	CTASection,
	Hero,
	OurMission,
	MentalHealthCrisis,
	CaregiverCoaching,
} from "@/routes/homepage/components";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";
import { getLatestBlog } from "@/routes/homepage/services";
import { BlogModel, CompanyDetails } from "@/models";
import { getCompanyDetails } from "@/services/company-details.service";

export default async function Home() {
	const [blogPosts, companyDetails]: [BlogModel[], CompanyDetails] =
		await Promise.all([getLatestBlog(), getCompanyDetails()]);

	return (
		<>
			<Topbar companyDetails={companyDetails} />
			<MobileTopBar companyDetails={companyDetails} />

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
			<Footer blogPosts={blogPosts} companyDetails={companyDetails} />
		</>
	);
}
