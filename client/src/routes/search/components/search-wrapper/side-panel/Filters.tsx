import { Typography } from "@/components/ui";
import { ChevronDown, XIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui";
import {
	ResourcesKey,
	conditionSpecialty,
	insurances,
	TherapyModality,
} from "@/models";

interface Props {
	visible: boolean;
	setVisible: (boolean) => void;
	setSelectedFilters: () => [];
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
	if (!options || options.length === 0) {
		return null;
	}
	return (
		<div className="my-2">
			<div className="flex items-center justify-between">
				<Typography as="p" color="darkGray" variant="small">
					{title}
				</Typography>
				<ChevronDown />
			</div>
			<div className="flex items-center flex-wrap gap-2 w-full">
				{options.map((option) => {
					const key = getKey(option);
					const label = getLabel(option);
					return (
						<Badge
							key={key}
							className="w-max"
							isSelected={selectedOptions.includes(key)}
							onClick={() => onBadgeClick(key)}
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
		</div>
	);
};

export const Filters = ({
	visible,
	setVisible,
	setSelectedFilters,
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

	return (
		<section
			className={`
		  ${visibilityClass}
		  fixed inset-0 z-50
		  lg:relative lg:inset-auto lg:z-auto
		  bg-blue-50
		  w-full h-full
		  p-10
		`}
		>
			<div className="flex items-center relative">
				<div className="absolute left-0">
					<XIcon
						className="w-6 h-6 cursor-pointer"
						onClick={() => setVisible(false)}
					/>
				</div>
				<div className="flex-grow flex justify-center">
					<Typography variant="medium" color="black" as="h3">
						Filters
					</Typography>
				</div>
			</div>

			<div>
				<FilterItem
					title="Resources"
					options={resources}
					selectedOptions={selectedResources}
					onBadgeClick={(key) => handleBadgeClick("resource", key)}
					getKey={(option) => option.key}
					getLabel={(option) => option.label}
				/>

				<FilterItem
					title="Conditions"
					options={conditions}
					selectedOptions={selectedCondition}
					onBadgeClick={(key) => handleBadgeClick("condition", key)}
					getKey={(option) => option.name}
					getLabel={(option) => option.name}
				/>

				<FilterItem
					title="Insurance"
					options={insurances}
					selectedOptions={selectedInsurance}
					onBadgeClick={(key) => handleBadgeClick("insurance", key)}
					getKey={(option) => option.name}
					getLabel={(option) => option.name}
				/>

				<FilterItem
					title="Therapy Options"
					options={therapyModalities}
					selectedOptions={[selectedTherapy]}
					onBadgeClick={(key) => handleBadgeClick("therapy", key)}
					getKey={(option) => option.type}
					getLabel={(option) => option.type}
				/>
			</div>
		</section>
	);
};
