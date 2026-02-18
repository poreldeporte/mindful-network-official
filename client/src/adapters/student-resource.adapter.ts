import { StudentResourceModel } from "@/models";
import { SanityDocument } from "@sanity/client";

export interface StudentResourceExtended
	extends SanityDocument,
		StudentResourceModel {}

export const getStudentResourceAdapter = (
	resource: StudentResourceExtended
) => ({
	id: resource._id,
	name: resource.name,
});
