import { Button, Typography, Badge } from "@/components/ui";
import { UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import Image from "next/image";

const PsychologistCard = ({
  psychologist,
}: {
  psychologist: PsychologistModel;
}) => {
  const {
    name,
    image,
    therapyOptions,
    conditionSpecialty,
    insurances,
    // phone,
    ageSpecialty,
  } = psychologist;

  return (
    <li className="grid grid-cols-[auto_1fr] w-full py-5 px-2.5 gap-2.5">
      <Image
        src={image ? image : UserImage}
        alt={`${name} image`}
        loading="lazy"
        className="w-12 h-12 object-cover rounded-full"
      />

      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <Typography
            className="font-bold"
            as="h2"
            color="black"
            variant="large"
          >
            {name}
          </Typography>

          <div className="flex items-center gap-1">
            {therapyOptions.length
              ? therapyOptions.map((option) => (
                  <Badge key={option.id} color="blue">
                    {option.type}
                  </Badge>
                ))
              : ""}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2.5 mt-5">
          <div className="flex flex-col gap-1">
            <div>
              <Typography as="p" color="darkGray" variant="medium">
                <span className="font-semibold">Specialty:</span>{" "}
                {conditionSpecialty.length
                  ? conditionSpecialty
                      .map((condition) => condition.name)
                      .join(", ")
                  : ""}
              </Typography>
            </div>

            <div>
              <Typography as="p" color="darkGray" variant="medium">
                <span className="font-semibold">Accepted Insurance:</span>{" "}
                {insurances.length
                  ? insurances.map((insurance) => insurance.name).join(", ")
                  : ""}
              </Typography>
            </div>

            <div>
              <Typography as="p" color="darkGray" variant="medium">
                <span className="font-semibold">Age Specialty:</span>{" "}
                {ageSpecialty.length
                  ? ageSpecialty.map((specialty) => specialty.age).join(", ")
                  : ""}
              </Typography>
            </div>
          </div>

          <div className="flex items-end">
            <Button className="px-3 py-1.5 rounded-full" variant="medium">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PsychologistCard;
