import { sanityClient } from "@/api";
import { allCompanyDetailsQuery } from "@/app/api/types";
import { getCompanyDetailsAdapter } from "@/adapters";
import { CompanyDetails } from "@/models";

export const getCompanyDetails = async (): Promise<CompanyDetails | null> => {
	try {
		const companyDetails = await sanityClient.fetch(allCompanyDetailsQuery);
		const companyDetailsAdapter = getCompanyDetailsAdapter(companyDetails);
		return companyDetailsAdapter;
	} catch (error) {
		console.error("Error fetching company details data:", error);
		return null;
	}
};
