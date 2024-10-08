import { Typography } from "@/components/ui";
import Image from "next/image";
import { CTACards } from "@/lib/constants";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

interface Props {
	image: string;
	buttonText: string;
}

const CTACard = ({ image, buttonText }: Props) => {
	return (
		<article className="relative w-full h-72 rounded-xl overflow-hidden">
			<Image
				className="w-full h-full object-cover"
				src={image}
				width={500}
				height={200}
				alt={`Image for ${buttonText}`}
			/>
			<div className="absolute bottom-0 left-0 w-full p-8 flex items-center">
				<button
					className="text-left w-full flex items-center gap-2 focus:outline-none"
					aria-label={`Call to action: ${buttonText}`}
				>
					<Typography
						color="white"
						as="p"
						variant="medium"
						className="text-lg font-bold mr-5 flex items-center gap-2"
					>
						{buttonText}
						<ArrowRightCircleIcon
							className="h-8 w-8 text-white"
							aria-hidden="true"
						/>
					</Typography>
				</button>
			</div>
		</article>
	);
};

export function CTASection() {
	return (
		<section
			className="page-width section-y-padding"
			aria-labelledby="cta-section-heading"
		>
			<Typography
				as="h2"
				variant="title"
				color="black"
				className="sr-only"
				id="cta-section-heading"
			>
				Call to Action Section
			</Typography>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
				{CTACards.map((card) => (
					<CTACard key={card.id} {...card} />
				))}
			</div>
		</section>
	);
}
