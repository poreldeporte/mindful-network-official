import React from "react";
import { SectionProps } from "../models";
import { Typography } from "@/components/ui";
import Image from "next/image";

export const Hero = ({ post }: SectionProps) => {
	return (
		<section className="h-max mt-24 lg:mt-56" aria-labelledby="hero-heading">
			<div className="page-width mb-10">
				<Typography
					id="hero-heading"
					className="font-antic mb-2"
					as="h1"
					color="black"
					variant="title"
				>
					{post.title}
				</Typography>
			</div>

			<div
				className="bg-center bg-cover blurred-overlay"
				style={{ backgroundImage: `url(${post.featuredImage})` }}
				aria-hidden="true"
			>
				<Image
					alt={`Featured image for ${post.title}`}
					src={post.featuredImage}
					width={1024}
					height={1024}
					className="w-full h-screen object-contain object-top"
					priority
				/>
			</div>
		</section>
	);
};
