import { sanityClient } from "@/api";
import { allUsefulLinks } from "@/app/api/types";
import { getUsefulLinksAdapter } from "@/adapters";
import { UseFulLinkSection } from "@/models";

export const getUsefulLinks = async (): Promise<UseFulLinkSection[] | null> => {
	try {
		const usefulLinks = await sanityClient.fetch(
			allUsefulLinks,
			{},
			{
				next: {
					revalidate: 0,
				},
			}
		);
		const usefulLinksAdapter = usefulLinks.map(getUsefulLinksAdapter);
		return usefulLinksAdapter;
	} catch (error) {
		console.error("Error fetching useful links data:", error);
		return [];
	}
};
