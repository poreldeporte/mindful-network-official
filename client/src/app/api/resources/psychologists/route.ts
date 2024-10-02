import { sanityClient } from "@/api";
import { NextResponse } from "next/server";
import { createReferences, formatAddress } from "../../utilities";
import { allPsychologistsQuery } from "../../types";
import { getPsychologistsAdapter } from "@/adapters";

export async function GET() {
  try {
    const psychologists = await sanityClient.fetch(allPsychologistsQuery);

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

export async function POST(req) {
  try {
    const psychologists = await req.json();

    const [
      ageSpecialties,
      insurances,
      conditionSpecialties,
      therapyModalities,
    ] = await Promise.all([
      sanityClient.fetch("*[_type == 'ageSpecialty']"),
      sanityClient.fetch("*[_type == 'insurance']"),
      sanityClient.fetch("*[_type == 'conditionSpecialty']"),
      sanityClient.fetch("*[_type == 'therapyModality']"),
    ]);

    const results = await Promise.all(
      psychologists.map(async (psychologist) => {
        try {
          const modifiedPsychologist = {
            _type: "psychologist",
            name: psychologist.name,
            facility: psychologist.facility,
            address: formatAddress(psychologist.address),
            phone: psychologist.phone,
            insurances: await createReferences(
              psychologist.insurances,
              insurances,
              "insurance",
              "name"
            ),
            ageSpecialty: await createReferences(
              psychologist.ageSpecialty,
              ageSpecialties,
              "ageSpecialty",
              "age"
            ),
            conditionSpecialty: await createReferences(
              psychologist.conditionSpecialty,
              conditionSpecialties,
              "conditionSpecialty",
              "name"
            ),
            therapyOptions: await createReferences(
              psychologist.therapyOptions,
              therapyModalities,
              "therapyModality",
              "type"
            ),
          };

          return await sanityClient.create(modifiedPsychologist);
        } catch (error) {
          console.error(
            `Error creating psychologist ${psychologist.name}:`,
            error
          );
          return { error: error.message, psychologist: psychologist.name };
        }
      })
    );

    const successfulCreations = results.filter((result) => !result.error);
    const failedCreations = results.filter((result) => result.error);

    return NextResponse.json({
      message: `Created ${successfulCreations.length} psychologists, ${failedCreations.length} failed`,
      successfulCreations,
      failedCreations,
    });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { error: "Error processing psychologists", details: error.message },
      { status: 500 }
    );
  }
}
