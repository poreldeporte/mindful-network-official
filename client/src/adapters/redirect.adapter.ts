import { Redirect, SanityRedirect } from "@/models";

export const redirectAdapter = {
	fromSanity: (sanityRedirect: SanityRedirect): Redirect => {
		return {
			_id: sanityRedirect._id,
			from: sanityRedirect.from,
			to: sanityRedirect.to,
			isActive: sanityRedirect.isActive ?? true,
			redirectType: sanityRedirect.redirectType || "301",
			description: sanityRedirect.description,
			dateCreated: sanityRedirect.dateCreated,
			lastModified: sanityRedirect.lastModified,
		};
	},

	fromSanityArray: (sanityRedirects: SanityRedirect[]): Redirect[] => {
		return sanityRedirects.map(redirectAdapter.fromSanity);
	},
};
