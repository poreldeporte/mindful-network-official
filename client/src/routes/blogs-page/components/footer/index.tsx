import { Typography } from "@/components/ui";
import Link from "next/link";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import {
	SearchCtaBlogImage,
	AvailableArticlesImage,
	MindfulPromotionImage,
} from "@/lib/images";

interface Props {
	blogAmount: number;
}

export const BlogsFooter = ({ blogAmount }: Props) => {
	return (
		<footer className="grid grid-cols-1 lg:grid-cols-2 p-2 h-max md:h-[70vh] gap-2">
			<div className="grid grid-rows-2 gap-2">
				<div
					className="relative flex items-end justify-start p-10 rounded-xl dark-overlay"
					style={{
						backgroundImage: `url(${SearchCtaBlogImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="flex flex-col z-10">
						<Typography color="white" as="h2" variant="large">
							Are You Looking For Help?
						</Typography>
						<Typography color="white" as="p" variant="small">
							Try searching in our mental health professionals database
						</Typography>
						<Link
							href={"/search"}
							className="mt-4 py-2 w-max px-4 rounded-full bg-green-500 hover:bg-green-700 transition-colors text-white text-center"
							aria-label="Start your search for mental health resources"
						>
							<Typography
								as="span"
								variant={"small"}
								color="white"
								className="flex items-center gap-2"
							>
								Start Search
								<ArrowLongRightIcon className="w-7 h-7" />
							</Typography>
						</Link>
					</div>
				</div>

				<div
					className="relative flex items-end justify-start p-10 rounded-xl dark-overlay"
					style={{
						backgroundImage: `url(${AvailableArticlesImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="flex flex-col z-10">
						<Typography color="white" as="h2" variant="large">
							Available Articles For you
						</Typography>
						<Typography color="white" variant="large">
							{blogAmount && blogAmount}
						</Typography>
					</div>
				</div>
			</div>
			<div
				className="relative flex items-end lg:items-center lg:justify-center p-10 rounded-xl dark-overlay"
				style={{
					backgroundImage: `url(${MindfulPromotionImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="flex flex-col z-10">
					<Typography color="white" as="h2" variant="xlarge">
						The Mindful Network.
					</Typography>
					<Typography color="white" as="p" variant="medium">
						A network curated for your path to healing.
					</Typography>
				</div>
			</div>
		</footer>
	);
};
