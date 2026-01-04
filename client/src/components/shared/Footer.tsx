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
	IconMail,
	IconMapPin,
	IconPhone,
} from "@tabler/icons-react";
import { ChevronUp } from "lucide-react";
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
	const [showAllBlog, setShowAllBlog] = useState(false);
	const [showAllResources, setShowAllResources] = useState(false);

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

	const blogItems = showAllBlog ? posts : posts.slice(0, 10);
	const resourceItems = showAllResources ? resources : resources.slice(0, 10);

	return (
		<footer>
			<div className="page-width py-10">
				<div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
					<div className="space-y-5">
						<div className="flex content-center space-x-4 items-center">
							{companyDetails?.logo && (
								<Image
									alt={companyDetails.logoAlt || "The Mindful Network Logo"}
									className="w-54 h-16 xl:w-56 xl:h-20 object-cover"
									src={companyDetails.logo}
									width={200}
									height={150}
									priority
								/>
							)}
						</div>
						<div className="flex flex-col items-start gap-3">
							{companyDetails && companyDetails.address && (
								<div className="flex items-center space-x-3">
									<IconMapPin className="h-5 w-5 text-gray-500" />
									<Typography variant="bodyXSmall" as="p" color="black">
										{companyDetails.address}
									</Typography>
								</div>
							)}
							{companyDetails && companyDetails.phoneNumber && (
								<div className="flex items-center space-x-3">
									<IconPhone className="h-5 w-5 text-gray-500" />
									<Typography variant="bodyXSmall" as="p" color="black">
										{companyDetails.phoneNumber}
									</Typography>
								</div>
							)}

							{companyDetails && companyDetails.email && (
								<div className="flex items-center space-x-3">
									<IconMail className="h-5 w-5 text-gray-500" />
									<Typography
										variant="bodyXSmall"
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
												<IconBrandInstagram
													className="h-5 w-5 text-gray-500"
													stroke={1.6}
												/>
											)}
											{socialMedia.platform === "linkedin" && (
												<IconBrandLinkedin
													className="h-5 w-5 text-gray-500"
													stroke={1.6}
												/>
											)}
											{socialMedia.platform === "twitter" && (
												<IconBrandX
													className="h-5 w-5 text-gray-500"
													stroke={1.6}
												/>
											)}
										</a>
									))}
								</div>
							)}
						</div>
					</div>
					<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						<div className="min-w-0">
							<Typography
								color="black"
								as="h2"
								variant="bodySmall"
								className="font-bold lg:font-semibold"
							>
								About
							</Typography>
							<div className="mt-2 flex flex-col gap-2">
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
												variant="bodyXSmall"
											>
												{label.label}
											</Typography>
										</Link>
									);
								})}
							</div>
						</div>
						<div className="min-w-0">
							<Typography
								color="black"
								as="h2"
								variant="bodySmall"
								className="font-bold lg:font-semibold"
						>
							Resources
						</Typography>
						<div
							id="footer-resources-list"
							className="mt-2 flex flex-col gap-2"
						>
							{resourceItems.map((resource) => {
								return (
									<Link
										className="hover:underline"
										href={`/search?resource=${resource.key}`}
										key={resource.key}
									>
										<Typography
											color="darkGray"
											as="span"
											variant="bodyXSmall"
										>
											{resource.label}
										</Typography>
									</Link>
								);
							})}
						</div>
						{resources.length > 10 && (
							<button
								type="button"
								onClick={() => setShowAllResources((prev) => !prev)}
								aria-expanded={showAllResources}
								aria-controls="footer-resources-list"
								className="mt-2 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
							>
								{showAllResources ? "See less" : "See more"}
							</button>
						)}
					</div>
					<div className="min-w-0">
						<Typography
							color="black"
							as="h2"
							variant="bodySmall"
							className="font-bold lg:font-semibold"
						>
							Blog
						</Typography>
						<div id="footer-blog-list" className="mt-2 flex flex-col gap-2">
							{blogItems.length
								? blogItems.map((article) => (
										<Link
											className="hover:underline"
											href={`/blog/${article.slug}`}
											key={article.id}
										>
											<Typography
												className=""
												color="darkGray"
												as="span"
												variant="bodyXSmall"
											>
												{article.title}
											</Typography>
										</Link>
									))
								: ""}
						</div>
						{posts.length > 10 && (
							<button
								type="button"
								onClick={() => setShowAllBlog((prev) => !prev)}
								aria-expanded={showAllBlog}
								aria-controls="footer-blog-list"
								className="mt-2 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
							>
								{showAllBlog ? "See less" : "See more"}
							</button>
						)}
					</div>
				</div>
			</div>
			</div>
			<div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:items-center">
				<Typography
					variant="bodyXSmall"
					color="black"
					className="p-0 text-center md:p-4 md:text-left"
				>
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
					className="hidden lg:flex items-center bg-blue-500 hover:bg-blue-600 transition-colors p-3 pl-12 rounded-tl-full space-x-2"
				>
					<Typography variant="bodyXSmall" as="h3" color="white">
						Back to top
					</Typography>
					<ChevronUp className="h-8 w-8 text-white" />
				</button>
			</div>
		</footer>
	);
}
