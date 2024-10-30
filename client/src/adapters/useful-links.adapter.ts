import { UseFulLink } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface useFulLinksExtended extends SanityDocument, UseFulLink {}

export const getUsefulLinksAdapter = (useFulLinks: useFulLinksExtended) => ({
	sectionTitle: useFulLinks.title,
	links: useFulLinks.links,
});
