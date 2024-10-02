import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import {
  allPsychiatricQuery,
  allBackerActFacilitiesQuery,
  allInnovativeTherapiesQuery,
  allInpatientQuery,
  allOutpatientQuery,
  allMedicationQuery,
  allMentalHealthQuery,
  allPsychologistsQuery,
  allMindBodyPracticesQuery,
} from "../types";
import { getPsychologistsAdapter } from "@/adapters";

export async function GET() {
  const query = `{
    "psychologists": ${allPsychologistsQuery},
    "backerActFacilities": ${allBackerActFacilitiesQuery},
    "innovativeTherapies": ${allInnovativeTherapiesQuery},
    "inpatient": ${allInpatientQuery},
    "medication": ${allMedicationQuery},
    "mentalHealth": ${allMentalHealthQuery},
    "mindBodyPractices": ${allMindBodyPracticesQuery},
    "outpatient": ${allOutpatientQuery},
    "psychiatric": ${allPsychiatricQuery},
  }`;

  try {
    const data = await sanityClient.fetch(query);

    if (data) {
      const adaptedData = {
        psychologists: data.psychologists.map(getPsychologistsAdapter),
        backerActFacilities: data.backerActFacilities.map(
          getPsychologistsAdapter
        ),
        innovativeTherapies: data.innovativeTherapies.map(
          getPsychologistsAdapter
        ),
        inpatient: data.inpatient.map(getPsychologistsAdapter),
        medication: data.medication.map(getPsychologistsAdapter),
        mentalHealth: data.mentalHealth.map(getPsychologistsAdapter),
        mindBodyPractices: data.mindBodyPractices.map(getPsychologistsAdapter),
        outpatient: data.outpatient.map(getPsychologistsAdapter),
        psychiatric: data.psychiatric.map(getPsychologistsAdapter),
      };

      return NextResponse.json(adaptedData);
    }
  } catch (error) {
    console.error("Error fetching all schemas:", error);
    return NextResponse.json(
      { error: "Error reading psychologists data" },
      { status: 500 }
    );
  }
}
