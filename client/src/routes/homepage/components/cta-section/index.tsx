import { Typography } from "@/components/ui";
import Image from "next/image";
import { CTACards } from "@/lib/constants";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
 
interface Props {
    image: string;
    buttonText: string;
}

const CTACard = ({image, buttonText}: Props) => {
    return <article className="relative w-full h-auto">
        <Image
          className="w-full h-auto object-cover"
          src={image}
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <div className="absolute bottom-0 left-0 w-full p-4 flex items-center">
        <Typography color="white" as="p" variant="small" className="text-lg font-bold mr-5">
          {buttonText}
        </Typography>
            <div className="mt-2 flex items-center justify-center">
                <ArrowRightCircleIcon className="h-8 w-8 text-white"/>
            </div>
        </div>
      </article>
}

export function CTASection() {
  return (
    <section className="page-width">
        <div className="grid grid-cols-2 gap-5">
        {
            CTACards.map((card) => <CTACard key = {card.id} {...card}/>)
        }
        </div>
    </section>
  );
}
