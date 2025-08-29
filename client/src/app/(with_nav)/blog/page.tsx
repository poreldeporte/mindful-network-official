import { CTASection } from "@/components/shared/cta-footer";
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
			<CTASection />
		</>
	);
}
