"use client";

import { aboutFooter, resources } from "@/lib/constants";
import { MindfulIsotype, MindfulLogo } from "@/lib/images";
import { BlogModel } from "@/models";
import { IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { LinkedinIcon } from "lucide-react";
import { ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui";
import { getLatestBlog } from "@/routes/homepage/services";
import { Button } from "../ui";
import { useEffect, useState } from "react";

interface Props {
	blogPosts?: BlogModel[];
}

export function Footer({ blogPosts }: Props) {
	const [posts, setPosts] = useState<BlogModel[] | []>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const latestsPosts: BlogModel[] = await getLatestBlog();
				setPosts(latestsPosts);
			} catch (error) {
				console.log(error);
			}
		}
		if (!blogPosts) {
			fetchData();
		} else setPosts(blogPosts);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer>
			<div className="page-width py-10">
				<div className="flex flex-col lg:flex-row items-start justify-between sm:gap-5">
					<div className="lg:mb-0 space-y-5">
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
							<div className="flex items-center space-x-3">
								<a href="#">
									<IconBrandInstagram className="w-8 h-8 text-gray-500" />
								</a>
								<a href="#">
									<LinkedinIcon className="w-8 h-8 text-gray-500" />
								</a>
								<a href="#">
									<IconBrandX className="w-8 h-8 text-gray-500" />
								</a>
							</div>
						</div>
					</div>
					<div>
						<Typography color="black" as="h2" variant="medium">
							About
						</Typography>
						<div className="flex flex-col sm:mb-2">
							{aboutFooter.map((label) => {
								return (
									<Link
										className="hover:underline"
										href={label.link}
										key={label.key}
									>
										<Typography color="darkGray" as="span" variant="small">
											{label.label}
										</Typography>
									</Link>
								);
							})}
						</div>
					</div>
					<div className="max-w-96">
						<Typography color="black" as="h2" variant="medium">
							Blog
						</Typography>
						<div className="flex flex-col sm:mb-2">
							{posts && posts.length
								? posts.map((article, index) => {
										if (index < 6)
											return (
												<Link
													className="hover:underline"
													href={`/blog/${article.slug}`}
													key={article.id}
												>
													<Typography
														className=""
														color="darkGray"
														as="span"
														variant="small"
													>
														{article.title}
													</Typography>
												</Link>
											);
									})
								: ""}
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-1">
						<Typography color="black" as="h2" variant="medium">
							Resources
						</Typography>
						<div className="flex flex-col">
							{resources.map((resource) => {
								return (
									<Link
										className="hover:underline"
										href={resource.path}
										key={resource.key}
									>
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
			<div className="flex justify-between items-center">
				<Typography variant="small" color="black" className="p-4">
					© 2024 The Mindful Network
				</Typography>
				<Button
					onClick={scrollToTop}
					className="flex items-center bg-green-500 hover:bg-green-600 transition-colors p-3 pl-12 rounded-tl-full space-x-2"
					variant="small"
				>
					<Typography variant="small" as="h3" color="white">
						Back to top
					</Typography>
					<ChevronUp className="h-8 w-8 text-white" />
				</Button>
			</div>
		</footer>
	);
}
