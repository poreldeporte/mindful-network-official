import { Button, Typography } from "@/components/ui";
import { MindfulIsotype } from "@/lib/images";
import { EventbriteEvent } from "@/models/eventbrite.model";
import {
	ChevronRight,
	MapPin,
	RotateCcw,
	Info,
	CalendarHeart,
	Map,
	Copy,
	Share2,
} from "lucide-react";
import Image from "next/image";

export const EventDetailsAbout = ({ event }: { event: EventbriteEvent }) => {
	return (
		<section className="min-h-screen mx-auto w-11/12 xl:w-3/4 mt-20 grid lg:grid-cols-12 gap-5">
			<div className="lg:col-span-7 space-y-5">
				<div className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="medium"
						className="font-bold flex items-center gap-2"
					>
						<div className="bg-orange-50 p-2 rounded-full border">
							<MapPin size={20} />
						</div>
						Location
					</Typography>

					<p className="mt-5 font-bold">{event.venue.name}</p>
					<p>
						{event.venue.address.address_1 +
							", " +
							event.venue.address.city +
							", " +
							event.venue.address.region +
							", " +
							event.venue.address.country}
					</p>

					<div className="flex items-center gap-2 mt-5">
						<Map size={20} className="text-green-500" />
						<Copy size={20} className="text-green-500" />
						<Share2 size={20} className="text-green-500" />
					</div>
				</div>
				<div className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="medium"
						className="font-bold flex items-center gap-2"
					>
						<div className="bg-orange-50 p-2 rounded-full border">
							<RotateCcw size={20} />
						</div>
						Refund Policy
					</Typography>

					<p className="mt-5">
						Refunds up to <strong>7 days</strong> before event
					</p>
				</div>
				<div className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="medium"
						className="font-bold flex items-center gap-2"
					>
						<div className="bg-orange-50 p-2 rounded-full border">
							<Info size={20} />
						</div>
						About This Event
					</Typography>

					<p className="mt-5">{event.description.text}</p>
				</div>
				<div className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="medium"
						className="font-bold flex items-center gap-2"
					>
						<div className="bg-orange-50 p-2 rounded-full border">
							<CalendarHeart size={20} />
						</div>
						Organized By
					</Typography>

					<div>
						<div className="flex items-center gap-2.5 mt-5">
							<Image
								src={MindfulIsotype}
								height={64}
								width={64}
								className="object-contain"
								alt="The Mindful Network Isotype"
							/>
							<h3 className="font-bold text-sm">The Mindful Network</h3>
						</div>

						<p className="mt-5">
							The Mindful Network makes mental health resources easy to find and
							accessible to all. Join us as we connect, support, and break the
							stigma—one event at a time.
						</p>
					</div>
				</div>
			</div>
			<div className="lg:col-span-5 relative h-full">
				<div className="bg-white border rounded-xl p-5 sticky top-28">
					<Typography
						as="h2"
						color="black"
						variant="medium"
						className="font-bold"
					>
						{event.name.text}
					</Typography>
					<Typography as="p" color="black" variant="small">
						{event.summary}
					</Typography>
					<Button
						variant="small"
						className="py-2 rounded-full px-4 bg-green-500 hover:bg-green-600 relative w-full mt-5"
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
		</section>
	);
};
