"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui";
import { getCompanyDetails } from "@/services/company-details.service";
import { getAllResources } from "@/services";
import { useState, useEffect } from "react";
import { CompanyDetails, ResourcesKey } from "@/models";
import { generateResourceKeys } from "@/utilities";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Shadcn-select";

export function Topbar() {
	const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(
		null
	);
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
				const [company, resources] = await Promise.all([
					getCompanyDetails(),
					getAllResources(),
				]);

				const resourceKeys = generateResourceKeys(resources);
				setResources(resourceKeys);
				setCompanyDetails(company);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<header className="fixed top-5 left-1/2 -translate-x-1/2 w-11/12 xl:w-3/4 bg-white shadow-sm rounded-full overflow-hidden hidden lg:block z-50">
			<div className="flex items-center justify-between">
				<Link
					href={"/"}
					className="w-60 h-14 xl:w-80 xl:h-20 flex content-center space-x-3 items-center py-2 pl-10 pr-20 bg-green-500 hover:bg-green-600 transition-colors rounded-ee-full"
				>
					{companyDetails?.logo && (
						<Image
							alt="Mindful Logo"
							className="w-full h-full filter invert brightness-0 object-contain"
							src={companyDetails.logo}
							width={400}
							height={400}
							priority
						/>
					)}
				</Link>

				<nav className="flex items-center justify-center space-x-4 pr-32 flex-1 flex-grow">
					<Link
						href="/about"
						className={`${
							pathname === "/about"
								? "text-green-500 font-medium"
								: "text-gray-700 font-normal"
						}`}
					>
						About
					</Link>
					<Select onValueChange={handleSelectChange}>
						<SelectTrigger className="w-[160px] z-50 border-none text-gray-700 px-0">
							<SelectValue placeholder="Find Professionals" />
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
					<Link
						href="/support-links"
						className={`${
							pathname === "/support-links"
								? "text-green-500 font-medium"
								: "text-gray-700 font-normal"
						}`}
					>
						Support Links
					</Link>
					<Link
						href="/blog"
						className={`${
							pathname === "/blog"
								? "text-green-500 font-medium"
								: "text-gray-700 font-normal"
						}`}
					>
						Blog
					</Link>
					<Link
						href="/events"
						className={`${
							pathname === "/events"
								? "text-green-500 font-medium"
								: "text-gray-700 font-normal"
						}`}
					>
						Events
					</Link>
				</nav>

				<div className="p-2 pr-5">
					<Button
						variant="small"
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
