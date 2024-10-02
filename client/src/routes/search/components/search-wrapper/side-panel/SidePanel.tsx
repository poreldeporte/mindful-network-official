"use client";

import { Badge, Typography } from "@/components/ui";
import {
  conditionSpecialty,
  insurances,
  PsychologistModel,
  ResourcesKey,
  TherapyModality,
} from "@/models";
import { useRouter, useSearchParams } from "next/navigation";
import PsychologistCard from "./PsychologistCard";
import { useState, useEffect } from "react";

interface Props {
  proffesionals: PsychologistModel[] | null;
  filteredProffesionals: PsychologistModel[] | null;
  conditions: conditionSpecialty[] | null;
  insurances: insurances[] | null;
  therapyModalities: TherapyModality[] | null;
  resources: ResourcesKey[];
}

const SidePanel = ({
  proffesionals,
  filteredProffesionals,
  conditions,
  insurances,
  therapyModalities,
  resources,
}: Props) => {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(
    null
  );
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
  const [selectedTherapy, setSelectedTherapy] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const conditionParam = searchParams.get("condition");
    const insuranceParam = searchParams.get("insurance");
    const therapyParam = searchParams.get("therapy");
    const resourceParam = searchParams.get("resource");

    if (conditionParam) {
      setSelectedCondition(conditionParam);
    }

    if (insuranceParam) {
      setSelectedInsurance(insuranceParam.split(","));
    }

    if (therapyParam) {
      setSelectedTherapy(therapyParam);
    }

    if (resourceParam) {
      setSelectedResources(resourceParam.split(","));
    }
  }, [searchParams]);

  const handleBadgeClick = (filterType: string, value: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (filterType === "resource") {
      let updatedResources = [...selectedResources];

      if (updatedResources.includes(value)) {
        updatedResources = updatedResources.filter(
          (resource) => resource !== value
        );
      } else {
        updatedResources.push(value);
      }

      setSelectedResources(updatedResources);

      if (updatedResources.length > 0) {
        currentParams.set("resource", updatedResources.join(","));
      } else {
        currentParams.delete("resource");
      }
    } else if (filterType === "insurance") {
      let selectedInsurances = selectedInsurance ? [...selectedInsurance] : [];

      if (selectedInsurances.includes(value)) {
        selectedInsurances = selectedInsurances.filter(
          (insurance) => insurance !== value
        );
      } else {
        selectedInsurances.push(value);
      }

      if (selectedInsurances.length > 0) {
        currentParams.set("insurance", selectedInsurances.join(","));
      } else {
        currentParams.delete("insurance");
      }

      setSelectedInsurance(selectedInsurances);
    } else if (filterType === "condition") {
      setSelectedCondition(selectedCondition === value ? null : value);
      if (currentParams.get(filterType) === value) {
        currentParams.delete(filterType);
      } else {
        currentParams.set(filterType, value);
      }
    } else if (filterType === "therapy") {
      setSelectedTherapy(selectedTherapy === value ? null : value);
      if (currentParams.get(filterType) === value) {
        currentParams.delete(filterType);
      } else {
        currentParams.set(filterType, value);
      }
    }

    router.push(`?${currentParams.toString()}`, undefined);
  };

  return (
    <aside className="overflow-hidden z-10 lg:py-5 pb-5 pt-14 lg:absolute lg:left-2.5 lg:top-1/2 lg:-translate-y-1/2 h-max lg:h-[calc(100%-20px)] w-full lg:w-1/2 bg-white rounded-3xl grid grid-rows-[auto_1fr_auto]">
      <header className="px-5 pb-5 w-full shadow-md">
        <Typography
          className="font-antic"
          as="h1"
          color="black"
          variant="title"
        >
          Professionals in <span className="text-green-300">South Florida</span>
        </Typography>

        <div>
          <div className="my-2">
            <Typography as="p" color="darkGray" variant="small">
              Resources:
            </Typography>
            <div className="flex items-center flex-wrap gap-2 w-full">
              {resources.map((resourceKey) => (
                <Badge
                  key={resourceKey.key}
                  color="blue"
                  className="w-max"
                  isSelected={selectedResources.includes(resourceKey.key)}
                  onClick={() => handleBadgeClick("resource", resourceKey.key)}
                >
                  {resourceKey.label}
                </Badge>
              ))}
            </div>
          </div>

          <div className="my-2">
            <Typography as="p" color="darkGray" variant="small">
              Conditions:
            </Typography>
            <div className="flex items-center flex-wrap gap-2 w-full">
              {conditions && conditions.length
                ? conditions.map((condition) => (
                    <Badge
                      key={condition.id}
                      color="orange"
                      className="w-max"
                      isSelected={selectedCondition === condition.name}
                      onClick={() =>
                        handleBadgeClick("condition", condition.name)
                      }
                    >
                      {condition.name}
                    </Badge>
                  ))
                : ""}
            </div>
          </div>

          <div className="mb-2">
            <Typography as="p" color="darkGray" variant="small">
              Insurance:
            </Typography>
            <div className="flex items-center flex-wrap gap-2 w-full">
              {insurances && insurances.length
                ? insurances.map((insurance) => (
                    <Badge
                      key={insurance.id}
                      color="green"
                      className="w-max"
                      isSelected={selectedInsurance.includes(insurance.name)}
                      onClick={() =>
                        handleBadgeClick("insurance", insurance.name)
                      }
                    >
                      {insurance.name}
                    </Badge>
                  ))
                : ""}
            </div>
          </div>

          <div className="mt-2">
            <Typography as="p" color="darkGray" variant="small">
              Therapy Options:
            </Typography>
            <div className="flex items-center flex-wrap gap-2 w-full">
              {therapyModalities && therapyModalities.length
                ? therapyModalities.map((modality) => (
                    <Badge
                      key={modality.id}
                      color="blue"
                      className="w-max"
                      isSelected={selectedTherapy === modality.type}
                      onClick={() => handleBadgeClick("therapy", modality.type)}
                    >
                      {modality.type}
                    </Badge>
                  ))
                : ""}
            </div>
          </div>
        </div>
      </header>

      <div className="overflow-y-auto overflow-x-hidden max-w-full">
        <ul className="px-5 divide-y divide-gray-200">
          {filteredProffesionals && filteredProffesionals.length
            ? filteredProffesionals.map((psychologist) => (
                <PsychologistCard
                  psychologist={psychologist}
                  key={psychologist.id}
                />
              ))
            : "There is no psychologist matching your filters"}
        </ul>
      </div>

      <footer className="px-5 pt-2.5 flex items-center">
        {filteredProffesionals && proffesionals && (
          <Typography as="span" color="black" variant="xsmall">
            Showing {filteredProffesionals.length} of {proffesionals.length}{" "}
            professionals
          </Typography>
        )}
      </footer>
    </aside>
  );
};

export default SidePanel;
