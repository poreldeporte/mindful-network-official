"use client";
import { Badge, Typography } from "@/components/ui";
import { getBlogCategories } from "@/routes/blogs-page/services/blogs-page.services";
import { useEffect, useState } from "react";

interface Props {
	selectedCategory: string;
	setSelectedCategory: (arg: string) => void;
	// setSelectedFilter: (arg: string) => void;
}

export const ContentHeader = ({
	selectedCategory,
	setSelectedCategory,
	// setSelectedFilter,
}: Props) => {
	const [blogCategories, setBlogCategories] = useState([]);
	useEffect(() => {
		const fetchCategories = async () => {
			const categories = await getBlogCategories();
			setBlogCategories(categories);
		};

		fetchCategories();
	}, []);

	const handleCategoryClick = (categoryValue: string) => {
		if (categoryValue === selectedCategory) {
			setSelectedCategory("");
		} else {
			setSelectedCategory(categoryValue);
		}
	};

	// const handleSelectChange = (value: string) => {
	// 	setSelectedFilter(value);
	// };

	return (
		<header className="my-10">
			<div className="flex flex-col z-10">
				<Typography color="black" as="h2" variant="h3" className="font-bold">
					Blog
				</Typography>
				<Typography color="darkGray" as="p" variant="bodySmall">
					Discover expert insights, self-care tips, and the latest trends in
					mental health and wellness.
				</Typography>
			</div>

			<div className="grid grid-cols-1 my-5 gap-5">
				<div className="flex items-center flex-wrap gap-2">
					{blogCategories.map((category) => (
						<Badge
							isSelected={category.value === selectedCategory}
							key={category.value}
							onClick={() => handleCategoryClick(category.value)}
						>
							{category.title}
						</Badge>
					))}
				</div>
			</div>
		</header>
	);
};
