import { TherapyModality } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface TherapyModalityExtended
  extends SanityDocument,
    TherapyModality {}

export const getTherapyModalityAdapter = (
  condition: TherapyModalityExtended
) => ({
  id: condition._id,
  type: condition.type,
});
