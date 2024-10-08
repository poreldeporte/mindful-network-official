import { resources, latestBlogArticles, aboutFooter } from "@/lib/constants";
import { MindfulIsotype, MindfulLogo } from "@/lib/images";
import { ChevronUp, Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui";
import {
	IconBrandX,
	IconBrandInstagram,
	IconBrandLinkedin,
} from "@tabler/icons-react";

export function Footer() {
	return (
		<footer>
			<div className="page-width py-10">
				<div className="flex flex-col lg:flex-row items-start justify-between">
					<div className="mb-10 lg:mb-0 space-y-5">
						<div className="flex content-center space-x-4 items-center">
							<Image
								alt="Mindful Logo"
								className="w-24 h-20 lg:w-40 lg:h-32"
								src={MindfulIsotype}
							/>
							<Image
								alt="Mindful Logo"
								className="w-32 h-16 lg:w-40 lg:h-16"
								src={MindfulLogo}
							/>
						</div>
						<div className="space-y-2">
							<Typography color="black" as="h2" variant="medium">
								Follow us
							</Typography>
							<div className="flex items-center space-x-3">
								<Link href="#">
									<IconBrandInstagram className="w-8 h-8 text-gray-700" />
								</Link>
								<Link href="#">
									<IconBrandLinkedin className="w-8 h-8 text-gray-700" />
								</Link>
								<Link href="#">
									<IconBrandX className="w-8 h-8 text-gray-700" />
								</Link>
							</div>
						</div>
					</div>
					<div className="mb-5">
						<Typography color="black" as="h2" variant="medium">
							About
						</Typography>
						<div className="flex flex-col">
							{aboutFooter.map((label) => {
								return (
									<a href={label.link} key={label.key}>
										<Typography color="darkGray" as="span" variant="small">
											{label.label}
										</Typography>
									</a>
								);
							})}
						</div>
					</div>
					<div className="mb-5">
						<Typography color="black" as="h2" variant="medium">
							Blog
						</Typography>
						<div className="flex flex-col">
							{latestBlogArticles.map((article) => {
								return (
									<a href={article.link} key={article.key}>
										<Typography color="darkGray" as="span" variant="small">
											{article.title}
										</Typography>
									</a>
								);
							})}
						</div>
					</div>
					<div className="mb-5 grid grid-cols-1 lg:grid-cols-1">
						<Typography color="black" as="h2" variant="medium">
							Resources
						</Typography>
						<div className="flex flex-col">
							{resources.map((resource) => {
								return (
									<Link href={resource.path} key={resource.key}>
										<Typography color="darkGray" as="span" variant="small">
											{resource.title}
										</Typography>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between items-center ">
				<Typography variant="small" color="black" className="p-5">
					© 2024 The Mindful Network
				</Typography>
				<Link
					href={"/"}
					className="flex content-center items-center bg-green-500 hover:bg-green-600 transition-colors p-3 pl-12 rounded-tl-full space-x-2"
				>
					<Typography variant="small" as="h3" color="white">
						Back to top
					</Typography>
					<ChevronUp className="h-8 w-8 text-white" />
				</Link>
			</div>
		</footer>
	);
}
