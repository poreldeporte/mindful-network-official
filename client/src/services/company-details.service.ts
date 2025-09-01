import { sanityClient } from "@/api";
import { getCompanyDetailsAdapter } from "@/adapters";
import { CompanyDetails } from "@/models";

export const getCompanyDetails = async (): Promise<CompanyDetails | null> => {
	try {
		const allCompanyDetailsQuery = `*[_type == "companyDetails"][0] {
			_id,
			"heroBackground": {
				"imageUrl": heroBackground.image.asset->url,
				"videoUrl": heroBackground.video.asset->url
			},
			"logo": logo.asset->url,
			"logoAlt": logo.alt,
			email,
			phoneNumber,
			address,
			socialLinks,
			"eventsSection": eventsSection{
				title,
				subtitle
			},
			"blogsSection": blogsSection{
				title,
				subtitle
			}
		}`;

		const companyDetails = await sanityClient.fetch(allCompanyDetailsQuery);

		if (companyDetails?.heroBackground) {
			const { imageUrl, videoUrl } = companyDetails.heroBackground;

			companyDetails.heroBackground = {
				mediaType: imageUrl ? "image" : "video",
				url: imageUrl || videoUrl,
			};
		}

		const companyDetailsAdapter = getCompanyDetailsAdapter(companyDetails);
		return companyDetailsAdapter;
	} catch (error) {
		console.error("Error fetching company details data:", error);
		return null;
	}
};
