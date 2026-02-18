"use client";

import {
	conditionSpecialty,
	insurances,
	PsychologistModel,
	ResourcesKey,
	TherapyModality,
} from "@/models";
import {
	getAllConditions,
	getAllInsurances,
	getAllProfessionals,
	getAllResources,
	getAllTherapyOptions,
} from "@/services";
import { getValidationError } from "@/utilities";
import { generateResourceKeys } from "@/utilities/generate-resource.keys.utility";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SidePanel from "./side-panel/SidePanel";

interface SearchWrapperProps {
	lockedAgeSpecialties?: string[];
	showLockedAgeSpecialties?: boolean;
	titlePrefix?: string;
	titleHighlight?: string;
	headingAs?: "h1" | "h2";
}

const normalizeFilterValue = (value: string) => value.trim().toLowerCase();

export const SearchWrapper = ({
	lockedAgeSpecialties = [],
	showLockedAgeSpecialties = true,
	titlePrefix = "Find Professionals in",
	titleHighlight = "South Florida",
	headingAs = "h1",
}: SearchWrapperProps) => {
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
	const [filteredProfessionals, setFilteredProfessionals] = useState<
		PsychologistModel[] | null
	>(null);
	const [allProfessionals, setAllProfessionals] = useState<
		PsychologistModel[] | null
	>(null);
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
					resources,
					professionals,
				] = await Promise.all([
					getAllConditions(),
					getAllInsurances(),
					getAllTherapyOptions(),
					getAllResources(),
					getAllProfessionals(),
				]);

				const resourceKeys = generateResourceKeys(resources);

				setAllResourceKeys(resourceKeys);
				setAllProfessionals(professionals);
				setConditions(conditionsRes);
				setInsurances(insurancesRes);
				setTherapyModalities(therapyModalitiesRes);
				setLoading(false);
			} catch (error) {
				console.log(error);
				getValidationError(error);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (allProfessionals) {
			const resourceParam = searchParams.get("resource");
			const conditionParam = searchParams.get("condition");
			const insuranceParam = searchParams.get("insurance");
			const therapyParam = searchParams.get("therapy");
			const searchQuery = searchParams.get("search");

			let result = [...allProfessionals];

			if (resourceParam) {
				const selectedResources = resourceParam.split(",");
				result = result.filter(
					(professional) =>
						professional.resource?.some?.((res) =>
							selectedResources.includes(
								res.title.toLowerCase().replace(/\s+/g, "-")
							)
						) ?? false
				);
			}

			if (conditionParam) {
				const selectedConditions = conditionParam.split(",");
				result = result.filter(
					(professional) =>
						professional.conditionSpecialty?.some?.((specialty) =>
							selectedConditions.includes(specialty.name)
						) ?? false
				);
			}

			if (insuranceParam) {
				const selectedInsurances = insuranceParam.split(",");
				result = result.filter(
					(professional) =>
						professional.insurances?.some?.((insurance) =>
							selectedInsurances.includes(insurance.name)
						) ?? false
				);
			}

			if (therapyParam) {
				result = result.filter(
					(professional) =>
						professional.therapyOptions?.some?.(
							(modality) => modality.type === therapyParam
						) ?? false
				);
			}

			if (lockedAgeSpecialties.length > 0) {
				const lockedAgeSet = new Set(
					lockedAgeSpecialties.map(normalizeFilterValue)
				);

				result = result.filter(
					(professional) =>
						professional.ageSpecialty?.some?.((age) =>
							lockedAgeSet.has(normalizeFilterValue(age.age))
						) ?? false
				);
			}

			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				result = result.filter(
					(professional) =>
						professional.name?.toLowerCase().includes(query) ||
						professional.insurances?.some?.((insurance) =>
							insurance.name?.toLowerCase().includes(query)
						) ||
						professional.therapyOptions?.some?.((modality) =>
							modality.type?.toLowerCase().includes(query)
						)
				);
			}

			setFilteredProfessionals(result);
		}
	}, [searchParams, allProfessionals, lockedAgeSpecialties]);

	return (
		<SidePanel
			filteredProffesionals={filteredProfessionals}
			conditions={conditions}
			insurances={insurances}
			therapyModalities={therapyModalities}
			resources={allResourceKeys}
			lockedAgeSpecialties={lockedAgeSpecialties}
			showLockedAgeSpecialties={showLockedAgeSpecialties}
			titlePrefix={titlePrefix}
			titleHighlight={titleHighlight}
			headingAs={headingAs}
			isLoading={isLoading}
		/>
	);
};
