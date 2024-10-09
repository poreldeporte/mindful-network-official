import { Badge, Typography } from "@/components/ui";
import { UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import { formatType } from "@/utilities";
import { Armchair, Brain, HeartPulse, PersonStanding } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PsychologistCard = ({
	psychologist,
}: {
	psychologist: PsychologistModel;
}) => {
	const {
		name,
		id,
		image,
		therapyOptions,
		conditionSpecialty,
		insurances,
		ageSpecialty,
		_type,
		slug,
	} = psychologist;

	return (
		<li
			className="grid lg:grid-cols-[auto_1fr_auto] w-full py-5 px-2.5 gap-10 items-start border-b border-gray-200"
			role="article"
			aria-label={`Profile of psychologist ${name}`}
		>
			<div className="flex items-start">
				<Image
					src={image ? image : UserImage}
					alt={`Profile image of ${name}`}
					loading="lazy"
					width={100}
					height={100}
					className="w-32 h-32 object-cover rounded-full"
				/>
			</div>

			<div className="flex flex-col gap-4">
				<div className="flex flex-col w-full">
					<Typography
						className="font-bold"
						as="h2"
						color="black"
						variant="medium"
					>
						{name}
					</Typography>
					<Badge
						className="w-max"
						color="green"
						aria-label={`Type: ${formatType(_type)}`}
					>
						{formatType(_type)}
					</Badge>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex gap-1">
						<Brain
							className="min-h-5 min-w-5 text-gray-500"
							aria-hidden="true"
						/>
						<Typography as="p" color="darkGray" variant="small">
							<span className="font-semibold">Specialty:</span>{" "}
							{conditionSpecialty?.length
								? conditionSpecialty
										.map((condition) => condition.name)
										.join(", ")
								: "N/A"}
						</Typography>
					</div>

					<div className="flex gap-1">
						<HeartPulse
							className="min-h-5 min-w-5 text-gray-500"
							aria-hidden="true"
						/>
						<Typography as="p" color="darkGray" variant="small">
							<span className="font-semibold">Accepted Insurance:</span>{" "}
							{insurances?.length
								? insurances.map((insurance) => insurance.name).join(", ")
								: "N/A"}
						</Typography>
					</div>

					<div className="flex gap-1">
						<PersonStanding
							className="min-h-5 min-w-5 text-gray-500"
							aria-hidden="true"
						/>
						<Typography as="p" color="darkGray" variant="small">
							<span className="font-semibold">Age Specialty:</span>{" "}
							{ageSpecialty?.length
								? ageSpecialty.map((specialty) => specialty.age).join(", ")
								: "N/A"}
						</Typography>
					</div>

					<div className="flex gap-1">
						<Armchair
							className="min-h-5 min-w-5 text-gray-500"
							aria-hidden="true"
						/>
						<Typography as="p" color="darkGray" variant="small">
							<span className="font-semibold">Therapy Option:</span>{" "}
							{therapyOptions?.length
								? therapyOptions.map((option) => option.type).join(", ")
								: "N/A"}
						</Typography>
					</div>
				</div>
			</div>

			<div className="flex justify-end items-end h-full">
				<Link
					href={`/psychologists/${slug}`}
					className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-700 transition-colors text-white text-center w-full md:w-max"
					aria-label={`View profile of ${name}`}
				>
					<Typography as="span" color="white" variant="small">
						View profile
					</Typography>
				</Link>
			</div>
		</li>
	);
};

export default PsychologistCard;
