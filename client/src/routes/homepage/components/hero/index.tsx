import { Typography } from "@/components/ui";
import { HeroImage } from "@/lib/images";
import Link from "next/link";

export const Hero = () => {
	return (
		<section
			className="page-width pt-10 mx-auto min-h-[90vh] flex lg:items-center lg:text-center justify-center flex-col"
			role="region"
			aria-labelledby="hero-heading"
			style={{
				backgroundImage: `url(${HeroImage.src})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
			}}
		>
			<Typography
				id="hero-heading"
				className="font-antic mb-5 leading-none"
				as="h1"
				color="black"
				variant="title"
			>
				A network curated for{" "}
				<span className="text-green-500 lg:block">your path to healing</span>
			</Typography>

			<Typography as="p" className="lg:w-1/2" color="darkGray" variant="medium">
				Explore our network of trusted mental health resources to find the
				support you need, when you need it.
			</Typography>

			<Link
				href={"/search"}
				className="mt-4 py-2 w-max px-4 rounded-full bg-green-500 hover:bg-green-700 transition-colors text-white text-center"
				aria-label="Start your search for mental health resources"
			>
				<Typography as="span" variant={"small"} color="white">
					Start Search
				</Typography>
			</Link>
		</section>
	);
};
