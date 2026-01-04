import { Badge, Typography } from "@/components/ui";
import { MindfulIsotype, UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import { HeartPulse, Wallet } from "lucide-react";
import Image from "next/image";

export function ProfileCard({
	image,
	imageAlt,
	name,
	description,
	resource,
	facility,
	showInsurances,
}: PsychologistModel) {
	return (
		<header
			className="mb-8 justify-center rounded-2xl bg-white border border-gray-200 p-6 shadow-sm sm:p-8 lg:mt-0"
			aria-labelledby="profile-card-heading"
		>
			<div className="flex items-center justify-start">
				<div className="w-24 h-24 lg:h-40 lg:w-40 mr-5">
					<Image
						className="rounded-full aspect-square object-cover"
						src={image ? image : UserImage}
						alt={imageAlt || `Profile picture of ${name}`}
						width={300}
						height={300}
					/>
				</div>
				<div>
					<Typography
						className="text-[20px] font-semibold leading-snug sm:text-[22px]"
						as="h1"
						variant="bodySmall"
						color="black"
						id="profile-card-heading"
					>
						{name}
					</Typography>
					<Typography
						className="mb-2 text-[12px] text-gray-600"
						as="p"
						variant="bodyXSmall"
						color="darkGray"
					>
						{facility}
					</Typography>
					<div className="flex flex-wrap gap-2">
						{resource && resource.length
							? resource.map((res) => (
									<Badge
										key={res.title}
										className="w-max !cursor-default text-[11px] px-2.5 py-0.5"
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
			<div className="my-6">
				<Typography
					className="text-[12px] text-gray-600 leading-relaxed"
					as="p"
					variant="bodyXSmall"
					color="darkGray"
				>
					{description}
				</Typography>
			</div>
			<div className="flex flex-col space-y-3 lg:items-center lg:justify-start lg:flex-row lg:space-x-6 lg:space-y-0">
				{showInsurances ? (
					<div className="flex items-center space-x-2">
						<HeartPulse className="w-5 h-5" aria-hidden="true" />
						<Typography
							className="text-[12px] font-medium text-gray-600"
							as="p"
							variant="bodyXSmall"
							color="darkGray"
						>
							Accepts Insurance
						</Typography>
					</div>
				) : (
					<div className="flex items-center space-x-2">
						<Wallet className="w-5 h-5" aria-hidden="true" />
						<Typography
							className="text-[12px] font-medium text-gray-600"
							as="p"
							variant="bodyXSmall"
							color="darkGray"
						>
							Self-pay - Insurance not accepted
						</Typography>
					</div>
				)}
				<div className="flex items-center space-x-2">
					<Image
						alt="Mindful Logo"
						className="w-5 h-5"
						src={MindfulIsotype}
						aria-hidden="true"
					/>
					<Typography
						className="text-[12px] font-medium text-gray-600"
						as="p"
						variant="bodyXSmall"
						color="darkGray"
					>
						Vetted & Verified
					</Typography>
				</div>
			</div>
		</header>
	);
}
