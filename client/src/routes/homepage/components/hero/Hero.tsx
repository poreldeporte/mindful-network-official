"use client";

import { Typography } from "@/components/ui";
import { CompanyDetails } from "@/models";
import Link from "next/link";
import { FallbackBackground } from "./FallbackBackground";
import { MainBackground } from "./MainBackground";
import { useImageLoader } from "@/hooks";

export const Hero = ({
	companyDetails,
}: {
	companyDetails: CompanyDetails;
}) => {
	const { isLoading, isLoaded, hasError } = useImageLoader(
		companyDetails?.heroBackground
	);

	const showImage = isLoaded && !hasError;
	const showFallback = isLoading || hasError;

	return (
		<section
			className="pt-10 mx-auto h-[80vh] lg:h-[90vh] flex lg:items-center lg:text-center justify-center flex-col relative overflow-hidden"
			role="region"
			aria-labelledby="hero-heading"
		>
			{showFallback && (
				<FallbackBackground imageUrl={companyDetails?.heroBackground} />
			)}

			{showImage && <MainBackground imageUrl={companyDetails.heroBackground} />}

			<div className="page-width flex flex-col items-start justify-center relative z-10">
				<Typography
					id="hero-heading"
					className="font-antic mb-5 leading-none text-left"
					as="h1"
					color="white"
					variant="h1"
				>
					A network curated for{" "}
					<span className="text-green-500 lg:block">your path to healing</span>
				</Typography>

				<Typography
					as="p"
					className="lg:w-1/2 text-left text-[1.125rem] leading-relaxed"
					color="white"
					variant="bodySmall"
				>
					Explore our network of trusted mental health resources to find the
					support you need, when you need it.
				</Typography>

				<Link
					href={"/search"}
					className="mt-10 py-2 w-max px-4 rounded-full border border-white hover:bg-white hover:text-black transition-colors text-white text-center text-[1.25rem] leading-tight sm:text-[1.5rem] md:text-[1.75rem] lg:text-[1.875rem] xl:text-[2rem]"
					aria-label="Start your search for mental health resources"
				>
					Start Search
				</Link>
			</div>
		</section>
	);
};
