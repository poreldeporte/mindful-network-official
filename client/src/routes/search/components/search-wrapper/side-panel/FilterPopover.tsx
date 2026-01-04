"use client";

import { Badge, ColorType } from "@/components/ui";
import { formatType } from "@/utilities";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface FilterOption {
	value: string;
	label: string;
}

interface FilterPopoverProps {
	id: string;
	label: string;
	isOpen: boolean;
	options: FilterOption[];
	selectedValues: string[];
	selectionType: "single" | "multi";
	accentColor: ColorType;
	searchPlaceholder: string;
	onToggle: (value: string) => void;
	onClear: () => void;
	onClose: () => void;
	anchorEl: HTMLButtonElement | null;
	desktopPosition?: { left: number; top: number } | null;
}

const focusableSelector =
	"button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";

export const FilterPopover = ({
	id,
	label,
	isOpen,
	options,
	selectedValues,
	selectionType,
	accentColor,
	searchPlaceholder,
	onToggle,
	onClear,
	onClose,
	anchorEl,
	desktopPosition,
}: FilterPopoverProps) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isDesktop, setIsDesktop] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(min-width: 1024px)").matches;
	});
	const containerRef = useRef<HTMLDivElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const filteredOptions = useMemo(() => {
		const normalized = searchTerm.trim().toLowerCase();
		if (!normalized) return options;
		return options.filter((option) =>
			option.label.toLowerCase().includes(normalized)
		);
	}, [options, searchTerm]);

	const selectedSet = useMemo(
		() => new Set(selectedValues.filter(Boolean)),
		[selectedValues]
	);

	const selectedOptions = useMemo(
		() =>
			selectedValues
				.filter(Boolean)
				.map((value) =>
					options.find((option) => option.value === value) ?? {
						value,
						label: formatType(value),
					}
				)
				.filter(Boolean),
		[selectedValues, options]
	);

	const handleClose = useCallback(() => {
		onClose();
		anchorEl?.focus();
	}, [onClose, anchorEl]);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1024px)");
		const updateMatch = () => setIsDesktop(mediaQuery.matches);
		updateMatch();
		mediaQuery.addEventListener("change", updateMatch);
		return () => {
			mediaQuery.removeEventListener("change", updateMatch);
		};
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		setSearchTerm("");
		requestAnimationFrame(() => {
			searchInputRef.current?.focus();
		});
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				handleClose();
				return;
			}

			if (event.key !== "Tab") return;

			const container = containerRef.current;
			if (!container) return;
			if (!container.contains(document.activeElement)) return;

			const focusable = Array.from(
				container.querySelectorAll<HTMLElement>(focusableSelector)
			).filter((element) => !element.hasAttribute("disabled"));

			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		const handlePointerDown = (event: MouseEvent | TouchEvent) => {
			const target = event.target as Node | null;
			if (
				(containerRef.current && containerRef.current.contains(target)) ||
				(anchorEl && anchorEl.contains(target))
			) {
				return;
			}
			handleClose();
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("mousedown", handlePointerDown);
		document.addEventListener("touchstart", handlePointerDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handlePointerDown);
			document.removeEventListener("touchstart", handlePointerDown);
		};
	}, [isOpen, anchorEl, handleClose]);

	if (!isOpen) return null;
	if (isDesktop && !desktopPosition) return null;

	return (
		<>
			<div
				className="fixed inset-0 z-30 bg-black/20 lg:hidden"
				aria-hidden="true"
				onClick={handleClose}
			/>
			<div
				ref={containerRef}
				id={id}
				role="dialog"
				aria-label={`${label} filters`}
				className="fixed inset-x-0 bottom-0 z-40 max-h-[75vh] w-full overflow-hidden rounded-t-3xl border border-gray-200 bg-white shadow-2xl lg:absolute lg:inset-auto lg:z-50 lg:max-h-[60vh] lg:w-[22rem] lg:rounded-2xl"
				style={isDesktop && desktopPosition ? desktopPosition : undefined}
			>
				<div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
					<div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700 sm:text-xs">
						<span>{label}</span>
					</div>
					<button
						className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100"
						onClick={handleClose}
						type="button"
						aria-label={`Close ${label} filter`}
					>
						<X className="h-4 w-4" />
					</button>
				</div>
				<div className="space-y-3 px-4 py-4">
					<div className="flex items-center gap-2">
						<div className="relative flex-1">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								ref={searchInputRef}
								type="search"
								placeholder={searchPlaceholder}
								value={searchTerm}
								onChange={(event) => setSearchTerm(event.target.value)}
								className="h-10 w-full rounded-full border border-gray-200 bg-white pl-9 pr-9 text-[11px] text-gray-700 sm:text-xs shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
								aria-label={searchPlaceholder}
							/>
							{searchTerm.length > 0 && (
								<button
									type="button"
									className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
									onClick={() => setSearchTerm("")}
									aria-label={`Clear ${label} search`}
								>
									<X className="h-3.5 w-3.5" />
								</button>
							)}
						</div>
						<button
							type="button"
							onClick={onClear}
							className="text-[11px] font-medium text-blue-600 hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-400 sm:text-xs"
							disabled={selectedValues.length === 0}
							aria-label={`Clear ${label} selections`}
						>
							Clear
						</button>
					</div>

					{selectedOptions.length > 0 && (
						<div className="flex flex-wrap gap-2">
							{selectedOptions.map((option) => (
								<Badge
									key={option.value}
									color={accentColor}
									className="text-[11px] leading-4 sm:text-xs"
									showIcon={true}
									onClick={() => onToggle(option.value)}
									aria-label={`Remove ${option.label}`}
								>
									{option.label}
								</Badge>
							))}
						</div>
					)}

					<div
						className="max-h-[45vh] space-y-1 overflow-y-auto pr-1 lg:max-h-[40vh]"
						role="listbox"
						aria-multiselectable={selectionType === "multi"}
						aria-label={`${label} options`}
					>
						{filteredOptions.length === 0 ? (
							<p className="text-[11px] text-gray-500 sm:text-xs">No matches found.</p>
						) : (
							filteredOptions.map((option, index) => {
								const isSelected = selectedSet.has(option.value);
								return (
									<label
										key={option.value}
										className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-[11px] transition sm:text-xs hover:border-blue-200 ${
											isSelected
												? "border-blue-200 bg-blue-50"
												: "border-transparent"
										}`}
										role="option"
										aria-selected={isSelected}
									>
										<input
											id={`${id}-option-${index}`}
											type={selectionType === "multi" ? "checkbox" : "radio"}
											name={id}
											checked={isSelected}
											onChange={() => onToggle(option.value)}
											className="h-4 w-4 accent-blue-600"
										/>
										<span className="text-gray-700">{option.label}</span>
									</label>
								);
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
};
