import { getPsychologistsAdapter } from "@/adapters";
import { sanityClient } from "@/api";
import {
	allBakerActFacilitiesQuery,
	allEstatePlanningLawyers,
	allInnovativeTherapiesQuery,
	allInpatientQuery,
	allMentalHealthLawyers,
	allMindBodyPracticesQuery,
	allOutpatientQuery,
	allPsychiatricQuery,
	allPsychologistsQuery,
} from "@/app/api/types";
import { ResourcesModel } from "@/models";

export const getAllResources = async () => {
	const query = `{
        "innovativeTherapies": ${allInnovativeTherapiesQuery},
        "psychologists": ${allPsychologistsQuery},
        "psychiatry": ${allPsychiatricQuery},
        "outpatientFacilities": ${allOutpatientQuery},
        "inpatientFacilities": ${allInpatientQuery},
        "bakerActFacilities": ${allBakerActFacilitiesQuery},
        "estatePlanningLawyers": ${allEstatePlanningLawyers},
        "mindBodyPractices": ${allMindBodyPracticesQuery},
        "mentalHealthLawyers": ${allMentalHealthLawyers},
      }`;

	try {
		const data = await sanityClient.fetch(query);

		if (data) {
			const adaptedData: ResourcesModel = {
				innovativeTherapies: data.innovativeTherapies.map(
					getPsychologistsAdapter
				),
				psychologists: data.psychologists.map(getPsychologistsAdapter),
				psychiatry: data.psychiatry.map(getPsychologistsAdapter),

				outpatientFacilities: data.outpatientFacilities.map(
					getPsychologistsAdapter
				),
				inpatientFacilities: data.inpatientFacilities.map(
					getPsychologistsAdapter
				),
				bakerActFacilities: data.bakerActFacilities.map(
					getPsychologistsAdapter
				),
				estatePlanningLawyers: data.estatePlanningLawyers.map(
					getPsychologistsAdapter
				),
				mentalHealthLawyers: data.mentalHealthLawyers.map(
					getPsychologistsAdapter
				),
				mindBodyPractices: data.mindBodyPractices.map(getPsychologistsAdapter),
			};

			return adaptedData;
		}
	} catch (error) {
		console.error("Error fetching all schemas:", error);
		return error;
	}
};
