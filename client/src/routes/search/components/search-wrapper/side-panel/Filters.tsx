import { Badge, Button, ColorType, Typography } from "@/components/ui";
import {
	ResourcesKey,
	TherapyModality,
	conditionSpecialty,
	insurances,
} from "@/models";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
	visible: boolean;
	setVisible: (boolean) => void;
	resources: ResourcesKey[];
	conditions: conditionSpecialty[];
	insurances: insurances[];
	therapyModalities: TherapyModality[];
	selectedResources: string[];
	selectedCondition: string[];
	selectedInsurance: string[];
	selectedTherapy: string;
	handleBadgeClick: (key: string, arg: string) => void;
}

interface FilterItemProps {
	title: string;
	color: string;
	options:
		| ResourcesKey[]
		| conditionSpecialty[]
		| insurances[]
		| TherapyModality[];
	selectedOptions: string[];
	onBadgeClick: (key: string) => void;
	getKey: (option: any) => string;
	getLabel: (option: any) => string;
}

const FilterItem = ({
	title,
	color,
	options,
	selectedOptions,
	onBadgeClick,
	getKey,
	getLabel,
}: FilterItemProps) => {
	const [isOpen, setIsOpen] = useState(false);

	if (!options || options.length === 0) {
		return null;
	}
	return (
		<div className="my-2">
			<div
				className="flex items-center justify-between cursor-pointer"
				onClick={() => setIsOpen(!isOpen)}
				role="button"
				tabIndex={0}
			>
				<Typography
					as="p"
					color="darkGray"
					variant="bodySmall"
					className="font-semibold"
				>
					{title}
				</Typography>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				>
					<ChevronDown />
				</motion.div>
			</div>

			<AnimatePresence mode="wait">
				{isOpen && (
					<motion.div
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
						className="overflow-hidden"
					>
						<div className="flex items-start flex-wrap gap-2 w-full pt-5">
							{options.map((option) => {
								const key = getKey(option);
								const label = getLabel(option);
								return (
									<Badge
										key={key}
										className="w-max h-max items-center"
										isSelected={selectedOptions.includes(key)}
										onClick={() => onBadgeClick(key)}
										color={color as ColorType}
										role="button"
										tabIndex={0}
										aria-pressed={selectedOptions.includes(key)}
										aria-label={`${title} ${label}`}
									>
										{label}
									</Badge>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export const Filters = ({
	visible,
	setVisible,
	resources,
	conditions,
	insurances,
	therapyModalities,
	selectedCondition,
	selectedResources,
	selectedTherapy,
	selectedInsurance,
	handleBadgeClick,
}: Props) => {
	const visibilityClass = visible ? "lg:hidden md:block" : "hidden";

	useEffect(() => {
		if (visible) {
			document.body.style.overflow = "hidden";
			document.documentElement.style.position = "fixed";
			document.documentElement.style.width = "100%";
		} else {
			document.body.style.overflow = "unset";
			document.documentElement.style.position = "";
			document.documentElement.style.width = "";
		}

		return () => {
			document.body.style.overflow = "unset";
			document.documentElement.style.position = "";
			document.documentElement.style.width = "";
		};
	}, [visible]);

	return (
		<div
			className={`${visibilityClass} fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto bg-blue-50 w-full flex flex-col`}
		>
			<div className="flex flex-col h-full max-h-screen">
				<div className="flex items-center px-6 py-4 border-b border-gray-200">
					<div className="flex-grow flex justify-center">
						<Typography
							variant="body"
							color="black"
							as="h3"
							className="font-semibold"
						>
							Filters
						</Typography>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto px-6 py-4">
					<div className="space-y-8">
						<FilterItem
							title="Resources"
							options={resources}
							selectedOptions={selectedResources}
							color="blue"
							onBadgeClick={(key) => handleBadgeClick("resource", key)}
							getKey={(option) => option.key}
							getLabel={(option) => option.label}
						/>

						<FilterItem
							title="Conditions"
							options={conditions}
							color="orange"
							selectedOptions={selectedCondition}
							onBadgeClick={(key) => handleBadgeClick("condition", key)}
							getKey={(option) => option.name}
							getLabel={(option) => option.name}
						/>

						<FilterItem
							title="Insurance"
							options={insurances}
							color="green"
							selectedOptions={selectedInsurance}
							onBadgeClick={(key) => handleBadgeClick("insurance", key)}
							getKey={(option) => option.name}
							getLabel={(option) => option.name}
						/>

						<FilterItem
							title="Therapy Options"
							options={therapyModalities}
							color="blue"
							selectedOptions={[selectedTherapy]}
							onBadgeClick={(key) => handleBadgeClick("therapy", key)}
							getKey={(option) => option.type}
							getLabel={(option) => option.type}
						/>
					</div>
				</div>

				<div className="border-t border-gray-200 p-4 bg-blue-50">
					<Button
						className="w-full py-2 px-4 rounded-full"
						variant="bodySmall"
						onClick={() => {
							setVisible(false);
						}}
					>
						Update results
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Filters;
