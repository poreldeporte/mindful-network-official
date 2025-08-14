import { sanityClient } from "@/api";
import { getCompanyDetailsAdapter } from "@/adapters";
import { CompanyDetails } from "@/models";

export const getCompanyDetails = async (): Promise<CompanyDetails | null> => {
	try {
		const allCompanyDetailsQuery = `*[_type == "companyDetails"][0] {
			_id,
			"logo": logo.asset->url,
			"logoAlt": logo.alt,
			email,
			phoneNumber,
			address,
			socialLinks
		}`;

		const companyDetails = await sanityClient.fetch(allCompanyDetailsQuery);
		const companyDetailsAdapter = getCompanyDetailsAdapter(companyDetails);
		return companyDetailsAdapter;
	} catch (error) {
		console.error("Error fetching company details data:", error);
		return null;
	}
};
