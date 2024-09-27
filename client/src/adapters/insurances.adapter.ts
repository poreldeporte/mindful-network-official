import { insurances } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface insuranceExtended extends SanityDocument, insurances {}

export const getinsurancesAdapter = (insurance: insuranceExtended) => ({
  id: insurance._id,
  name: insurance.name,
});
