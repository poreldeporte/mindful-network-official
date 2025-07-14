import { Typography } from "@/components/ui";

export const CaregiverCoaching = () => {
	return (
		<section className="page-width py-24 lg:mx-auto lg:w-2/3 min-h-[60vh] lg:h-[63vh-92px] lg:mt-[62px] mt-10 flex lg:items-center lg:text-center justify-center flex-col">
			<div className="flex flex-col items-center justify-center w-full mb-10">
				<Typography
					as="h2"
					className="font-antic mb-5 leading-none"
					color="black"
					variant="title"
				>
					Caregiver Coaching & Support
				</Typography>

				<Typography
					as="h3"
					className="font-antic mb-5 leading-none"
					color="green"
					variant="large"
				>
					MENTAL HEALTH SERVICES
				</Typography>
			</div>

			<Typography
				as="p"
				className="font-bold mb-2.5"
				color="black"
				variant="medium"
			>
				Helping you care for a loved one in emotional distress.
			</Typography>

			<Typography as="p" color="darkGray" variant="medium">
				Caring for someone with mental health challenges can feel overwhelming
				and isolating. Our coaching service is here to support you with
				one-on-one mentorship, practical tools, and guidance tailored to your
				unique situation. Whether you're navigating a new diagnosis, feeling
				stuck, or simply need someone to talk to who understands—you're not
				alone. Schedule a free call to learn more and see how we can support
				you.
			</Typography>

			<a
				href="mailto:contact@themindfulnetwork.com"
				target="_blank"
				className="mt-10 py-2 w-max px-4 rounded-full bg-green-500 hover:bg-green-700 transition-colors text-white text-center"
				aria-label="Start your search for mental health resources"
			>
				<Typography as="span" variant={"small"} color="white">
					Schedule Your Free Call
				</Typography>
			</a>
		</section>
	);
};
