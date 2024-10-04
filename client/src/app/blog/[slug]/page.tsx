import { sanityClient } from "@/api";
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
		return <div>Post not found</div>;
	}

	return (
		<>
			<Head>
				<title>{post.seo?.metaTitle || post.title}</title>
				<meta
					name="description"
					content={post.seo?.metaDescription || post.excerpt}
				/>
				<meta property="og:title" content={post.seo?.metaTitle || post.title} />
				<meta
					property="og:description"
					content={post.seo?.metaDescription || post.excerpt}
				/>
				{post.featuredImage && (
					<meta property="og:image" content={post.featuredImage} />
				)}
			</Head>

			<article>
				<h1>{post.title}</h1>
				<div>{post.body}</div>
			</article>
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
