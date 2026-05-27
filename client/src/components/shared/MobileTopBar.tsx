"use client";

import { CompanyDetails } from "@/models";
import { clearGlobalInteractionLocks } from "@/utilities/clear-global-interaction-locks.utility";
import { AnimatePresence, motion } from "framer-motion";
import {
	CalendarDays,
	ChevronRight,
	GraduationCap,
	Home,
	Info,
	LifeBuoy,
	Mail,
	Menu,
	Newspaper,
	Search,
	type LucideIcon,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SubscribePopover } from "./SubscribePopover";

const overlayVariants = {
	closed: { opacity: 0 },
	open: { opacity: 1 },
};

const panelVariants = {
	closed: { opacity: 0, y: -8 },
	open: { opacity: 1, y: 0 },
};

type NavItem = {
	label: string;
	href: string;
	icon: LucideIcon;
	isActive: boolean;
};

export function MobileTopBar({
	companyDetails,
}: {
	companyDetails: CompanyDetails;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
	const subscribeButtonRef = useRef<HTMLButtonElement | null>(null);
	const pathname = usePathname();
	const directoryHref = pathname.startsWith("/students")
		? "/students/search"
		: "/search";
	const isSearchPage =
		pathname === "/search" || pathname === "/students/search";

	const navItems: NavItem[] = useMemo(
		() => [
			{
				label: "Home",
				href: "/",
				icon: Home,
				isActive: pathname === "/",
			},
			{
				label: "Find Professionals",
				href: directoryHref,
				icon: Search,
				isActive: pathname === "/search" || pathname === "/students/search",
			},
			{
				label: "Students",
				href: "/students",
				icon: GraduationCap,
				isActive: pathname.startsWith("/students"),
			},
			{
				label: "Support Links",
				href: "/support-links",
				icon: LifeBuoy,
				isActive: pathname === "/support-links",
			},
			{
				label: "Blog",
				href: "/blog",
				icon: Newspaper,
				isActive: pathname === "/blog",
			},
			{
				label: "Events",
				href: "/events",
				icon: CalendarDays,
				isActive: pathname === "/events",
			},
			{
				label: "About",
				href: "/about",
				icon: Info,
				isActive: pathname === "/about",
			},
		],
		[directoryHref, pathname]
	);

	const closeHeader = () => setIsOpen(false);

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

	useEffect(() => {
		closeHeader();
	}, [pathname]);

	useEffect(() => {
		if (!isOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen]);

	return (
		<header className="site-header fixed inset-x-0 top-0 z-50 xl:hidden">
			<div className="border-b border-blue-100 bg-white">
				<div className="mx-auto flex h-16 w-11/12 max-w-[1440px] items-center justify-between">
					<Link
						onClick={closeHeader}
						href="/"
						className="flex items-center"
						aria-label="Go to homepage"
					>
						{companyDetails?.logo && (
							<Image
								alt={companyDetails.logoAlt || "The Mindful Network Logo"}
								className="h-11 w-auto object-contain"
								src={companyDetails.logo}
								width={400}
								height={140}
								priority
							/>
						)}
					</Link>

					<button
						type="button"
						onClick={() => setIsOpen((prev) => !prev)}
						className="inline-flex h-9 w-9 items-center justify-center text-blue-600 transition hover:text-blue-700"
						aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isOpen}
					>
						{isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<>
						<motion.button
							type="button"
							initial="closed"
							animate="open"
							exit="closed"
							variants={overlayVariants}
							transition={{ duration: 0.16, ease: "easeOut" }}
							className="fixed inset-0 z-40 bg-slate-900/30"
							onClick={closeHeader}
							aria-label="Close mobile menu"
						/>

						<motion.nav
							initial="closed"
							animate="open"
							exit="closed"
							variants={panelVariants}
							transition={{ duration: 0.18, ease: "easeOut" }}
							className="fixed inset-x-0 top-16 z-50 border-b border-blue-100 bg-white shadow-xl"
							aria-label="Mobile navigation"
						>
							<div className="mx-auto flex max-h-[calc(100vh-4rem)] w-11/12 max-w-[1440px] flex-col gap-2 overflow-y-auto py-3">
								{!isSearchPage && (
									<Link
										onClick={closeHeader}
										href={directoryHref}
										className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-blue-700"
									>
										Start Search
									</Link>
								)}

								<button
									ref={subscribeButtonRef}
									type="button"
									onClick={() => {
										closeHeader();
										setIsSubscribeOpen(true);
									}}
									className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-3 py-2 text-[13px] font-semibold text-blue-600 transition hover:bg-blue-50"
									aria-haspopup="dialog"
									aria-expanded={isSubscribeOpen}
								>
									<Mail className="h-3.5 w-3.5" />
									Stay Connected
								</button>

								<ul className="grid grid-cols-1 gap-1.5 pb-1">
									{navItems.map((item) => {
										const Icon = item.icon;

										return (
											<li key={item.href}>
												<Link
													onClick={closeHeader}
													href={item.href}
													className={`flex items-center justify-between rounded-lg border px-2.5 py-2 transition ${
														item.isActive
															? "border-blue-200 bg-blue-50 text-blue-700"
															: "border-gray-100 bg-white text-slate-700 hover:border-blue-100 hover:bg-blue-50/50"
													}`}
												>
													<span className="flex items-center gap-2 text-[13px] font-medium">
														<Icon className="h-3.5 w-3.5" />
														{item.label}
													</span>
													<ChevronRight className="h-3.5 w-3.5 opacity-60" />
												</Link>
											</li>
										);
									})}
								</ul>
							</div>
						</motion.nav>
					</>
				)}
			</AnimatePresence>

			<SubscribePopover
				isOpen={isSubscribeOpen}
				onClose={() => setIsSubscribeOpen(false)}
				anchorEl={subscribeButtonRef.current}
			/>
		</header>
	);
}
