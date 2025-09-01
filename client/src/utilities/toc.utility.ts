import { TOCSettings } from "@/models";

export interface TOCItem {
	id: string;
	text: string;
	level: string;
	anchor: string;
}

export const generateHeadingId = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, "")
		.replace(/\s+/g, "")
		.trim();
};

export const generateTOC = (
	content: any[],
	settings: TOCSettings
): TOCItem[] => {
	if (!settings.enableTOC) return [];

	const headings = content.filter(
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

export const getTOCPosition = (position: string) => {
	switch (position) {
		case "sidebar":
			return "fixed left-1/2 -translate-x-1/2 bottom-5 w-max max-w-[90vw] z-50 hidden lg:block overflow-hidden";
		case "floating":
			return "fixed left-1/2 -translate-x-1/2 bottom-5 w-max max-w-[90vw] z-50 hidden lg:block overflow-hidden";
		case "after":
			return "mt-10";
		default:
			return "mt-10";
	}
};
