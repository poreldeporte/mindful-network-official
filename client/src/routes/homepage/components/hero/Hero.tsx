"use client";

import { Typography, Button } from "@/components/ui";
import { CompanyDetails } from "@/models";
import Link from "next/link";
import { FallbackBackground } from "./FallbackBackground";
import { ImageBackground } from "./MainBackground";
import { VideoBackground } from "./VideoBackground";
import { useMediaLoader } from "@/hooks";

export const Hero = ({
	companyDetails,
}: {
	companyDetails: CompanyDetails;
}) => {
	const { isLoading, isLoaded, hasError } = useMediaLoader(
		companyDetails?.heroBackground
	);

	const showMedia = isLoaded && !hasError;
	const showFallback = isLoading || hasError;
	const isVideo = companyDetails?.heroBackground?.mediaType === "video";

	return (
		<section
			className="pt-10 mx-auto h-[80vh] lg:h-[90vh] flex lg:items-center lg:text-center justify-center flex-col relative overflow-hidden"
			role="region"
			aria-labelledby="hero-heading"
		>
			{showFallback && (
				<FallbackBackground heroBackground={companyDetails?.heroBackground} />
			)}

			{showMedia && isVideo && (
				<VideoBackground videoUrl={companyDetails.heroBackground.url} />
			)}

			{showMedia && !isVideo && (
				<ImageBackground imageUrl={companyDetails.heroBackground.url} />
			)}

			<div className="page-width flex flex-col items-start justify-center relative z-10">
				<Typography
					id="hero-heading"
					className="font-antic mb-5 leading-none text-left"
					as="h1"
					color="white"
					variant="h1"
				>
					A network curated for{" "}
					<span className="lg:block">your path to healing</span>
				</Typography>

				<Typography
					as="p"
					className="lg:w-3/4 text-left text-[1.125rem] leading-relaxed"
					color="white"
					variant="body"
				>
					Explore our network of trusted mental health resources to find the
					support you need, when you need it.
				</Typography>

				<Link
					href={"/search"}
					aria-label="Start your search for mental health resources"
				>
					<Button form="outline-white" variant="body" className="mt-10">
						Start Search
					</Button>
				</Link>
			</div>
		</section>
	);
};
