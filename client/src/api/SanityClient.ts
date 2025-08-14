import { createClient } from "@sanity/client";
import { sanityConfig } from "@/config";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
	projectId: sanityConfig.projectId || "",
	dataset: sanityConfig.dataset || "production",
	apiVersion: "2024-09-16",
	useCdn: false,
	ignoreBrowserTokenWarning: true,
	token: sanityConfig.token || "",
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: string) {
	return builder.image(source);
}
