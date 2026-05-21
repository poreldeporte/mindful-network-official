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
		];
	},
};

export default nextConfig;
