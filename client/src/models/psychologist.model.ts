import { ageSpecialty } from "./age-specialty.model";
import { conditionSpecialty } from "./condition-specialty.model";
import { insurances } from "./insurances.model";
import { Positions } from "./positions.model";
import { TherapyModality } from "./therapy-modality.model";

interface Address {
	address: string;
	city: string;
	state: string;
	zip: string;
}

export interface PsychologistModel {
	_type: string;
	id: string;
	name: string;
	facility: string;
	address: Address;
	position?: Positions;
	description: string;
	phone: string;
	insurances: insurances[];
	ageSpecialty: ageSpecialty[];
	conditionSpecialty: conditionSpecialty[];
	therapyOptions: TherapyModality[];
	image: string;
	subtitle: string;
	slug: string;
	email?: string;
}
