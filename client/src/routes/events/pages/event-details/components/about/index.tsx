"use client";

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
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActionButton from "@/components/shared/ActionButtons";

export const EventDetailsAbout = ({ event }: { event: EventbriteEvent }) => {
	const [showShareModal, setShowShareModal] = useState(false);

	const openInGoogleMaps = () => {
		const address = `${event.venue.address.address_1}, ${event.venue.address.city}, ${event.venue.address.region}, ${event.venue.address.country}`;
		const encodedAddress = encodeURIComponent(address);
		window.open(
			`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
			"_blank"
		);
	};

	const copyAddressToClipboard = () => {
		const address = `${event.venue.address.address_1}, ${event.venue.address.city}, ${event.venue.address.region}, ${event.venue.address.country}`;
		navigator.clipboard.writeText(address).catch((err) => {
			console.error("Failed to copy address: ", err);
		});
	};

	const toggleShareModal = () => {
		setShowShareModal(!showShareModal);
	};

	const shareVia = (platform: string) => {
		const shareUrl = window.location.href;
		const eventTitle = event.name.text;
		const encodedUrl = encodeURIComponent(shareUrl);
		const encodedTitle = encodeURIComponent(eventTitle);

		let shareLink = "";

		switch (platform) {
			case "instagram":
				window.open("https://instagram.com", "_blank");
				break;
			case "whatsapp":
				shareLink = `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`;
				window.open(shareLink, "_blank");
				break;
			case "facebook":
				shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
				window.open(shareLink, "_blank");
				break;
			case "twitter":
				shareLink = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
				window.open(shareLink, "_blank");
				break;
			case "email":
				shareLink = `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`;
				window.open(shareLink);
				break;
			default:
				console.log("Share platform not implemented");
		}
	};

	return (
		<section className="min-h-screen mx-auto w-11/12 xl:w-3/4 mt-20 grid lg:grid-cols-12 gap-5">
			<div className="lg:col-span-7 space-y-5">
				<div id="location" className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="body"
						className="font-bold flex items-center gap-2"
					>
						<div className="bg-orange-50 p-2 rounded-full border">
							<MapPin size={20} />
						</div>
						Location
					</Typography>
					<p className="mt-5 font-bold">{event.venue.name}</p>

					<p>{event.venue.address.localized_address_display}</p>
					<div id="action-icons" className="flex items-center gap-2 mt-5">
						<ActionButton
							icon={Map}
							onClick={openInGoogleMaps}
							tooltipText="Open in Maps"
							ariaLabel="Open in Google Maps"
						/>
						<ActionButton
							icon={Copy}
							onClick={copyAddressToClipboard}
							tooltipText="Copy Address"
							ariaLabel="Copy address"
							showCopiedState={true}
						/>
						<ActionButton
							icon={Share2}
							onClick={toggleShareModal}
							tooltipText="Share Event Location"
							ariaLabel="Share event location"
						/>
					</div>
					<AnimatePresence>
						{showShareModal && (
							<>
								<motion.div
									className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									onClick={toggleShareModal}
								>
									<motion.div
										className="bg-white rounded-xl p-5 max-w-md w-full mx-4"
										initial={{ scale: 0.9, opacity: 0, y: 20 }}
										animate={{ scale: 1, opacity: 1, y: 0 }}
										exit={{ scale: 0.9, opacity: 0, y: 20 }}
										transition={{ type: "spring", damping: 25, stiffness: 300 }}
										onClick={(e) => e.stopPropagation()}
									>
										<div className="flex justify-between items-center mb-4">
											<Typography
												as="h3"
												color="black"
												variant="body"
												className="font-bold"
											>
												Share as a post
											</Typography>
											<button
												onClick={toggleShareModal}
												className="text-gray-500 hover:text-gray-700"
												aria-label="Close share modal"
											>
												✕
											</button>
										</div>

										<div className="flex items-center justify-around">
											<div className="flex flex-col items-center">
												<button
													onClick={() => shareVia("whatsapp")}
													className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-1 hover:bg-blue-600"
													aria-label="Share on WhatsApp"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="white"
													>
														<path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c0-5.445 4.455-9.885 9.942-9.885a9.865 9.865 0 0 1 7.021 2.91 9.788 9.788 0 0 1 2.909 6.99c-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a12.062 12.062 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"></path>
													</svg>
												</button>
												<span className="text-xs">WhatsApp</span>
											</div>
											<div className="flex flex-col items-center">
												<button
													onClick={() => shareVia("facebook")}
													className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mb-1 hover:bg-blue-700"
													aria-label="Share on Facebook"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="white"
													>
														<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
													</svg>
												</button>
												<span className="text-xs">Facebook</span>
											</div>
											<div className="flex flex-col items-center">
												<button
													onClick={() => shareVia("twitter")}
													className="w-12 h-12 rounded-full bg-black flex items-center justify-center mb-1 hover:bg-gray-800"
													aria-label="Share on X/Twitter"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="white"
														stroke-width="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path stroke="none" d="M0 0h24v24H0z" fill="none" />
														<path d="M4 4l11.733 16h4.267l-11.733 -16z" />
														<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
													</svg>
												</button>
												<span className="text-xs">X</span>
											</div>
											<div className="flex flex-col items-center">
												<button
													onClick={() => shareVia("email")}
													className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-1 hover:bg-gray-300"
													aria-label="Share via Email"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
														<polyline points="22,6 12,13 2,6"></polyline>
													</svg>
												</button>
												<span className="text-xs">Email</span>
											</div>
										</div>

										<div className="mt-6 flex">
											<input
												type="text"
												value={window.location.href}
												className="flex-1 border rounded-l-md py-2 px-3"
												readOnly
											/>
											<button
												className="bg-blue-500 text-white rounded-r-md px-4 hover:bg-blue-600 flex items-center gap-1"
												onClick={() => {
													navigator.clipboard.writeText(window.location.href);
												}}
											>
												Copy <Copy size={16} />
											</button>
										</div>
									</motion.div>
								</motion.div>
							</>
						)}
					</AnimatePresence>
				</div>
				<div id="refund-policy" className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="body"
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
				<div id="about-this-event" className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="body"
						className="font-bold flex items-center gap-2"
					>
						<div className="bg-orange-50 p-2 rounded-full border">
							<Info size={20} />
						</div>
						About This Event
					</Typography>

					<p className="mt-5">{event.description.text}</p>
				</div>
				<div id="organized-by" className="bg-white border rounded-xl p-5">
					<Typography
						as="h2"
						color="black"
						variant="body"
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
						variant="body"
						className="font-bold"
					>
						{event.name.text}
					</Typography>
					<Typography as="p" color="black" variant="bodySmall">
						{event.summary}
					</Typography>
					<Button
						variant="bodySmall"
						className="py-2 rounded-full px-4 bg-blue-500 hover:bg-blue-600 relative w-full mt-5"
						form="outline"
					>
						<a
							aria-label={`Get tickets for ${event.name.text}`}
							href={event.url}
							className="expandable-tag-link"
							target="_blank"
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
