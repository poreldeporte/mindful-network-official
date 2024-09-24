"use client";

import { MapComponent } from "@/components/shared";
import {
  ageSpecialty,
  conditionSpecialty,
  Insurances,
  PsychologistModel,
  TherapyModality,
} from "@/models";
import { useEffect, useState } from "react";
import SidePanel from "./side-panel/SidePanel";

export const SearchWrapper = () => {
  const [psychologists, setPsychologists] = useState<
    PsychologistModel[] | null
  >(null);
  const [ageSpecialties, setAgeSpecialties] = useState<ageSpecialty[] | null>(
    null
  );
  const [conditions, setConditions] = useState<conditionSpecialty[] | null>(
    null
  );
  const [Insurances, setInsurances] = useState<Insurances[] | null>(null);
  const [therapyModalities, setTherapyModalities] = useState<
    TherapyModality[] | null
  >(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          psychologistsRes,
          conditionsRes,
          ageSpecialtiesRes,
          insurancesRes,
          therapyModalitiesRes,
        ] = await Promise.all([
          fetch("/api/psychologists"),
          fetch("/api/conditions"),
          fetch("/api/age-specialties"),
          fetch("/api/insurances"),
          fetch("/api/therapy-modalities"),
        ]);

        const psychologistsData = await psychologistsRes.json();
        const conditionsData = await conditionsRes.json();
        const ageSpecialtiesData = await ageSpecialtiesRes.json();
        const insurancesData = await insurancesRes.json();
        const therapyModalitiesData = await therapyModalitiesRes.json();

        setPsychologists(psychologistsData);
        setConditions(conditionsData);
        setAgeSpecialties(ageSpecialtiesData);
        setInsurances(insurancesData);
        setTherapyModalities(therapyModalitiesData);
      } catch (error) {}
    }
    fetchData();
  }, []);

  console.log(psychologists);
  return (
    <>
      <SidePanel psychologists={psychologists} />
      <MapComponent position={[34.0522, -118.2437]} className="h-full w-full" />
    </>
  );
};
