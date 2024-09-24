import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "/src/app/db/insurances.json");
    const file = await fs.readFile(filePath, "utf8");
    const insurances = JSON.parse(file);

    return NextResponse.json(insurances);
  } catch (error) {
    console.error("Error reading psychologists data:", error);
    return NextResponse.json(
      { error: "Error reading psychologists data" },
      { status: 500 }
    );
  }
}
