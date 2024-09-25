import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "/src/app/db/age-specialty.json");
    const file = await fs.readFile(filePath, "utf8");
    const ageSpecialties = JSON.parse(file);

    return NextResponse.json(ageSpecialties);
  } catch (error) {
    return NextResponse.json(
      { error: "Error reading Age Specialties data" },
      { status: 500 }
    );
  }
}
