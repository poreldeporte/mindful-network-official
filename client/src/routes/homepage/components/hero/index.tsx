import { Typography } from "@/components/ui";
import Link from "next/link";

export const Hero = () => {
	return (
		<section
			className="page-width py-92 lg:mx-auto lg:w-2/3 h-[60vh] lg:h-[63vh-92px] lg:mt-[62px] xs:mt-10 flex lg:items-center lg:text-center justify-center flex-col"
			role="region"
			aria-labelledby="hero-heading"
		>
			<Typography
				id="hero-heading"
				className="font-antic mb-2"
				as="h1"
				color="black"
				variant="title"
			>
				A network curated for your{" "}
				<span className="text-green-300">path to healing</span>
			</Typography>

			<Typography as="p" className="w-11/12" color="darkGray" variant="medium">
				Explore our mindfully curated network of trusted mental health resources
				to find the support you need, when you need it.
			</Typography>

			<Link
				href={"/search"}
				className="mt-4 py-2 w-max px-4 rounded-full bg-blue-500 hover:bg-blue-700 transition-colors text-white text-center"
				aria-label="Start your search for mental health resources"
			>
				<Typography as="span" variant={"small"} color="white">
					Start Search
				</Typography>
			</Link>
		</section>
	);
};
