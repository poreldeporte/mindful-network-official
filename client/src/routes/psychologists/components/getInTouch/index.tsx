import { Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import {
	PhoneIcon,
	MapPinIcon,
	EnvelopeIcon,
} from "@heroicons/react/24/outline";

export function GetInTouch({ name, phone, address }: PsychologistModel) {
	return (
		<section
			className="section-y-padding col-span-full lg:flex"
			id="get-in-touch"
		>
			<div className="mb-10 lg:w-1/2">
				<Typography className="" color="black" variant="title" as="h2">
					Get in Touch with <span className="block" />
					<span className="text-orange-600">{name}</span>
				</Typography>
			</div>

			<div className="bg-orange-100 rounded-2xl w-full lg:flex-grow py-5 lg:w-1/2 lg:py-20 flex flex-col items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-y-2">
					{/*
          <div className="w-full space-y-2">
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-8 w-8" />
              <Typography
                className="text-left"
                color="black"
                variant="small"
                as="p"
              >
                Email
              </Typography>
            </div>
            <Typography
              className="text-left"
              color="black"
              variant="small"
              as="p"
            >
              {name.replaceAll(" ", "").concat("@example.com")}
            </Typography>
          </div>

          <div className="w-full space-y-2 mt-5">
            <div className="flex items-center space-x-2">
              <MapPinIcon className="h-8 w-8" />
              <Typography
                className="text-left"
                color="black"
                variant="small"
                as="p"
              >
                Address
              </Typography>
            </div>
            <Typography
              className="text-left"
              color="black"
              variant="small"
              as="p"
            >
              {address?.address}
            </Typography>
          </div>

          <div className="w-full space-y-2 mt-5">
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-8 w-8" />
              <Typography
                className="text-left"
                color="black"
                variant="small"
                as="p"
              >
                Phone
              </Typography>
            </div>

            <Typography
              className="text-left"
              color="black"
              variant="small"
              as="p"
            >
              {phone}
            </Typography>
           
          </div>
             */}
				</div>
			</div>
		</section>
	);
}
