"use client";

import { Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import { Section, SectionContent, SectionHeader } from "../section";
import { PersonStanding, Activity, Brain, ArmchairIcon} from "lucide-react";

export function PsychologistAbout({
  ageSpecialty,
  insurances,
  conditionSpecialty,
  therapyOptions,
}: PsychologistModel) {
  return (
    <>
      <Section id="age-specialty">
        <SectionHeader>
          <PersonStanding className="h-12 w-12" />
          <Typography
            variant="large"
            className="font-bold"
            as="h3"
            color="black"
          >
            Age Specialty
          </Typography>
        </SectionHeader>
        <SectionContent>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {ageSpecialty && ageSpecialty.length ? (
            <>
              {ageSpecialty.map((insurance) => (
                <li
                  key={insurance.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <Typography as="p" variant="large" color="darkGray">
                    {insurance.age}
                  </Typography>
                </li>
              ))}
            </>
          ) : (
            <Typography as="p" variant="large" color="darkGray">
              No Age Specialty available
            </Typography>
          )}
        </ul>
        </SectionContent>
      </Section>

      <Section id="insurances">
        <SectionHeader>
          <Activity className="h-12 w-12" />
          <Typography
            variant="large"
            className="font-bold"
            as="h3"
            color="black"
          >
            Insurances
          </Typography>
        </SectionHeader>
        <SectionContent>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {insurances && insurances.length ? (
            <>
              {insurances.map((insurance) => (
                <li
                  key={insurance.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <Typography as="p" variant="large" color="darkGray">
                    {insurance.name}
                  </Typography>
                </li>
              ))}
            </>
          ) : (
            <Typography as="p" variant="large" color="darkGray">
              No insurances available
            </Typography>
          )}
        </ul>
        </SectionContent>
      </Section>

      <Section id="condition-specialty">
        <SectionHeader>
          <Brain className="h-12 w-12"/>
          <Typography
            variant="large"
            className="font-bold"
            as="h3"
            color="black"
          >
            Condition Specialty
          </Typography>
        </SectionHeader>
        <SectionContent>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {conditionSpecialty && conditionSpecialty.length ? (
            <>
              {conditionSpecialty.map((condition) => (
                <li
                  key={condition.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <Typography as="p" variant="large" color="darkGray">
                    {condition.name}
                  </Typography>
                </li>
              ))}
            </>
          ) : (
            <Typography as="p" variant="large" color="darkGray">
              No conditions available
            </Typography>
          )}
        </ul>
        </SectionContent>
      </Section>

      <Section id="therapy-options">
        <SectionHeader>
          <ArmchairIcon className="h-12 w-12"/>
          <Typography
            variant="large"
            className="font-bold"
            as="h3"
            color="black"
          >
            Therapy Options
          </Typography>
        </SectionHeader>
        <SectionContent>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {therapyOptions && therapyOptions.length ? (
            <>
              {therapyOptions.map((option) => (
                <li
                  key={option.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <Typography as="p" variant="large" color="darkGray">
                    {option.type}
                  </Typography>
                </li>
              ))}
            </>
          ) : (
            <Typography as="p" variant="large" color="darkGray">
              No Therapy options available
            </Typography>
          )}
        </ul>
        </SectionContent>
      </Section>
    </>
  );
}
