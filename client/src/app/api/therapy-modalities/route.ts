import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import { allTherapyModalitiesQuery } from "../types";
import { getTherapyModalityAdapter } from "@/adapters";

export async function GET() {
  try {
    const therapyModalities = await sanityClient.fetch(
      allTherapyModalitiesQuery
    );

    const adaptedTherapyModalities = therapyModalities.map(
      getTherapyModalityAdapter
    );

    return NextResponse.json(adaptedTherapyModalities);
  } catch (error) {
    console.error("Error reading therapy modalities data:", error);

    return NextResponse.json(
      { error: "Error reading therapy modalities data" },
      { status: 500 }
    );
  }
}
