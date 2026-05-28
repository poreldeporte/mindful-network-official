"use client";

import { CompanyDetails } from "@/models";
import { clearGlobalInteractionLocks } from "@/utilities/clear-global-interaction-locks.utility";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Typography } from "../ui";
import { SubscribePopover } from "./SubscribePopover";

export function Topbar({ companyDetails }: { companyDetails: CompanyDetails }) {
	const pathname = usePathname();
	const isSearchPage =
		pathname === "/search" || pathname === "/students/search";
	const findProfessionalsHref = pathname.startsWith("/students")
		? "/students/search"
		: "/search";
	const startSearchHref = pathname.startsWith("/students")
		? "/students/search"
		: "/search";

	const subscribeButtonRef = useRef<HTMLButtonElement | null>(null);
	const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

	useEffect(() => {
		setIsSubscribeOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!pathname.startsWith("/professional/")) {
			clearGlobalInteractionLocks();
			document
				.querySelectorAll<HTMLElement>(".site-header")
				.forEach((header) => header.classList.remove("site-header-hidden"));
			document.body.classList.remove("detail-subnav-active");
			document.documentElement.style.removeProperty("--subnav-top");
			document.documentElement.style.removeProperty("--subnav-height");
		}
	}, [pathname]);

	return (
		<header className="site-header fixed top-5 left-1/2 -translate-x-1/2 w-11/12 2xl:w-3/4 max-w-[1440px] bg-white shadow-sm rounded-full overflow-hidden hidden xl:block z-50">
			<div className="flex items-center justify-between">
				<Link
					href={"/"}
					className="w-52 h-14 xl:w-64 xl:h-20 shrink-0 flex content-center space-x-3 items-center py-2 pl-8 pr-10 bg-blue-500 hover:bg-blue-700 transition-colors rounded-ee-full"
				>
					{companyDetails?.logo && (
						<Image
							alt={companyDetails.logoAlt || "The Mindful Network Logo"}
							className="w-full h-full filter invert brightness-0 object-cover"
							src={companyDetails.logo}
							width={400}
							height={400}
							priority
						/>
					)}
				</Link>

				<nav className="flex items-center justify-center space-x-3 px-3 flex-1 flex-grow whitespace-nowrap">
					<Link href="/about">
						<Typography
							variant="bodyXSmall"
							color={pathname === "/about" ? "green" : "darkGray"}
							className={pathname === "/about" ? "font-medium" : ""}
						>
							About
						</Typography>
					</Link>
					<Link href="/students">
						<Typography
							variant="bodyXSmall"
							color={pathname.startsWith("/students") ? "green" : "darkGray"}
							className={pathname.startsWith("/students") ? "font-medium" : ""}
						>
							Students
						</Typography>
					</Link>
					<Link href={findProfessionalsHref}>
						<Typography
							variant="bodyXSmall"
							color={isSearchPage ? "green" : "darkGray"}
							className={isSearchPage ? "font-medium" : ""}
						>
							Find Professionals
						</Typography>
					</Link>
					<Link href="/support-links">
						<Typography
							variant="bodyXSmall"
							color={pathname === "/support-links" ? "green" : "darkGray"}
							className={pathname === "/support-links" ? "font-medium" : ""}
						>
							Support Links
						</Typography>
					</Link>
					<Link href="/blog">
						<Typography
							variant="bodyXSmall"
							color={pathname === "/blog" ? "green" : "darkGray"}
							className={pathname === "/blog" ? "font-medium" : ""}
						>
							Blog
						</Typography>
					</Link>
					<Link href="/events">
						<Typography
							variant="bodyXSmall"
							color={pathname === "/events" ? "green" : "darkGray"}
							className={pathname === "/events" ? "font-medium" : ""}
						>
							Events
						</Typography>
					</Link>
				</nav>

				<div className="flex shrink-0 items-center gap-2 p-2 pr-5 whitespace-nowrap">
					<button
						ref={subscribeButtonRef}
						type="button"
						onClick={() => setIsSubscribeOpen((prev) => !prev)}
						aria-expanded={isSubscribeOpen}
						aria-haspopup="dialog"
						className="group rounded-full border border-blue-500 bg-transparent px-4 py-2 font-medium text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
					>
						<span className="flex items-center justify-center text-[0.75rem] leading-relaxed group-hover:text-white sm:text-[0.875rem] md:text-[0.9375rem] lg:text-[1rem]">
							Stay Connected
						</span>
					</button>
					{!isSearchPage && (
						<Button variant="bodyXSmall" form="outline" className="relative">
							<Link className="expandable-tag-link" href={startSearchHref}>
								Start Search
							</Link>
						</Button>
					)}
				</div>
			</div>

			<SubscribePopover
				isOpen={isSubscribeOpen}
				onClose={() => setIsSubscribeOpen(false)}
				anchorEl={subscribeButtonRef.current}
			/>
		</header>
	);
}
