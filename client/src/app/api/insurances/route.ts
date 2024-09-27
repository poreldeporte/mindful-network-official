import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import { allInsurancesQuery } from "../types";
import { getinsurancesAdapter } from "@/adapters";

export async function GET() {
  try {
    const insurances = await sanityClient.fetch(allInsurancesQuery);

    const adaptedInsurances = insurances.map(getinsurancesAdapter);

    return NextResponse.json(adaptedInsurances);
  } catch (error) {
    console.error("Error reading insurances data:", error);

    return NextResponse.json(
      { error: "Error reading insurances data" },
      { status: 500 }
    );
  }
}
