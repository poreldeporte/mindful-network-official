import { PsychologistModel } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface PsychologistExtended
	extends SanityDocument,
		PsychologistModel {}

export const getPsychologistsAdapter = (
	psychologist: PsychologistExtended
) => ({
	...psychologist,
	id: psychologist._id,
});
