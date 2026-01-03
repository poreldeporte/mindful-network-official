import { sanityClient } from "@/api";
import { Content, Hero } from "@/routes/blog";
import { getBlogById } from "@/routes/homepage/services";
import type { Metadata } from "next";

interface BlogPostProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({
	params,
}: BlogPostProps): Promise<Metadata> {
	const post = await getBlogById(params.slug);

	if (!post) {
		return {
			title: "Blog Post Not Found",
			description: "The requested blog post is not available.",
			robots: {
				index: false,
				follow: false,
			},
		};
	}

	const title = post.seo?.metaTitle || post.title;
	const description = post.seo?.metaDescription || post.excerpt;
	const url = `https://themindfulnetwork.com/blog/${params.slug}`;
	const ogImage = post.seo?.openGraphImage || post.featuredImage;
	const ogImageAlt =
		post.seo?.openGraphImageAlt || post.featuredImageAlt || title;

	return {
		title,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title,
			description,
			type: "article",
			url,
			publishedTime: post.publishDate,
			images: ogImage
				? [
						{
							url: ogImage,
							alt: ogImageAlt,
						},
				  ]
				: undefined,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: ogImage ? [ogImage] : undefined,
		},
	};
}

export default async function BlogPost({ params }: BlogPostProps) {
	const post = await getBlogById(params.slug);
	if (!post) {
		return (
			<main>
				<div>Post not found</div>
			</main>
		);
	}

	const ogImage = post.seo?.openGraphImage || post.featuredImage;

	const schemaData = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.seo?.metaDescription || post.excerpt,
		image: ogImage,
		author: {
			"@type": "Person",
			name: post.author,
		},
		datePublished: post.publishDate,
		publisher: {
			"@type": "Organization",
			name: "Mindful Network",
			logo: {
				"@type": "ImageObject",
				url: "https://themindfulnetwork.com/images/logo.webp",
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://themindfulnetwork.com/blog/${params.slug}`,
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
			/>
			<Hero post={post} />
			<Content post={post} />
		</>
	);
}

export async function generateStaticParams() {
	const query = `*[_type == "blog"]{ slug }`;
	const posts = await sanityClient.fetch(query);

	return posts.map((post: { slug: { current: string } }) => ({
		slug: post.slug.current,
	}));
}
