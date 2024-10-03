"use client";
import { Badge, Typography } from "@/components/ui";
import {
	conditionSpecialty,
	insurances,
	ResourcesKey,
	TherapyModality,
} from "@/models";
import {
	ArrowLongLeftIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { opacityVariants } from "@/lib/anim";

interface Props {
	resources: ResourcesKey[];
	conditions: conditionSpecialty[];
	insurances: insurances[];
	therapyModalities: TherapyModality[];
	handleBadgeClick: (key: string, arg: string) => void;
	selectedResources: string[];
	selectedCondition: string[];
	selectedInsurance: string[];
	selectedTherapy: string;
}

const Header = ({
	resources,
	conditions,
	insurances,
	therapyModalities,
	selectedResources,
	handleBadgeClick,
	selectedCondition,
	selectedInsurance,
	selectedTherapy,
}: Props) => {
	const [headerIsOpen, setHeaderIsOpen] = useState(false);

	const toggleMenu = () => setHeaderIsOpen(!headerIsOpen);

	return (
		<header className="px-5 pb-5 w-full border-b border-gray-200 relative">
			<Link href={"/"}>
				<Typography
					as="span"
					color="blue"
					variant="small"
					className="flex items-center gap-2 hover:text-blue-700 hover:underline underline-offset-4"
				>
					<ArrowLongLeftIcon className="h-8 w-8" />
					Back to Home
				</Typography>
			</Link>
			<Typography className="font-antic" as="h1" color="black" variant="title">
				Professionals in <span className="text-green-300">South Florida</span>
			</Typography>

			<AnimatePresence mode="wait">
				<button
					className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white hover:bg-gray-100 border border-gray-100 rounded-full p-0.5 shadow-md"
					title={headerIsOpen ? "Hide Menu" : "Show Menu"}
					onClick={toggleMenu}
				>
					<ChevronDownIcon
						className={`h-7 w-7 ${
							headerIsOpen ? "rotate-180" : "rotate-0"
						} transition-transform`}
					/>
				</button>
				{headerIsOpen && (
					<motion.div
						initial="closed"
						animate="open"
						exit="closed"
						variants={opacityVariants}
					>
						<div className="my-2">
							<Typography as="p" color="darkGray" variant="small">
								Resources:
							</Typography>
							<div className="flex items-center flex-wrap gap-2 w-full">
								{resources.map((resourceKey) => (
									<Badge
										key={resourceKey.key}
										color="blue"
										className="w-max"
										isSelected={selectedResources.includes(resourceKey.key)}
										onClick={() =>
											handleBadgeClick("resource", resourceKey.key)
										}
									>
										{resourceKey.label}
									</Badge>
								))}
							</div>
						</div>
						<div className="my-2">
							<Typography as="p" color="darkGray" variant="small">
								Conditions:
							</Typography>
							<div className="flex items-center flex-wrap gap-2 w-full">
								{conditions && conditions.length
									? conditions.map((condition) => (
											<Badge
												key={condition.id}
												color="orange"
												className="w-max"
												isSelected={selectedCondition.includes(condition.name)}
												onClick={() =>
													handleBadgeClick("condition", condition.name)
												}
											>
												{condition.name}
											</Badge>
										))
									: ""}
							</div>
						</div>

						<div className="mb-2">
							<Typography as="p" color="darkGray" variant="small">
								Insurance:
							</Typography>
							<div className="flex items-center flex-wrap gap-2 w-full">
								{insurances && insurances.length
									? insurances.map((insurance) => (
											<Badge
												key={insurance.id}
												color="green"
												className="w-max"
												isSelected={selectedInsurance.includes(insurance.name)}
												onClick={() =>
													handleBadgeClick("insurance", insurance.name)
												}
											>
												{insurance.name}
											</Badge>
										))
									: ""}
							</div>
						</div>

						<div className="mt-2">
							<Typography as="p" color="darkGray" variant="small">
								Therapy Options:
							</Typography>
							<div className="flex items-center flex-wrap gap-2 w-full">
								{therapyModalities && therapyModalities.length
									? therapyModalities.map((modality) => (
											<Badge
												key={modality.id}
												color="blue"
												className="w-max"
												isSelected={selectedTherapy === modality.type}
												onClick={() =>
													handleBadgeClick("therapy", modality.type)
												}
											>
												{modality.type}
											</Badge>
										))
									: ""}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};
export default Header;
