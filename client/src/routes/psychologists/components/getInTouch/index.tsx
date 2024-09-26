import { Typography } from "@/components/ui";
import { PsychologistModel } from "@/models";
import { PhoneIcon, GlobeAltIcon, EnvelopeIcon} from "@heroicons/react/24/outline";


export function GetInTouch({name, phone}: PsychologistModel) {
  return (
    <section className="page-width my-56 lg:flex">
    <div className="lg:w-1/2">
        <Typography
            className=""
            color="black"
            variant="subtitle"
            as="h2"
        >
            Get in Touch with <span className="block"></span>
            <span className="text-orange-600">{name}</span>
        </Typography>
    </div>
    <div className="bg-orange-100 flex flex-col lg:flex-grow p-5">
        <div className="flex items-center space-x-2 mb-5">
            <EnvelopeIcon className="h-8 w-8" />
            <Typography
                className=""
                color="black"
                variant="small"
                as="p"
            >
                Email
            </Typography>
        </div>
        <div className="flex items-center space-x-2 mb-5">
            <GlobeAltIcon className="h-8 w-8" />
            <Typography
                className=""
                color="black"
                variant="small"
                as="p"
            >
                Web
            </Typography>
        </div>
        <div className="flex items-center space-x-2 mb-5">
            <PhoneIcon className="h-8 w-8" />
            <Typography
                className=""
                color="black"
                variant="small"
                as="p"
            >
                {phone}
            </Typography>
        </div>
    </div>
</section>

  )
}
