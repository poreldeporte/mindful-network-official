"use client";

import { useState, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { PsychologistModel } from "@/models";

interface TOCItem {
	id: string;
	text: string;
	level: string;
	anchor: string;
}

interface ProfessionalTOCProps {
	psychologist: PsychologistModel;
	className?: string;
}

const generateProfessionalTOC = (
	psychologist: PsychologistModel
): TOCItem[] => {
	const sections: TOCItem[] = [];

	if (psychologist.video) {
		sections.push({
			id: "profile-video",
			text: "Get to know me",
			level: "h2",
			anchor: "#profile-video",
		});
	}

	if (psychologist.imagesGallery && psychologist.imagesGallery.length > 0) {
		sections.push({
			id: "profile-gallery",
			text: "Gallery",
			level: "h2",
			anchor: "#profile-gallery",
		});
	}

	if (
		psychologist.ageSpecialty?.length > 0 ||
		psychologist.conditionSpecialty?.length > 0 ||
		psychologist.therapyOptions?.length > 0
	) {
		sections.push({
			id: "expertise",
			text: "Expertise",
			level: "h2",
			anchor: "#expertise",
		});
	}

	if (psychologist.showInsurances && psychologist.insurances?.length > 0) {
		sections.push({
			id: "insurances",
			text: "Check your insurances",
			level: "h2",
			anchor: "#insurances",
		});
	}

	if (
		psychologist.languages?.length > 0 ||
		psychologist.degree ||
		psychologist.email ||
		psychologist.address?.address ||
		psychologist.phone
	) {
		sections.push({
			id: "more-info",
			text: "More info",
			level: "h2",
			anchor: "#more-info",
		});
	}

	return sections;
};

export default function ProfessionalTOC({
	psychologist,
	className = "",
}: ProfessionalTOCProps) {
	const [tocItems, setTocItems] = useState<TOCItem[]>([]);
	const [activeSection, setActiveSection] = useState<string>("");

	const tocSettings = psychologist.tocSettings || {
		enableTOC: true,
		tocPosition: "before",
		includeLevels: ["h1", "h2", "h3"],
	};

	useEffect(() => {
		const items = generateProfessionalTOC(psychologist);
		setTocItems(items);
	}, [psychologist]);

	useEffect(() => {
		if (!tocSettings.enableTOC || tocItems.length === 0) return;

		const handleScroll = () => {
			const sections = tocItems.map((item) => document.getElementById(item.id));
			const scrollPosition = window.scrollY + 100;
			let foundActiveSection = false;

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				if (section && section.offsetTop <= scrollPosition) {
					const rect = section.getBoundingClientRect();
					const isVisible = rect.top <= 100 && rect.bottom >= 100;

					if (isVisible) {
						setActiveSection(tocItems[i].id);
						foundActiveSection = true;
						break;
					}
				}
			}

			if (!foundActiveSection) {
				setActiveSection("");
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [tocItems, tocSettings.enableTOC]);

	const scrollToSection = (anchor: string) => {
		const element = document.querySelector(anchor);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	if (!tocSettings.enableTOC || tocItems.length === 0) {
		return null;
	}

	return (
		<nav className={`professional-toc ${className}`}>
			<div className="bg-white rounded-2xl border border-gray-200 p-4">
				<h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center">
					<span className="mr-2">👨‍⚕️</span>
					Profile Sections
				</h3>

				<ul className="space-y-2">
					{tocItems.map((item) => (
						<li key={item.id}>
							<button
								onClick={() => scrollToSection(item.anchor)}
								className={`w-full text-left px-2 py-1 rounded transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 flex items-center ${
									activeSection === item.id
										? "text-blue-700 bg-blue-50 font-medium"
										: "text-gray-700"
								}`}
							>
								<ChevronRightIcon className="w-3 h-3 mr-1 flex-shrink-0" />
								{item.text}
							</button>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
}
