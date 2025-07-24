import { Typography } from "@/components/ui";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ResourcesContainer } from "./ResourcesContainer";

export function About() {
	return (
		<section
			className="page-width section-y-padding flex flex-col xl:items-center gap-10"
			aria-labelledby="about-section-heading"
		>
			<div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-end">
				<Typography
					className="mb-2 col-span-7"
					color="black"
					as="h2"
					variant="title"
					id="about-section-heading"
				>
					<span className="text-green-500">Mental Health Resources</span>{" "}
					<span className="block" />
					to build your support network
				</Typography>
				<Typography
					className="mb-4 col-span-5"
					color="black"
					as="h3"
					variant="medium"
				>
					Access to reliable & reputable mental health care and emotional health
					resources.
				</Typography>
			</div>

			<ResourcesContainer />

			<Link
				href={"/about"}
				className="lg:mt-4 py-2 w-max px-6 rounded-full bg-green-500 hover:bg-green-700 transition-colors text-white text-center"
				aria-label="Start your search for mental health resources"
			>
				<Typography
					className="flex items-center gap-2"
					as="span"
					variant={"medium"}
					color="white"
				>
					See Why This Means So Much To Us{" "}
					<ArrowLongRightIcon className="h-7 w-7" />
				</Typography>
			</Link>
		</section>
	);
}
