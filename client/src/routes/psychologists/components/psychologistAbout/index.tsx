"use client";

import { psychologistNavigation } from "@/lib/constants";
import Link from "next/link";
import { Button, Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";

import { usePathname } from "next/navigation";
import { useSelectedLayoutSegment } from "next/navigation";
import { Section } from "../section";

import { useEffect, useState } from "react";

export function PsychologistAbout({
  ageSpecialty,
  insurances,
  conditionSpecialty,
  therapyOptions,
}: PsychologistModel) {
  return (
    <>
      <Section id="age-specialty" title="Age Specialty">
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
      </Section>

      <Section id="insurances" title="Insurances">
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
      </Section>

      <Section id="condition-specialty" title="Condition Specialty">
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
      </Section>

      <Section id="therapy-options" title="Therapy options">
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
      </Section>
    </>
  );
}
