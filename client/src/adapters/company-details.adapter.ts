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
	heroBackground: {
		mediaType: companyDetails.heroBackground.mediaType,
		url: companyDetails.heroBackground.url,
	},
	email: companyDetails.email,
	phoneNumber: companyDetails.phoneNumber,
	address: companyDetails.address,
	eventsSection: {
		title: companyDetails.eventsSection.title,
		subtitle: companyDetails.eventsSection.subtitle,
	},
	blogsSection: {
		title: companyDetails.blogsSection.title,
		subtitle: companyDetails.blogsSection.subtitle,
	},
	socialLinks: companyDetails.socialLinks,
});
