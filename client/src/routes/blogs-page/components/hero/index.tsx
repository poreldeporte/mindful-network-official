import React from "react";
import { BlogsHeroImage } from "@/lib/images";
import Image from "next/image";
import { Typography } from "@/components/ui";

export const BlogsHero = () => {
	return (
		<section className="h-[60vh] flex items-center justify-center p-2 relative">
			<Image
				src={BlogsHeroImage}
				alt="blogs-hero-image"
				className="w-[calc(100%-8px)] h-full object-cover object-center rounded-xl absolute left-1/2 -translate-x-1/2"
			/>
			<div className="flex flex-col z-10">
				<Typography className="" color="white" as="h2" variant="large">
					Explorer the wonders of mental health
				</Typography>
			</div>
		</section>
	);
};
