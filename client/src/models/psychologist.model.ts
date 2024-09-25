export type Positions = {
  lat: number;
  lng: number;
};

export type TherapyModality = {
  id: string;
  type: string;
};

export type ageSpecialty = {
  id: string;
  age: string;
};

export type conditionSpecialty = {
  id: string;
  name: string;
};

export type Insurances = {
  id: string;
  name: string;
};

export interface PsychologistModel {
  id: string;
  name: string;
  facility: string;
  address: string;
  position: Positions;
  phone: string;
  insurances: Insurances[];
  ageSpecialty: ageSpecialty[];
  conditionSpecialty: conditionSpecialty[];
  therapyOptions: TherapyModality[];
  image: string;
}
