import { Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export function GetInTouch({ name, phone, address }: PsychologistModel) {
  return (
    <section className="my-20 lg:my-56 lg:flex">
      <div className="mb-10 lg:w-1/2">
        <Typography className="" color="black" variant="subtitle" as="h2">
          Get in Touch with <span className="block"></span>
          <span className="text-orange-600">{name}</span>
        </Typography>
      </div>
      <div className="bg-orange-100 w-full first:flex flex-col items-center justify-centerlg:flex-grow p-5 lg:w-1/2">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex flex-row items-center space-x-2">
            <EnvelopeIcon className="h-8 w-8" />
            <Typography
              className="text-center"
              color="black"
              variant="small"
              as="p"
            >
              Email
            </Typography>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <MapPinIcon className="h-8 w-8" />
            <Typography
              className="text-center"
              color="black"
              variant="small"
              as="p"
            >
              {address?.address}
            </Typography>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <PhoneIcon className="h-8 w-8" />
            <Typography
              className="text-center"
              color="black"
              variant="small"
              as="p"
            >
              {phone}
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
