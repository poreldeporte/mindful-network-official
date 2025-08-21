"use client";

import { aboutFooter } from "@/lib/constants";
import { BlogModel, ResourcesKey } from "@/models";
import { CompanyDetails } from "@/models/company-details.model";
import { getLatestBlog } from "@/routes/homepage/services";
import { getAllResources } from "@/services";
import { generateResourceKeys } from "@/utilities";
import {
	IconBrandInstagram,
	IconBrandLinkedin,
	IconBrandX,
} from "@tabler/icons-react";
import { ChevronUp, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Typography } from "../ui";

interface Props {
	blogPosts?: BlogModel[];
	companyDetails?: CompanyDetails;
}

export function Footer({ blogPosts, companyDetails }: Props) {
	const [posts, setPosts] = useState<BlogModel[] | []>([]);
	const [resources, setResources] = useState<ResourcesKey[]>([]);

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
	}, [blogPosts]);

	useEffect(() => {
		async function fetchData() {
			try {
				const [resources] = await Promise.all([getAllResources()]);

				const resourceKeys = generateResourceKeys(resources);
				setResources(resourceKeys);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, [companyDetails]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer>
			<div className="page-width py-10">
				<div className="lg:gap-5 grid grid-cols-1 lg:grid-cols-[auto_1fr]">
					<div className="mb-10 lg:mb-0 space-y-5">
						<div className="flex content-center space-x-4 items-center">
							{companyDetails?.logo && (
								<Image
									alt={companyDetails.logoAlt || "The Mindful Network Logo"}
									className="w-54 h-16 xl:w-56 xl:h-20"
									src={companyDetails.logo}
									width={200}
									height={150}
									priority
								/>
							)}
						</div>
						<div className="flex flex-col items-start space-y-3">
							{companyDetails && companyDetails.address && (
								<div className="flex items-center space-x-3">
									<MapPin className="w-6 h-6 text-gray-500" />
									<Typography variant="bodySmall" as="p" color="black">
										{companyDetails.address}
									</Typography>
								</div>
							)}
							{companyDetails && companyDetails.phoneNumber && (
								<div className="flex items-center space-x-3">
									<Phone className="w-6 h-6 text-gray-500" />
									<Typography variant="bodySmall" as="p" color="black">
										{companyDetails.phoneNumber}
									</Typography>
								</div>
							)}

							{companyDetails && companyDetails.email && (
								<div className="flex items-center space-x-3">
									<Mail className="w-6 h-6 text-gray-500" />
									<Typography
										variant="bodySmall"
										as="p"
										color="black"
										className="hover:underline underline-offset-4"
									>
										<a href={`mailto:${companyDetails.email}`}>
											{companyDetails.email}
										</a>
									</Typography>
								</div>
							)}

							{companyDetails && companyDetails.socialLinks && (
								<div className="flex space-x-3">
									{companyDetails.socialLinks.map((socialMedia) => (
										<a
											key={socialMedia.url}
											href={socialMedia.url}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={`Go to ${socialMedia.platform.charAt(0).toUpperCase() + socialMedia.platform.slice(1)}`}
										>
											{socialMedia.platform === "instagram" && (
												<IconBrandInstagram className="w-8 h-8 text-gray-500" />
											)}
											{socialMedia.platform === "linkedin" && (
												<IconBrandLinkedin className="w-8 h-8 text-gray-500" />
											)}
											{socialMedia.platform === "twitter" && (
												<IconBrandX className="w-8 h-8 text-gray-500" />
											)}
										</a>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="flex flex-col flex-wrap lg:flex-row items-start justify-between xl:justify-around">
						<div>
							<Typography
								color="black"
								as="h2"
								variant="body"
								className="font-bold lg:font-semibold"
							>
								About
							</Typography>
							<div className="flex flex-col mb-2 lg:mb-0">
								{aboutFooter.map((label) => {
									return (
										<Link
											className="hover:underline"
											href={label.link}
											key={label.key}
										>
											<Typography
												color="darkGray"
												as="span"
												variant="bodySmall"
											>
												{label.label}
											</Typography>
										</Link>
									);
								})}
							</div>
						</div>
						<div className="max-w-72">
							<Typography
								color="black"
								as="h2"
								variant="body"
								className="font-bold lg:font-semibold"
							>
								Blog
							</Typography>
							<div className="flex flex-col mb-2 lg:mb-0">
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
															variant="bodySmall"
														>
															{article.title}
														</Typography>
													</Link>
												);
										})
									: ""}
							</div>
						</div>
						<div className="max-w-72">
							<Typography
								color="black"
								as="h2"
								variant="body"
								className="font-bold lg:font-semibold"
							>
								Resources
							</Typography>
							<div className="flex flex-col mb-2 lg:mb-0">
								{resources.map((resource) => {
									return (
										<Link
											className="hover:underline"
											href={`/search?resource=${resource.key}`}
											key={resource.key}
										>
											<Typography
												color="darkGray"
												as="span"
												variant="bodySmall"
											>
												{resource.label}
											</Typography>
										</Link>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col md:flex-row justify-between items-center">
				<Typography variant="bodySmall" color="black" className="p-0 md:p-4">
					© {new Date().getFullYear()} The Mindful Network
				</Typography>

				<a
					href="https://www.violacreative.com/"
					rel="noopener noreferrer"
					target="_blank"
					className="flex items-center gap-1 p-4 lg:p-0"
				>
					<span className="text-[12px] text-gray-500">Developed by</span>
					<Image
						src={"/images/viola-creative-black.webp"}
						alt="Viola Creative Logo"
						height={15}
						width={100}
						loading="lazy"
					/>
				</a>

				<button
					onClick={scrollToTop}
					className="hidden lg:flex items-center bg-green-500 hover:bg-green-600 transition-colors p-3 pl-12 rounded-tl-full space-x-2"
				>
					<Typography variant="bodySmall" as="h3" color="white">
						Back to top
					</Typography>
					<ChevronUp className="h-8 w-8 text-white" />
				</button>
			</div>
		</footer>
	);
}
