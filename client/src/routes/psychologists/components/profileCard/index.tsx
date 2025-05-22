import { Badge, Typography } from "@/components/ui";
import { MindfulIsotype, UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import { HeartPulse, Wallet } from "lucide-react";
import Image from "next/image";

export function ProfileCard({
	image,
	name,
	description,
	resource,
	facility,
	showInsurances,
}: PsychologistModel) {
	return (
		<header
			className="mb-10 mt-32 justify-center bg-white rounded-2xl p-10 lg:mt-0"
			aria-labelledby="profile-card-heading"
		>
			<div className="flex items-center justify-start">
				<div className="w-24 h-24 lg:h-48 lg:w-48 mr-5">
					<Image
						className="rounded-full aspect-square object-cover"
						src={image ? image : UserImage}
						alt={`Profile picture of ${name}`}
						width={300}
						height={300}
					/>
				</div>
				<div>
					<Typography
						className="font-bold"
						as="h2"
						variant="large"
						color="black"
						id="profile-card-heading"
					>
						{name}
					</Typography>
					<Typography
						className="font-medium mb-2"
						as="p"
						variant="small"
						color="darkGray"
					>
						{facility}
					</Typography>
					<div className="space-x-1 space-y-1">
						{resource && resource.length
							? resource.map((res) => (
									<Badge
										key={res.title}
										className="w-max"
										color="green"
										aria-label={`Type: ${res.title}`}
									>
										{res.title}
									</Badge>
								))
							: ""}
					</div>
				</div>
			</div>
			<div className="my-5">
				<Typography className="mb-5" as="p" variant="small" color="darkGray">
					{description}
				</Typography>
			</div>
			<div className="flex flex-col space-y-3 lg:items-center lg:justify-start lg:flex-row lg:space-x-6 lg:space-y-0">
				{showInsurances ? (
					<div className="flex items-center space-x-2">
						<HeartPulse className="w-10 h-10" aria-hidden="true" />
						<Typography
							className="font-semibold"
							as="p"
							variant="small"
							color="darkGray"
						>
							Accepts Insurance
						</Typography>
					</div>
				) : (
					<div className="flex items-center space-x-2">
						<Wallet className="w-10 h-10" aria-hidden="true" />
						<Typography
							className="font-semibold"
							as="p"
							variant="small"
							color="darkGray"
						>
							Self-pay - Insurance not accepted
						</Typography>
					</div>
				)}
				<div className="flex items-center space-x-2">
					<Image
						alt="Mindful Logo"
						className="w-10 h-10"
						src={MindfulIsotype}
						aria-hidden="true"
					/>
					<Typography
						className="font-semibold"
						as="p"
						variant="small"
						color="darkGray"
					>
						Vetted & Verified
					</Typography>
				</div>
			</div>
		</header>
	);
}
