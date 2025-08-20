import { Typography } from "@/components/ui";

export const OurMission = () => {
	return (
		<section className="page-width py-24 my-10 grid place-items-center min-h-[80vh]">
			<div className="flex flex-col items-center justify-center">
				<Typography
					as="h2"
					className="font-antic mb-5 leading-none"
					color="green"
					variant="h2"
				>
					Our Mission
				</Typography>

				<Typography
					as="p"
					className="mb-5 text-center"
					color="darkGray"
					variant="body"
				>
					Navigating emotional health challenges—whether your own or a loved
					one&apos;s—can feel overwhelming and isolating. The Mindful Network is
					a living guide for individuals, parents, caregivers, and advocates.
				</Typography>
				<Typography
					as="p"
					className="mb-5 text-center"
					color="darkGray"
					variant="body"
				>
					We connect you with a trusted network of behavioral health services,
					mental health professionals, and additional resources to guide you
					through every step of your journey.
				</Typography>
			</div>
		</section>
	);
};
