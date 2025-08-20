import { Footer, MobileTopBar, Topbar } from "@/components/shared";
import { BlogModel, CompanyDetails } from "@/models";
import { getLatestBlog } from "@/routes/homepage/services";
import { getCompanyDetails } from "@/services/company-details.service";
import { Analytics } from "@vercel/analytics/react";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [blogPosts, companyDetails]: [BlogModel[], CompanyDetails] =
		await Promise.all([getLatestBlog(), getCompanyDetails()]);

	return (
		<html lang="en">
			<body>
				<Topbar companyDetails={companyDetails} />
				<MobileTopBar companyDetails={companyDetails} />
				{children}
				<Footer blogPosts={blogPosts} companyDetails={companyDetails} />
				<Analytics />
			</body>
		</html>
	);
}
