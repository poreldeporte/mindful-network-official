import { UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import { formatType } from "@/utilities";
import {
	BadgeCheck,
	Globe,
	HeartPulse,
	Users,
	Video,
	Wallet,
} from "lucide-react";
import type { StaticImageData } from "next/image";
import type { ComponentType, SVGProps } from "react";

export interface ListingImage {
	src: string | StaticImageData;
	alt: string;
}

export interface ListingHighlight {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	iconClassName?: string;
	label: string;
}

export interface OverviewItem {
	label: string;
	value: string | string[];
	actionLabel?: string;
	actionHref?: string;
}

export interface ListingSection {
	id: string;
	label: string;
	isVisible: boolean;
}

export interface ListingDetailViewModel {
	name: string;
	shortLocation?: string;
	fullLocation?: string;
	breadcrumbs: Array<{ label: string; href?: string }>;
	metaTags: string[];
	isLicensed: boolean;
	primaryBadge?: string;
	images: ListingImage[];
	isProfileImage: boolean;
	highlights: ListingHighlight[];
	overviewItems: OverviewItem[];
	insuranceList: string[];
	showInsurances: boolean;
	slidingScale?: string;
	serviceTypes: string[];
	therapyOptions: string[];
	description?: string;
	subtitle?: string;
	videoUrl?: string;
	sections: ListingSection[];
	contact: {
		phone?: string;
		email?: string;
	};
	facility?: string;
	avatar?: ListingImage;
}

const normalizeValue = (value: unknown): string | undefined => {
	if (typeof value === "string") return value.trim();
	if (typeof value === "number") return String(value);
	if (value && typeof value === "object") {
		const record = value as { name?: unknown; title?: unknown; type?: unknown };
		return normalizeValue(record.name ?? record.title ?? record.type);
	}
	return undefined;
};

const uniqueList = (items?: Array<string | undefined>) =>
	Array.from(new Set((items ?? []).filter(Boolean) as string[]));

const buildLocation = (psychologist: PsychologistModel) => {
	const address = psychologist.address;
	if (!address) return { shortLocation: undefined, fullLocation: undefined };

	const shortLocation = [address.city, address.state]
		.filter(Boolean)
		.join(", ");
	const fullLocation = [
		address.address,
		address.city,
		address.state,
		address.zip,
	]
		.filter(Boolean)
		.join(", ");

	return { shortLocation, fullLocation };
};

const buildGalleryImages = (
	psychologist: PsychologistModel
): { images: ListingImage[]; isProfileImage: boolean } => {
	const galleryImages = (psychologist.imagesGallery || [])
		.filter((image) => image?.url)
		.map((image) => ({
			src: image.url,
			alt: image.alt || psychologist.name,
		}));

	if (galleryImages.length > 0) {
		return { images: galleryImages, isProfileImage: false };
	}

	if (psychologist.image) {
		return {
			images: [
				{
					src: psychologist.image,
					alt: psychologist.imageAlt || psychologist.name,
				},
			],
			isProfileImage: true,
		};
	}

	return {
		images: [{ src: UserImage as StaticImageData, alt: psychologist.name }],
		isProfileImage: true,
	};
};

const buildMetaTags = (psychologist: PsychologistModel) => {
	const resourceTag = normalizeValue(psychologist.resource?.[0]?.title);
	const languageTag = normalizeValue(psychologist.languages?.[0]);
	const insuranceTag =
		psychologist.showInsurances && psychologist.insurances?.length
			? "Insurance accepted"
			: undefined;
	const slidingTag = psychologist.slidingScale ? "Sliding scale" : undefined;
	const formattedResourceTag = resourceTag ? formatType(resourceTag) : undefined;
	const formattedLanguageTag = languageTag ? formatType(languageTag) : undefined;

	return uniqueList([
		formattedResourceTag,
		insuranceTag,
		slidingTag,
		formattedLanguageTag,
	]).slice(0, 3);
};

const buildHighlights = (psychologist: PsychologistModel) => {
	const highlights: ListingHighlight[] = [];
	const iconClassName = "h-4 w-4 text-blue-600";
	const resourceLabels = uniqueList(
		psychologist.resource?.map((res) => normalizeValue(res?.title)) || []
	);
	const hasTelehealth = resourceLabels.some((label) =>
		label.toLowerCase().includes("tele")
	);

	if (psychologist.degree) {
		highlights.push({
			icon: BadgeCheck,
			iconClassName,
			label: "Licensed",
		});
	}
	if (hasTelehealth) {
		highlights.push({
			icon: Video,
			iconClassName,
			label: "Telehealth",
		});
	}
	if (psychologist.showInsurances && psychologist.insurances?.length) {
		highlights.push({
			icon: HeartPulse,
			iconClassName,
			label: "Insurance accepted",
		});
	}
	if (psychologist.slidingScale) {
		highlights.push({
			icon: Wallet,
			iconClassName,
			label: "Sliding scale",
		});
	}
	const languageLabel = normalizeValue(psychologist.languages?.[0]);
	if (languageLabel) {
		highlights.push({
			icon: Globe,
			iconClassName,
			label: languageLabel,
		});
	}
	const ageLabel = normalizeValue(psychologist.ageSpecialty?.[0]?.age);
	if (ageLabel) {
		highlights.push({
			icon: Users,
			iconClassName,
			label: ageLabel,
		});
	}

	return highlights.slice(0, 6);
};

const buildOverviewItems = (psychologist: PsychologistModel) => {
	const { fullLocation } = buildLocation(psychologist);
	const locationAction =
		fullLocation && fullLocation.length
			? {
					actionLabel: "View map",
					actionHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
						fullLocation
					)}`,
				}
			: undefined;

	const conditions = uniqueList(
		psychologist.conditionSpecialty?.map((item) => normalizeValue(item?.name))
	);
	const populations = uniqueList(
		psychologist.ageSpecialty?.map((item) => normalizeValue(item?.age))
	);
	const therapies = uniqueList(
		psychologist.therapyOptions?.map((item) => normalizeValue(item?.type))
	);
	const resources = uniqueList(
		psychologist.resource?.map((item) => normalizeValue(item?.title))
	);
	const languages = uniqueList(psychologist.languages || []);

	const items: OverviewItem[] = [];
	if (fullLocation) {
		items.push({
			label: "Location",
			value: fullLocation,
			...locationAction,
		});
	}
	if (resources.length) {
		items.push({
			label: "Service type",
			value: resources.map((item) => formatType(item)),
		});
	}
	if (conditions.length) {
		items.push({
			label: "Specialties",
			value: conditions.map((item) => formatType(item)),
		});
	}
	if (populations.length) {
		items.push({
			label: "Populations served",
			value: populations.map((item) => formatType(item)),
		});
	}
	if (therapies.length) {
		items.push({
			label: "Modalities",
			value: therapies.map((item) => formatType(item)),
		});
	}
	if (languages.length) {
		items.push({
			label: "Languages",
			value: languages.map((item) => formatType(item)),
		});
	}
	if (psychologist.degree) {
		items.push({
			label: "Credentials",
			value: formatType(psychologist.degree),
		});
	}

	return items;
};

// Mapping notes:
// - Adjust highlight/tag selection in buildHighlights/buildMetaTags.
// - To add a new section/tab, update the sections array and render it in ListingDetailPage.
export const mapPsychologistToListingDetail = (
	psychologist: PsychologistModel
): ListingDetailViewModel => {
	const { shortLocation, fullLocation } = buildLocation(psychologist);
	const { images, isProfileImage } = buildGalleryImages(psychologist);
	const highlights = buildHighlights(psychologist);
	const overviewItems = buildOverviewItems(psychologist);
	const metaTags = buildMetaTags(psychologist);
	const insuranceList = uniqueList(
		psychologist.insurances?.map((insurance) => normalizeValue(insurance?.name))
	);
	const serviceTypes = uniqueList(
		psychologist.resource?.map((item) => normalizeValue(item?.title))
	).map((item) => formatType(item));
	const therapyOptions = uniqueList(
		psychologist.therapyOptions?.map((item) => normalizeValue(item?.type))
	).map((item) => formatType(item));

	const breadcrumbs = [
		{ label: "Directory", href: "/search" },
		...(shortLocation ? [{ label: shortLocation }] : []),
		{ label: psychologist.name },
	];

	const sections: ListingSection[] = [
		{
			id: "about",
			label: "About",
			isVisible:
				Boolean(psychologist.description || psychologist.subtitle) ||
				Boolean(psychologist.video),
		},
		{
			id: "overview",
			label: "Overview",
			isVisible: overviewItems.length > 0,
		},
		{
			id: "insurance",
			label: "Insurance / Pricing",
			isVisible:
				Boolean(psychologist.showInsurances) ||
				Boolean(psychologist.slidingScale),
		},
		{
			id: "services",
			label: "Services",
			isVisible: serviceTypes.length > 0 || therapyOptions.length > 0,
		},
		{
			id: "amenities",
			label: "Amenities",
			isVisible: false,
		},
		{
			id: "reviews",
			label: "Reviews",
			isVisible: false,
		},
		{
			id: "faqs",
			label: "FAQs",
			isVisible: false,
		},
	];

	return {
		name: psychologist.name,
		shortLocation,
		fullLocation,
		breadcrumbs,
		metaTags,
		isLicensed: Boolean(psychologist.degree),
		primaryBadge: psychologist.degree ? "Licensed" : undefined,
		images,
		isProfileImage,
		highlights,
		overviewItems,
		insuranceList,
		showInsurances: psychologist.showInsurances,
		slidingScale: psychologist.slidingScale,
		serviceTypes,
		therapyOptions,
		description: psychologist.description,
		subtitle: psychologist.subtitle,
		videoUrl: psychologist.video,
		sections,
		contact: {
			phone: psychologist.phone,
			email: psychologist.email,
		},
		facility: psychologist.facility,
		avatar: psychologist.image
			? { src: psychologist.image, alt: psychologist.imageAlt || psychologist.name }
			: { src: UserImage as StaticImageData, alt: psychologist.name },
	};
};
