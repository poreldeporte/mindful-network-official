import { promises as fs } from "fs";

export const getAllConditions = async () => {
  try {
    const file = await fs.readFile(
      process.cwd() + "/src/app/db/condition-specialties.json",
      "utf8"
    );
    return JSON.parse(file) || [];
  } catch (error) {
    console.error("Error reading conditions data:", error);
  }
};

export const getAllTherapyModalities = async () => {
  try {
    const file = await fs.readFile(
      process.cwd() + "/src/app/db/therapy-modality.json",
      "utf8"
    );
    return JSON.parse(file) || [];
  } catch (error) {
    console.error("Error reading conditions data:", error);
  }
};

export const getAllInsurances = async () => {
  try {
    const file = await fs.readFile(
      process.cwd() + "/src/app/db/insurances.json",
      "utf8"
    );
    return JSON.parse(file) || [];
  } catch (error) {
    console.error("Error reading conditions data:", error);
  }
};
export const getAllAgeSpecialties = async () => {
  try {
    const file = await fs.readFile(
      process.cwd() + "/src/app/db/age-specialties.json",
      "utf8"
    );
    return JSON.parse(file) || [];
  } catch (error) {
    console.error("Error reading conditions data:", error);
  }
};

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
