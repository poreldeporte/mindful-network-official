import { NextResponse } from "next/server";
import { sanityClient } from "@/api";
import { getPsychiatricById } from "../../../types";
import { getPsychologistsAdapter } from "@/adapters";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const query = getPsychiatricById(id);

    const psychologist = await sanityClient.fetch(query);

    const adaptedPsychologist = getPsychologistsAdapter(psychologist[0]);

    console.log(adaptedPsychologist);

    if (!adaptedPsychologist) {
      return NextResponse.json(
        { error: "Psychologist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(adaptedPsychologist);
  } catch (error) {
    console.error("Error reading psychologist data:", error);
    return NextResponse.json(
      { error: "Error reading psychologist data" },
      { status: 500 }
    );
  }
}
