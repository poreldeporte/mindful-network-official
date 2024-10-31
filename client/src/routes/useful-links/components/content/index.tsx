import Link from "next/link";
import { Typography } from "@/components/ui";
import { CircleChevronRight } from "lucide-react";
import { UseFulLinkSection } from "@/models";

const CategoryCard = (useFulLinkSection: UseFulLinkSection) => {
	return (
		<article className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">
			<div className="mb-5 flex items-center space-x-2">
				<Typography
					color="black"
					variant="medium"
					as="h3"
					className="font-bold"
				>
					{useFulLinkSection.sectionTitle}
				</Typography>
			</div>
			<div className="pl-1">
				<ul>
					{useFulLinkSection.links.map(({ label, type, url }) => (
						<li
							key={label}
							className="flex items-center space-x-2 mb-2 border-e-1 underline underline-offset-1"
						>
							<CircleChevronRight className="h-6 w-6 text-gray-700" />
							{type === "internal" ? (
								<Link href={url} className="pl-1 lg:pl-2">
									<Typography variant="small" color="black" as="p">
										{label}
									</Typography>
								</Link>
							) : (
								<a href={url} className="pl-1 lg:pl-2">
									<Typography variant="small" color="black" as="p">
										{label}
									</Typography>
								</a>
							)}
						</li>
					))}
				</ul>
			</div>
		</article>
	);
};

const CategoryCardSkeleton = ({ numberOfLinks = 4 }) => {
	return (
		<article className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 animate-pulse">
			<div className="mb-5 flex items-center space-x-2">
				<div className="h-6 bg-gray-200 rounded w-48"></div>
			</div>

			<div className="pl-1">
				<ul className="space-y-2">
					{Array.from({ length: numberOfLinks }).map((_, index) => (
						<li key={index} className="flex items-center space-x-2">
							<div className="h-6 w-6 bg-gray-200 rounded-full"></div>

							<div className="h-4 bg-gray-200 rounded w-3/4 pl-1 lg:pl-2"></div>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
};

export const UseFulLinksContent = ({
	usefulLinksSections = [],
}: {
	usefulLinksSections: UseFulLinkSection[];
}) => {
	return (
		<section className="h-max mx-auto w-11/12 xl:w-3/4 flex flex-col mt-24 lg:mt-48 lg:mb-[100px]">
			<Typography variant="title" as="h1" color="black" className="mb-5">
				Useful links
			</Typography>
			<div className="grid lg:grid-cols-2 gap-5">
				{usefulLinksSections.length
					? usefulLinksSections.map((usefulLinkSection) => (
							<CategoryCard
								key={usefulLinkSection.sectionTitle}
								{...usefulLinkSection}
							/>
						))
					: [1, 2, 3, 4].map((item) => <CategoryCardSkeleton key={item} />)}
			</div>
		</section>
	);
};
