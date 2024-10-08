"use client";

import { MapComponent } from "@/components/shared";
import {
	conditionSpecialty,
	insurances,
	PsychologistModel,
	ResourcesKey,
	ResourcesModel,
	TherapyModality,
} from "@/models";
import { getValidationError } from "@/utilities";
import { generateResourceKeys } from "@/utilities/generate-resource.keys.utility";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SidePanel from "./side-panel/SidePanel";

export const SearchWrapper = () => {
	const [conditions, setConditions] = useState<conditionSpecialty[] | null>(
		null
	);
	const [insurances, setInsurances] = useState<insurances[] | null>(null);
	const [therapyModalities, setTherapyModalities] = useState<
		TherapyModality[] | null
	>(null);
	const [allResourceKeys, setAllResourceKeys] = useState<ResourcesKey[] | []>(
		[]
	);
	const [filteredProffesionals, setFilteredProffesionals] = useState<
		PsychologistModel[] | null
	>(null);
	const [allProffesionals, setAllProffesionals] =
		useState<ResourcesModel | null>(null);
	const [allCombinedProfessionals, setAllCombinedProfessionals] = useState<
		PsychologistModel[]
	>([]);

	const [isLoading, setLoading] = useState(false);

	const searchParams = useSearchParams();

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				const [
					conditionsRes,
					insurancesRes,
					therapyModalitiesRes,
					proffesionals,
				] = await Promise.all([
					fetch("/api/conditions"),
					fetch("/api/insurances"),
					fetch("/api/therapy-modalities"),
					fetch("/api/resources"),
				]);

				const conditionsData = await conditionsRes.json();
				const insurancesData = await insurancesRes.json();
				const therapyModalitiesData = await therapyModalitiesRes.json();
				const proffesionalsData = await proffesionals.json();

				setAllProffesionals(proffesionalsData);
				setConditions(conditionsData);
				setInsurances(insurancesData);
				setTherapyModalities(therapyModalitiesData);

				setLoading(false);
			} catch (error) {
				console.log(error);
				getValidationError(error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (allProffesionals) {
			const combinedProfessionals = Object.values(allProffesionals).flat();
			setAllCombinedProfessionals(combinedProfessionals);

			const resourceParam = searchParams.get("resource");
			const conditionParam = searchParams.get("condition");
			const insuranceParam = searchParams.get("insurance");
			const therapyParam = searchParams.get("therapy");
			const searchQuery = searchParams.get("search");

			let result: PsychologistModel[] = [];

			if (resourceParam) {
				const selectedResources = resourceParam.split(",");

				result = selectedResources.flatMap((resource) => {
					const camelCaseResource = resource.replace(/-([a-z])/g, (g) =>
						g[1].toUpperCase()
					);
					return (
						allProffesionals?.[camelCaseResource as keyof ResourcesModel] || []
					);
				});
			} else {
				result = Object.values(allProffesionals).flat();
			}

			if (conditionParam) {
				const selectedConditions = conditionParam.split(",");

				result = result.filter((psychologist) =>
					psychologist.conditionSpecialty.some((specialty) =>
						selectedConditions.includes(specialty.name)
					)
				);
			}

			if (insuranceParam) {
				const selectedInsurances = insuranceParam.split(",");
				result = result.filter((psychologist) =>
					psychologist.insurances.some((insurance) =>
						selectedInsurances.includes(insurance.name)
					)
				);
			}

			if (therapyParam) {
				result = result.filter((psychologist) =>
					psychologist.therapyOptions.some(
						(modality) => modality.type === therapyParam
					)
				);
			}

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				result = result.filter(
					(psychologist) =>
						psychologist.name.toLowerCase().includes(query) ||
						psychologist.insurances.some((insurance) =>
							insurance.name.toLowerCase().includes(query)
						) ||
						psychologist.therapyOptions.some((modality) =>
							modality.type.toLowerCase().includes(query)
						)
				);
			}

			const resourceKeys = generateResourceKeys(allProffesionals);
			setAllResourceKeys(resourceKeys);

			setFilteredProffesionals(result);
		}
	}, [searchParams, allProffesionals]);

	return (
		<>
			<SidePanel
				proffesionals={allCombinedProfessionals}
				filteredProffesionals={filteredProffesionals}
				conditions={conditions}
				insurances={insurances}
				therapyModalities={therapyModalities}
				resources={allResourceKeys}
				isLoading={isLoading}
			/>

			<MapComponent
				positions={[{ lat: 25.842, lng: -80.2903 }]}
				className="h-full w-full"
			/>
		</>
	);
};
