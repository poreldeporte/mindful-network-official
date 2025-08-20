import { Typography } from "@/components/ui";
import { HeroImage } from "@/lib/images";
import Link from "next/link";

export const Hero = () => {
	return (
		<section
			className="pt-10 mx-auto h-[80vh] lg:h-[90vh] flex lg:items-center lg:text-center justify-center flex-col"
			role="region"
			aria-labelledby="hero-heading"
			style={{
				backgroundImage: `url(${HeroImage.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}
		>
			<div className="page-width flex flex-col items-start justify-center">
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
					className="mt-10 py-2 w-max px-4 rounded-full border border-white hover:bg-white hover:text-black transition-colors text-white text-center text-[1.125rem] leading-relaxed"
					aria-label="Start your search for mental health resources"
				>
					Start Search
				</Link>
			</div>
		</section>
	);
};
