import { PsychologistModel } from "./psychologist.model";

export interface ResourcesKey {
  key: string;
  label: string;
}

export interface ResourcesModel {
  psychologists: PsychologistModel[];
  backerActFacilities: PsychologistModel[];
  innovativeTherapies: PsychologistModel[];
  inpatient: PsychologistModel[];
  medication: PsychologistModel[];
  mentalHealth: PsychologistModel[];
  mindBodyPractices: PsychologistModel[];
  outpatient: PsychologistModel[];
  psychiatric: PsychologistModel[];
  ageSpecialties: PsychologistModel[];
  conditionSpecialties: PsychologistModel[];
  insurances: PsychologistModel[];
  therapyModalities: PsychologistModel[];
}
