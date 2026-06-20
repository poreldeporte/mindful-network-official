import { createClient } from "@sanity/client";
import { sanityConfig } from "@/config";
import imageUrlBuilder from "@sanity/image-url";

// Public read-only client. The frontend only reads published content from a
// public-read dataset, so we use the API CDN (apicdn.sanity.io) and send no
// token. A token would force every request onto the metered live API
// (api.sanity.io) and bypass the CDN — which is what was burning through the
// project's monthly API-request quota.
export const sanityClient = createClient({
	projectId: sanityConfig.projectId || "",
	dataset: sanityConfig.dataset || "production",
	apiVersion: "2024-09-16",
	useCdn: true,
	ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: string) {
	return builder.image(source);
}
