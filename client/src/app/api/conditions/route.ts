import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import { allConditionSpecialtiesQuery } from "../types";
import { getConditionSpecialtyAdapter } from "@/adapters";

export async function GET() {
  try {
    const conditions = await sanityClient.fetch(allConditionSpecialtiesQuery);

    const adaptedConditions = conditions.map(getConditionSpecialtyAdapter);

    return NextResponse.json(adaptedConditions);
  } catch (error) {
    console.error("Error reading condition specialties data:", error);

    return NextResponse.json(
      { error: "Error reading condition specialties data" },
      { status: 500 }
    );
  }
}
