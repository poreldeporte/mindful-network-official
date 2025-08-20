import { Button } from "@/components/ui";

interface Props {
	blogAmount: number;
	limit: number;
	setPage: (arg: number) => void;
	currentPage: number;
}

export const BlogsPagination = ({
	blogAmount,
	limit,
	setPage,
	currentPage,
}: Props) => {
	const pagesAmount = Math.ceil(blogAmount / limit);

	return (
		<section className="flex items-center justify-center w-full my-10">
			{Array.from({ length: pagesAmount }, (_, index) => {
				const pageNumber = index + 1;
				return (
					<Button
						variant="bodySmall"
						className="px-3 py-0.5 rounded-lg"
						key={pageNumber}
						isSelected={pageNumber === currentPage}
						onClick={() => setPage(pageNumber)}
					>
						{pageNumber}
					</Button>
				);
			})}
		</section>
	);
};
