import { Topbar, MobileTopBar, Footer } from "@/components/shared";
import { getCompanyDetails } from "@/services/company-details.service";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const companyDetails = await getCompanyDetails();

	return (
		<>
			<Topbar companyDetails={companyDetails} />
			<MobileTopBar companyDetails={companyDetails} />
			<main>{children}</main>
			<Footer companyDetails={companyDetails} />
		</>
	);
}
