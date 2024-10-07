import { Button, Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import {
	IconUser,
	IconMail,
	IconMessage,
	IconPhone,
} from "@tabler/icons-react";

export function GetInTouch({ name, phone, address }: PsychologistModel) {
	return (
		<section
			className="section-y-padding col-span-full lg:flex"
			id="get-in-touch"
		>
			<div className="mb-10 lg:w-1/2">
				<Typography className="" color="black" variant="title" as="h2">
					Get in touch with <span className="block" />
					<span
						style={{ textTransform: "capitalize" }}
						className="text-orange-600"
					>
						{name.toLowerCase()}
					</span>
				</Typography>
			</div>

			<div className="bg-orange-100 rounded-2xl w-full lg:flex-grow p-5 lg:w-1/2 lg:p-10 flex flex-col items-center justify-center">
				<div className="flex flex-col gap-y-2 w-full">
					<form className="flex flex-col w-full space-y-5">
						<div className="relative">
							<input
								type="text"
								placeholder="Name"
								className="rounded-full p-2 pl-10 w-full outline-0"
							/>
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
								<IconUser className="h-5 w-5 text-gray-400" />
							</span>
						</div>
						<div className="relative">
							<input
								type="text"
								placeholder="Number"
								className="rounded-full p-2 pl-10 w-full outline-0"
							/>
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<IconPhone className="h-5 w-5 text-gray-400" />
							</span>
						</div>
						<div className="relative">
							<input
								type="email"
								placeholder="Email"
								className="rounded-full p-2 pl-10 w-full outline-0"
							/>
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<IconMail className="h-5 w-5 text-gray-400" />
							</span>
						</div>
						<div className="relative">
							<textarea
								placeholder="Message"
								className="rounded-xl p-2 pl-10 w-full resize-none outline-0"
								rows={4}
							></textarea>
							<span className="absolute left-3 top-3">
								<IconMessage className="h-5 w-5 text-gray-400" />
							</span>
						</div>
					</form>
					<div className="flex items-center justify-end">
						<Button
							variant="medium"
							form="primary"
							className="p-2 rounded-full mt-5 lg:w-1/4"
						>
							<Typography color="white" variant="small" as="h3">
								Send Message
							</Typography>
						</Button>
					</div>
				</div>
			</div>

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
		</section>
	);
}
