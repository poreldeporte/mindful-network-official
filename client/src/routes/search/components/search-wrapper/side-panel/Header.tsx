"use client";
import { Badge, Typography } from "@/components/ui";
import { opacityVariants } from "@/lib/anim";
import {
	ResourcesKey,
	TherapyModality,
	conditionSpecialty,
	insurances,
} from "@/models";
import {
	ArrowLongLeftIcon,
	ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SelectedFilters } from "./SelectedFilters";

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
	setFiltersPanelVisible: (boolean) => void;
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
	setFiltersPanelVisible,
}: Props) => {
	const [headerIsOpen, setHeaderIsOpen] = useState(false);

	const toggleMenu = () => setHeaderIsOpen(!headerIsOpen);

	return (
		<header
			className="px-5 pb-10 w-full border-b border-gray-200 relative"
			aria-label="Header with navigation options and filters"
		>
			<Link href={"/"}>
				<Typography
					as="span"
					color="blue"
					variant="small"
					className="flex items-center gap-2 hover:text-blue-700 hover:underline underline-offset-4"
				>
					<ArrowLongLeftIcon className="h-8 w-8" aria-hidden="true" />
					Back to Home
				</Typography>
			</Link>
			<Typography
				className="font-antic xs:!text-[40px]"
				as="h1"
				color="black"
				variant="title"
			>
				Find Professionals in{" "}
				<span className="text-green-300">South Florida</span>
			</Typography>

			<div className="flex items-center justify-between lg:hidden mt-5">
				<div className="flex flex-col mb-2">
					<Typography color="black" variant="medium" as="h3">
						Filters
					</Typography>
					<SelectedFilters
						selectedResources={selectedResources}
						selectedCondition={selectedCondition}
						selectedInsurance={selectedInsurance}
						selectedTherapy={selectedTherapy}
						handleBadgeClick={handleBadgeClick}
					/>
				</div>
				<div
					className="bg-blue-500 rounded-full p-2"
					onClick={() => {
						setFiltersPanelVisible(true);
					}}
				>
					<Plus className="text-white cursor-pointer" />
				</div>
			</div>

			<div className="hidden lg:block">
				<button
					className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-gray-500 text-white hover:bg-gray-600 border rounded-full py-2 px-4 shadow-md flex items-center gap-2"
					title={headerIsOpen ? "Hide filters" : "Show filters"}
					aria-expanded={headerIsOpen}
					aria-controls="filter-menu"
					onClick={toggleMenu}
				>
					<span className="text-xs">
						{headerIsOpen ? "Hide Filters" : "Show Filters"}
					</span>
					<ChevronDownIcon
						className={`h-5 w-5 ${
							headerIsOpen ? "rotate-180" : "rotate-0"
						} transition-transform`}
						aria-hidden="true"
					/>
				</button>

				<AnimatePresence mode="wait">
					{headerIsOpen && (
						<motion.div
							id="filter-menu"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{
								height: {
									duration: 0.3,
									ease: "easeInOut",
								},
								opacity: {
									duration: 0.2,
									ease: "easeInOut",
								},
							}}
							variants={opacityVariants}
							className="overflow-hidden"
						>
							<div className="h-[55vh] overflow-y-auto">
								<div className="my-2">
									<Typography as="p" color="darkGray" variant="small">
										Pick your resources:
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
												role="button"
												tabIndex={0}
												aria-pressed={selectedResources.includes(
													resourceKey.key
												)}
												aria-label={`Resource ${resourceKey.label}`}
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
														isSelected={selectedCondition.includes(
															condition.name
														)}
														onClick={() =>
															handleBadgeClick("condition", condition.name)
														}
														role="button"
														tabIndex={0}
														aria-pressed={selectedCondition.includes(
															condition.name
														)}
														aria-label={`Condition ${condition.name}`}
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
														isSelected={selectedInsurance.includes(
															insurance.name
														)}
														onClick={() =>
															handleBadgeClick("insurance", insurance.name)
														}
														role="button"
														tabIndex={0}
														aria-pressed={selectedInsurance.includes(
															insurance.name
														)}
														aria-label={`Insurance ${insurance.name}`}
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
														role="button"
														tabIndex={0}
														aria-pressed={selectedTherapy === modality.type}
														aria-label={`Therapy option ${modality.type}`}
													>
														{modality.type}
													</Badge>
												))
											: ""}
									</div>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	);
};
export default Header;
