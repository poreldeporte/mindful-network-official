import { Typography } from "@/components/ui";
import { MindfulImagotype } from "@/lib/images";
import Image from "next/image";

export const OurMission = () => {
	return (
		<section className="page-width py-10 lg:py-24 grid lg:grid-cols-2 ">
			<div className="flex flex-col justify-center w-full mb-10 lg:mb-0">
				<Typography
					as="h2"
					className="font-antic mb-2.5 leading-none pt-0 lg:pt-10"
					color="green"
					variant="h2"
				>
					Our Mission
				</Typography>

				<Typography
					as="p"
					color="darkGray"
					variant="bodySmall"
					className="mt-5"
				>
					Navigating emotional health challenges—whether your own or a loved
					one&apos;s—can feel overwhelming and isolating. The Mindful Network is
					a living guide for individuals, parents, caregivers, and advocates.
				</Typography>

				<Typography
					as="p"
					color="darkGray"
					variant="bodySmall"
					className="mt-5"
				>
					We connect you with a trusted network of behavioral health services,
					mental health professionals, and additional resources to guide you
					through every step of your journey.
				</Typography>
			</div>

			<div className="max-h-max overflow-hidden">
				<Image
					src={MindfulImagotype}
					alt="The Mindful Network Imagotype"
					className="w-full h-[400px] lg:h-[500px] object-contain object-center"
				/>
			</div>
		</section>
	);
};
