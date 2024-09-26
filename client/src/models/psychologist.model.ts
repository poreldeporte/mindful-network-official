import { ageSpecialty } from "./age-specialty.model";
import { conditionSpecialty } from "./condition-specialty.model";
import { insurances } from "./insurances.model";
import { Positions } from "./positions.model";
import { TherapyModality } from "./therapy-modality.model";

export interface PsychologistModel {
  id: string;
  name: string;
  facility: string;
  address: string;
  position: Positions;
  phone: string;
  insurances: insurances[];
  ageSpecialty: ageSpecialty[];
  conditionSpecialty: conditionSpecialty[];
  therapyOptions: TherapyModality[];
  image: string;
}
