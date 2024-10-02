import { PsychologistModel } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface PsychologistExtended
  extends SanityDocument,
    PsychologistModel {}

export const getPsychologistsAdapter = (
  psychologist: PsychologistExtended
) => ({
  id: psychologist._id,
  _type: psychologist._type,
  name: psychologist.name,
  facility: psychologist.facility,
  therapyOptions: psychologist.therapyOptions,
  conditionSpecialty: psychologist.conditionSpecialty,
  ageSpecialty: psychologist.ageSpecialty,
  insurances: psychologist.insurances,
  address: psychologist.address,
  image: psychologist.image,
  phone: psychologist.phone,
  position: psychologist.position,
  description: psychologist.description,
});
