import { Typography } from "@/components/ui";
import { ResourcesContainer } from "./ResourcesContainer";

export function About() {
	return (
		<section
			className="page-width section-y-padding"
			aria-labelledby="about-section-heading"
		>
			<div className="mb-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-slate-50 p-6 lg:mb-10 lg:p-8">
				<div className="inline-flex w-max items-center rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
					HOW WE HELP
				</div>
				<div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-12 xl:items-end">
					<Typography
						className="col-span-7 text-left font-antic"
						color="black"
						as="h2"
						variant="h2"
						id="about-section-heading"
					>
						<span className="text-blue-500">Mental Health Resources</span> to
						build your support network
					</Typography>
					<Typography
						className="col-span-5"
						color="darkGray"
						as="p"
						variant="bodyXSmall"
					>
						Access reliable and reputable care pathways, educational resources,
						and vetted support options in one place.
					</Typography>
				</div>
			</div>

			<ResourcesContainer />
		</section>
	);
}
