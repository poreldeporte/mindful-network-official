import { GetInTouch } from "@/components/forms";
import {
	About,
	BlogContainer,
	CTASection,
	Hero,
} from "@/routes/homepage/components";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";
import { getLatestBlog } from "@/routes/homepage/services";
import { BlogModel } from "@/models";

export default async function Home() {
	const blogPosts: BlogModel[] = await getLatestBlog();
	return (
		<main>
			<Topbar />
			<MobileTopBar />
			<Hero />
			<About />
			<BlogContainer blogPosts={blogPosts} />
			<CTASection />
			<GetInTouch />
			<Footer />
		</main>
	);
}
