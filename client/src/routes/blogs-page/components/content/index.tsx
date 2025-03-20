"use client";
import { BlogModel } from "@/models";
import { BlogCard } from "@/routes/homepage/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBlogsWithOffset } from "../../services/blogs-page.services";
import { ContentHeader } from "./header";
import { BlogsPagination } from "./pagination";

interface Props {
	blogAmount: number;
}

export const BlogsContent = ({ blogAmount }: Props) => {
	const [blogs, setBlogs] = useState<BlogModel[] | []>([]);
	const [page, setPage] = useState(1);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const limit = 16;

	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const pageParam = searchParams.get("page");
		const initialPage = pageParam ? parseInt(pageParam) : 1;
		setPage(initialPage);
	}, [searchParams]);

	useEffect(() => {
		async function fetchData() {
			setIsLoading(true);
			try {
				const result = await getBlogsWithOffset({
					page,
					limit,
					category: selectedCategory,
				});
				setBlogs(result);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [page, selectedCategory]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		router.push(`/blog?page=${newPage}`);
	};

	return (
		<div className="mx-auto w-11/12 xl:w-3/4">
			<ContentHeader
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<section className="h-max gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
				{isLoading ? (
					<>Loading...</>
				) : blogs && blogs.length ? (
					blogs.map((blog, blogIdx) => (
						<BlogCard index={blogIdx} key={blog._id} {...blog} />
					))
				) : (
					""
				)}
			</section>
			<BlogsPagination
				blogAmount={blogAmount}
				limit={limit}
				setPage={handlePageChange}
				currentPage={page}
			/>
		</div>
	);
};
