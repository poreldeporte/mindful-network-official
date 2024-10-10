"use client";
import { ContentHeader } from "./header";
import { BlogsPagination } from "./pagination";
import { useState, useEffect } from "react";
import {
	getBlogsWithOffset,
	getTotalAmount,
} from "../../services/blogs-page.services";
import { BlogModel } from "@/models";
import { BlogCard } from "@/routes/homepage/components";

export const BlogsContent = () => {
	const [blogs, setBlogs] = useState<BlogModel[] | []>([]);
	const [blogAmount, setBlogAmount] = useState(0);
	const [page, setPage] = useState(1);
	const limit = 16;

	useEffect(() => {
		async function fetchData() {
			try {
				const blogsCount = await getTotalAmount();

				if (blogsCount) setBlogAmount(blogsCount);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		return () => {};
	}, []);

	useEffect(() => {
		async function fetchData() {
			try {
				const result = await getBlogsWithOffset({ page, limit });
				if (result) setBlogs(result);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
		return () => {};
	}, [page]);

	return (
		<>
			<ContentHeader />
			<section className="h-max mx-auto w-11/12 xl:w-3/4 gap-5 grid grid-cols-4">
				{blogs ? blogs.map((blog) => <BlogCard {...blog} />) : ""}
			</section>
			<BlogsPagination
				blogAmount={blogAmount}
				limit={limit}
				setPage={setPage}
			/>
		</>
	);
};
