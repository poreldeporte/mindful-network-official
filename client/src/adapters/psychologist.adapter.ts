import { PsychologistModel } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface PsychologistExtended
  extends SanityDocument,
    PsychologistModel {}

export const getPsychologistsAdapter = (
  psychologist: PsychologistExtended
) => ({
  id: psychologist._id,
  name: psychologist.name,
  therapyOptions: psychologist.therapyOptions,
  conditionSpecialty: psychologist.conditionSpecialty,
  ageSpecialty: psychologist.ageSpecialty,
  insurances: psychologist.insurances,
  image: psychologist.image,
});
