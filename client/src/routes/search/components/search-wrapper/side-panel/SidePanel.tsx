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
import { useCallback, useEffect, useState } from "react";
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
	isLoading: boolean;
}

const SidePanel = ({
	filteredProffesionals,
	conditions,
	insurances,
	therapyModalities,
	resources,
	isLoading,
}: Props) => {
	const RESULTS_PER_PAGE = 12;
	const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
	const [selectedResources, setSelectedResources] = useState<string[]>([]);
	const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
	const [selectedTherapy, setSelectedTherapy] = useState<string | null>(null);
	const searchParams = useSearchParams();
	const router = useRouter();
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

	useEffect(() => {
		const conditionParam = searchParams.get("condition");
		const insuranceParam = searchParams.get("insurance");
		const therapyParam = searchParams.get("therapy");
		const resourceParam = searchParams.get("resource");

		setSelectedCondition(conditionParam ? conditionParam.split(",") : []);
		setSelectedInsurance(insuranceParam ? insuranceParam.split(",") : []);
		setSelectedTherapy(therapyParam ?? null);
		setSelectedResources(resourceParam ? resourceParam.split(",") : []);
	}, [searchParams]);

	const pushParams = useCallback(
		(params: URLSearchParams) => {
			const queryString = params.toString();
			router.push(queryString ? `?${queryString}` : "?", undefined);
		},
		[router]
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

		pushParams(currentParams);
	};

	const handleClearFilter = (filterType: FilterKey) => {
		const currentParams = new URLSearchParams(searchParams.toString());
		currentParams.delete("page");

		if (filterType === "resource") {
			setSelectedResources([]);
			currentParams.delete("resource");
		}

		if (filterType === "condition") {
			setSelectedCondition([]);
			currentParams.delete("condition");
		}

		if (filterType === "insurance") {
			setSelectedInsurance([]);
			currentParams.delete("insurance");
		}

		if (filterType === "therapy") {
			setSelectedTherapy(null);
			currentParams.delete("therapy");
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

		setSelectedResources([]);
		setSelectedCondition([]);
		setSelectedInsurance([]);
		setSelectedTherapy(null);
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
				selectedCondition={selectedCondition}
				selectedInsurance={selectedInsurance}
				selectedResources={selectedResources}
				selectedTherapy={selectedTherapy}
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
