import React from "react";
import Image from "next/image";
import { Typography, Badge } from "@/components/ui";
import { PsychologistModel } from "@/models";
import { UserImage } from "@/lib/images";

export function ProfileCard({
  image,
  conditionSpecialty,
  name,
  description,
}: PsychologistModel) {
  return (
    <header className="mb-10 mt-32 justify-center bg-white rounded-lg py-10 px-5 border border-gray-100 lg:mt-0">
      <div className="flex items-center justify-start">
        <div className="w-24 h-24 lg:h-48 lg:w-48 mr-5 mb-5">
          <Image
            className="rounded-full aspect-square object-cover"
            src={image ? image : UserImage}
            alt={name}
            width={300}
            height={300}
          />
        </div>
        <div>
          <Typography
            className="font-bold mb-5"
            as="h2"
            variant="large"
            color="black"
          >
            {name}
          </Typography>
          <div>
            {conditionSpecialty && conditionSpecialty.length ? (
              <>
                {conditionSpecialty.map((condition) => {
                  return (
                    <Badge className="mr-2 mb-2" key={condition.id} color="blue" isSelected={false}>
                      {condition.name}
                    </Badge>
                  );
                })}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Typography className="mb-5" as="h2" variant="medium" color="darkGray">
          {description}
        </Typography>
      </div>
    </header>
  );
}
