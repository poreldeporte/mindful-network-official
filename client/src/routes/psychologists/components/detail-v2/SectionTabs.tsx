"use client";

import { useEffect, useState } from "react";

export interface SectionTab {
	id: string;
	label: string;
}

interface SectionTabsProps {
	sections: SectionTab[];
	offset?: number;
}

export const SectionTabs = ({ sections, offset = 120 }: SectionTabsProps) => {
	const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

	useEffect(() => {
		if (!sections.length) return;

		const handleScroll = () => {
			const scrollPosition = window.scrollY + offset;
			let current = sections[0]?.id ?? "";

			for (const section of sections) {
				const element = document.getElementById(section.id);
				if (element && element.offsetTop <= scrollPosition) {
					current = section.id;
				}
			}

			setActiveId(current);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [offset, sections]);

	if (!sections.length) return null;

	return (
		<nav
			className="sticky z-30 rounded-2xl border border-gray-200/70 bg-white/90 p-2.5"
			style={{ top: "var(--subnav-top)" }}
			data-detail-tabs
			aria-label="Section navigation"
		>
			<div className="flex items-center gap-2 overflow-x-auto pb-1">
				{sections.map((section) => {
					const isActive = activeId === section.id;
					return (
						<button
							key={section.id}
							type="button"
							className={`whitespace-nowrap rounded-full px-4 py-1 text-[11px] font-medium transition ${
								isActive
									? "bg-blue-600 text-white"
									: "border border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:text-blue-700"
							}`}
							onClick={() => {
								const element = document.getElementById(section.id);
								if (element) {
									element.scrollIntoView({ behavior: "smooth" });
								}
							}}
							aria-current={isActive ? "page" : undefined}
						>
							{section.label}
						</button>
					);
				})}
			</div>
		</nav>
	);
};
