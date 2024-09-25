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
    <header className="p-5 flex">
      <div>
        <Image
          src={image ? image : UserImage}
          alt={name}
          width={100}
          height={100}
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
        <div className="">
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
