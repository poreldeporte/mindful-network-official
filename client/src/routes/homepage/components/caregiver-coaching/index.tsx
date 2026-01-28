import { Typography, Button } from "@/components/ui";
import { CoachingAndSupportImage } from "@/lib/images";
import Image from "next/image";

export const CaregiverCoaching = () => {
	return (
		<section className="page-width my-10 lg:my-24 grid lg:grid-cols-2 border border-blue-500 lg:max-h-[700px] overflow-hidden">
			<div className="flex flex-col justify-center w-full mb-10 lg:mb-0 p-10">
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
					className="font-bold mb-2.5 font-antic"
					color="black"
					variant="body"
				>
					Helping you care for a loved one in emotional distress.
				</Typography>

				<Typography
					as="p"
					color="darkGray"
					variant="bodySmall"
					className="mt-5"
				>
					Supporting a loved one through mental health challenges can feel
					overwhelming and isolating. This coaching is for caregivers, offering
					one-on-one mentorship, practical tools, and guidance tailored to your
					role. Whether you&apos;re navigating a new diagnosis, feeling stuck, or
					just need someone who understands the caregiver journey—you&apos;re not
					alone. Schedule a free call to learn more and see how we can support
					you.
				</Typography>
				<a
					href="mailto:contact@themindfulnetwork.com"
					target="_blank"
					className="mt-10 w-max"
					aria-label="Start your search for mental health resources"
				>
					<Button form="outline" variant="bodySmall">
						Schedule Your Free Call
					</Button>
				</a>
			</div>
			<div className="max-h-[700px] overflow-hidden border-t md:border-t-0  md:border-l border-blue-500">
				<Image
					src={CoachingAndSupportImage}
					alt="Caregiver Coaching"
					className="w-full h-full object-cover object-center"
				/>
			</div>
		</section>
	);
};
