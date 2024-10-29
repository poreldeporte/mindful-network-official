"use client";

import { menuVariants } from "@/lib/anim";
import { resources } from "@/lib/constants";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { MindfulIsotype, MindfulLogo } from "@/lib/images";
import Link from "next/link";
import { useState } from "react";
import { Button, Typography } from "../ui";
import Image from "next/image";
import { sortResources } from "@/lib/utils";

export function MobileTopBar() {
	const [isOpen, setIsOpen] = useState(false);

	const sortedResources = sortResources(resources);

	const handleCloseHeader = () => setIsOpen(!isOpen);

	return (
		<header className="page-width transition-all fixed w-full flex items-center justify-between lg:hidden bg-orange-50 top-0 py-5 z-10">
			<Link href={"/"} className="flex content-center space-x-3 items-center">
				<Image
					alt="Mindful Logo"
					className="w-auto h-12"
					src={MindfulIsotype}
				/>
				<Image alt="Mindful Logo" className="w-auto h-10" src={MindfulLogo} />
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
						className="absolute top-20 left-0 w-full bg-orange-50 page-width py-5 shadow-lg flex flex-col gap-2"
					>
						<nav className="flex flex-col gap-5">
							<div className="flex flex-col gap-1">
								<Typography variant="large" as="span" color="black">
									Resources
								</Typography>
								{sortedResources.map((link) => (
									<Link key={link.key} href={link.path}>
										<Typography variant="medium" as="span" color="black">
											{link.title}
										</Typography>
									</Link>
								))}
							</div>

							<div className="flex flex-col gap-1">
								<Typography variant="large" as="span" color="black">
									Navigation
								</Typography>

								<Link href="/useful-links">
									<Typography variant="medium" as="span" color="black">
										Useful links
									</Typography>
								</Link>
								<Link href="/blog">
									<Typography variant="medium" as="span" color="black">
										Blog
									</Typography>
								</Link>
								<Link href="/about">
									<Typography variant="medium" as="span" color="black">
										About
									</Typography>
								</Link>
							</div>
						</nav>

						<Button
							onClick={handleCloseHeader}
							variant="small"
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
