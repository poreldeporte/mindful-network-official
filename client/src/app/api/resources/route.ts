import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import {
	allInnovativeTherapiesQuery,
	allMindBodyPracticesQuery,
	allMentalHealthLawyers,
	allEstatePlanningLawyers,
} from "../types";
import { getPsychologistsAdapter } from "@/adapters";

// Reference data (innovative therapies, lawyers, mind-body practices) changes
// rarely, so cache the response for an hour instead of refetching from Sanity
// on every request. Matches the hourly ISR cadence used elsewhere on the site.
export const revalidate = 3600;

export async function GET() {
	const query = `{
	"innovativeTherapies": ${allInnovativeTherapiesQuery},
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
					"Cache-Control":
						"public, s-maxage=3600, stale-while-revalidate=86400",
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
