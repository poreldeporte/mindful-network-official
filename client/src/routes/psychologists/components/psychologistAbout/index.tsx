"use client";

import { psychologistNavigation } from "@/lib/constants";
import Link from "next/link";
import { Button, Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";

import { usePathname } from "next/navigation";
import { Section } from "../section";

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center justify-between">
      <div>
        {psychologistNavigation.map((link) => {
          const isActive = pathname === link.key;
          return (
            <a
              className={`mr-10 ${isActive ? "font-bold underline" : ""}`}
              key={link.key}
              href={link.key}
            >
              {link.label}
            </a>
          );
        })}
      </div>
      <Button className="p-2" variant="medium">
        Get in Touch
      </Button>
    </nav>
  );
};

export function PsychologistAbout({ ageSpecialty, insurances, conditionSpecialty, therapyOptions}: PsychologistModel) {
  return (
    <div>
      <NavigationBar />

      <Section title="Child Specialty">
        <ul>
          {ageSpecialty && ageSpecialty.length ? (
            <>
              {ageSpecialty.map((condition) => 
              (
                <li key={condition.id}>
                <Typography as="p" variant="medium" color="darkGray">
                  {condition.age}
                  </Typography>
                  </li>
                )
                )}
            </>
          ) : (
            ""
          )}
        </ul>
      </Section>

      <Section title="Insurances">
        <ul>
          {insurances && insurances.length ? (
            <>
              {insurances.map((insurance) => 
              (
                <li key={insurance.id}>
                <Typography as="p" variant="medium" color="darkGray">
                  {insurance.name}
                  </Typography>
                  </li>
                )
                )}
            </>
          ) : (
            ""
          )}
        </ul>
      </Section>

      <Section title="Condition Specialty">
        <ul>
          {conditionSpecialty && conditionSpecialty.length ? (
            <>
              {conditionSpecialty.map((condition) => 
              (
                <li key={condition.id}>
                <Typography as="p" variant="medium" color="darkGray">
                  {condition.name}
                  </Typography>
                  </li>
                )
                )}
            </>
          ) : (
            ""
          )}
        </ul>
      </Section>

      <Section title="Therapy options">
        <ul>
          {therapyOptions && therapyOptions.length ? (
            <>
              {therapyOptions.map((option) => 
              (
                <li key={option.id}>
                <Typography as="p" variant="medium" color="darkGray">
                  {option.type}
                  </Typography>
                  </li>
                )
                )}
            </>
          ) : (
            ""
          )}
        </ul>
      </Section>


    </div>
  );
}
