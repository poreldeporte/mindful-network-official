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
import { BlogModel } from "@/models";

export default async function Home() {
	const blogPosts: BlogModel[] = await getLatestBlog();

	return (
		<>
			<Topbar />
			<MobileTopBar />

			<main aria-labelledby="Landing Page">
				<Hero />
				<About />
				<OurMission />
				<MentalHealthCrisis />
				<CaregiverCoaching />
				<BlogContainer blogPosts={blogPosts} />
				<CTASection />
				<GetInTouch />
			</main>
			<Footer blogPosts={blogPosts} />
		</>
	);
}
