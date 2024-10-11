import { Typography } from "@/components/ui";
import Image from "next/image";
import { Person1, Person2, Person3 } from "@/lib/images";
import { benefits } from "@/lib/constants";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

interface BenefitCardProps {
	key: number;
	title: string;
	description: string;
}

const BenefitCard = ({ title, description }: BenefitCardProps) => {
	return (
		<article
			role="listitem"
			className="mb-4"
			aria-labelledby={`benefit-title-${title}`}
		>
			<Typography
				className="mb-2 font-semibold"
				color="black"
				as="h4"
				variant="medium"
				id={`benefit-title-${title}`}
			>
				{title}
			</Typography>

			<Typography className="mb-2" color="darkGray" as="p" variant="small">
				{description}
			</Typography>
		</article>
	);
};

export function About() {
	return (
		<section
			className="page-width section-y-padding bg-gray-50"
			aria-labelledby="about-section-heading"
		>
			<Typography
				className="mb-2"
				color="black"
				as="h2"
				variant="title"
				id="about-section-heading"
			>
				<span className="text-green-500">We&apos;re here to help</span>{" "}
				<span className="block" />
				build your support net
			</Typography>
			<div className="grid grid-cols-1 xl:grid-cols-2 mt-10 lg:mt-20 gap-10 lg:gap-5">
				<div className="flex flex-col gap-5">
					<Typography
						className="mb-2 font-medium w-3/4"
						color="black"
						as="h3"
						variant="large"
					>
						Access the most reliable and reputable mental health resources
						available
					</Typography>

					<div className="lg:my-5" role="list" aria-label="List of benefits">
						{benefits.map((benefit) => {
							return (
								<BenefitCard
									key={benefit.key}
									title={benefit.title}
									description={benefit.description}
								/>
							);
						})}
					</div>

					<Link
						href={"/about"}
						className="lg:mt-4 py-2 w-max px-4 rounded-full bg-green-500 hover:bg-green-700 transition-colors text-white text-center"
						aria-label="Start your search for mental health resources"
					>
						<Typography
							className="flex items-center gap-2"
							as="span"
							variant={"small"}
							color="white"
						>
							See Why This Means So Much To Us{" "}
							<ArrowLongRightIcon className="h-7 w-7" />
						</Typography>
					</Link>
				</div>

				<div
					className="grid grid-cols-3 xl:flex gap-5 w-full h-full relative"
					aria-label="People illustrations representing support and guidance"
				>
					<Image
						className="w-auto h-auto xl:absolute xl:top-0 xl:left-0 xl:w-[370px] xl:h-auto"
						src={Person1}
						alt="Person smiling, symbolizing support and positivity"
					/>
					<Image
						className="w-auto h-full xl:absolute xl:-bottom-20 xl:w-[200px] xl:left-1/4 xl:h-auto"
						src={Person2}
						alt="Person with a thoughtful expression, representing understanding"
					/>
					<Image
						className="w-auto h-auto xl:absolute xl:bottom-20 xl:w-[270px] xl:right-20 xl:h-auto"
						src={Person3}
						alt="Person with an empathetic look, symbolizing compassion"
					/>
				</div>
			</div>
		</section>
	);
}
