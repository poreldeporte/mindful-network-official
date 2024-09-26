import { conditionSpecialty } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface conditionSpecialtyExtended
  extends SanityDocument,
    conditionSpecialty {}

export const getConditionSpecialtyAdapter = (
  condition: conditionSpecialtyExtended
) => ({
  id: condition._id,
  name: condition.name,
});
