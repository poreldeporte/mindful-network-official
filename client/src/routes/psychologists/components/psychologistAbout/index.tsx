"use client";

import { PsychologistModel } from "@/models";
import { IconCertificate } from "@tabler/icons-react";
import { Section } from "../section";

import {
	Armchair,
	Brain,
	HeartPulse,
	Languages,
	MapPinned,
	PersonStanding,
	Phone,
	Wallet,
	AtSign,
} from "lucide-react";

export function PsychologistAbout({
	ageSpecialty,
	insurances,
	conditionSpecialty,
	therapyOptions,
	phone,
	address,
	email,
}: PsychologistModel) {
	return (
		<>
			<Section
				id="expertise"
				title="Expertise"
				emptyMessage=""
				subsections={[
					{
						id: "age-specialties",
						icon: <PersonStanding className="h-6 w-6" />,
						title: "Age Specialties",
						items: ageSpecialty.map((age) => age.age),
					},
					{
						id: "condition-specialties",
						icon: <Brain className="h-6 w-6" />,
						title: "Condition Specialty",
						items: conditionSpecialty.map((condition) => condition.name),
					},
					{
						id: "therapy-options",
						icon: <Armchair className="h-6 w-6" />,
						title: "Therapy options",
						items: therapyOptions.map((option) => option.type),
					},
				]}
			/>

			<Section
				id="insurances"
				title="Check your insurances"
				emptyMessage=""
				subsections={[
					{
						id: "insurances",
						icon: <HeartPulse className="h-6 w-6" />,
						title: "Insurances",
						items: insurances.map((insurance) => insurance.name),
						layoutStyle: "row",
					},
					{
						id: "sliding-scale",
						icon: <Wallet className="h-6 w-6" />,
						title: "Sliding scale",
						items: ["Available based on financial need"],
					},
				]}
			/>

			<Section
				id="more-info"
				title="More info"
				emptyMessage=""
				subsections={[
					{
						id: "languages",
						icon: <Languages className="h-6 w-6" />,
						title: "Languages",
						items: ["English"],
					},
					{
						id: "degree-type",
						icon: <IconCertificate className="h-6 w-6" />,
						title: "Degree Type",
						items: ["LMHC"],
					},
					{
						id: "email",
						icon: <AtSign className="h-6 w-6" />,
						title: "Email",
						items: [email || "The user didn't provide an email"],
					},
					{
						id: "address",
						icon: <MapPinned className="h-6 w-6" />,
						title: "Address",
						items: [address.address],
					},
					{
						id: "phone",
						icon: <Phone className="h-6 w-6" />,
						title: "Phone",
						items: [phone],
					},
				]}
			/>
		</>
	);
}
