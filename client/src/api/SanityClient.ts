import { createClient } from "@sanity/client";
import { sanityConfig } from "@/config";

export const sanityClient = createClient({
  projectId: sanityConfig.projectId || "",
  dataset: sanityConfig.dataset || "production",
  apiVersion: "2024-09-16",
  useCdn: true,
  ignoreBrowserTokenWarning: true,
  token: sanityConfig.token || "",
});
