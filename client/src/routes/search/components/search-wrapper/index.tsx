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
import { clearGlobalInteractionLocks } from "@/utilities/clear-global-interaction-locks.utility";
import { generateResourceKeys } from "@/utilities/generate-resource.keys.utility";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import SidePanel from "./side-panel/SidePanel";

interface SearchWrapperProps {
	lockedAgeSpecialties?: string[];
	showLockedAgeSpecialties?: boolean;
	lockedConditions?: string[];
	lockedInsurances?: string[];
	lockedCity?: string;
	lockedLanguage?: string;
	titlePrefix?: string;
	titleHighlight?: string;
	headingAs?: "h1" | "h2";
}

const normalizeFilterValue = (value: string) => value.trim().toLowerCase();
const slugifyValue = (value: string) =>
	value
		.trim()
		.toLowerCase()
		.replace(/\s+/g, "-");

export const SearchWrapper = ({
	lockedAgeSpecialties = [],
	showLockedAgeSpecialties = true,
	lockedConditions = [],
	lockedInsurances = [],
	lockedCity,
	lockedLanguage,
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
	const [allProfessionals, setAllProfessionals] = useState<
		PsychologistModel[] | null
	>(null);
	const [isLoading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const searchParamsKey = searchParams.toString();

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

				const safeConditions = Array.isArray(conditionsRes) ? conditionsRes : [];
				const safeInsurances = Array.isArray(insurancesRes) ? insurancesRes : [];
				const safeTherapies = Array.isArray(therapyModalitiesRes)
					? therapyModalitiesRes
					: [];
				const safeResources = Array.isArray(resources) ? resources : [];
				const safeProfessionals = Array.isArray(professionals)
					? professionals
					: [];
				const resourceKeys = generateResourceKeys(safeResources);

				setAllResourceKeys(resourceKeys);
				setAllProfessionals(safeProfessionals);
				setConditions(safeConditions);
				setInsurances(safeInsurances);
				setTherapyModalities(safeTherapies);
			} catch (error) {
				console.log(error);
				getValidationError(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		// Defensive reset: if user navigates from a detail page, clear any
		// residual body/html state that can disable the global header.
		clearGlobalInteractionLocks();
		document
			.querySelectorAll<HTMLElement>(".site-header")
			.forEach((header) => header.classList.remove("site-header-hidden"));
		document.body.classList.remove("detail-subnav-active");
		document.documentElement.style.removeProperty("--subnav-top");
		document.documentElement.style.removeProperty("--subnav-height");
	}, []);

	const filteredProfessionals = useMemo(() => {
		if (!allProfessionals) return null;

		const params = new URLSearchParams(searchParamsKey);
		const resourceParam = params.get("resource");
		const conditionParam = params.get("condition");
		const insuranceParam = params.get("insurance");
		const therapyParam = params.get("therapy");
		const searchQuery = params.get("search");

		let result = [...allProfessionals];

		if (resourceParam) {
			const selectedResources = new Set(
				resourceParam.split(",").map(normalizeFilterValue)
			);
			result = result.filter(
				(professional) =>
					professional.resource?.some?.((res) => {
						if (!res?.title) return false;
						return selectedResources.has(slugifyValue(res.title));
					}) ?? false
			);
		}

		if (conditionParam) {
			const selectedConditions = new Set(
				conditionParam.split(",").map(normalizeFilterValue)
			);
			result = result.filter(
				(professional) =>
					professional.conditionSpecialty?.some?.((specialty) => {
						if (!specialty?.name) return false;
						return selectedConditions.has(
							normalizeFilterValue(specialty.name)
						);
					}) ?? false
			);
		}

		if (insuranceParam) {
			const selectedInsurances = new Set(
				insuranceParam.split(",").map(normalizeFilterValue)
			);
			result = result.filter(
				(professional) =>
					professional.insurances?.some?.((insurance) => {
						if (!insurance?.name) return false;
						return selectedInsurances.has(normalizeFilterValue(insurance.name));
					}) ?? false
			);
		}

		if (therapyParam) {
			const selectedTherapy = normalizeFilterValue(therapyParam);
			result = result.filter(
				(professional) =>
					professional.therapyOptions?.some?.(
						(modality) =>
							typeof modality?.type === "string" &&
							normalizeFilterValue(modality.type) === selectedTherapy
					) ?? false
			);
		}

		if (lockedAgeSpecialties.length > 0) {
			const lockedAgeSet = new Set(
				lockedAgeSpecialties.map(normalizeFilterValue)
			);

			result = result.filter(
				(professional) =>
					professional.ageSpecialty?.some?.((age) => {
						if (!age?.age) return false;
						return lockedAgeSet.has(normalizeFilterValue(age.age));
					}) ?? false
			);
		}

		if (lockedConditions.length > 0) {
			const lockedConditionSet = new Set(
				lockedConditions.map(normalizeFilterValue)
			);
			result = result.filter(
				(professional) =>
					professional.conditionSpecialty?.some?.((c) => {
						if (!c?.name) return false;
						return lockedConditionSet.has(normalizeFilterValue(c.name));
					}) ?? false
			);
		}

		if (lockedInsurances.length > 0) {
			const lockedInsuranceSet = new Set(
				lockedInsurances.map(normalizeFilterValue)
			);
			result = result.filter(
				(professional) =>
					professional.insurances?.some?.((i) => {
						if (!i?.name) return false;
						return lockedInsuranceSet.has(normalizeFilterValue(i.name));
					}) ?? false
			);
		}

		if (lockedCity) {
			const cityLower = normalizeFilterValue(lockedCity);
			result = result.filter((professional) => {
				const provCity = normalizeFilterValue(professional.address?.city || "");
				if (provCity === cityLower) return true;
				if (cityLower === "fort lauderdale" && (provCity === "ft. lauderdale" || provCity.includes("fort lauderdale"))) return true;
				if (cityLower === "coral gables" && provCity.startsWith("coral gable")) return true;
				return false;
			});
		}

		if (lockedLanguage) {
			const langLower = normalizeFilterValue(lockedLanguage);
			result = result.filter(
				(professional) =>
					professional.languages?.some?.(
						(l) => normalizeFilterValue(l) === langLower
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

		return result;
	}, [allProfessionals, lockedAgeSpecialties, lockedConditions, lockedInsurances, lockedCity, lockedLanguage, searchParamsKey]);

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
