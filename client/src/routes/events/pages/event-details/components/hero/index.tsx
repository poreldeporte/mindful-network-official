"use client";

import { Typography } from "@/components/ui";
import { EventbriteEvent } from "@/models/eventbrite.model";
import { formatEventDate } from "@/utilities/format-event-date.utility";
import { Button } from "@/components/ui";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";

export const EventDetailsHero = ({ event }: { event: EventbriteEvent }) => {
	const navbarRef = useRef(null);

	const scrollToSection = (e, sectionId) => {
		e.preventDefault();

		const section = document.getElementById(sectionId);

		if (section) {
			const offsetPosition = section.offsetTop - 110;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};
	return (
		<section className="min-h-screen">
			<div
				style={{
					backgroundImage: `url(${event.logo.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className="h-[70vh] w-full"
			/>

			<div className="mx-auto w-11/12 xl:w-3/4 mt-5">
				<Typography
					id="event-heading"
					className="font-antic mb-5 leading-none"
					as="h1"
					color="black"
					variant="title"
				>
					{event.name.text}
				</Typography>

				<div className="w-full">
					<div className="border-b border-[#525252] grid lg:grid-cols-2 py-10">
						<div>
							<Typography as="p" color="black" variant="small">
								<strong>{formatEventDate(event.start.utc)}</strong>
							</Typography>
							<Typography as="p" color="black" variant="small">
								{event.venue.address.address_1}
							</Typography>
						</div>

						<div className="space-y-5">
							<Typography as="p" color="black" variant="medium">
								{event.summary}
							</Typography>

							<Button
								variant="small"
								className="py-2 rounded-full px-4 bg-green-500 hover:bg-green-600 relative"
								form="primary"
							>
								<a
									aria-label={`Get tickets for ${event.name.text}`}
									href={event.url}
									className="expandable-tag-link"
								>
									Get Tickets Now
								</a>
								<ChevronRight size={20} />
							</Button>
						</div>
					</div>

					<nav
						ref={navbarRef}
						className="flex items-center gap-5 text-[14px] font-bold pt-2.5 z-10"
					>
						<a href="#location" onClick={(e) => scrollToSection(e, "location")}>
							Location
						</a>
						<a
							href="#refund-policy"
							onClick={(e) => scrollToSection(e, "refund-policy")}
						>
							Refund Policy
						</a>
						<a
							href="#about-this-event"
							onClick={(e) => scrollToSection(e, "about-this-event")}
						>
							About This Event
						</a>
						<a
							href="#organized-by"
							onClick={(e) => scrollToSection(e, "organized-by")}
						>
							Organized By
						</a>
					</nav>
				</div>
			</div>
		</section>
	);
};
