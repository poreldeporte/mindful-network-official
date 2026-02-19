"use client";

import { CompanyDetails, ResourcesKey } from "@/models";
import { getAllResources } from "@/services";
import { generateResourceKeys } from "@/utilities";
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
	Phone,
	Search,
	Sparkles,
	type LucideIcon,
	X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const overlayVariants = {
	closed: { opacity: 0 },
	open: { opacity: 1 },
};

const drawerVariants = {
	closed: { x: "100%" },
	open: { x: 0 },
};

const itemVariants = {
	closed: { opacity: 0, y: 8 },
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
	const [resources, setResources] = useState<ResourcesKey[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const isSearchPage =
		pathname === "/search" || pathname === "/students/search";
	const directoryHref = pathname.startsWith("/students")
		? "/students/search"
		: "/search";
	const startSearchHref = directoryHref;
	const featuredResources = resources.slice(0, 6);

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
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen]);

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
		setIsOpen(false);
	}, [pathname]);

	return (
		<header className="site-header fixed inset-x-0 top-0 z-50 xl:hidden">
			<div className="border-b border-blue-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
				<div className="mx-auto flex h-20 w-11/12 max-w-[1440px] items-center justify-between">
					<Link
						onClick={closeHeader}
						href={"/"}
						className="flex items-center"
						aria-label="Go to homepage"
					>
						{companyDetails?.logo && (
							<Image
								alt={companyDetails.logoAlt || "The Mindful Network Logo"}
								className="h-14 w-auto object-contain"
								src={companyDetails.logo}
								width={400}
								height={160}
								priority
							/>
						)}
					</Link>

					<button
						type="button"
						onClick={() => setIsOpen((prev) => !prev)}
						className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-600 shadow-sm transition hover:bg-blue-50"
						aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
						aria-expanded={isOpen}
					>
						{isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
							transition={{ duration: 0.18, ease: "easeOut" }}
							className="fixed inset-0 z-40 bg-slate-900/45 backdrop-blur-[2px]"
							onClick={closeHeader}
							aria-label="Close mobile menu"
						/>

						<motion.aside
							initial="closed"
							animate="open"
							exit="closed"
							variants={drawerVariants}
							transition={{ type: "spring", stiffness: 360, damping: 34 }}
							className="fixed inset-y-0 right-0 z-50 flex w-[92vw] max-w-[390px] flex-col border-l border-blue-100 bg-white shadow-2xl"
						>
							<div className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 p-5 text-white">
								<div
									className="pointer-events-none absolute -top-14 -right-8 h-44 w-44 rounded-full bg-white/20 blur-2xl"
									aria-hidden
								/>
								<div
									className="pointer-events-none absolute -bottom-10 -left-8 h-36 w-36 rounded-full bg-cyan-200/35 blur-2xl"
									aria-hidden
								/>

								<div className="relative z-10 flex items-start justify-between gap-3">
									<div className="space-y-2">
										<p className="text-[11px] font-semibold tracking-[0.16em] text-blue-100">
											THE MINDFUL NETWORK
										</p>
										<h2 className="text-xl font-semibold leading-tight">
											Find Support Faster
										</h2>
										<p className="text-sm text-blue-50">
											Explore care options, resources, and verified
											professionals.
										</p>
									</div>

									<button
										type="button"
										onClick={closeHeader}
										className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
										aria-label="Close mobile menu panel"
									>
										<X className="h-4.5 w-4.5" />
									</button>
								</div>

								<div className="relative z-10 mt-4 space-y-2">
									{!isSearchPage && (
										<Link
											onClick={closeHeader}
											href={startSearchHref}
											className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/15 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/25"
										>
											Start Search
											<ChevronRight className="h-4 w-4" />
										</Link>
									)}
									<Link
										onClick={closeHeader}
										href="/students/search"
										className="flex items-center justify-between rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
									>
										Students Directory
										<ChevronRight className="h-4 w-4" />
									</Link>
								</div>
							</div>

							<div className="flex-1 space-y-6 overflow-y-auto p-5">
								<nav aria-label="Mobile navigation">
									<motion.ul
										initial="closed"
										animate="open"
										variants={{
											open: {
												transition: { staggerChildren: 0.03, delayChildren: 0.02 },
											},
										}}
										className="space-y-2"
									>
										{navItems.map((item) => {
											const Icon = item.icon;
											return (
												<motion.li key={item.href} variants={itemVariants}>
													<Link
														onClick={closeHeader}
														href={item.href}
														className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
															item.isActive
																? "border-blue-200 bg-blue-50 text-blue-700"
																: "border-transparent bg-slate-50 text-slate-700 hover:border-blue-100 hover:bg-blue-50/60"
														}`}
													>
														<span className="flex items-center gap-3 text-sm font-medium">
															<Icon className="h-4.5 w-4.5" />
															{item.label}
														</span>
														<ChevronRight className="h-4 w-4 opacity-65" />
													</Link>
												</motion.li>
											);
										})}
									</motion.ul>
								</nav>

								{featuredResources.length > 0 && (
									<section aria-label="Featured resources" className="space-y-3">
										<div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
											<Sparkles className="h-3.5 w-3.5 text-blue-500" />
											Popular Filters
										</div>
										<div className="grid grid-cols-2 gap-2">
											{featuredResources.map((resource) => (
												<Link
													onClick={closeHeader}
													key={resource.key}
													href={`/search?resource=${resource.key}`}
													className="truncate rounded-xl border border-blue-100 bg-white px-3 py-2 text-[11px] font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
												>
													{resource.label}
												</Link>
											))}
										</div>
										<Link
											onClick={closeHeader}
											href="/search"
											className="inline-flex items-center gap-1 text-[12px] font-semibold text-blue-600"
										>
											View all filters
											<ChevronRight className="h-3.5 w-3.5" />
										</Link>
									</section>
								)}
							</div>

							{(companyDetails?.phoneNumber || companyDetails?.email) && (
								<div className="space-y-3 border-t border-blue-100 bg-slate-50 p-5">
									{companyDetails?.phoneNumber && (
										<a
											href={`tel:${companyDetails.phoneNumber.replace(/\s+/g, "")}`}
											className="flex items-center gap-2 text-sm font-medium text-slate-700"
										>
											<Phone className="h-4 w-4 text-blue-500" />
											{companyDetails.phoneNumber}
										</a>
									)}
									{companyDetails?.email && (
										<a
											href={`mailto:${companyDetails.email}`}
											className="flex items-center gap-2 text-sm font-medium text-slate-700"
										>
											<Mail className="h-4 w-4 text-blue-500" />
											{companyDetails.email}
										</a>
									)}
								</div>
							)}
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</header>
	);
}
