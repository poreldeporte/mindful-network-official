import { sanityClient } from "@/api";
import { Content, Hero } from "@/routes/blog";
import { getBlogById } from "@/routes/homepage/services";
import Head from "next/head";

interface BlogPostProps {
	params: {
		slug: string;
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

	const schemaData = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.seo?.metaDescription || post.excerpt,
		image: post.featuredImage,
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
				url: "/assets/mindful-logo.png",
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://www.mindfulnetwork.com/blog/${post.slug}`,
		},
	};

	return (
		<>
			<Head>
				<title>{post.seo?.metaTitle || post.title} | Mindful Network</title>
				<meta
					name="description"
					content={post.seo?.metaDescription || post.excerpt}
				/>
				<meta property="og:title" content={post.seo?.metaTitle || post.title} />
				<meta
					property="og:description"
					content={post.seo?.metaDescription || post.excerpt}
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:url"
					content={`https://www.mindfulnetwork.com/blog/${post.slug}`}
				/>
				{post.featuredImage && (
					<meta property="og:image" content={post.featuredImage} />
				)}
				{post.publishDate && (
					<meta property="article:published_time" content={post.publishDate} />
				)}
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:title"
					content={post.seo?.metaTitle || post.title}
				/>
				<meta
					name="twitter:description"
					content={post.seo?.metaDescription || post.excerpt}
				/>
				{post.featuredImage && (
					<meta name="twitter:image" content={post.featuredImage} />
				)}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
			</Head>

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
