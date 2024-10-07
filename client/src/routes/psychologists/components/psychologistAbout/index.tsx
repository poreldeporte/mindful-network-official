"use client";

import { PsychologistModel } from "@/models";
import { Section } from "../section";
import { PersonStanding } from "lucide-react";

import {
	IconPhone,
	IconBrain,
	IconArmchair,
	IconShieldPlus,
	IconCoins,
	IconMapPin,
	IconSchool,
	IconLanguage,
	IconMail,
} from "@tabler/icons-react";

export function PsychologistAbout({
	ageSpecialty,
	insurances,
	conditionSpecialty,
	therapyOptions,
	phone,
	address,
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
						icon: <IconBrain className="h-6 w-6" />,
						title: "Condition Specialty",
						items: conditionSpecialty.map((condition) => condition.name),
					},
					{
						id: "therapy-options",
						icon: <IconArmchair className="h-6 w-6" />,
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
						icon: <IconShieldPlus className="h-6 w-6" />,
						title: "Insurances",
						items: insurances.map((insurance) => insurance.name),
						layoutStyle: "row",
					},
					{
						id: "sliding-scale",
						icon: <IconCoins className="h-6 w-6" />,
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
						icon: <IconLanguage className="h-6 w-6" />,
						title: "Languages",
						items: ["English"],
					},
					{
						id: "degree-type",
						icon: <IconSchool className="h-6 w-6" />,
						title: "Degree Type",
						items: ["LMHC"],
					},
					{
						id: "email",
						icon: <IconMail className="h-6 w-6" />,
						title: "Email",
						items: [""],
					},
					{
						id: "address",
						icon: <IconMapPin className="h-6 w-6" />,
						title: "Address",
						items: [address.address],
					},
					{
						id: "phone",
						icon: <IconPhone className="h-6 w-6" />,
						title: "Phone",
						items: [phone],
					},
				]}
			/>
		</>
	);
}
