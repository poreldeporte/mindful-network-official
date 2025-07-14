import { Typography } from "@/components/ui";

export const OurMission = () => {
	return (
		<section className="page-width py-24 lg:mx-auto lg:w-2/3 min-h-[60vh] lg:h-[63vh-92px] lg:mt-[62px] mt-10 flex lg:items-center lg:text-center justify-center flex-col">
			<Typography
				as="h2"
				className="font-antic mb-5 leading-none"
				color="green"
				variant="title"
			>
				Our Mission
			</Typography>

			<Typography as="p" className="mb-5" color="darkGray" variant="medium">
				Navigating emotional health challenges—whether your own or a loved
				one&apos;s—can feel overwhelming and isolating. The Mindful Network is a
				living guide for individuals, parents, caregivers, and advocates.
				<br />
				<br />
				We connect you with a trusted network of behavioral health services,
				mental health professionals, and additional resources to guide you
				through every step of your journey.
			</Typography>
		</section>
	);
};
