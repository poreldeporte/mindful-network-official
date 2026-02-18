import { Typography } from "@/components/ui";
import {
	PersonalizedSearchOptionsImage,
	TrustedAndVerifiedResourcesImage,
	UpToDateInformationImage,
} from "@/lib/images";
import {
	ArrowLongRightIcon,
	CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const resourceSections = [
	{
		title: "Trusted and Verified Resources",
		description:
			"We vet and verify providers in our network so you can start with options that are reputable, relevant, and easier to trust.",
		bullets: [
			"Licensed therapists",
			"Psychiatry and medication management",
			"Crisis support resources",
			"Peer-led support groups",
			"Innovative therapies",
		],
		image: TrustedAndVerifiedResourcesImage,
		imageAlt: "Trusted and verified resources",
		imageSide: "right" as const,
	},
	{
		title: "Up-to-Date Information",
		description:
			"Our team regularly reviews listings and content so families and caregivers can make decisions based on current information.",
		bullets: [
			"Updated South Florida provider listings",
			"Educational blogs and support links",
			"Current care pathways and treatment options",
		],
		image: UpToDateInformationImage,
		imageAlt: "Up-to-date information",
		imageSide: "left" as const,
	},
	{
		title: "Personalized Search Options",
		description:
			"Use guided filters to narrow results to the support that best fits your current needs.",
		bullets: ["Condition", "Type of therapy", "Level of care", "Insurance"],
		image: PersonalizedSearchOptionsImage,
		imageAlt: "Personalized search options",
		imageSide: "right" as const,
	},
];

export const ResourcesContainer = () => {
	return (
		<div
			className="grid grid-cols-1 w-full gap-5 lg:gap-6"
			role="list"
			aria-label="List of benefits"
		>
			{resourceSections.map((section) => {
				const imageColumnClass =
					section.imageSide === "left" ? "lg:order-1" : "lg:order-2";
				const contentColumnClass =
					section.imageSide === "left" ? "lg:order-2" : "lg:order-1";

				return (
					<article
						key={section.title}
						className="grid grid-cols-1 items-center gap-5 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm lg:grid-cols-12 lg:gap-8"
						aria-labelledby={`benefit-title-${section.title}`}
					>
						<div className={`lg:col-span-6 ${contentColumnClass} p-6 lg:p-8`}>
							<Typography
								className="mb-3 font-antic"
								color="black"
								as="h3"
								variant="h3"
								id={`benefit-title-${section.title}`}
							>
								{section.title}
							</Typography>

							<Typography color="darkGray" as="p" variant="bodyXSmall">
								{section.description}
							</Typography>

							<ul className="mt-4 space-y-2">
								{section.bullets.map((bullet) => (
									<li key={bullet} className="flex items-start gap-2">
										<CheckCircleIcon
											className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
											aria-hidden
										/>
										<Typography color="darkGray" as="span" variant="bodyXSmall">
											{bullet}
										</Typography>
									</li>
								))}
							</ul>

							<Link
								className="mt-5 inline-flex items-center gap-2 text-blue-600 underline underline-offset-4"
								href="/search"
							>
								Start Search <ArrowLongRightIcon className="w-4 h-4" />
							</Link>
						</div>

						<div
							className={`lg:col-span-6 ${imageColumnClass} border-t border-blue-100 bg-slate-50 lg:border-t-0 lg:border-l`}
						>
							<div className="flex h-full min-h-[320px] items-center justify-center p-5 lg:min-h-[460px] lg:p-8">
								<Image
									src={section.image}
									alt={section.imageAlt}
									className="max-h-[300px] w-full object-contain object-center lg:max-h-[390px]"
								/>
							</div>
						</div>
					</article>
				);
			})}
		</div>
	);
};
