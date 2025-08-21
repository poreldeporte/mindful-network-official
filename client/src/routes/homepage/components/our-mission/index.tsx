import { Typography } from "@/components/ui";
import { OurMissionImage } from "@/lib/images";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const OurMission = () => {
	return (
		<section className="page-width my-10 lg:my-24 grid lg:grid-cols-2 border border-blue-500">
			<div className="h-[600px] overflow-hidden border-r border-blue-500">
				<Image
					src={OurMissionImage}
					alt="The Mindful Network Our Mission"
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<div className="flex flex-col justify-center w-full mb-10 lg:mb-0 p-5">
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

				<Link
					className="text-blue-500 underline underline-offset-4 flex items-center gap-2 mt-5"
					href="/about"
				>
					Learn more <ArrowLongRightIcon className="w-4 h-4" />
				</Link>
			</div>
		</section>
	);
};
