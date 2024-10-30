import { CompanyDetails } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface CompanyDetailsExtended
	extends SanityDocument,
		CompanyDetails {}

export const getCompanyDetailsAdapter = (
	companyDetails: CompanyDetailsExtended
) => ({
	name: companyDetails.name,
	id: companyDetails._id,
	email: companyDetails.email,
	phoneNumber: companyDetails.phoneNumber,
	address: companyDetails.address,
	socialLinks: companyDetails.socialLinks,
});
