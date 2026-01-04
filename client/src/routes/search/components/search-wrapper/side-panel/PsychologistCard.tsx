"use client";

import { Typography } from "@/components/ui";
import { UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import { formatType } from "@/utilities";
import {
	ArrowUpRight,
	BadgeCheck,
	Globe,
	HeartPulse,
	Users,
	Wallet,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ListingHighlight {
	icon: React.ReactNode;
	label: string;
}

interface CardMeta {
	location?: string;
	primaryLabel?: string;
	badges: string[];
	tags: string[];
	highlights: ListingHighlight[];
	description?: string;
}

const MAX_TAGS = 6;

const normalizeValue = (value: unknown): string | undefined => {
	if (typeof value === "string") return value.trim();
	if (typeof value === "number") return String(value);
	if (value && typeof value === "object") {
		const record = value as {
			name?: unknown;
			title?: unknown;
			type?: unknown;
			age?: unknown;
			label?: unknown;
		};
		return normalizeValue(
			record.name ?? record.title ?? record.type ?? record.age ?? record.label
		);
	}
	return undefined;
};

const normalizeLabel = (value: unknown): string | undefined => {
	const raw = normalizeValue(value);
	return raw ? formatType(raw) : undefined;
};

const buildImageSet = (psychologist: PsychologistModel) => {
	const fallbackImage = psychologist.image
		? { src: psychologist.image, alt: psychologist.imageAlt || psychologist.name }
		: { src: UserImage as StaticImageData, alt: psychologist.name };
	const galleryImages = (psychologist.imagesGallery || [])
		.filter((image) => image?.url)
		.map((image) => ({
			src: image.url,
			alt: image.alt || psychologist.name,
		}));

	const galleryCount = galleryImages.length;
	const images = galleryCount > 0 ? galleryImages.slice(0, 3) : [fallbackImage];

	return { images, galleryCount };
};

// Mapping notes: adjust primaryLabel/badges/tags/highlights here to change card metadata.
const mapPsychologistToCardMeta = (psychologist: PsychologistModel): CardMeta => {
	const locationParts = [
		normalizeValue(psychologist.address?.city),
		normalizeValue(psychologist.address?.state),
	].filter(Boolean) as string[];
	const location = locationParts.length ? locationParts.join(", ") : undefined;

	const resourceLabel = normalizeLabel(
		psychologist.resource?.[0]?.title ?? psychologist.resource?.[0]
	);
	const therapyLabel = normalizeLabel(
		psychologist.therapyOptions?.[0]?.type ?? psychologist.therapyOptions?.[0]
	);
	const primaryLabel = resourceLabel
		? resourceLabel
		: psychologist.showInsurances && psychologist.insurances?.length
			? "Insurance accepted"
			: psychologist.slidingScale
				? "Sliding scale"
				: therapyLabel
					? therapyLabel
					: undefined;

	const badges: string[] = [];
	if (psychologist.showInsurances && psychologist.insurances?.length) {
		badges.push("Insurance accepted");
	}
	if (psychologist.slidingScale) {
		badges.push("Sliding scale");
	}
	const languageLabel = normalizeValue(psychologist.languages?.[0]);
	if (badges.length < 2 && languageLabel) {
		badges.push(`Languages: ${languageLabel}`);
	}

	const tagSet = new Set<string>();
	psychologist.conditionSpecialty?.forEach((condition) => {
		const label = normalizeValue(condition?.name ?? condition);
		if (label) tagSet.add(label);
	});
	psychologist.therapyOptions?.forEach((option) => {
		const label = normalizeLabel(option?.type ?? option);
		if (label) tagSet.add(label);
	});
	psychologist.ageSpecialty?.forEach((age) => {
		const label = normalizeValue(age?.age ?? age);
		if (label) tagSet.add(label);
	});

	const highlights: ListingHighlight[] = [];
	if (psychologist.degree) {
		highlights.push({
			icon: <BadgeCheck className="h-3.5 w-3.5 text-blue-600" />,
			label: "Licensed",
		});
	}
	if (psychologist.showInsurances && psychologist.insurances?.length) {
		highlights.push({
			icon: <HeartPulse className="h-3.5 w-3.5 text-blue-600" />,
			label: "Insurance",
		});
	}
	if (psychologist.slidingScale) {
		highlights.push({
			icon: <Wallet className="h-3.5 w-3.5 text-blue-600" />,
			label: "Sliding scale",
		});
	}
	if (languageLabel) {
		highlights.push({
			icon: <Globe className="h-3.5 w-3.5 text-blue-600" />,
			label: languageLabel,
		});
	}
	const ageLabel = psychologist.ageSpecialty
		?.map((age) => normalizeValue(age?.age ?? age))
		.find(Boolean);
	if (ageLabel) {
		highlights.push({
			icon: <Users className="h-3.5 w-3.5 text-blue-600" />,
			label: ageLabel,
		});
	}

	const description = psychologist.subtitle || psychologist.description;

	return {
		location,
		primaryLabel,
		badges: badges.slice(0, 2),
		tags: Array.from(tagSet),
		highlights: highlights.slice(0, 4),
		description,
	};
};

const TagRow = ({ tags }: { tags: string[] }) => {
	if (!tags.length) return null;
	const visibleTags = tags.slice(0, MAX_TAGS);
	const overflow = tags.length - visibleTags.length;

	return (
		<div className="flex flex-wrap gap-2">
			{visibleTags.map((tag) => (
				<span
					key={tag}
					className="rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-gray-600"
					title={tag}
				>
					{tag}
				</span>
			))}
			{overflow > 0 && (
				<span className="rounded-full border border-gray-200 px-2 py-0.5 text-[11px] text-gray-500">
					+{overflow}
				</span>
			)}
		</div>
	);
};

const HighlightRow = ({ highlights }: { highlights: ListingHighlight[] }) => {
	if (!highlights.length) return null;

	return (
		<div className="flex flex-wrap gap-3">
			{highlights.map((highlight, index) => (
				<span
					key={`${highlight.label}-${index}`}
					className="inline-flex items-center gap-1.5 text-[11px] text-gray-600"
				>
					{highlight.icon}
					{highlight.label}
				</span>
			))}
		</div>
	);
};

const MediaCollage = ({
	images,
	primaryLabel,
	href,
	galleryCount,
}: {
	images: { src: string | StaticImageData; alt: string }[];
	primaryLabel?: string;
	href: string;
	galleryCount: number;
}) => {
	const [leftImage, middleImage, rightImage] = images;
	const isSingle = galleryCount <= 1;
	const isProfileImage = galleryCount === 0;
	const isDouble = galleryCount === 2;
	const isTriple = galleryCount >= 3;
	const middleSource = middleImage ?? leftImage;
	const rightSource = rightImage ?? middleSource ?? leftImage;

	if (isSingle) {
		return (
			<div className="rounded-3xl bg-blue-50 p-2">
				<div className="relative h-48 sm:h-44">
					<Image
						src={leftImage.src}
						alt={leftImage.alt}
						fill
						className={`rounded-2xl ${
							isProfileImage
								? "object-contain object-left"
								: "object-cover"
						}`}
						sizes="(max-width: 768px) 100vw, 60vw"
					/>
					{primaryLabel && (
						<span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-gray-700 shadow-sm">
							{primaryLabel}
						</span>
					)}
					<div className="absolute right-3 top-3 flex items-center gap-2">
						<Link
							href={href}
							onClick={(event) => event.stopPropagation()}
							className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/90 text-gray-600 shadow-sm transition hover:text-blue-600"
							aria-label="View listing"
						>
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const gridClass = isDouble
		? "grid grid-cols-1 gap-2 sm:grid-cols-[60%_40%]"
		: "grid grid-cols-1 gap-2 sm:grid-cols-[45%_40%_15%]";

	return (
		<div className="rounded-3xl bg-blue-50 p-2">
			<div className={gridClass}>
				<div className="relative h-48 sm:h-44">
					<Image
						src={leftImage.src}
						alt={leftImage.alt}
						fill
						className="rounded-2xl object-cover"
						sizes="(max-width: 640px) 100vw, 45vw"
					/>
					{primaryLabel && (
						<span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-gray-700 shadow-sm">
							{primaryLabel}
						</span>
					)}
					<div className="absolute right-3 top-3 flex items-center gap-2 sm:hidden">
						<Link
							href={href}
							onClick={(event) => event.stopPropagation()}
							className="flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/90 text-gray-600 shadow-sm transition hover:text-blue-600"
							aria-label="View listing"
						>
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</div>
				</div>

				<div className="relative hidden h-44 sm:block">
					<Image
						src={middleSource.src}
						alt={middleSource.alt}
						fill
						className="rounded-2xl object-cover"
						sizes="(max-width: 640px) 0px, 40vw"
					/>
					{isDouble && (
						<>
							<Link
								href={href}
								onClick={(event) => event.stopPropagation()}
								className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-gray-600 shadow-sm transition hover:text-blue-600"
								aria-label="View listing"
							>
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</>
					)}
				</div>

				{isTriple && (
					<div className="relative hidden h-44 sm:block">
						<Image
							src={rightSource.src}
							alt={rightSource.alt}
							fill
							className="rounded-2xl object-cover"
							sizes="(max-width: 640px) 0px, 15vw"
						/>
						<Link
							href={href}
							onClick={(event) => event.stopPropagation()}
							className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-gray-600 shadow-sm transition hover:text-blue-600"
							aria-label="View listing"
						>
							<ArrowUpRight className="h-4 w-4" />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

const PsychologistCard = ({
	psychologist,
}: {
	psychologist: PsychologistModel;
}) => {
	const router = useRouter();
	const cardHref = `/professional/${psychologist.slug}`;
	const { location, primaryLabel, badges, tags, highlights, description } =
		mapPsychologistToCardMeta(psychologist);
	const { images, galleryCount } = buildImageSet(psychologist);
	const preview = description?.trim();

	const handleNavigate = () => {
		router.push(cardHref);
	};

	return (
		<li className="w-full h-full">
			<article
				className="group h-full cursor-pointer rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
				role="link"
				aria-label={`View profile for ${psychologist.name}`}
				tabIndex={0}
				onClick={handleNavigate}
				onKeyDown={(event) => {
					if (event.key === "Enter" || event.key === " ") {
						event.preventDefault();
						handleNavigate();
					}
				}}
			>
				<div className="relative z-10 flex flex-col gap-4 p-4 sm:p-5">
					<MediaCollage
						images={images}
						primaryLabel={primaryLabel}
						href={cardHref}
						galleryCount={galleryCount}
					/>

					<div className="space-y-3">
						{location && (
							<p className="text-[11px] uppercase tracking-wide text-gray-500">
								{location}
							</p>
						)}

						<div className="flex items-start justify-between gap-3">
							<Typography
								as="h2"
								color="black"
								variant="body"
								className="text-[18px] font-semibold leading-snug sm:text-[20px]"
							>
								{psychologist.name}
							</Typography>
						</div>

						{badges.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{badges.map((badge, index) => (
									<span
										key={`${badge}-${index}`}
										className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
											index === 0
												? "border-blue-200 bg-blue-50 text-blue-700"
												: "border-green-200 bg-green-50 text-green-700"
										}`}
									>
										{badge}
									</span>
								))}
							</div>
						)}

						<TagRow tags={tags} />

						{preview && (
							<p
								className="text-[12px] text-gray-600"
								style={{
									overflow: "hidden",
									display: "-webkit-box",
									WebkitLineClamp: 2,
									WebkitBoxOrient: "vertical",
								}}
							>
								{preview}{" "}
								<Link
									href={cardHref}
									onClick={(event) => event.stopPropagation()}
									className="text-blue-600 hover:text-blue-700"
								>
									More
								</Link>
							</p>
						)}

						<HighlightRow highlights={highlights} />

						<div className="flex flex-wrap items-center gap-2 pt-1">
							<Link
								href={cardHref}
								onClick={(event) => event.stopPropagation()}
								className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-1.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
							>
								View
							</Link>
							<Link
								href={`${cardHref}#get-in-touch`}
								onClick={(event) => event.stopPropagation()}
								className="inline-flex items-center justify-center rounded-full border border-blue-600 px-4 py-1.5 text-[11px] font-semibold text-blue-600 transition hover:bg-blue-50"
							>
								Message
							</Link>
						</div>
					</div>
				</div>
			</article>
		</li>
	);
};

export default PsychologistCard;
