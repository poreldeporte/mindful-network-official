"use client";

import { CompanyDetails, ResourcesKey } from "@/models";
import { getAllResources } from "@/services";
import { generateResourceKeys } from "@/utilities";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Typography } from "../ui";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
} from "@/components/ui/Shadcn-select";

export function Topbar({ companyDetails }: { companyDetails: CompanyDetails }) {
	const [resources, setResources] = useState<ResourcesKey[]>([]);
	const router = useRouter();
	const pathname = usePathname();

	const handleSelectChange = (value: string) => {
		const selectedResource = resources.find(
			(resource) => resource.label === value
		);
		if (selectedResource) {
			router.push(`/search?resource=${selectedResource.key}`);
		}
	};

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
		<header className="fixed top-5 left-1/2 -translate-x-1/2 w-11/12 2xl:w-3/4 bg-white shadow-sm rounded-full overflow-hidden hidden xl:block z-50">
			<div className="flex items-center justify-between">
				<Link
					href={"/"}
					className="w-60 h-14 xl:w-80 xl:h-20 flex content-center space-x-3 items-center py-2 pl-10 pr-20 bg-green-500 hover:bg-green-600 transition-colors rounded-ee-full"
				>
					{companyDetails?.logo && (
						<Image
							alt={companyDetails.logoAlt || "The Mindful Network Logo"}
							className="w-full h-full filter invert brightness-0 object-contain"
							src={companyDetails.logo}
							width={400}
							height={400}
							priority
						/>
					)}
				</Link>

				<nav className="flex items-center justify-center space-x-4 pr-32 flex-1 flex-grow">
					<Link href="/about">
						<Typography
							variant="bodyXSmall"
							color={pathname === "/about" ? "green" : "darkGray"}
							className={pathname === "/about" ? "font-medium" : ""}
						>
							About
						</Typography>
					</Link>
					<Select onValueChange={handleSelectChange}>
						<SelectTrigger className="w-max z-50 border-none text-gray-700 px-0">
							<Typography
								variant="bodyXSmall"
								color={pathname === "/search" ? "green" : "darkGray"}
								className={pathname === "/search" ? "font-medium" : ""}
							>
								Find Professionals
							</Typography>
						</SelectTrigger>
						<SelectContent className="bg-white p-5">
							<SelectGroup>
								<SelectLabel>Find Professionals</SelectLabel>
								{resources.map((resource) => (
									<SelectItem
										className="w-max pr-8 cursor-pointer"
										key={resource.key}
										value={resource.label}
										aria-label={`Search for ${resource.label} professionals`}
									>
										{resource.label}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
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

				<div className="p-2 pr-5">
					<Button
						variant="bodyXSmall"
						className="py-2 rounded-full px-4 bg-green-500 hover:bg-green-600 relative"
						form="primary"
					>
						<Link className="expandable-tag-link" href={"/search"}>
							Start Search
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
