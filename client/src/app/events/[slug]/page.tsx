import { getBlogById } from "@/routes/homepage/services";
import Head from "next/head";

interface BlogPostProps {
	params: {
		slug: string;
	};
}

export default async function BlogPost({ params }: BlogPostProps) {
	const post = await getBlogById(params.slug);

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
					content={`https://themindfulnetwork.com/blog/${post.slug}`}
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
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="robots" content="index, follow" />
			</Head>

			<section>Event Page</section>
		</>
	);
}

export async function generateStaticParams() {}
