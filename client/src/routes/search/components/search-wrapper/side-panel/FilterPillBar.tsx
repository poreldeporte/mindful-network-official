"use client";

import { ColorType } from "@/components/ui";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilterPill } from "./FilterPill";
import { FilterOption, FilterPopover } from "./FilterPopover";

export type FilterKey = "resource" | "condition" | "insurance" | "therapy";

export interface FilterConfig {
	key: FilterKey;
	label: string;
	searchPlaceholder: string;
	options: FilterOption[];
	selectedValues: string[];
	selectionType: "single" | "multi";
	accentColor: ColorType;
}

interface FilterPillBarProps {
	filters: FilterConfig[];
	onToggle: (key: FilterKey, value: string) => void;
	onClearFilter: (key: FilterKey) => void;
	onClearAll: () => void;
}

export const FilterPillBar = ({
	filters,
	onToggle,
	onClearFilter,
	onClearAll,
}: FilterPillBarProps) => {
	const [activeKey, setActiveKey] = useState<FilterKey | null>(null);
	const [popoverPosition, setPopoverPosition] = useState<{
		left: number;
		top: number;
	} | null>(null);
	const barRef = useRef<HTMLDivElement | null>(null);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const pillRefs = useRef<Partial<Record<FilterKey, HTMLButtonElement | null>>>(
		{}
	);

	useEffect(() => {
		if (activeKey && !filters.some((filter) => filter.key === activeKey)) {
			setActiveKey(null);
		}
	}, [activeKey, filters]);

	const hasActiveFilters = filters.some(
		(filter) => filter.selectedValues.length > 0
	);

	const updatePopoverPosition = useCallback(() => {
		if (!activeKey) {
			setPopoverPosition(null);
			return;
		}

		const anchorEl = pillRefs.current[activeKey];
		const containerEl = barRef.current;

		if (!anchorEl || !containerEl) return;

		const anchorRect = anchorEl.getBoundingClientRect();
		const containerRect = containerEl.getBoundingClientRect();
		const left = Math.max(anchorRect.left - containerRect.left, 8);
		const top = anchorRect.bottom - containerRect.top + 8;

		setPopoverPosition({ left, top });
	}, [activeKey]);

	useEffect(() => {
		if (!activeKey) return;
		updatePopoverPosition();
	}, [activeKey, updatePopoverPosition]);

	useEffect(() => {
		if (!activeKey) return;
		const handleUpdate = () => updatePopoverPosition();
		const scrollEl = scrollRef.current;

		window.addEventListener("resize", handleUpdate);
		scrollEl?.addEventListener("scroll", handleUpdate);

		return () => {
			window.removeEventListener("resize", handleUpdate);
			scrollEl?.removeEventListener("scroll", handleUpdate);
		};
	}, [activeKey, updatePopoverPosition]);

	if (filters.length === 0) return null;

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				<div className="relative min-w-0 flex-1" ref={barRef}>
					<div
						ref={scrollRef}
						className="flex items-center gap-2 overflow-x-auto pb-2 pr-6"
						role="toolbar"
						aria-label="Search filters"
					>
						{filters.map((filter) => (
							<div key={filter.key} className="relative">
								<FilterPill
									id={`filter-pill-${filter.key}`}
									controlsId={`filter-panel-${filter.key}`}
									label={filter.label}
									count={filter.selectedValues.length}
									isOpen={activeKey === filter.key}
									isActive={filter.selectedValues.length > 0}
									onClick={() =>
										setActiveKey(activeKey === filter.key ? null : filter.key)
									}
									ref={(node) => {
										pillRefs.current[filter.key] = node;
									}}
								/>
							</div>
						))}
					</div>
					<div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
					{filters.map((filter) => (
						<FilterPopover
							key={filter.key}
							id={`filter-panel-${filter.key}`}
							label={filter.label}
							isOpen={activeKey === filter.key}
							options={filter.options}
							selectedValues={filter.selectedValues}
							selectionType={filter.selectionType}
							accentColor={filter.accentColor}
							searchPlaceholder={filter.searchPlaceholder}
							onToggle={(value) => onToggle(filter.key, value)}
							onClear={() => onClearFilter(filter.key)}
							onClose={() => setActiveKey(null)}
							anchorEl={pillRefs.current[filter.key] ?? null}
							desktopPosition={
								activeKey === filter.key ? popoverPosition : null
							}
						/>
					))}
				</div>

				<button
					type="button"
					className="text-[11px] font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-400 sm:text-xs"
					onClick={() => {
						setActiveKey(null);
						onClearAll();
					}}
					disabled={!hasActiveFilters}
				>
					Clear all
				</button>
			</div>

		</div>
	);
};
