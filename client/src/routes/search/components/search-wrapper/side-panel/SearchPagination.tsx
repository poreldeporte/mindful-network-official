"use client";

import { Button, Typography } from "@/components/ui";

type PageItem = number | "ellipsis-start" | "ellipsis-end";

interface SearchPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const buildPageItems = (
	currentPage: number,
	totalPages: number
): PageItem[] => {
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, index) => index + 1);
	}

	const items: PageItem[] = [1];
	let start = Math.max(2, currentPage - 1);
	let end = Math.min(totalPages - 1, currentPage + 1);

	if (currentPage <= 3) {
		start = 2;
		end = 4;
	}

	if (currentPage >= totalPages - 2) {
		start = totalPages - 3;
		end = totalPages - 1;
	}

	if (start > 2) {
		items.push("ellipsis-start");
	}

	for (let page = start; page <= end; page += 1) {
		items.push(page);
	}

	if (end < totalPages - 1) {
		items.push("ellipsis-end");
	}

	items.push(totalPages);

	return items;
};

export const SearchPagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: SearchPaginationProps) => {
	if (totalPages <= 1) return null;

	const pageItems = buildPageItems(currentPage, totalPages);

	return (
		<nav
			className="flex flex-wrap items-center justify-center gap-2 px-5 pb-6"
			aria-label="Pagination"
		>
			<Button
				type="button"
				variant="bodyXSmall"
				form="outline"
				className="h-8 px-3 !py-0"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage <= 1}
			>
				Prev
			</Button>

			{pageItems.map((item, index) => {
				if (typeof item !== "number") {
					return (
						<Typography
							key={`${item}-${index}`}
							as="span"
							variant="bodyXSmall"
							color="lightGray"
							className="px-1 text-gray-400"
						>
							...
						</Typography>
					);
				}

				const isCurrent = item === currentPage;

				return (
					<Button
						type="button"
						key={item}
						variant="bodyXSmall"
						form="outline"
						isSelected={isCurrent}
						className="h-8 w-8 !p-0"
						aria-current={isCurrent ? "page" : undefined}
						onClick={() => onPageChange(item)}
					>
						{item}
					</Button>
				);
			})}

			<Button
				type="button"
				variant="bodyXSmall"
				form="outline"
				className="h-8 px-3 !py-0"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage >= totalPages}
			>
				Next
			</Button>
		</nav>
	);
};
