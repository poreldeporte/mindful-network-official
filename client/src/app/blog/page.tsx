import { Topbar, Footer, MobileTopBar } from "@/components/shared";
import {
	BlogsHero,
	BlogsFooter,
	BlogsContent,
} from "@/routes/blogs-page/components";

export default function BlogsPage() {
	return (
		<>
			<BlogsHero />
			<BlogsContent />
			<BlogsFooter />
		</>
	);
}
