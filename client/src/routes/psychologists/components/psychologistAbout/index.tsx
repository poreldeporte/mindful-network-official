"use client";

import { PsychologistModel } from "@/models";
import { IconCertificate } from "@tabler/icons-react";
import { Section } from "../section";
import { urlFor } from "@/api";

import {
	Armchair,
	AtSign,
	Brain,
	HeartPulse,
	Languages,
	MapPinned,
	PersonStanding,
	Phone,
	Wallet,
} from "lucide-react";

export function PsychologistAbout({
	ageSpecialty,
	insurances,
	slidingScale,
	conditionSpecialty,
	therapyOptions,
	phone,
	address,
	languages,
	degree,
	imagesGallery,
	email,
	video,
}: PsychologistModel) {
	const hasValidItems = (arr?: any[]) => arr && arr.length > 0;
	const expertiseSubsections = [];
	const insuranceSubsections = [];
	const moreInfoSubsections = [];

	if (hasValidItems(ageSpecialty)) {
		expertiseSubsections.push({
			id: "age-specialties",
			icon: <PersonStanding className="h-6 w-6" />,
			title: "Age Specialties",
			items: ageSpecialty.map((age) => age.age),
		});
	}

	if (hasValidItems(conditionSpecialty)) {
		expertiseSubsections.push({
			id: "condition-specialties",
			icon: <Brain className="h-6 w-6" />,
			title: "Condition Specialty",
			items: conditionSpecialty.map((condition) => condition.name),
		});
	}

	if (hasValidItems(therapyOptions)) {
		expertiseSubsections.push({
			id: "therapy-options",
			icon: <Armchair className="h-6 w-6" />,
			title: "Therapy options",
			items: therapyOptions.map((option) => option.type),
		});
	}

	if (hasValidItems(insurances)) {
		insuranceSubsections.push({
			id: "insurances",
			icon: <HeartPulse className="h-6 w-6" />,
			title: "Insurances",
			items: insurances.map((insurance) => insurance.name),
			layoutStyle: "row",
		});
	}
	if (slidingScale) {
		insuranceSubsections.push({
			id: "sliding-scale",
			icon: <Wallet className="h-6 w-6" />,
			title: "Sliding scale",
			items: [slidingScale],
		});
	}
	if (languages) {
		moreInfoSubsections.push({
			id: "languages",
			icon: <Languages className="h-6 w-6" />,
			title: "Languages",
			items: languages,
		});
	}

	if (degree) {
		moreInfoSubsections.push({
			id: "degree",
			icon: <IconCertificate className="h-6 w-6" />,
			title: "Degree Type",
			items: [degree],
		});
	}

	if (email) {
		moreInfoSubsections.push({
			id: "email",
			icon: <AtSign className="h-6 w-6" />,
			title: "Email",
			items: [email],
		});
	}

	if (address?.address) {
		moreInfoSubsections.push({
			id: "address",
			icon: <MapPinned className="h-6 w-6" />,
			title: "Address",
			items: [address.address],
		});
	}

	if (phone) {
		moreInfoSubsections.push({
			id: "phone",
			icon: <Phone className="h-6 w-6" />,
			title: "Phone",
			items: [phone],
		});
	}

	return (
		<>
			{video && (
				<Section
					id="profile-video"
					title="Get to know me"
					emptyMessage=""
					profileVideo={video}
				/>
			)}

			{imagesGallery && (
				<Section
					id="profile-gallery"
					title="Gallery"
					emptyMessage=""
					profileGallery={imagesGallery
						.slice(0, 4)
						.map((image) => urlFor(image).url())}
				/>
			)}

			{expertiseSubsections.length > 0 && (
				<Section
					id="expertise"
					title="Expertise"
					emptyMessage=""
					subsections={expertiseSubsections}
				/>
			)}

			{insuranceSubsections.length > 0 && (
				<Section
					id="insurances"
					title="Check your insurances"
					emptyMessage=""
					subsections={insuranceSubsections}
				/>
			)}

			{moreInfoSubsections.length > 0 && (
				<Section
					id="more-info"
					title="More info"
					emptyMessage=""
					subsections={moreInfoSubsections}
				/>
			)}
		</>
	);
}
