import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const resourceOrder = [
	"Innovative Therapies",
	"Psychologists",
	"Psychiatry",
	"Outpatient Facilities",
	"Inpatient Facilities",
	"Baker Act Facilities",
	"Estate Planning Lawyers",
	"Mental Health Lawyers",
	"Mind Body Practices",
];

const customSort = (a, b) => {
	const indexA = resourceOrder.indexOf(a.title);
	const indexB = resourceOrder.indexOf(b.title);

	if (indexA === -1 && indexB === -1) {
		return a.title.localeCompare(b.title);
	}

	if (indexA === -1) return 1;
	if (indexB === -1) return -1;

	return indexA - indexB;
};

export function sortResources(resources) {
	return [...resources].sort(customSort);
}
