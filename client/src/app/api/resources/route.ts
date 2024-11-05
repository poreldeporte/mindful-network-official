import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import {
	allPsychiatricQuery,
	allBakerActFacilitiesQuery,
	allInnovativeTherapiesQuery,
	allInpatientQuery,
	allOutpatientQuery,
	allPsychologistsQuery,
	allMindBodyPracticesQuery,
	allMentalHealthLawyers,
	allEstatePlanningLawyers,
} from "../types";
import { getPsychologistsAdapter } from "@/adapters";

export async function GET() {
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
			const adaptedData = {
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

			return NextResponse.json(adaptedData, {
				headers: {
					"Cache-Control": "no-store",
				},
			});
		}
	} catch (error) {
		console.error("Error fetching all schemas:", error);
		return NextResponse.json(
			{ error: "Error reading psychologists data" },
			{ status: 500 }
		);
	}
}
