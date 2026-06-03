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
import { trackEvent } from "@/lib/analytics";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SidePanel from "./side-panel/SidePanel";

interface SearchWrapperProps {
	lockedAgeSpecialties?: string[];
	showLockedAgeSpecialties?: boolean;
	lockedConditions?: string[];
	lockedInsurances?: string[];
	lockedCity?: string;
	lockedLanguage?: string;
	lockedTherapyModality?: string;
	titlePrefix?: string;
	titleHighlight?: string;
	headingAs?: "h1" | "h2";
	// Optional pre-fetched data. When provided, SearchWrapper hydrates with this
	// data instead of fetching client-side on mount. Lets server components
	// (e.g. /find/[slug] landing pages) deliver populated HTML to bots and
	// avoid the "No results found" flash before hydration.
	initialProfessionals?: PsychologistModel[];
	initialConditions?: conditionSpecialty[];
	initialInsurances?: insurances[];
	initialTherapyModalities?: TherapyModality[];
	initialResourceKeys?: ResourcesKey[];
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
	lockedTherapyModality,
	titlePrefix = "Find Professionals in",
	titleHighlight = "South Florida",
	headingAs = "h1",
	initialProfessionals,
	initialConditions,
	initialInsurances,
	initialTherapyModalities,
	initialResourceKeys,
}: SearchWrapperProps) => {
	const hasInitialData = Array.isArray(initialProfessionals);

	const [conditions, setConditions] = useState<conditionSpecialty[] | null>(
		initialConditions ?? null
	);
	const [insurances, setInsurances] = useState<insurances[] | null>(
		initialInsurances ?? null
	);
	const [therapyModalities, setTherapyModalities] = useState<
		TherapyModality[] | null
	>(initialTherapyModalities ?? null);
	const [allResourceKeys, setAllResourceKeys] = useState<ResourcesKey[] | []>(
		initialResourceKeys ?? []
	);
	const [allProfessionals, setAllProfessionals] = useState<
		PsychologistModel[] | null
	>(initialProfessionals ?? null);
	const [isLoading, setLoading] = useState(false);

	const searchParams = useSearchParams();
	const searchParamsKey = searchParams.toString();

	useEffect(() => {
		// Skip the fetch when the server has already supplied the initial dataset
		// (e.g. /find/ landing pages). The page-level `revalidate = 3600` on those
		// routes still gives ISR-driven freshness.
		if (hasInitialData) return;

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
	}, [hasInitialData]);

	const lastTrackedParamsRef = useRef<string | null>(null);

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
		const cityParam = params.get("city");
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

		if (cityParam) {
			const selectedCities = new Set(
				cityParam.split(",").map(normalizeFilterValue)
			);
			result = result.filter((professional) =>
				selectedCities.has(normalizeFilterValue(professional.address?.city || ""))
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

		if (lockedTherapyModality) {
			const modalityLower = normalizeFilterValue(lockedTherapyModality);
			result = result.filter(
				(professional) =>
					professional.therapyOptions?.some?.(
						(modality) =>
							typeof modality?.type === "string" &&
							normalizeFilterValue(modality.type) === modalityLower
					) ?? false
			);
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(professional) =>
					professional.name?.toLowerCase().includes(query) ||
					professional.facility?.toLowerCase().includes(query) ||
					professional.insurances?.some?.((insurance) =>
						insurance.name?.toLowerCase().includes(query)
					) ||
					professional.therapyOptions?.some?.((modality) =>
						modality.type?.toLowerCase().includes(query)
					) ||
					professional.resource?.some?.((res) =>
						res.title?.toLowerCase().includes(query)
					)
			);

			// When a result is an org listing (its own name == its facility)
			// and matches the query, hoist it above its affiliated practitioners
			// so a facility search reads as "facility, then who works there."
			const orgs = result.filter(
				(p) =>
					!!p.facility &&
					!!p.name &&
					normalizeFilterValue(p.name) === normalizeFilterValue(p.facility) &&
					(p.name.toLowerCase().includes(query) ||
						p.facility.toLowerCase().includes(query))
			);

			if (orgs.length > 0) {
				const orgFacilityNames = new Set(
					orgs.map((o) => normalizeFilterValue(o.facility))
				);
				const orgSet = new Set(orgs);
				const affiliated = result.filter(
					(p) =>
						!orgSet.has(p) &&
						!!p.facility &&
						orgFacilityNames.has(normalizeFilterValue(p.facility))
				);
				const remaining = result.filter(
					(p) =>
						!orgSet.has(p) &&
						!(
							!!p.facility &&
							orgFacilityNames.has(normalizeFilterValue(p.facility))
						)
				);
				result = [...orgs, ...affiliated, ...remaining];
			}
		}

		return result;
	}, [allProfessionals, lockedAgeSpecialties, lockedConditions, lockedInsurances, lockedCity, lockedLanguage, lockedTherapyModality, searchParamsKey]);

	// Unique list of cities present in the dataset (deduped case-insensitively),
	// used to populate the City filter. Derived from the full set so the options
	// stay stable as other filters narrow the results.
	const cities = useMemo(() => {
		if (!allProfessionals) return [];
		const seen = new Map<string, string>();
		for (const professional of allProfessionals) {
			const raw = (professional.address?.city || "").trim();
			if (!raw) continue;
			const key = raw.toLowerCase();
			if (!seen.has(key)) seen.set(key, raw);
		}
		return Array.from(seen.values());
	}, [allProfessionals]);

	useEffect(() => {
		if (lastTrackedParamsRef.current === searchParamsKey) return;
		lastTrackedParamsRef.current = searchParamsKey;

		const params = new URLSearchParams(searchParamsKey);
		const query = params.get("search") ?? "";
		const condition = params.get("condition") ?? "";
		const insurance = params.get("insurance") ?? "";
		const therapy = params.get("therapy") ?? "";
		const resource = params.get("resource") ?? "";
		const city = params.get("city") ?? "";

		const hasFilters = Boolean(
			query || condition || insurance || therapy || resource || city ||
			lockedAgeSpecialties.length || lockedConditions.length ||
			lockedInsurances.length || lockedCity || lockedLanguage
		);
		if (!hasFilters) return;

		const timer = window.setTimeout(() => {
			trackEvent("search_submit", {
				query,
				condition,
				insurance,
				therapy,
				resource,
				city,
				locked_city: lockedCity ?? "",
				locked_language: lockedLanguage ?? "",
				locked_age: lockedAgeSpecialties.join(",") || "",
				locked_conditions: lockedConditions.join(",") || "",
				locked_insurances: lockedInsurances.join(",") || "",
				result_count: filteredProfessionals?.length ?? 0,
			});
		}, 600);

		return () => window.clearTimeout(timer);
	}, [searchParamsKey, lockedAgeSpecialties, lockedConditions, lockedInsurances, lockedCity, lockedLanguage, filteredProfessionals]);

	return (
		<SidePanel
			filteredProffesionals={filteredProfessionals}
			conditions={conditions}
			insurances={insurances}
			therapyModalities={therapyModalities}
			resources={allResourceKeys}
			cities={cities}
			lockedAgeSpecialties={lockedAgeSpecialties}
			showLockedAgeSpecialties={showLockedAgeSpecialties}
			titlePrefix={titlePrefix}
			titleHighlight={titleHighlight}
			headingAs={headingAs}
			isLoading={isLoading}
		/>
	);
};
