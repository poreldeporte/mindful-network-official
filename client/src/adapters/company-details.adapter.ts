import { CompanyDetails } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface CompanyDetailsExtended
	extends SanityDocument,
		CompanyDetails {}

export const getCompanyDetailsAdapter = (
	companyDetails: CompanyDetailsExtended
) => ({
	id: companyDetails._id,
	logo: companyDetails.logo,
	logoAlt: companyDetails.logoAlt,
	heroBackground: companyDetails.heroBackground,
	email: companyDetails.email,
	phoneNumber: companyDetails.phoneNumber,
	address: companyDetails.address,
	socialLinks: companyDetails.socialLinks,
});
