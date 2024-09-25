"use client";

import { MapComponent } from "@/components/shared";
import { getValidationError } from "@/utilities";
import {
  // ageSpecialty,
  conditionSpecialty,
  Insurances,
  PsychologistModel,
  TherapyModality,
} from "@/models";
// import { Positions } from "@/models";
import { useEffect, useState } from "react";
import SidePanel from "./side-panel/SidePanel";
import { useSearchParams } from "next/navigation";

export const SearchWrapper = () => {
  const [psychologists, setPsychologists] = useState<
    PsychologistModel[] | null
  >(null);
  // const [ageSpecialties, setAgeSpecialties] = useState<ageSpecialty[] | null>(
  //   null
  // );
  const [conditions, setConditions] = useState<conditionSpecialty[] | null>(
    null
  );
  const [insurances, setInsurances] = useState<Insurances[] | null>(null);
  const [therapyModalities, setTherapyModalities] = useState<
    TherapyModality[] | null
  >(null);

  // const [mapPositions, setMapPositions] = useState<Positions[]>([
  //   { lat: 34.0522, lng: -118.2437 },
  // ]);
  const [filteredPsychologists, setFilteredPsychologists] = useState<
    PsychologistModel[] | null
  >(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          psychologistsRes,
          conditionsRes,
          // ageSpecialtiesRes,
          insurancesRes,
          therapyModalitiesRes,
        ] = await Promise.all([
          fetch("/api/psychologists"),
          fetch("/api/conditions"),
          // fetch("/api/age-specialties"),
          fetch("/api/insurances"),
          fetch("/api/therapy-modalities"),
        ]);

        const psychologistsData = await psychologistsRes.json();
        const conditionsData = await conditionsRes.json();
        // const ageSpecialtiesData = await ageSpecialtiesRes.json();
        const insurancesData = await insurancesRes.json();
        const therapyModalitiesData = await therapyModalitiesRes.json();

        setPsychologists(psychologistsData);
        setConditions(conditionsData);
        // setAgeSpecialties(ageSpecialtiesData);
        setInsurances(insurancesData);
        setTherapyModalities(therapyModalitiesData);
      } catch (error) {
        console.log(error);
        getValidationError(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (psychologists) {
      const conditionParam = searchParams.get("condition");
      const insuranceParam = searchParams.get("insurance");
      const therapyParam = searchParams.get("therapy");
      const searchQuery = searchParams.get("search");

      let filtered = psychologists;

      if (conditionParam) {
        filtered = filtered.filter((psychologist) =>
          psychologist.conditionSpecialty.some(
            (condition) => condition.name === conditionParam
          )
        );
      }

      if (insuranceParam) {
        const selectedInsurances = insuranceParam.split(",");
        filtered = filtered.filter((psychologist) =>
          psychologist.insurances.some((insurance) =>
            selectedInsurances.includes(insurance.name)
          )
        );
      }

      if (therapyParam) {
        filtered = filtered.filter((psychologist) =>
          psychologist.therapyOptions.some(
            (modality) => modality.type === therapyParam
          )
        );
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (psychologist) =>
            psychologist.insurances.some((insurance) =>
              insurance.name.toLowerCase().includes(query)
            ) ||
            psychologist.therapyOptions.some((modality) =>
              modality.type.toLowerCase().includes(query)
            )
        );
      }

      setFilteredPsychologists(filtered);
    }
  }, [psychologists, searchParams]);

  return (
    <>
      <SidePanel
        psychologists={psychologists}
        filteredPsychologists={filteredPsychologists}
        conditions={conditions}
        insurances={insurances}
        therapyModalities={therapyModalities}
      />
      <MapComponent
        positions={[{ lat: 34.0522, lng: -118.2437 }]}
        className="h-full w-full"
      />
    </>
  );
};
