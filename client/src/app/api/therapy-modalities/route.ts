import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "/src/app/db/therapy-modality.json"
    );
    const file = await fs.readFile(filePath, "utf8");
    const therapyModalities = JSON.parse(file);

    return NextResponse.json(therapyModalities);
  } catch (error) {
    return NextResponse.json(
      { error: "Error reading psychologists data" },
      { status: 500 }
    );
  }
}
