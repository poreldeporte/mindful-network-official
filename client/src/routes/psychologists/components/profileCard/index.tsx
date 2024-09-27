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
    <header className="mb-56 mt-96 flex items-center">
      <div className="w-32 h-32 mr-5">
        <Image
          className="rounded-full aspect-square object-cover"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTh8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
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
