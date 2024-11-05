/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["plus.unsplash.com", "images.unsplash.com", "cdn.sanity.io"],
		unoptimized: true,
	},
	cache: false,
};

export default nextConfig;
