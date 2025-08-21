import { Typography } from "@/components/ui";
import { ResourcesContainer } from "./ResourcesContainer";

export function About() {
	return (
		<section
			className="page-width section-y-padding flex flex-col xl:items-center"
			aria-labelledby="about-section-heading"
		>
			<div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-end">
				<Typography
					className="mb-2 col-span-7 text-left font-antic"
					color="black"
					as="h2"
					variant="h2"
					id="about-section-heading"
				>
					<span className="text-blue-500">Mental Health Resources</span>{" "}
					<span className="block" />
					to build your support network
				</Typography>
				<Typography
					className="mb-4 col-span-5"
					color="black"
					as="h3"
					variant="bodySmall"
				>
					Access to reliable & reputable mental health care and emotional health
					resources.
				</Typography>
			</div>

			<ResourcesContainer />
		</section>
	);
}
