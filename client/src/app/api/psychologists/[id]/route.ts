import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const filePath = path.join(process.cwd(), "src/app/db/psychologists.json");
    const file = await fs.readFile(filePath, "utf8");
    const psychologists = JSON.parse(file);

    const psychologist = psychologists.find(
      (p: { id: string }) => p.id === id
    );

    if (!psychologist) {
      return NextResponse.json(
        { error: "Psychologist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(psychologist);
  } catch (error) {
    console.error("Error reading psychologist data:", error);
    return NextResponse.json(
      { error: "Error reading psychologist data" },
      { status: 500 }
    );
  }
}
