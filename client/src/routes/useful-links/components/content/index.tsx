import Link from "next/link";
import { Typography } from "@/components/ui";
import { CircleChevronRight } from "lucide-react";
import { usefulLinks } from "@/lib/constants";
import { IconProps } from "@tabler/icons-react";

interface CategoryCardProps {
	title: string;
	links: Array<string>;
	icon: React.ComponentType<IconProps>;
}

const CategoryCard = ({ title, links, icon: Icon }: CategoryCardProps) => {
	return (
		<article className="bg-white p-10 rounded-xl shadow-sm border border-gray-100">
			<div className="mb-5 flex items-center space-x-2">
				<Icon className="w-8 h-8" />
				<Typography
					color="black"
					variant="medium"
					as="h3"
					className="font-bold"
				>
					{title}
				</Typography>
			</div>
			<div className="pl-1">
				<ul>
					{links.map((link, index) => (
						<li
							key={index}
							className="flex items-center space-x-2 space-y-1 border-e-1 underline underline-offset-1"
						>
							<CircleChevronRight className="h-6 w-6 text-gray-700" />
							<Link href="#">
								<Typography variant="small" color="black" as="p">
									{link}
								</Typography>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</article>
	);
};

export const UseFulLinksContent = () => {
	return (
		<section className="flex flex-col mt-24 lg:mt-48 lg:mb-[100px]">
			<Typography variant="title" as="h1" color="black" className="mb-5">
				Useful links
			</Typography>
			<div className="grid lg:grid-cols-2 gap-5">
				{usefulLinks.map((category) => (
					<CategoryCard key={category.id} {...category} />
				))}
			</div>
		</section>
	);
};
