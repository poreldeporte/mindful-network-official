import React from "react";
import Image from "next/image";
import { Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import { UserImage } from "@/lib/images";

export function ProfileCard({
  image,
  conditionSpecialty,
  name,
}: PsychologistModel) {
  return (
    <header className="mb-20 lg:mb-48 mt-32 lg:mt-72 flex items-center">
      <div className="w-32 h-32 mr-5">
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
          variant="medium"
          color="black"
        >
          {name}
        </Typography>
        <div>
          {conditionSpecialty && conditionSpecialty.length ? (
            <Typography as="p" variant="medium" color="lightGray">
              {conditionSpecialty.map((condition) => condition.name).join(", ")}
            </Typography>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}
