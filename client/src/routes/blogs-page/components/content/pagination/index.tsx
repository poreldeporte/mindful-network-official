import { Button } from "@/components/ui";

interface Props {
	blogAmount: number;
	limit: number;
	setPage: (arg: number) => void;
}

export const BlogsPagination = ({ blogAmount, limit, setPage }: Props) => {
	const pagesAmount = Math.ceil(blogAmount / limit);

	console.log(pagesAmount);

	return (
		<section>
			{Array(pagesAmount)
				.fill(1)
				.map((page) => {
					return (
						<Button variant="medium" key={page} onClick={() => setPage(page)}>
							{page}
						</Button>
					);
				})}
		</section>
	);
};
