import { ageSpecialty } from "./age-specialty.model";
import { conditionSpecialty } from "./condition-specialty.model";
import { insurances } from "./insurances.model";
import { Positions } from "./positions.model";
import { TherapyModality } from "./therapy-modality.model";
import { ResourcesModel } from "./resources.model";
import { TOCSettings } from "./common/toc-settings.model";

interface Address {
	address: string;
	city: string;
	state: string;
	zip: string;
}

interface ImageWithAlt {
	url: string;
	alt?: string;
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
	showInsurances: boolean;
	insurances: insurances[];
	ageSpecialty: ageSpecialty[];
	resource: ResourcesModel[];
	conditionSpecialty: conditionSpecialty[];
	therapyOptions: TherapyModality[];
	degree: string;
	slidingScale: string;
	languages: string[];
	image: string;
	imageAlt?: string;
	imagesGallery: ImageWithAlt[];
	subtitle: string;
	video: string;
	slug: string;
	email?: string;
	tocSettings?: TOCSettings;
}
