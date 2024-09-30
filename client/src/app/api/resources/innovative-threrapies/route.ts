import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import { allInnovativeTherapiesQuery } from "../../types";
import { getPsychologistsAdapter } from "@/adapters";

export async function GET() {
  try {
    const psychologists = await sanityClient.fetch(allInnovativeTherapiesQuery);

    const adaptedPsychologists = psychologists.map(getPsychologistsAdapter);

    return NextResponse.json(adaptedPsychologists);
  } catch (error) {
    console.error("Error reading psychologists data:", error);

    return NextResponse.json(
      { error: "Error reading psychologists data" },
      { status: 500 }
    );
  }
}
