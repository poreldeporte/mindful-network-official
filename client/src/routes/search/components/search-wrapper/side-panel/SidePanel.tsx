"use client";

import { NoResults, Typography } from "@/components/ui";
import {
	conditionSpecialty,
	insurances,
	PsychologistModel,
	ResourcesKey,
	TherapyModality,
} from "@/models";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import PsychologistCard from "./PsychologistCard";
import { PsychologistCardSkeleton } from "./PsychologistCard.skeleton";
import { SearchHeader } from "./SearchHeader";
import { FilterKey } from "./FilterPillBar";
import { SearchPagination } from "./SearchPagination";

interface Props {
	filteredProffesionals: PsychologistModel[] | null;
	conditions: conditionSpecialty[] | null;
	insurances: insurances[] | null;
	therapyModalities: TherapyModality[] | null;
	resources: ResourcesKey[];
	cities: string[];
	ageSpecialties: string[];
	lockedAgeSpecialties?: string[];
	showLockedAgeSpecialties?: boolean;
	titlePrefix?: string;
	titleHighlight?: string;
	headingAs?: "h1" | "h2";
	isLoading: boolean;
}

const SidePanel = ({
	filteredProffesionals,
	conditions,
	insurances,
	therapyModalities,
	resources,
	cities,
	ageSpecialties,
	lockedAgeSpecialties = [],
	showLockedAgeSpecialties = true,
	titlePrefix,
	titleHighlight,
	headingAs,
	isLoading,
}: Props) => {
	const RESULTS_PER_PAGE = 12;
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const selectedCondition = searchParams.get("condition")?.split(",") ?? [];
	const selectedResources = searchParams.get("resource")?.split(",") ?? [];
	const selectedInsurance = searchParams.get("insurance")?.split(",") ?? [];
	const selectedTherapy = searchParams.get("therapy") ?? null;
	const selectedCity = searchParams.get("city")?.split(",") ?? [];
	const selectedAge = searchParams.get("age")?.split(",") ?? [];
	const pageParam = searchParams.get("page");
	const parsedPage = Number.parseInt(pageParam ?? "1", 10);
	const currentPage =
		Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
	const totalResults = filteredProffesionals?.length ?? 0;
	const totalPages = Math.max(1, Math.ceil(totalResults / RESULTS_PER_PAGE));
	const safePage = Math.min(currentPage, totalPages);
	const pageStart =
		totalResults === 0 ? 0 : (safePage - 1) * RESULTS_PER_PAGE + 1;
	const pageEnd =
		totalResults === 0
			? 0
			: Math.min(safePage * RESULTS_PER_PAGE, totalResults);
	const paginatedProfessionals = filteredProffesionals
		? filteredProffesionals.slice(
				(safePage - 1) * RESULTS_PER_PAGE,
				safePage * RESULTS_PER_PAGE
			)
		: null;

	// Update the URL via window.history.replaceState instead of router.replace
	// so changing a filter chip doesn't trigger an RSC payload refetch from the
	// server. The client already has all the data; useSearchParams still picks
	// up the change because Next.js 14.1+ patches replaceState/pushState.
	const pushParams = useCallback(
		(params: URLSearchParams) => {
			const queryString = params.toString();
			const href = queryString ? `${pathname}?${queryString}` : pathname;
			const currentQuery = searchParams.toString();
			const currentHref = currentQuery ? `${pathname}?${currentQuery}` : pathname;
			if (href === currentHref) return;
			window.history.replaceState(null, "", href);
		},
		[pathname, searchParams]
	);

	const handleBadgeClick = (filterType: FilterKey, value: string) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.delete("page");

		if (filterType === "resource") {
			let updatedResources = [...selectedResources];

			if (updatedResources.includes(value)) {
				updatedResources = updatedResources.filter(
					(resource) => resource !== value
				);
			} else {
				updatedResources.push(value);
			}

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
		} else if (filterType === "condition") {
			let updatedConditions = [...selectedCondition];

			if (updatedConditions.includes(value)) {
				updatedConditions = updatedConditions.filter(
					(condition) => condition !== value
				);
			} else {
				updatedConditions.push(value);
			}

			if (updatedConditions.length > 0) {
				currentParams.set("condition", updatedConditions.join(","));
			} else {
				currentParams.delete("condition");
			}
		} else if (filterType === "therapy") {
			if (currentParams.get(filterType) === value) {
				currentParams.delete(filterType);
			} else {
				currentParams.set(filterType, value);
			}
		} else if (filterType === "city") {
			let updatedCities = [...selectedCity];

			if (updatedCities.includes(value)) {
				updatedCities = updatedCities.filter((city) => city !== value);
			} else {
				updatedCities.push(value);
			}

			if (updatedCities.length > 0) {
				currentParams.set("city", updatedCities.join(","));
			} else {
				currentParams.delete("city");
			}
		} else if (filterType === "age") {
			let updatedAges = [...selectedAge];

			if (updatedAges.includes(value)) {
				updatedAges = updatedAges.filter((age) => age !== value);
			} else {
				updatedAges.push(value);
			}

			if (updatedAges.length > 0) {
				currentParams.set("age", updatedAges.join(","));
			} else {
				currentParams.delete("age");
			}
		}

		pushParams(currentParams);
	};

	const handleClearFilter = (filterType: FilterKey) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.delete("page");

		if (filterType === "resource") {
			currentParams.delete("resource");
		}

		if (filterType === "condition") {
			currentParams.delete("condition");
		}

		if (filterType === "insurance") {
			currentParams.delete("insurance");
		}

		if (filterType === "therapy") {
			currentParams.delete("therapy");
		}

		if (filterType === "city") {
			currentParams.delete("city");
		}

		if (filterType === "age") {
			currentParams.delete("age");
		}

		pushParams(currentParams);
	};

	const handleClearAll = () => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.delete("page");
		currentParams.delete("resource");
		currentParams.delete("condition");
		currentParams.delete("insurance");
		currentParams.delete("therapy");
		currentParams.delete("city");
		currentParams.delete("age");
		pushParams(currentParams);
	};

	const handlePageChange = (nextPage: number) => {
		const page = Math.min(Math.max(nextPage, 1), totalPages);
		const currentParams = new URLSearchParams(searchParams.toString());

		if (page <= 1) {
			currentParams.delete("page");
		} else {
			currentParams.set("page", String(page));
		}

		pushParams(currentParams);
	};

	useEffect(() => {
		if (!filteredProffesionals || totalResults === 0) return;
		if (currentPage === safePage) return;

		const currentParams = new URLSearchParams(searchParams.toString());
		if (safePage <= 1) {
			currentParams.delete("page");
		} else {
			currentParams.set("page", String(safePage));
		}

		pushParams(currentParams);
	}, [
		currentPage,
		filteredProffesionals,
		pushParams,
		safePage,
		searchParams,
		totalResults,
	]);

	return (
		<aside
			className="w-full bg-white flex flex-col"
			role="complementary"
			aria-labelledby="side-panel-header"
		>
			<SearchHeader
				conditions={conditions}
				insurances={insurances}
				resources={resources}
				therapyModalities={therapyModalities}
				cities={cities}
				ageSpecialties={ageSpecialties}
				lockedAgeSpecialties={lockedAgeSpecialties}
				showLockedAgeSpecialties={showLockedAgeSpecialties}
				titlePrefix={titlePrefix}
				titleHighlight={titleHighlight}
				headingAs={headingAs}
				selectedCondition={selectedCondition}
				selectedInsurance={selectedInsurance}
				selectedResources={selectedResources}
				selectedTherapy={selectedTherapy}
				selectedCity={selectedCity}
				selectedAge={selectedAge}
				onToggleFilter={handleBadgeClick}
				onClearFilter={handleClearFilter}
				onClearAll={handleClearAll}
			/>
			{!isLoading && totalResults > 0 && (
				<div className="px-5 pt-4">
					<Typography
						as="span"
						color="darkGray"
						variant="bodyXSmall"
						className="text-gray-500"
					>
						Showing {pageStart}-{pageEnd} of {totalResults} professionals
					</Typography>
				</div>
			)}
			<div className="max-w-full" role="region" aria-live="polite">
				{isLoading ? (
					<>
						{Array(5)
							.fill(0)
							.map((_, index) => (
								<PsychologistCardSkeleton key={index} />
							))}
					</>
				) : paginatedProfessionals && paginatedProfessionals.length ? (
					<ul
						className="px-5 pt-3 pb-5 grid gap-4 md:grid-cols-2"
						role="list"
						aria-label="Filtered professionals"
					>
						{paginatedProfessionals.map((psychologist) => (
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

			{!isLoading && totalPages > 1 && (
				<SearchPagination
					currentPage={safePage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</aside>
	);
};

export default SidePanel;
