import { promises as fs } from "fs";

export const getAllPsychologists = async () => {
  try {
    const file = await fs.readFile(
      process.cwd() + "/src/app/db/psychologists.json",
      "utf8"
    );
    return JSON.parse(file) || [];
  } catch (error) {
    console.error("Error reading psychologists data:", error);
  }
};

export const getPsychologistsByFilter = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};
