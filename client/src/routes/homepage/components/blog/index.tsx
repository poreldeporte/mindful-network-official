"use client";

import { Typography } from "@/components/ui";
import { BlogModel } from "@/models/blog.model";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export const BlogCard = ({
	title,
	category,
	featuredImage,
	slug,
	isInternal,
	externalLink,
	index = 0,
}: BlogModel & { index?: number }) => {
	const cardVariants: Variants = {
		offscreen: {
			y: 50,
			opacity: 0,
		},
		onscreen: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.3,
				duration: 0.8,
				delay: 0.05 * index,
			},
		},
	};

	const imageVariants: Variants = {
		offscreen: {
			scale: 0.9,
			opacity: 0.8,
		},
		onscreen: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				bounce: 0.3,
				duration: 0.6,
				delay: 0.05 * index + 0.1,
			},
		},
	};

	const content = (
		<>
			<motion.div
				variants={imageVariants}
				className="w-full overflow-hidden rounded-xl"
			>
				<Image
					className="w-full aspect-video object-cover mb-4 rounded-xl transition-transform hover:scale-105 duration-300"
					src={featuredImage}
					width={300}
					height={300}
					alt={`Featured image for ${title}`}
				/>
			</motion.div>
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
		</>
	);

	return (
		<motion.article
			initial="offscreen"
			whileInView="onscreen"
			viewport={{ once: true, amount: 0.3 }}
			variants={cardVariants}
			className="w-full"
			aria-labelledby={`blog-title-${slug}`}
		>
			{isInternal ? (
				<Link href={`/blog/${slug}`} aria-label={`Read more about ${title}`}>
					{content}
				</Link>
			) : (
				<a
					href={externalLink}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Read external article: ${title}`}
				>
					{content}
				</a>
			)}
		</motion.article>
	);
};
