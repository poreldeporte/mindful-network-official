type TherapyModality = {
  id: string;
  type: string;
};

type ageSpecialty = {
  id: string;
  age: string;
};

export interface DoctorModel {
  id: string;
  name: string;
  therapyOptions: TherapyModality[];
  specialty: ageSpecialty[];
}
