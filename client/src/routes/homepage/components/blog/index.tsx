import { Typography } from "@/components/ui";
import { BlogModel } from "@/models/blog.model";
import Image from "next/image";
import Link from "next/link";

interface BlogProps {
	blogPosts: BlogModel[];
}

export const BlogCard = ({
	title,
	category,
	featuredImage,
	slug,
	isInternal,
	externalLink,
}: BlogModel) => {
	return (
		<article className="w-full" aria-labelledby={`blog-title-${slug}`}>
			{isInternal ? (
				<Link href={`/blog/${slug}`} aria-label={`Read more about ${title}`}>
					<Image
						className="w-full aspect-video object-cover mb-4 rounded-xl"
						src={featuredImage}
						width={300}
						height={300}
						alt={`Featured image for ${title}`}
					/>
					<Typography color="darkGray" as="h3" variant="xsmall">
						{category.slug.replaceAll("-", " ").toUpperCase()}
					</Typography>
					<Typography
						className="mb-2 font-semibold"
						color="black"
						as="h2"
						variant="medium"
						id={`blog-title-${slug}`}
					>
						{title}
					</Typography>
				</Link>
			) : (
				<a
					href={externalLink}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Read external article: ${title}`}
				>
					<Image
						className="w-full aspect-video object-cover mb-4 rounded-md"
						src={featuredImage}
						width={300}
						height={300}
						alt={`Featured image for ${title}`}
					/>
					<Typography color="darkGray" as="h3" variant="xsmall">
						{category.slug.replaceAll("-", " ").toUpperCase()}
					</Typography>
					<Typography
						className="mb-2 font-semibold"
						color="black"
						as="h2"
						variant="medium"
						id={`blog-title-${slug}`}
					>
						{title}
					</Typography>
				</a>
			)}
		</article>
	);
};

export const BlogContainer = ({ blogPosts }: BlogProps) => {
	return (
		<section
			className="page-width section-y-padding"
			aria-labelledby="blog-section-heading"
		>
			<Typography
				className="mb-20 font-medium leading-tight"
				color="black"
				as="h2"
				variant="title"
				id="blog-section-heading"
			>
				Expert articles and resources <span className="block"></span>
				<span className="text-green-500">to support your journey</span>
			</Typography>

			<div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-5"
				role="list"
				aria-label="Blog posts list"
			>
				{blogPosts && blogPosts.length
					? blogPosts.map((blogPost) => (
							<BlogCard key={blogPost.slug} {...blogPost} />
						))
					: ""}
			</div>
		</section>
	);
};
