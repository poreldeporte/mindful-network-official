import { Typography } from "@/components/ui";
import { CoachingAndSupportImage } from "@/lib/images";
import Image from "next/image";

export const CaregiverCoaching = () => {
	return (
		<section className="page-width py-24 grid lg:grid-cols-2 gap-7">
			<div className="flex flex-col justify-center w-full mb-10">
				<Typography
					as="h2"
					className="font-antic mb-2.5 leading-none"
					color="green"
					variant="h2"
				>
					Caregiver Coaching & Support
				</Typography>

				<Typography
					as="p"
					className="font-bold mb-2.5"
					color="black"
					variant="body"
				>
					Helping you care for a loved one in emotional distress.
				</Typography>

				<Typography
					as="p"
					color="darkGray"
					variant="bodySmall"
					className="mt-10"
				>
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
					<Typography as="span" variant={"bodySmall"} color="white">
						Schedule Your Free Call
					</Typography>
				</a>
			</div>

			<div className="max-h-max overflow-hidden">
				<Image
					src={CoachingAndSupportImage}
					alt="Caregiver Coaching"
					className="w-full h-[400px] lg:h-[650px] object-cover object-center"
				/>
			</div>
		</section>
	);
};
