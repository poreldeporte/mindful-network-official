import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const resourceOrder = [
	"Psychologists",
	"Backer Act Facilities",
	"Innovative Therapies",
	"Inpatient Facilities",
	"Medication Management",
	"Mental Health",
	"Mind Body Practices",
	"Outpatient Facilities",
	"Psychiatric Management",
	"Estate Planning Lawyers",
	"Estate Specialized Mental Health Lawyers",
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
