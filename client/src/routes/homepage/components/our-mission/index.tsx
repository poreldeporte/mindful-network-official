import { Typography } from "@/components/ui";
import { OurMissionImage } from "@/lib/images";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const OurMission = () => {
	return (
		<section className="page-width my-10 lg:my-24 grid grid-cols-1 overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm lg:grid-cols-2">
			<div className="h-[380px] overflow-hidden border-b border-blue-100 lg:h-[560px] lg:border-b-0 lg:border-r">
				<Image
					src={OurMissionImage}
					alt="The Mindful Network mission"
					className="h-full w-full object-cover object-center"
				/>
			</div>
			<div className="flex flex-col justify-center w-full p-6 lg:p-10">
				<div className="inline-flex w-max items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
					OUR MISSION
				</div>
				<Typography
					as="h2"
					className="font-antic mt-4 leading-none"
					color="black"
					variant="h2"
				>
					Building better pathways to mental wellness
				</Typography>

				<Typography
					as="p"
					color="darkGray"
					variant="bodyXSmall"
					className="mt-4"
				>
					Navigating emotional health challenges can feel overwhelming and
					isolating. The Mindful Network is a living guide for individuals,
					parents, caregivers, and advocates.
				</Typography>

				<Typography
					as="p"
					color="darkGray"
					variant="bodyXSmall"
					className="mt-3"
				>
					We connect you with trusted behavioral health services, qualified
					professionals, and practical resources to support progress at every
					step.
				</Typography>

				<Link
					className="mt-5 inline-flex items-center gap-2 text-blue-600 underline underline-offset-4"
					href="/about"
				>
					Learn more <ArrowLongRightIcon className="w-4 h-4" />
				</Link>
			</div>
		</section>
	);
};
