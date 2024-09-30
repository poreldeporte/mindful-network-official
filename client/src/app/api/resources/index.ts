import { sanityClient } from "@/api";

export default async function handler(req, res) {
  const query = `{
    "psychologists": *[_type == "psychologists"],
    "backerActFacilities": *[_type == "backerActFacilities"],
    "innovativeTherapies": *[_type == "innovativeTherapies"],
    "inpatient": *[_type == "inpatient"],
    "medication": *[_type == "medication"],
    "mentalHealth": *[_type == "mentalHealth"],
    "mindBodyPractices": *[_type == "mindBodyPractices"],
    "outpatient": *[_type == "outpatient"],
    "psychiatric": *[_type == "psychiatric"],
    "ageSpecialties": *[_type == "ageSpecialties"],
    "conditionSpecialties": *[_type == "conditionSpecialties"],
    "insurances": *[_type == "insurances"],
    "therapyModalities": *[_type == "therapyModalities"],
    "user": *[_type == "user"]
  }`;

  try {
    const data = await sanityClient.fetch(query);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching all schemas:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
