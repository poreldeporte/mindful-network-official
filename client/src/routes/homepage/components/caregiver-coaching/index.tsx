import { Typography, Button } from "@/components/ui";
import { CoachingAndSupportImage } from "@/lib/images";
import Image from "next/image";

export const CaregiverCoaching = () => {
	return (
		<section className="page-width my-10 lg:my-24 grid lg:grid-cols-2 gap-7 border border-blue-500">
			<div className="flex flex-col justify-center w-full mb-10 lg:mb-0 p-5">
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
					aria-label="Start your search for mental health resources"
				>
					<Button form="outline" variant="bodySmall" className="mt-10">
						Schedule Your Free Call
					</Button>
				</a>
			</div>

			<div className="h-[600px] overflow-hidden border-l border-blue-500">
				<Image
					src={CoachingAndSupportImage}
					alt="Caregiver Coaching"
					className="w-full h-[400px] lg:h-[650px] object-cover object-center"
				/>
			</div>
		</section>
	);
};
