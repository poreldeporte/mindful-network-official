import { sanityClient } from "@/api";
import { Eventbrite } from "@/api/Eventbrite";
import { EventbriteKeys } from "@/config/eventbrite.config";
import { generateSlug } from "@/utilities";
import { getAllLandingPageSlugs, isIndexableFindCount } from "@/lib/seo-landing-pages";
import { MetadataRoute } from "next";

export const revalidate = 3600;

const professionalsQuery = `*[_type == 'professionals'] {
	"slug": slug.current,
	_updatedAt
}`;

const blogPostsQuery = `*[_type == 'blog'] {
	"slug": slug.current,
	publishDate,
	_updatedAt
}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://themindfulnetwork.com";
	const currentDate = new Date();

	const staticUrls: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}/`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 1,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: currentDate,
			changeFrequency: "daily",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: currentDate,
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/students`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/students/search`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/support-links`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: `${baseUrl}/events`,
			lastModified: currentDate,
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${baseUrl}/privacy-policy`,
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${baseUrl}/terms-of-service`,
			lastModified: currentDate,
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];

	try {
		const professionals = await sanityClient.fetch(professionalsQuery);
		const professionalUrls: MetadataRoute.Sitemap = professionals.map(
			(professional: any) => ({
				url: `${baseUrl}/professional/${professional.slug}`,
				lastModified: professional._updatedAt
					? new Date(professional._updatedAt)
					: currentDate,
				changeFrequency: "monthly" as const,
				priority: 0.7,
			})
		);

		const blogPosts = await sanityClient.fetch(blogPostsQuery);
		const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post: any) => ({
			url: `${baseUrl}/blog/${post.slug}`,
			lastModified: post.publishDate
				? new Date(post.publishDate)
				: post._updatedAt
					? new Date(post._updatedAt)
					: currentDate,
			changeFrequency: "monthly" as const,
			priority: 0.6,
		}));

		let eventUrls: MetadataRoute.Sitemap = [];

		try {
			const { privateToken, organizationId } = EventbriteKeys;
			const eventbrite = new Eventbrite(privateToken as string);
			const events = await eventbrite.getAllEvents(organizationId as string);

			eventUrls = events.events.map((event: any) => ({
				url: `${baseUrl}/events/${generateSlug(event.name.text)}-${event.id}`,
				lastModified: event.changed ? new Date(event.changed) : currentDate,
				changeFrequency: "weekly" as const,
				priority: 0.7,
			}));
		} catch (error) {
			console.error("Error fetching events from Eventbrite:", error);
		}

		let landingPageUrls: MetadataRoute.Sitemap = [];
		try {
			const landingPages = await getAllLandingPageSlugs();
			// Only advertise pages we mark indexable. Thin cells below
			// MIN_INDEXABLE_PROVIDERS carry robots:noindex (see find/[slug]/page.tsx),
			// so listing them here would just submit noindex URLs to Google.
			landingPageUrls = landingPages
				.filter(({ count }) => isIndexableFindCount(count))
				.map(({ slug }) => ({
					url: `${baseUrl}/find/${slug}`,
					lastModified: currentDate,
					changeFrequency: "weekly" as const,
					priority: 0.8,
				}));
		} catch (error) {
			console.error("Error generating landing page URLs:", error);
		}

		return [...staticUrls, ...professionalUrls, ...blogUrls, ...eventUrls, ...landingPageUrls];
	} catch (error) {
		console.error("Error generating sitemap:", error);

		return staticUrls;
	}
}
