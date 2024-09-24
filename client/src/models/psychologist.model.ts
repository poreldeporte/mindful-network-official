type TherapyModality = {
  id: string;
  type: string;
};

type ageSpecialty = {
  id: string;
  age: string;
};

type conditionSpecialty = {
  id: string;
  name: string;
};

type Insurances = {
  id: string;
  name: string;
};

export interface PsychologistModel {
  id: string;
  name: string;
  facility: string;
  address: string;
  phone: string;
  insurances: Insurances[];
  ageSpecialty: ageSpecialty[];
  conditionSpecialty: conditionSpecialty[];
  therapyOptions: TherapyModality[];
  image: string;
}
