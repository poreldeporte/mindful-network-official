import { Typography } from "@/components/ui";
import { BlogModel } from "@/models/blog.model";
import Image from "next/image";
import Link from "next/link";

interface BlogProps {
	blogPosts: BlogModel[];
}

const BlogCard = ({ title, category, featuredImage, slug }: BlogModel) => (
	<article className="w-full">
		<Link href={`/blog/${slug}`}>
			<Image
				className="w-full aspect-video object-cover mb-4 rounded-md"
				src={featuredImage}
				width={300}
				height={300}
				alt={`${title} image`}
			/>
			<Typography color="darkGray" as="h3" variant="small">
				{category}
			</Typography>
			<Typography
				className="mb-2 font-semibold"
				color="black"
				as="h2"
				variant="medium"
			>
				{title}
			</Typography>
		</Link>
	</article>
);

export const BlogContainer = ({ blogPosts }: BlogProps) => {
	return (
		<section className="page-width section-y-padding">
			<Typography
				className="mb-20 font-medium leading-tight"
				color="black"
				as="h2"
				variant="title"
			>
				Expert articles and resources <span className="block"></span>to
				<span className="text-green-300"> support your journey</span>
			</Typography>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-5">
				{blogPosts && blogPosts.length
					? blogPosts.map((blogPost) => (
							<BlogCard key={blogPost.slug} {...blogPost} />
						))
					: ""}
			</div>
		</section>
	);
};
