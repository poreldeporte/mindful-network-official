import { PsychologistModel } from "./psychologist.model";

export interface ResourcesKey {
	key: string;
	label: string;
}

export interface ResourcesModel {
	innovativeTherapies: PsychologistModel[];
	psychologists: PsychologistModel[];
	psychiatry: PsychologistModel[];
	outpatientFacilities: PsychologistModel[];
	inpatientFacilities: PsychologistModel[];
	bakerActFacilities: PsychologistModel[];
	estatePlanningLawyers: PsychologistModel[];
	mindBodyPractices: PsychologistModel[];
	mentalHealthLawyers: PsychologistModel[];
	ageSpecialties?: PsychologistModel[];
	conditionSpecialties?: PsychologistModel[];
	insurances?: PsychologistModel[];
	therapyModalities?: PsychologistModel[];
}
