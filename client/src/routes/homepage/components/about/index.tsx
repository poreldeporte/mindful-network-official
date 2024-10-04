import { Typography } from "@/components/ui";
import Image from "next/image";
import { Person1, Person2, Person3 } from "@/lib/images";
import { benefits } from "@/lib/constants";

interface BenefitCardProps {
	key: number;
	title: string;
	description: string;
}

const BenefitCard = ({ title, description }: BenefitCardProps) => {
	return (
		<article>
			<Typography
				className="mb-2 font-semibold"
				color="black"
				as="h4"
				variant="medium"
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
		<section className="page-width section-y-padding bg-gray-50">
			<Typography className="mb-2" color="black" as="h2" variant="title">
				<span className="text-green-300">We&apos;re here to help</span>{" "}
				<span className="block" />
				build your support net
			</Typography>
			<div className="grid grid-cols-1 xl:grid-cols-2 mt-10 lg:mt-20 gap-5">
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

					<div className="my-5">
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
				</div>

				<div className="grid grid-cols-3 xl:flex gap-5 w-full h-full relative">
					<Image
						className="w-auto h-auto xl:absolute xl:top-0 xl:left-0 xl:w-[370px] xl:h-auto"
						src={Person1}
						alt="Person 1"
					/>
					<Image
						className="w-auto h-full xl:absolute xl:-bottom-20 xl:w-[200px] xl:left-1/4 xl:h-auto"
						src={Person2}
						alt="Person 2"
					/>
					<Image
						className="w-auto h-auto xl:absolute xl:bottom-20 xl:w-[270px] xl:right-20 xl:h-auto"
						src={Person3}
						alt="Person 3"
					/>
				</div>
			</div>
		</section>
	);
}
