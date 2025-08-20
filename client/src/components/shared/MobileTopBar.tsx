"use client";

import { menuVariants } from "@/lib/anim";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { CompanyDetails, ResourcesKey } from "@/models";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button, Typography } from "../ui";
import Image from "next/image";
import { getAllResources } from "@/services";
import { generateResourceKeys } from "@/utilities";

export function MobileTopBar({
	companyDetails,
}: {
	companyDetails: CompanyDetails;
}) {
	const [resources, setResources] = useState<ResourcesKey[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const handleCloseHeader = () => setIsOpen(!isOpen);

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

	return (
		<header className="transition-all fixed w-full flex items-center justify-between xl:hidden bg-white top-0 py-5 px-2.5 z-50">
			<Link href={"/"} className="flex content-center space-x-3 items-center">
				{companyDetails?.logo && (
					<Image
						alt={companyDetails.logoAlt || "The Mindful Network Logo"}
						className="w-auto h-12"
						src={companyDetails.logo}
						width={400}
						height={400}
						priority
					/>
				)}
			</Link>

			<div onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? (
					<XMarkIcon className="w-10 h-10" />
				) : (
					<Bars2Icon className="w-10 h-10" />
				)}
			</div>

			<AnimatePresence mode="wait">
				{isOpen && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={menuVariants}
						className="absolute top-20 left-0 w-full bg-white p-5 shadow-lg flex flex-col gap-2 h-[calc(100vh-88px)] overflow-y-auto"
					>
						<nav className="flex flex-col gap-5">
							<div className="flex flex-col gap-1">
								<Typography variant="body" as="span" color="black">
									Resources
								</Typography>
								{resources.map((link) => (
									<Link key={link.key} href={`/search?resource=${link.key}`}>
										<Typography variant="bodyXSmall" as="span" color="black">
											{link.label}
										</Typography>
									</Link>
								))}
							</div>

							<div className="flex flex-col gap-1">
								<Typography variant="body" as="span" color="black">
									Navigation
								</Typography>

								<Link href="/support-links">
									<Typography variant="bodyXSmall" as="span" color="black">
										Support Links
									</Typography>
								</Link>
								<Link href="/blog">
									<Typography variant="bodyXSmall" as="span" color="black">
										Blog
									</Typography>
								</Link>
								<Link href="/events">
									<Typography variant="bodyXSmall" as="span" color="black">
										Events
									</Typography>
								</Link>
								<Link href="/about">
									<Typography variant="bodyXSmall" as="span" color="black">
										About
									</Typography>
								</Link>
							</div>
						</nav>

						<Button
							onClick={handleCloseHeader}
							variant="bodyXSmall"
							className="py-2 rounded-full px-4 mt-5 bg-green-500 hover:bg-green-600"
						>
							<Link href={"/search"}>Start Search</Link>
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
