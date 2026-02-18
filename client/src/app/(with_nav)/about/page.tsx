import { Typography } from "@/components/ui";
import { CoachingAndSupportImage } from "@/lib/images";
import {
	LightBulbIcon,
	MapIcon,
	UserGroupIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const approachCards = [
	{
		title: "Clarity Over Confusion",
		description:
			"We simplify a complex mental health landscape so families can move from stress to clear next steps.",
		Icon: LightBulbIcon,
	},
	{
		title: "People-First Curation",
		description:
			"Every resource is selected with caregivers, advocates, and lived experience at the center of the process.",
		Icon: UserGroupIcon,
	},
	{
		title: "Actionable Pathways",
		description:
			"From first search to ongoing support, our goal is to help you find meaningful care options faster.",
		Icon: MapIcon,
	},
];

export default function About() {
	return (
		<main
			className="min-h-screen w-full bg-slate-50"
			aria-labelledby="about-page-heading"
		>
			<section className="relative overflow-hidden pt-24 pb-14 lg:pt-32 lg:pb-16">
				<div
					className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-slate-50"
					aria-hidden
				/>
				<div
					className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-blue-200/45 blur-3xl"
					aria-hidden
				/>

				<div className="page-width relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
					<div className="flex flex-col gap-5 lg:col-span-7">
						<div className="inline-flex w-max items-center rounded-full border border-blue-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600">
							ABOUT THE MINDFUL NETWORK
						</div>

						<Typography
							id="about-page-heading"
							className="font-antic leading-none"
							as="h1"
							color="black"
							variant="h1"
						>
							Why We <span className="text-blue-500">Rise</span>
						</Typography>

						<Typography as="p" color="darkGray" variant="bodySmall">
							As a Family Mentor, Certified Recovery Peer Specialist, and Mental
							Health Advocate, I&apos;ve partnered with a dedicated team of
							professionals to make mental health resources easier to navigate
							and more accessible for families.
						</Typography>
						<Typography as="p" color="darkGray" variant="bodySmall">
							The Mindful Network was built to reduce overwhelm and connect
							parents, caregivers, and advocates with practical pathways to
							support their loved ones with confidence.
						</Typography>
					</div>

					<div className="relative lg:col-span-5">
						<div
							className="absolute -inset-2 rounded-[2rem] bg-gradient-to-tr from-blue-200/40 to-cyan-200/40 blur-xl"
							aria-hidden
						/>
						<div className="relative overflow-hidden rounded-[1.75rem] border border-blue-200 bg-white shadow-[0_20px_60px_-30px_rgba(37,99,235,0.45)]">
							<Image
								src={CoachingAndSupportImage}
								alt="Professional at Mindful Network"
								className="h-[420px] w-full object-cover object-top lg:h-[520px]"
								priority
							/>
						</div>
					</div>
				</div>
			</section>

			<section
				className="page-width pb-16 lg:pb-24"
				aria-labelledby="about-approach-heading"
			>
				<div className="mb-6 lg:mb-8">
					<Typography
						id="about-approach-heading"
						as="h2"
						variant="h3"
						color="black"
						className="font-antic"
					>
						How We Support Your Journey
					</Typography>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
					{approachCards.map((card) => {
						const Icon = card.Icon;
						return (
							<article
								key={card.title}
								className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm"
							>
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
									<Icon className="h-5 w-5 text-blue-600" aria-hidden />
								</div>
								<Typography
									as="h3"
									variant="h3"
									color="black"
									className="font-antic"
								>
									{card.title}
								</Typography>
								<Typography
									as="p"
									variant="bodyXSmall"
									color="darkGray"
									className="mt-2"
								>
									{card.description}
								</Typography>
							</article>
						);
					})}
				</div>
			</section>
		</main>
	);
}
