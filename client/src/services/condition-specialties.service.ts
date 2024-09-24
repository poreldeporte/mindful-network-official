import { promises as fs } from "fs";

export const getAllConditions = async () => {
  try {
    const file = await fs.readFile(
      process.cwd() + "/src/app/db/condition_specialties.json",
      "utf8"
    );
    return JSON.parse(file) || [];
  } catch (error) {
    console.error("Error reading conditions data:", error);
  }
};
