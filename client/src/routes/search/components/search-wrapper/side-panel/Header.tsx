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
import { useState, useEffect } from "react";
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
	const [headerIsOpen, setHeaderIsOpen] = useState(true);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const checkViewport = () => {
			setIsDesktop(window.innerWidth >= 1024);
			setHeaderIsOpen(window.innerWidth >= 1024);
		};

		checkViewport();
		window.addEventListener("resize", checkViewport);

		return () => window.removeEventListener("resize", checkViewport);
	}, []);

	const toggleMenu = () => setHeaderIsOpen(!headerIsOpen);

	return (
		<header
			className="px-5 pb-5 w-full border-b border-gray-200 relative"
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
			<Typography className="font-antic" as="h1" color="black" variant="title">
				Find professionals in{" "}
				<span className="text-green-300">South Florida</span>
			</Typography>

			<button
				className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white hover:bg-gray-100 border border-gray-100 rounded-full py-2 px-4 shadow-md flex items-center gap-2"
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
						initial="closed"
						animate="open"
						exit="closed"
						variants={opacityVariants}
					>
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
										aria-pressed={selectedResources.includes(resourceKey.key)}
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
												isSelected={selectedCondition.includes(condition.name)}
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
												isSelected={selectedInsurance.includes(insurance.name)}
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
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};
export default Header;
