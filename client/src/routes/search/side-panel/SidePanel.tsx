import Image from "next/image";
import { UserImage } from "@/lib/images";
import { PsychologistModel } from "@/models";
import { Typography } from "@/components/ui";

interface Props {
  psychologists: PsychologistModel[] | [];
}

const PsychologistCard = ({
  psychologist,
}: {
  psychologist: PsychologistModel;
}) => {
  const {
    name,
    address,
    facility,
    image,
    therapyOptions,
    conditionSpecialty,
    insurances,
    phone,
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
        <Typography as="h2" color="black" variant="large">
          {name}
        </Typography>
        <Typography as="p" color="darkGray" variant="medium">
          {address}
        </Typography>
        <Typography as="p" color="darkGray" variant="medium">
          {facility}
        </Typography>
      </div>
    </li>
  );
};

const SidePanel = ({ psychologists }: Props) => {
  return (
    <aside className="z-10 py-5 absolute left-5 top-1/2 -translate-y-1/2 h-[calc(100%-40px)] w-1/2 bg-white rounded-xl grid grid-rows-[auto_1fr_auto]">
      <header className="px-5">
        <Typography
          className="font-antic"
          as="h1"
          color="black"
          variant="title"
        >
          Proffesionals in <span className="text-green-300">South Florida</span>
        </Typography>

        <div>
          <div></div>
        </div>
      </header>

      <div className="overflow-y-auto">
        <ul className="px-5 divide-y divide-gray-200">
          {psychologists.length
            ? psychologists.map((psychologist) => (
                <PsychologistCard
                  psychologist={psychologist}
                  key={psychologist.id}
                />
              ))
            : "There is no psychologist"}
        </ul>
      </div>

      <footer className="px-5">
        Showing {psychologists.length} of {psychologists.length}
      </footer>
    </aside>
  );
};

export default SidePanel;
