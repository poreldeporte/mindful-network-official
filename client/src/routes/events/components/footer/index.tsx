import { Typography } from "@/components/ui";
import { AvailableArticlesImage, SearchCtaBlogImage } from "@/lib/images";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const EventsFooter = () => {
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 p-2 h-[60vh] gap-2">
			<div className="relative overflow-hidden rounded-xl group">
				<div
					className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-110"
					style={{
						backgroundImage: `url(${SearchCtaBlogImage.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<div className="relative h-full flex items-end justify-start p-10 dark-overlay">
					<div className="flex flex-col z-10">
						<Typography
							color="white"
							as="h2"
							variant="h3"
							className="font-semibold"
						>
							Need assistance?
						</Typography>
						<Typography color="white" as="p" variant="bodySmall">
							Start by exploring our mental health professionals database.
						</Typography>
						<Link
							href={"/search"}
							className="mt-4 py-2 w-max px-4 rounded-full bg-blue-500 hover:bg-blue-700 transition-colors text-white text-center"
							aria-label="Start your search for mental health resources"
						>
							<Typography
								as="span"
								variant={"bodySmall"}
								color="white"
								className="flex items-center gap-2"
							>
								Start Search
								<ArrowLongRightIcon className="w-7 h-7" />
							</Typography>
						</Link>
					</div>
				</div>
			</div>

			<div className="relative overflow-hidden rounded-xl group">
				<div
					className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-110"
					style={{
						backgroundImage: `url(${AvailableArticlesImage.src})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<div className="relative h-full flex items-end justify-start p-10 dark-overlay">
					<div className="flex flex-col z-10">
						<Typography
							color="white"
							as="h2"
							variant="h3"
							className="font-semibold"
						>
							Find what you need
						</Typography>
						<Typography color="white" variant="bodySmall">
							Search through support groups, services, books, and the latest in
							mental health research
						</Typography>
						<Link
							href={"/support-links"}
							className="mt-4 py-2 w-max px-4 rounded-full bg-blue-500 hover:bg-blue-700 transition-colors text-white text-center"
							aria-label="Start your search for mental health resources"
						>
							<Typography
								as="span"
								variant={"bodySmall"}
								color="white"
								className="flex items-center gap-2"
							>
								Start Learning
								<ArrowLongRightIcon className="w-7 h-7" />
							</Typography>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};
