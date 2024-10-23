"use client";

import { NoResults, Typography } from "@/components/ui";
import {
	conditionSpecialty,
	insurances,
	PsychologistModel,
	ResourcesKey,
	TherapyModality,
} from "@/models";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "./Header";
import PsychologistCard from "./PsychologistCard";
import { PsychologistCardSkeleton } from "./PsychologistCard.skeleton";
import { Filters } from "./Filters";

interface Props {
	proffesionals: PsychologistModel[] | null;
	filteredProffesionals: PsychologistModel[] | null;
	conditions: conditionSpecialty[] | null;
	insurances: insurances[] | null;
	therapyModalities: TherapyModality[] | null;
	resources: ResourcesKey[];
	isLoading: boolean;
}

const SidePanel = ({
	proffesionals,
	filteredProffesionals,
	conditions,
	insurances,
	therapyModalities,
	resources,
	isLoading,
}: Props) => {
	const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
	const [selectedResources, setSelectedResources] = useState<string[]>([]);
	const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
	const [selectedTherapy, setSelectedTherapy] = useState<string | null>(null);
	const [filtersPanelVisible, setFiltersPanelVisible] =
		useState<boolean>(false);
	const [selectedFilters, setSelectedFilters] = useState([]);

	const searchParams = useSearchParams();
	const router = useRouter();

	const visibilityClass = filtersPanelVisible ? "lg:hidden md:block" : "hidden";

	useEffect(() => {
		const conditionParam = searchParams.get("condition");
		const insuranceParam = searchParams.get("insurance");
		const therapyParam = searchParams.get("therapy");
		const resourceParam = searchParams.get("resource");

		if (conditionParam) {
			setSelectedCondition(conditionParam.split(","));
		}

		if (insuranceParam) {
			setSelectedInsurance(insuranceParam.split(","));
		}

		if (therapyParam) {
			setSelectedTherapy(therapyParam);
		}

		if (resourceParam) {
			setSelectedResources(resourceParam.split(","));
		}
	}, [searchParams]);

	const handleBadgeClick = (filterType: string, value: string) => {
		const currentParams = new URLSearchParams(searchParams.toString());

		if (filterType === "resource") {
			let updatedResources = [...selectedResources];

			if (updatedResources.includes(value)) {
				updatedResources = updatedResources.filter(
					(resource) => resource !== value
				);
			} else {
				updatedResources.push(value);
			}

			setSelectedResources(updatedResources);

			if (updatedResources.length > 0) {
				currentParams.set("resource", updatedResources.join(","));
			} else {
				currentParams.delete("resource");
			}
		} else if (filterType === "insurance") {
			let selectedInsurances = selectedInsurance ? [...selectedInsurance] : [];

			if (selectedInsurances.includes(value)) {
				selectedInsurances = selectedInsurances.filter(
					(insurance) => insurance !== value
				);
			} else {
				selectedInsurances.push(value);
			}

			if (selectedInsurances.length > 0) {
				currentParams.set("insurance", selectedInsurances.join(","));
			} else {
				currentParams.delete("insurance");
			}

			setSelectedInsurance(selectedInsurances);
		} else if (filterType === "condition") {
			let updatedConditions = [...selectedCondition];

			if (updatedConditions.includes(value)) {
				updatedConditions = updatedConditions.filter(
					(condition) => condition !== value
				);
			} else {
				updatedConditions.push(value);
			}

			setSelectedCondition(updatedConditions);

			if (updatedConditions.length > 0) {
				currentParams.set("condition", updatedConditions.join(","));
			} else {
				currentParams.delete("condition");
			}
		} else if (filterType === "therapy") {
			setSelectedTherapy(selectedTherapy === value ? null : value);
			if (currentParams.get(filterType) === value) {
				currentParams.delete(filterType);
			} else {
				currentParams.set(filterType, value);
			}
		}

		router.push(`?${currentParams.toString()}`, undefined);
	};

	return (
		<aside
			className="overflow-hidden z-10 lg:py-5 pb-5 pt-14 lg:absolute lg:left-2.5 lg:top-1/2 lg:-translate-y-1/2 h-max lg:h-[calc(100%-20px)] w-full lg:w-3/4 bg-white rounded-3xl grid grid-rows-[auto_1fr_auto]"
			role="complementary"
			aria-labelledby="side-panel-header"
		>
			<Filters
				visible={filtersPanelVisible}
				insurances={insurances}
				conditions={conditions}
				resources={resources}
				therapyModalities={therapyModalities}
				selectedCondition={selectedCondition}
				selectedInsurance={selectedInsurance}
				selectedResources={selectedResources}
				selectedTherapy={selectedTherapy}
				setVisible={setFiltersPanelVisible}
				handleBadgeClick={handleBadgeClick}
			/>
			<Header
				conditions={conditions}
				handleBadgeClick={handleBadgeClick}
				insurances={insurances}
				resources={resources}
				therapyModalities={therapyModalities}
				selectedCondition={selectedCondition}
				selectedInsurance={selectedInsurance}
				selectedResources={selectedResources}
				selectedTherapy={selectedTherapy}
				setFiltersPanelVisible={setFiltersPanelVisible}
			/>
			<div
				className="overflow-y-auto overflow-x-hidden max-w-full"
				role="region"
				aria-live="polite"
			>
				{isLoading ? (
					<>
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<PsychologistCardSkeleton key={index} />
							))}
					</>
				) : filteredProffesionals && filteredProffesionals.length ? (
					<ul
						className="px-5 divide-y divide-gray-200"
						role="list"
						aria-label="Filtered professionals"
					>
						{filteredProffesionals.map((psychologist) => (
							<PsychologistCard
								psychologist={psychologist}
								key={psychologist.id}
							/>
						))}
					</ul>
				) : (
					<NoResults
						title="No results found"
						aria-label="No results found for the selected filters"
					/>
				)}
			</div>

			<footer className="px-5 pt-2.5 flex items-center">
				{filteredProffesionals && proffesionals && (
					<Typography as="span" color="black" variant="xsmall">
						Showing {filteredProffesionals.length} of {proffesionals.length}{" "}
						professionals
					</Typography>
				)}
			</footer>
		</aside>
	);
};

export default SidePanel;
