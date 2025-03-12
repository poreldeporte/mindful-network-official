"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { eventbriteEvents } from "@/lib/constants";
import { EventCard } from "@/components/shared";
import Image from "next/image";
import { Typography } from "@/components/ui";

export const EventsContainer = () => {
	// const [events, setEvents] =
	// 	useState<EventbriteEventsResponse>(eventbriteEvents);
	const [page, setPage] = useState(1);
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
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		}

		fetchData();
	}, [page]);

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		router.push(`/blog?page=${newPage}`);
	};

	return (
		<div className="mx-auto w-11/12 xl:w-3/4 pb-20">
			<header className="py-10">
				<div className="flex flex-col z-10">
					<Typography
						color="black"
						as="h2"
						variant="large"
						className="font-bold"
					>
						Events
					</Typography>
					<Typography color="darkGray" as="p" variant="medium">
						Discover expert insights, self-care tips, and the latest trends in
						mental health and wellness.
					</Typography>
				</div>
			</header>
			<section className="h-max gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
				{isLoading ? (
					<>Loading...</>
				) : eventbriteEvents && eventbriteEvents.events.length ? (
					eventbriteEvents.events.map((event, eventIdx) => (
						<EventCard key={event.id} event={event} index={eventIdx} />
					))
				) : (
					""
				)}
			</section>
		</div>
	);
};
