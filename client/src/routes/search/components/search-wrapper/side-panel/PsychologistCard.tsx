import { Badge, Typography } from "@/components/ui";
import { UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import { formatType } from "@/utilities";
import Image from "next/image";
import Link from "next/link";

const PsychologistCard = ({
  psychologist,
}: {
  psychologist: PsychologistModel;
}) => {
  const {
    name,
    id,
    image,
    therapyOptions,
    conditionSpecialty,
    insurances,
    // phone,
    ageSpecialty,
    _type,
  } = psychologist;

  return (
    <li className="grid grid-cols-[auto_1fr] w-full py-5 px-2.5 gap-5 items-center">
      <Image
        src={image ? image : UserImage}
        alt={`${name} image`}
        loading="lazy"
        width={100}
        height={100}
        className="w-32 h-32 object-cover rounded-full"
      />

      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <Typography
            className="font-bold"
            as="h2"
            color="black"
            variant="medium"
          >
            {name}
          </Typography>

          <div className="flex items-center gap-1">
            <Badge color="green">{formatType(_type)}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] gap-2.5 mt-5">
          <div className="flex flex-col gap-1">
            <div>
              <Typography as="p" color="darkGray" variant="small">
                <span className="font-semibold">Specialty:</span>{" "}
                {conditionSpecialty?.length
                  ? conditionSpecialty
                      .map((condition) => condition.name)
                      .join(", ")
                  : ""}
              </Typography>
            </div>

            <div>
              <Typography as="p" color="darkGray" variant="small">
                <span className="font-semibold">Accepted Insurance:</span>{" "}
                {insurances?.length
                  ? insurances.map((insurance) => insurance.name).join(", ")
                  : ""}
              </Typography>
            </div>

            <div>
              <Typography as="p" color="darkGray" variant="small">
                <span className="font-semibold">Age Specialty:</span>{" "}
                {ageSpecialty?.length
                  ? ageSpecialty.map((specialty) => specialty.age).join(", ")
                  : ""}
              </Typography>
            </div>

            <div>
              <Typography as="p" color="darkGray" variant="small">
                <span className="font-semibold">Therapy Option:</span>{" "}
                {therapyOptions?.length
                  ? therapyOptions.map((option) => option.type).join(", ")
                  : ""}
              </Typography>
            </div>
          </div>

          <div className="flex items-end">
            <Link
              href={`/psychologists/${id}`}
              className="px-3 py-1.5 rounded-full bg-blue-500 text-white"
            >
              <Typography as="span" color="white" variant="small">
                View profile
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PsychologistCard;
