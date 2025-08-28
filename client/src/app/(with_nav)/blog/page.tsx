import { CTAFooter } from "@/components/shared";
import { AvailableArticlesImage, SearchCtaBlogImage } from "@/lib/images";
import { BlogsContent, BlogsHero } from "@/routes/blogs-page/components";
import { getTotalAmount } from "@/routes/blogs-page/services/blogs-page.services";
import { getCompanyDetails } from "@/services/company-details.service";
import { Suspense } from "react";

export default async function BlogsPage() {
	const blogAmount = await getTotalAmount();
	const companyDetails = await getCompanyDetails();

	return (
		<>
			<BlogsHero
				title={companyDetails?.blogsSection?.title}
				subtitle={companyDetails?.blogsSection?.subtitle}
			/>
			<Suspense fallback={<div>loading...</div>}>
				<BlogsContent blogAmount={blogAmount} />
			</Suspense>
			<CTAFooter
				image1={SearchCtaBlogImage}
				image2={AvailableArticlesImage}
				title1="Need assistance?"
				buttonText1="Start Search"
				path1="/search"
				description1="Start by exploring our mental health professionals database."
				title2="Find what you need"
				buttonText2="Start Learning"
				path2="/support-links"
				description2="Search through support groups, services, books, and the latest inmental health research."
			/>
		</>
	);
}
