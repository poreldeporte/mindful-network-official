import React from "react";
import { SectionProps } from "../models";
import { Typography } from "@/components/ui";
import Image from "next/image";

export const Hero = ({ post }: SectionProps) => {
	return (
		<section className="h-max mt-24 lg:mt-56">
			<div className="page-width mb-10">
				<Typography
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
			>
				<Image
					alt={`${post.title} image`}
					src={post.featuredImage}
					width={1024}
					height={1024}
					className="w-full h-screen object-contain object-top"
				/>
			</div>
		</section>
	);
};
