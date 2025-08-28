import { Button, Typography } from "@/components/ui";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface FooterCardProps {
	image: StaticImageData;
	title: string;
	buttonText: string;
	path: string;
	description: string;
}

const FooterCard = ({
	image,
	title,
	buttonText,
	path,
	description,
}: FooterCardProps) => {
	return (
		<article className="relative w-full h-[250px] xl:h-[450px] overflow-hidden transition-transform hover:scale-[101%]">
			<div className="dark-overlay">
				<Image
					className="w-full h-full object-cover dark-overlay"
					src={image.src}
					width={500}
					height={200}
					alt={`Image for ${buttonText}`}
				/>
			</div>
			<div className="absolute bottom-0 left-0 w-full p-8 flex items-center">
				<div className="w-full flex flex-col gap-1">
					<Typography
						color="white"
						as="h3"
						variant="h3"
						className="font-bold mr-5"
					>
						{title}
					</Typography>
					<Typography color="white" as="p" variant="bodySmall">
						{description}
					</Typography>
					<Link href={path} className="w-fit mt-5">
						<Button
							form="outline-white"
							variant="bodySmall"
							aria-label={`Read more about ${title}`}
						>
							{buttonText} <ArrowLongRightIcon className="w-4 h-4" />
						</Button>
					</Link>
				</div>
			</div>
		</article>
	);
};

interface Props {
	image1: StaticImageData;
	image2: StaticImageData;
	title1: string;
	buttonText1: string;
	path1: string;
	description1: string;
	title2: string;
	buttonText2: string;
	path2: string;
	description2: string;
}

export const CTAFooter = ({
	image1,
	image2,
	title1,
	buttonText1,
	path1,
	description1,
	title2,
	buttonText2,
	path2,
	description2,
}: Props) => {
	return (
		<section
			aria-labelledby="blogs-footer-heading"
			className="grid grid-cols-1 lg:grid-cols-2 gap-5 page-width"
		>
			<FooterCard
				image={image1}
				title={title1}
				buttonText={buttonText1}
				path={path1}
				description={description1}
			/>

			<FooterCard
				image={image2}
				title={title2}
				buttonText={buttonText2}
				path={path2}
				description={description2}
			/>
		</section>
	);
};
