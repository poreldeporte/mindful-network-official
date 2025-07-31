"use client";

import { Typography } from "@/components/ui";
import { BlogModel } from "@/models/blog.model";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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
			<motion.div variants={imageVariants} className="w-full overflow-hidden">
				<Image
					className="w-full aspect-video object-cover mb-4 transition-transform hover:scale-105 duration-300"
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
			aria-labelledby={`blog-card-${slug}`}
			draggable={true}
			aria-grabbed="true"
			id={`blog-card-${slug}`}
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

export const BlogContainer = ({ blogPosts }: BlogProps) => {
	return (
		<section
			className="pl-5 pr-5 xl:pl-[70px] 3xl:pl-[140px] section-y-padding"
			aria-labelledby="blog-section-heading"
			role="region"
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

			<div className="flex flex-col gap-5">
				<div className="flex gap-2 justify-end pr-5 xl:pr-[70px] 3xl:pr-[140px]">
					<button
						type="button"
						className="blog-swiper-prev group p-4 transition-all rounded-full border border-green-400 bg-transparent hover:bg-green-600 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
						aria-label="Previous blogs"
					>
						<ArrowLeft className="text-black group-hover:text-white" />
					</button>
					<button
						type="button"
						className="blog-swiper-next group p-4 transition-all rounded-full border border-green-400 bg-transparent hover:bg-green-600 hover:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
						aria-label="Next blogs"
					>
						<ArrowRight className="text-black group-hover:text-white" />
					</button>
				</div>
				<Swiper
					modules={[Navigation, A11y, Keyboard]}
					slidesPerView={1}
					spaceBetween={20}
					navigation={{
						nextEl: ".blog-swiper-next",
						prevEl: ".blog-swiper-prev",
					}}
					keyboard={{ enabled: true }}
					breakpoints={{
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
						1280: { slidesPerView: 4 },
					}}
					aria-live="polite"
					className="w-full"
				>
					{blogPosts.map((blogPost, index) => (
						<SwiperSlide
							key={blogPost.slug}
							role="option"
							aria-label={`Blog post ${index + 1} of ${blogPosts.length}`}
							className="max-h-96"
						>
							<BlogCard {...blogPost} index={index} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};
