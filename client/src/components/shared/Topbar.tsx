"use client";

import { resources } from "@/lib/constants";
import { MindfulIsotype, MindfulLogo } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui";

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
	const router = useRouter();
	const pathname = usePathname();

	const handleSelectChange = (value: string) => {
		const selectedResource = resources.find(
			(resource) => resource.title === value
		);
		if (selectedResource) {
			router.push(selectedResource.path);
		}
	};

	return (
		<header className="fixed top-5 left-1/2 -translate-x-1/2 w-11/12 xl:w-3/4 bg-white shadow-sm rounded-full overflow-hidden hidden lg:block z-50">
			<div className="flex items-center justify-between">
				<Link
					href={"/"}
					className="flex content-center space-x-3 items-center py-2 pl-10 pr-20 bg-green-500 hover:bg-green-600 transition-colors rounded-ee-full"
				>
					<Image
						alt="Mindful Logo"
						className="w-16 h-14 filter invert brightness-0"
						src={MindfulIsotype}
					/>
					<Image
						alt="Mindful Logo"
						className="w-28 h-12 filter invert brightness-0"
						src={MindfulLogo}
					/>
				</Link>

				<nav className="flex items-center justify-center space-x-4 pr-32 flex-1 flex-grow">
					<Link
						href="/about"
						className={`${
							pathname === "/about"
								? "text-green-500 font-medium"
								: "text-gray-500 font-normal"
						}`}
					>
						About
					</Link>
					<Select onValueChange={handleSelectChange}>
						<SelectTrigger className="w-[100px] z-50 border-none text-gray-500 px-0">
							<SelectValue placeholder="Resources" />
						</SelectTrigger>
						<SelectContent className="bg-white p-5">
							<SelectGroup>
								<SelectLabel>Resources</SelectLabel>
								{resources.map((resource) => (
									<SelectItem
										className="w-max pr-8"
										key={resource.key}
										value={resource.title}
									>
										{resource.title}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
					<Link
						href="/useful-links"
						className={`${
							pathname === "/useful-links"
								? "text-green-500 font-medium"
								: "text-gray-500 font-normal"
						}`}
					>
						Useful links
					</Link>
					<Link
						href="/blog"
						className={`${
							pathname === "/blog"
								? "text-green-500 font-medium"
								: "text-gray-500 font-normal"
						}`}
					>
						Blog
					</Link>
				</nav>

				<div className="p-2 pr-5">
					<Button
						variant="small"
						className="py-2 rounded-full px-4 bg-green-500 hover:bg-green-600"
						form="primary"
					>
						<Link href={"/search"}>Start Search</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
