import React from "react";
import Image from "next/image";
import { Typography, Badge } from "@/components/ui";
import { PsychologistModel } from "@/models";
import { UserImage } from "@/lib/images";

export function ProfileCardLg({
  image,
  conditionSpecialty,
  name,
  description,
}: PsychologistModel) {
  return (
    <header className="hidden lg:flex py-10 px-10 bg-white rounded-lg border border-gray-100 shadow-sm shadow-gray-100">
      <div className="flex flex-row items-center">
        <div className="flex items-center w-64 h-64 mr-10 mb-5">
          <Image
            className="rounded-full aspect-square object-cover"
            src={image ? image : UserImage}
            alt={name}
            width={300}
            height={300}
          />
        </div>

        <div className="flex flex-col lg:justify-between lg:w-full">
          <div>
            <Typography
              className="font-bold mb-2 lg:mb-5"
              as="h2"
              variant="large"
              color="black"
            >
              {name}
            </Typography>

            <div className="flex flex-wrap gap-2 mt-3 mb-10">
            {conditionSpecialty && conditionSpecialty.length
              ? conditionSpecialty.map((condition) => (
                  <Badge key={condition.id} color="blue" isSelected={false}>
                    {condition.name}
                  </Badge>
                ))
              : ""}
            </div>

            <Typography
              className="mb-5 max-w-4xl"
              as="h2"
              variant="medium"
              color="black"
            >
              {description}
            </Typography>
          </div>

         
        </div>
      </div>
    </header>
  );
}
