import { ageSpecialty } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface AgeSpecialtyExtended extends SanityDocument, ageSpecialty {}

export const getAgeSpecialtyAdapter = (specialty: AgeSpecialtyExtended) => ({
  id: specialty._id,
  age: specialty.age,
});
