import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import { allAgeSpecialtiesQuery } from "../types";
import { getAgeSpecialtyAdapter } from "@/adapters";

export async function GET() {
  try {
    const ageSpecialties = await sanityClient.fetch(allAgeSpecialtiesQuery);

    const adaptedAgeSpecialties = ageSpecialties.map(getAgeSpecialtyAdapter);

    return NextResponse.json(adaptedAgeSpecialties);
  } catch (error) {
    console.error("Error reading age specialties data:", error);

    return NextResponse.json(
      { error: "Error reading age specialties data" },
      { status: 500 }
    );
  }
}
