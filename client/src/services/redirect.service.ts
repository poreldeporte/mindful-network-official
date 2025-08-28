import { sanityClient } from "@/api";
import { redirectAdapter } from "@/adapters";
import { Redirect, SanityRedirect } from "@/models";

export const redirectService = {
	getAllActiveRedirects: async (): Promise<Redirect[]> => {
		try {
			const query = `
        *[_type == "redirect" && isActive == true] {
          _id,
          from,
          to,
          isActive,
          redirectType,
          description,
          dateCreated,
          lastModified
        } | order(from asc)
      `;

			const sanityRedirects: SanityRedirect[] = await sanityClient.fetch(query);
			return redirectAdapter.fromSanityArray(sanityRedirects);
		} catch (error) {
			console.error("Error fetching active redirects:", error);
			return [];
		}
	},

	getAllRedirects: async (): Promise<Redirect[]> => {
		try {
			const query = `
        *[_type == "redirect"] {
          _id,
          from,
          to,
          isActive,
          redirectType,
          description,
          dateCreated,
          lastModified
        } | order(dateCreated desc)
      `;

			const sanityRedirects: SanityRedirect[] = await sanityClient.fetch(query);
			return redirectAdapter.fromSanityArray(sanityRedirects);
		} catch (error) {
			console.error("Error fetching all redirects:", error);
			return [];
		}
	},

	findRedirectForPath: async (path: string): Promise<Redirect | null> => {
		try {
			const query = `
        *[_type == "redirect" && from == $path && isActive == true][0] {
          _id,
          from,
          to,
          isActive,
          redirectType,
          description,
          dateCreated,
          lastModified
        }
      `;

			const sanityRedirect: SanityRedirect | null = await sanityClient.fetch(
				query,
				{ path }
			);

			if (!sanityRedirect) {
				return null;
			}

			return redirectAdapter.fromSanity(sanityRedirect);
		} catch (error) {
			console.error("Error finding redirect for path:", path, error);
			return null;
		}
	},

	getRedirectMap: async (): Promise<
		Map<string, { to: string; type: "301" | "302" }>
	> => {
		try {
			const redirects = await redirectService.getAllActiveRedirects();
			const redirectMap = new Map<
				string,
				{ to: string; type: "301" | "302" }
			>();

			redirects.forEach((redirect) => {
				redirectMap.set(redirect.from, {
					to: redirect.to,
					type: redirect.redirectType,
				});
			});

			return redirectMap;
		} catch (error) {
			console.error("Error creating redirect map:", error);
			return new Map();
		}
	},
};
