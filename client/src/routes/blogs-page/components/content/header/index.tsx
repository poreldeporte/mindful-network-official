"use client";

import { Badge, Typography } from "@/components/ui";
import { getBlogCategories } from "@/routes/blogs-page/services/blogs-page.services";
import { useEffect, useState } from "react";

interface BlogCategoryOption {
	title: string;
	value: string;
}

interface Props {
	selectedCategory: string;
	setSelectedCategory: (arg: string) => void;
}

export const ContentHeader = ({
	selectedCategory,
	setSelectedCategory,
}: Props) => {
	const [blogCategories, setBlogCategories] = useState<BlogCategoryOption[]>(
		[]
	);

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

	return (
		<header className="my-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 via-white to-slate-50 p-6 lg:my-10 lg:p-8">
			<div className="flex flex-col z-10">
				<Typography color="black" as="h2" variant="h3" className="font-antic">
					Latest Articles and Guides
				</Typography>
				<Typography
					color="darkGray"
					as="p"
					variant="bodyXSmall"
					className="mt-2"
				>
					Browse evidence-informed insights, self-care strategies, and practical
					mental health guidance.
				</Typography>
			</div>

			<div className="mt-5 flex items-center flex-wrap gap-2">
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
		</header>
	);
};
