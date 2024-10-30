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

export const UseFulLinksContent = ({
	usefulLinksSections,
}: {
	usefulLinksSections: UseFulLinkSection[];
}) => {
	return (
		<section className="flex flex-col mt-24 lg:mt-48 lg:mb-[100px]">
			<Typography variant="title" as="h1" color="black" className="mb-5">
				Useful links
			</Typography>
			<div className="grid lg:grid-cols-2 gap-5">
				{usefulLinksSections.map((usefulLinkSection) => (
					<CategoryCard
						key={usefulLinkSection.sectionTitle}
						{...usefulLinkSection}
					/>
				))}
			</div>
		</section>
	);
};
