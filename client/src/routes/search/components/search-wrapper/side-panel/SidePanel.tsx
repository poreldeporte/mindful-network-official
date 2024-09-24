"use client";

import { Typography } from "@/components/ui";
import PsychologistCard from "./PsychologistCard";
import { PsychologistModel } from "@/models";

interface Props {
  psychologists: PsychologistModel[] | null;
}

const SidePanel = ({ psychologists }: Props) => {
  return (
    <aside className="z-10 py-5 absolute md:left-2.5 xl:left-5 top-1/2 -translate-y-1/2 md:h-[calc(100%-20px)] xl:h-[calc(100%-40px)] w-2/3 bg-white rounded-xl grid grid-rows-[auto_1fr_auto]">
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
          {psychologists && psychologists.length
            ? psychologists.map((psychologist) => (
                <PsychologistCard
                  psychologist={psychologist}
                  key={psychologist.id}
                />
              ))
            : "There is no psychologist"}
        </ul>
      </div>

      <footer className="px-5 pt-2.5 flex items-center">
        {psychologists && (
          <Typography as="span" color="black" variant="small">
            Showing {psychologists.length} of {psychologists.length}
          </Typography>
        )}
      </footer>
    </aside>
  );
};

export default SidePanel;
