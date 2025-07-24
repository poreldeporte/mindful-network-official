import { Typography } from "@/components/ui";
import { MindfulIsotype } from "@/lib/images";
import Image from "next/image";

export const OurMission = () => {
	return (
		<section className="page-width py-24 my-10 grid lg:grid-cols-12 gap-10">
			<picture className="col-span-4">
				<Image
					src={MindfulIsotype}
					alt="Mindful Isotype"
					className="w-full h-full object-cover"
				/>
			</picture>

			<div className="col-span-8">
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
					one&apos;s—can feel overwhelming and isolating. The Mindful Network is
					a living guide for individuals, parents, caregivers, and advocates.
					<br />
					<br />
					We connect you with a trusted network of behavioral health services,
					mental health professionals, and additional resources to guide you
					through every step of your journey.
				</Typography>
			</div>
		</section>
	);
};
