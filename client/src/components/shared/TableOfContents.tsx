"use client";

import { useState, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { PortableTextBlock } from "@portabletext/types";

interface TOCItem {
	id: string;
	text: string;
	level: string;
	anchor: string;
}

interface TOCSettings {
	enableTOC: boolean;
	tocPosition: "before" | "after" | "sidebar" | "floating";
	includeLevels: string[];
}

interface TableOfContentsProps {
	content: PortableTextBlock;
	settings: TOCSettings;
	className?: string;
}

const generateHeadingId = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "")
		.trim();
};

const generateTOC = (
	content: PortableTextBlock,
	settings: TOCSettings
): TOCItem[] => {
	if (!settings.enableTOC) return [];

	const contentArray = Array.isArray(content) ? content : [content];

	const headings = contentArray.filter(
		(block) =>
			block._type === "block" &&
			block.style?.startsWith("h") &&
			settings.includeLevels.includes(block.style)
	);

	return headings.map((heading) => {
		const text = heading.children?.[0]?.text || "";
		const id = generateHeadingId(text);

		return {
			text,
			id,
			level: heading.style,
			anchor: `#${id}`,
		};
	});
};

export default function TableOfContents({
	content,
	settings,
	className = "",
}: TableOfContentsProps) {
	const [tocItems, setTocItems] = useState<TOCItem[]>([]);
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		const items = generateTOC(content, settings);
		setTocItems(items);
	}, [content, settings]);

	useEffect(() => {
		if (!settings.enableTOC || tocItems.length === 0) return;

		const handleScroll = () => {
			const sections = tocItems.map((item) => document.getElementById(item.id));
			const scrollPosition = window.scrollY + 300;
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
	}, [tocItems, settings.enableTOC]);

	const scrollToSection = (anchor: string) => {
		const element = document.querySelector(anchor);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	};

	if (!settings.enableTOC || tocItems.length === 0) {
		return null;
	}

	const getLevelClass = (level: string) => {
		const levelMap: { [key: string]: string } = {
			h1: "font-semibold text-xs",
			h2: "font-medium text-xs",
			h3: "font-normal text-xs",
			h4: "font-normal text-xs text-gray-600",
			h5: "font-normal text-xs text-gray-500",
			h6: "font-normal text-xs text-gray-400",
		};
		return levelMap[level] || "ml-0";
	};

	return (
		<nav className={`toc-navigation ${className}`}>
			<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-2 overflow-x-auto">
				<ul className="flex items-center justify-center">
					{tocItems.map((item) => (
						<li key={item.id}>
							<button
								onClick={() => scrollToSection(item.anchor)}
								className={`w-full px-2 py-1 text-left rounded transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 flex items-center ${getLevelClass(item.level)} ${
									activeSection === item.id
										? "text-white bg-blue-500 font-medium"
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
