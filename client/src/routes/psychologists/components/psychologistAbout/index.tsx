"use client";

import { PsychologistModel } from "@/models";
import { Section } from "../section";
import { PersonStanding, Activity, Brain, ArmchairIcon } from "lucide-react";

export function PsychologistAbout({
	ageSpecialty,
	insurances,
	conditionSpecialty,
	therapyOptions,
}: PsychologistModel) {
	return (
		<>
			<Section
				id="age-specialty"
				icon={<PersonStanding className="h-12 w-12" />}
				title="Age Specialty"
				items={
					ageSpecialty?.map((item) => ({ id: item.id, label: item.age })) || []
				}
				emptyMessage="No Age Specialty available"
			/>

			<Section
				id="insurances"
				icon={<Activity className="h-12 w-12" />}
				title="Insurances"
				items={
					insurances?.map((item) => ({ id: item.id, label: item.name })) || []
				}
				emptyMessage="No Insurances available"
			/>

			<Section
				id="condition-specialty"
				icon={<Brain className="h-12 w-12" />}
				title="Condition Specialty"
				items={
					conditionSpecialty?.map((item) => ({
						id: item.id,
						label: item.name,
					})) || []
				}
				emptyMessage="No Conditions available"
			/>

			<Section
				id="therapy-options"
				icon={<ArmchairIcon className="h-12 w-12" />}
				title="Therapy Options"
				items={
					therapyOptions?.map((item) => ({ id: item.id, label: item.type })) ||
					[]
				}
				emptyMessage="No Therapy Options available"
			/>
		</>
	);
}
