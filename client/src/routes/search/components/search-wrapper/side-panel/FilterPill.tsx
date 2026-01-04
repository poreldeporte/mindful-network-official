"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

interface FilterPillProps {
	id: string;
	label: string;
	count: number;
	isOpen: boolean;
	isActive: boolean;
	controlsId: string;
	onClick: () => void;
}

export const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
	({ id, label, count, isOpen, isActive, controlsId, onClick }, ref) => {
		const countLabel = count > 0 ? ` (${count})` : "";
		const stateClasses = isOpen
			? "border-blue-600 bg-blue-600 text-white"
			: isActive
				? "border-blue-200 bg-blue-50 text-blue-700"
				: "border-gray-200 bg-white text-gray-700 hover:border-blue-300";

		return (
			<button
				id={id}
				ref={ref}
				className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium leading-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 sm:text-xs ${stateClasses}`}
				aria-expanded={isOpen}
				aria-controls={controlsId}
				aria-haspopup="dialog"
				onClick={onClick}
				type="button"
			>
				<span className="whitespace-nowrap">
					{label}
					{countLabel}
				</span>
				<ChevronDown
					className={`h-3.5 w-3.5 transition-transform ${
						isOpen ? "rotate-180" : "rotate-0"
					}`}
					aria-hidden="true"
				/>
			</button>
		);
	}
);

FilterPill.displayName = "FilterPill";
