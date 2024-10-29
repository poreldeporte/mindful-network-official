"use client";

import { aboutFooter, resources } from "@/lib/constants";
import { MindfulIsotype, MindfulLogo } from "@/lib/images";
import { BlogModel } from "@/models";
import { getLatestBlog } from "@/routes/homepage/services";
import { ChevronUp, Phone, Mail, MapPin } from "lucide-react";
import {
	IconBrandX,
	IconBrandLinkedin,
	IconBrandInstagram,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Typography } from "../ui";
import { sortResources } from "@/lib/utils";
import { CompanyDetails } from "@/models/company-details.model";
import { getCompanyDetails } from "@/services/company-details.service";

interface Props {
	blogPosts?: BlogModel[];
}

export function Footer({ blogPosts }: Props) {
	const [posts, setPosts] = useState<BlogModel[] | []>([]);
	const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
		null
	);

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
				const data = await getCompanyDetails();
				setCompanyDetails(data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer>
			<div className="page-width py-10">
				<div className="lg:gap-5 grid grid-cols-1 lg:grid-cols-[auto_1fr]">
					<div className="mb-10 lg:mb-0 space-y-5">
						<div className="flex content-center space-x-4 items-center">
							<Image
								alt="Mindful Logo"
								className="w-24 h-20 xl:w-40 xl:h-32"
								src={MindfulIsotype}
							/>
							<Image
								alt="Mindful Logo"
								className="w-32 h-16 xl:w-40 xl:h-16"
								src={MindfulLogo}
							/>
						</div>
						<div className="flex flex-col items-start space-y-3">
							{companyDetails && companyDetails.address && (
								<div className="flex items-center space-x-3">
									<MapPin className="w-6 h-6 text-gray-500" />
									<Typography variant="small" as="h3" color="black">
										{companyDetails.address}
									</Typography>
								</div>
							)}
							{companyDetails && companyDetails.phoneNumber && (
								<div className="flex items-center space-x-3">
									<Phone className="w-6 h-6 text-gray-500" />
									<Typography variant="small" as="h3" color="black">
										{companyDetails.phoneNumber}
									</Typography>
								</div>
							)}

							{companyDetails && companyDetails.email && (
								<div className="flex items-center space-x-3">
									<Mail className="w-6 h-6 text-gray-500" />
									<Typography variant="small" as="h3" color="black">
										{companyDetails.email}
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
					<div className="flex flex-col flex-wrap lg:flex-row items-start justify-around">
						<div>
							<Typography
								color="black"
								as="h2"
								variant="medium"
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
											<Typography color="darkGray" as="span" variant="small">
												{label.label}
											</Typography>
										</Link>
									);
								})}
							</div>
						</div>
						<div className="max-w-96">
							<Typography
								color="black"
								as="h2"
								variant="medium"
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
							<Typography
								color="black"
								as="h2"
								variant="medium"
								className="font-bold lg:font-semibold"
							>
								Resources
							</Typography>
							<div className="flex flex-col mb-2 lg:mb-0">
								{sortResources(resources).map((resource) => {
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
