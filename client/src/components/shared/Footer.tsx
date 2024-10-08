import { resources } from "@/lib/constants";
import { MindfulIsotype, MindfulLogo } from "@/lib/images";
import Image from "next/image";
import Link from "next/link";
import { Typography } from "../ui";

export function Footer() {
	return (
		<footer className="page-width py-10">
			<div className="flex flex-col lg:flex-row items-start justify-between">
				<div className="mb-10 lg:mb-0">
					<div className="flex content-center space-x-4 items-center">
						<Image
							alt="Mindful Logo"
							className="w-24 h-20 lg:w-40 lg:h-32"
							src={MindfulIsotype}
						/>
						<Image
							alt="Mindful Logo"
							className="w-32 h-16 lg:w-40 lg:h-16"
							src={MindfulLogo}
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
					<div>
						<Typography color="black" as="h2" variant="medium">
							Resources
						</Typography>
						<div className="flex flex-col">
							{resources.map((resource) => {
								return (
									<a href={resource.path} key={resource.key}>
										<Typography color="darkGray" as="span" variant="small">
											{resource.title}
										</Typography>
									</a>
								);
							})}
						</div>
					</div>
					{/* <div>
						<Typography color="black" as="h2" variant="medium">
							Navigation
						</Typography>
						<div className="flex flex-col">
							{navigation.map((navigation) => {
								return (
									<a href={navigation.path} key={navigation.key}>
										<Typography color="darkGray" as="span" variant="small">
											{navigation.label}
										</Typography>
									</a>
								);
							})}
						</div>
					</div> */}
				</div>
			</div>
			<div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
				<div className="space-y-1">
					<Typography
						variant="medium"
						color="black"
						as="h3"
						className="font-semibold"
					>
						Platform information
					</Typography>
					<Typography variant="small" color="black" as="p" className="w-full">
						The Mindful Network is an informational platform designed to connect
						individuals with mental health resources. The content on this site
						is for educational purposes only and is not a substitute for
						professional medical advice, diagnosis, or treatment. Always seek
						the advice of your physician or qualified mental health provider
						with any questions regarding your condition. In case of a
						life-threatening emergency, call 911 or go to your nearest emergency
						room immediately. This platform does not provide direct clinical
						services.
					</Typography>
				</div>
				<div className="space-y-1">
					<Typography
						variant="medium"
						color="black"
						as="h3"
						className="font-semibold"
					>
						Accessibility Commitment
					</Typography>
					<Typography variant="small" color="black" as="p" className="w-full">
						The Mindful Network is committed to making our website accessible to
						individuals with disabilities in compliance with the Americans with
						Disabilities Act (ADA). If you experience any barriers while using
						our website or need assistance, please contact us at [Contact
						Information] so we can assist you.
					</Typography>
				</div>
			</div>
			<div className="mt-10 flex flex-col-reverseitems-center justify-between w-full lg:flex-row">
				<div>
					<Typography variant="small" color="black">
						© 2024 The Mindful Network
					</Typography>
				</div>
				<div className="flex space-x-3">
					<Link href="/">
						<Typography
							color="darkGray"
							as="span"
							variant="small"
							className="font-semibold"
						>
							Privacy Policy
						</Typography>
					</Link>
					<Link href="/">
						<Typography
							color="darkGray"
							as="span"
							variant="small"
							className="font-semibold"
						>
							Terms of Service
						</Typography>
					</Link>
				</div>
			</div>
		</footer>
	);
}
