import React from "react";
import { SectionProps } from "../models";
import { Typography } from "@/components/ui";
import Image from "next/image";

export const Hero = ({ post }: SectionProps) => {
	return (
		<section
			className="mx-auto w-full h-max mt-24 lg:mt-56"
			aria-labelledby="hero-heading"
		>
			<div className="mx-auto mb-10 w-11/12 xl:w-3/4 ">
				<Typography
					id="hero-heading"
					className="font-antic mb-2"
					as="h1"
					color="black"
					variant="h1"
				>
					{post.title}
				</Typography>
			</div>

			<div
				className="relative w-full h-full bg-center bg-cover blurred-overlay"
				style={{ backgroundImage: `url(${post.featuredImage})` }}
				aria-hidden="true"
			>
				<Image
					alt={`Featured image for ${post.title}`}
					src={post.featuredImage}
					width={1024}
					height={512}
					className="w-full lg:h-[60vh] object-contain object-top"
					priority
				/>
			</div>
		</section>
	);
};
