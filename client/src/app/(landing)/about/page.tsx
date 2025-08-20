import { CoachingAndSupportImage } from "@/lib/images";

import Image from "next/image";
import { Typography } from "@/components/ui";

export default function About() {
	return (
		<section
			className="grid grid-cols-1 lg:grid-cols-12 lg:items-center page-width gap-10 mt-24 lg:mt-36 py-10"
			role="region"
			aria-labelledby="about-hero-heading"
		>
			<div className="lg:col-span-8 flex flex-col gap-5 order-1 lg:order-2">
				<Typography
					id="about-hero-heading"
					className="font-antic"
					as="h1"
					color="black"
					variant="h1"
				>
					Why We <span className="text-green-500">Rise</span>
				</Typography>
				<Typography
					id="about-hero-text"
					as="p"
					color="darkGray"
					variant="bodySmall"
				>
					As a Family Mentor, Certified Recovery Peer Specialist, and Mental
					Health Advocate, I&apos;ve partnered with a dedicated team of
					professionals to make mental health resources easy and accessible.
					Through The Mindful Network, we&apos;re not just building a
					community—we&apos;re smashing the stigma around mental health and
					providing people with the tools to thrive. Together, we&apos;re ending
					the silence and lifting each other up on the journey to wellness.
				</Typography>
			</div>

			<div className="flex h-full w-full col-span-1 lg:col-span-4 order-2 lg:order-1">
				<Image
					src={CoachingAndSupportImage}
					alt="Professional at Mindful Network"
					className="w-full sm:w-1/2 lg:w-full h-full object-cover object-top"
					priority
				/>
			</div>
		</section>
	);
}
