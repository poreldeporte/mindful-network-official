import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import { allStudentResourcesQuery } from "../types";
import { getStudentResourceAdapter } from "@/adapters";

export async function GET() {
  try {
    const resources = await sanityClient.fetch(allStudentResourcesQuery);

    const adaptedResources = resources.map(getStudentResourceAdapter);

    return NextResponse.json(adaptedResources);
  } catch (error) {
    console.error("Error reading student resources data:", error);

    return NextResponse.json(
      { error: "Error reading student resources data" },
      { status: 500 }
    );
  }
}
