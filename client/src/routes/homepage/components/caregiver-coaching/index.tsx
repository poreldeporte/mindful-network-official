import { Typography, Button } from "@/components/ui";
import { CoachingAndSupportImage } from "@/lib/images";
import Image from "next/image";

export const CaregiverCoaching = () => {
	return (
		<section className="page-width my-10 lg:my-24 grid grid-cols-1 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm lg:grid-cols-2">
			<div className="flex flex-col justify-center p-6 lg:p-10">
				<div className="inline-flex w-max items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
					CAREGIVER SUPPORT
				</div>
				<Typography
					as="h2"
					className="font-antic mt-4 leading-none"
					color="black"
					variant="h2"
				>
					Caregiver Coaching and Guidance
				</Typography>

				<Typography
					as="p"
					className="mt-3 font-semibold"
					color="black"
					variant="bodyXSmall"
				>
					Helping you care for a loved one in emotional distress.
				</Typography>

				<Typography
					as="p"
					color="darkGray"
					variant="bodyXSmall"
					className="mt-4"
				>
					Supporting a loved one through mental health challenges can feel
					overwhelming and isolating. This coaching offers one-on-one
					mentorship, practical tools, and guidance tailored to your role.
				</Typography>
				<Typography
					as="p"
					color="darkGray"
					variant="bodyXSmall"
					className="mt-3"
				>
					Whether you are navigating a new diagnosis, feeling stuck, or just
					need someone who understands the caregiver journey, you are not alone.
				</Typography>

				<a
					href="mailto:contact@themindfulnetwork.com"
					target="_blank"
					className="mt-8 w-max"
					aria-label="Schedule your free caregiver support call"
				>
					<Button form="outline" variant="bodySmall">
						Schedule Your Free Call
					</Button>
				</a>
			</div>
			<div className="overflow-hidden border-t border-blue-100 lg:border-l lg:border-t-0">
				<Image
					src={CoachingAndSupportImage}
					alt="Caregiver coaching"
					className="h-[360px] w-full object-cover object-center lg:h-full"
				/>
			</div>
		</section>
	);
};
