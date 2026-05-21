/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"plus.unsplash.com",
			"images.unsplash.com",
			"cdn.sanity.io",
			"img.evbuc.com",
			"cdn.evbuc.com",
		],
	},
	async redirects() {
		return [
			// Old provider slugs that previously earned search-engine impressions but
			// now 404. Three of them are stale because Sanity's slug generator changed
			// how it handles accented characters; the other two have no current Sanity
			// match and fall back to the directory search.
			{
				source: "/professional/esther-joseph-magana",
				destination: "/professional/esther-joseph-maga-a",
				permanent: true,
			},
			{
				source: "/professional/gabrielle-pinon",
				destination: "/professional/gabrielle-pi-on",
				permanent: true,
			},
			{
				source: "/professional/laura-testiler",
				destination: "/professional/laura-testiler-psyd-pmh-c",
				permanent: true,
			},
			{
				source: "/professional/laura-yassky",
				destination: "/search",
				permanent: true,
			},
			{
				source: "/professional/rosmary-ros-demarize",
				destination: "/search",
				permanent: true,
			},
			// Non-clinical orgs removed from Sanity 2026-05-21 (foundations / funding
			// bodies, not treatment providers). Redirect to the statewide telehealth
			// page so users with bookmarks land on accessible mental health care
			// instead of a 404.
			{
				source: "/professional/kevin-love-fund",
				destination: "/find/online-therapy-florida",
				permanent: true,
			},
			{
				source: "/professional/james-henry-mccann-iv-foundation",
				destination: "/find/online-therapy-florida",
				permanent: true,
			},
			// Acadia Healthcare removed from Sanity 2026-05-21 — corporate parent of
			// 250+ facilities across 39 states, not a clinical entity Florida users
			// can visit. Redirect to /search so they can find a real provider.
			{
				source: "/professional/acadia-healthcare",
				destination: "/search",
				permanent: true,
			},
			// Instagram link-in-bio tracking URLs. The bio link goes to a Later page,
			// which then sends clicks here; we never see "instagram.com" as the GA4
			// referrer otherwise. Use 307 (temporary) — these are functional tracking
			// redirects, not content moves. robots.txt also disallows /ig* so Google
			// doesn't try to index the source URLs.
			{
				source: "/ig",
				destination: "/search?utm_source=instagram&utm_medium=bio&utm_campaign=link_in_bio",
				permanent: false,
			},
			{
				source: "/ig/blog",
				destination: "/blog?utm_source=instagram&utm_medium=bio&utm_campaign=link_in_bio_blog",
				permanent: false,
			},
			{
				source: "/ig/events",
				destination: "/events?utm_source=instagram&utm_medium=bio&utm_campaign=link_in_bio_events",
				permanent: false,
			},
		];
	},
};

export default nextConfig;
