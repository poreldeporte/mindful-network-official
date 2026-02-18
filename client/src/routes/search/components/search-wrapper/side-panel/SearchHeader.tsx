"use client";

import { Typography } from "@/components/ui";
import {
	ResourcesKey,
	TherapyModality,
	conditionSpecialty,
	insurances,
} from "@/models";
import { formatType } from "@/utilities";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { FilterConfig, FilterKey, FilterPillBar } from "./FilterPillBar";

interface SearchHeaderProps {
	resources: ResourcesKey[];
	conditions: conditionSpecialty[] | null;
	insurances: insurances[] | null;
	therapyModalities: TherapyModality[] | null;
	lockedAgeSpecialties?: string[];
	showLockedAgeSpecialties?: boolean;
	titlePrefix?: string;
	titleHighlight?: string;
	headingAs?: "h1" | "h2";
	selectedResources: string[];
	selectedCondition: string[];
	selectedInsurance: string[];
	selectedTherapy: string | null;
	onToggleFilter: (key: FilterKey, value: string) => void;
	onClearFilter: (key: FilterKey) => void;
	onClearAll: () => void;
}

export const SearchHeader = ({
	resources,
	conditions,
	insurances,
	therapyModalities,
	lockedAgeSpecialties = [],
	showLockedAgeSpecialties = true,
	titlePrefix = "Find Professionals in",
	titleHighlight = "South Florida",
	headingAs = "h1",
	selectedResources,
	selectedCondition,
	selectedInsurance,
	selectedTherapy,
	onToggleFilter,
	onClearFilter,
	onClearAll,
}: SearchHeaderProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const searchParam = searchParams.get("search") ?? "";
	const [searchQuery, setSearchQuery] = useState(searchParam);
	const previousSearchRef = useRef(searchParam);

	useEffect(() => {
		if (previousSearchRef.current !== searchParam) {
			setSearchQuery(searchParam);
			previousSearchRef.current = searchParam;
		}
	}, [searchParam]);

	const resourceOptions = useMemo(
		() =>
			(resources ?? []).map((resource) => ({
				value: resource.key,
				label: resource.label,
			})),
		[resources]
	);

	const conditionOptions = useMemo(
		() =>
			(conditions ?? []).map((condition) => ({
				value: condition.name,
				label: condition.name,
			})),
		[conditions]
	);

	const insuranceOptions = useMemo(
		() =>
			(insurances ?? []).map((insurance) => ({
				value: insurance.name,
				label: insurance.name,
			})),
		[insurances]
	);

	const therapyOptions = useMemo(
		() =>
			(therapyModalities ?? []).map((modality) => ({
				value: modality.type,
				label: formatType(modality.type),
			})),
		[therapyModalities]
	);

	const filters = useMemo<FilterConfig[]>(() => {
		const configs: FilterConfig[] = [
			{
				key: "resource",
				label: "Levels of Care",
				searchPlaceholder: "Search levels of care",
				options: resourceOptions,
				selectedValues: selectedResources,
				selectionType: "multi",
				accentColor: "blue",
			},
			{
				key: "condition",
				label: "Conditions",
				searchPlaceholder: "Search conditions",
				options: conditionOptions,
				selectedValues: selectedCondition,
				selectionType: "multi",
				accentColor: "orange",
			},
			{
				key: "insurance",
				label: "Insurance",
				searchPlaceholder: "Search insurance",
				options: insuranceOptions,
				selectedValues: selectedInsurance,
				selectionType: "multi",
				accentColor: "green",
			},
			{
				key: "therapy",
				label: "Treatment Therapies",
				searchPlaceholder: "Search therapies",
				options: therapyOptions,
				selectedValues: selectedTherapy ? [selectedTherapy] : [],
				selectionType: "single",
				accentColor: "blue",
			},
		];

		return configs.filter(
			(config) => config.options.length > 0 || config.selectedValues.length > 0
		);
	}, [
		resourceOptions,
		conditionOptions,
		insuranceOptions,
		therapyOptions,
		selectedResources,
		selectedCondition,
		selectedInsurance,
		selectedTherapy,
	]);

	const pushSearchParams = (nextSearch: string) => {
		const params = new URLSearchParams(searchParams.toString());
		const trimmed = nextSearch.trim();
		params.delete("page");

		if (trimmed) {
			params.set("search", trimmed);
		} else {
			params.delete("search");
		}

		const queryString = params.toString();
		router.push(queryString ? `?${queryString}` : "?", undefined);
	};

	return (
		<header
			className="px-5 pb-6 w-full border-b border-gray-200"
			aria-label="Search header"
		>
			<div className="mt-4 space-y-5">
				<Typography
					className="font-antic"
					as={headingAs}
					color="black"
					variant="h3"
					id="side-panel-header"
				>
					{titlePrefix} <span className="text-green-300">{titleHighlight}</span>
				</Typography>

				{showLockedAgeSpecialties && lockedAgeSpecialties.length > 0 && (
					<div className="flex flex-wrap items-center gap-2">
						<Typography as="span" color="darkGray" variant="bodyXSmall">
							Prefiltered:
						</Typography>
						<span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-medium text-blue-700 sm:text-xs">
							Age Specialty: {lockedAgeSpecialties.join(", ")}
						</span>
					</div>
				)}

				<form
					className="flex flex-col gap-3 lg:flex-row lg:items-center"
					onSubmit={(event) => {
						event.preventDefault();
						pushSearchParams(searchQuery);
					}}
				>
					<div className="relative flex-1">
						<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
						<input
							type="search"
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
							placeholder="Search by name, insurance, or therapy"
							className="h-11 w-full rounded-full border border-gray-200 bg-white pl-11 pr-10 text-[12px] text-gray-700 sm:text-[13px] shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
							aria-label="Search professionals"
						/>
						{searchQuery.length > 0 && (
							<button
								type="button"
								className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
								onClick={() => {
									setSearchQuery("");
									pushSearchParams("");
								}}
								aria-label="Clear search"
							>
								<X className="h-4 w-4" />
							</button>
						)}
					</div>

					<button
						type="submit"
						className="h-11 rounded-full bg-blue-600 px-6 text-[12px] font-medium text-white sm:text-[13px] shadow-sm transition hover:bg-blue-700"
					>
						Search
					</button>
				</form>

				<FilterPillBar
					filters={filters}
					onToggle={onToggleFilter}
					onClearFilter={onClearFilter}
					onClearAll={onClearAll}
				/>
			</div>
		</header>
	);
};
