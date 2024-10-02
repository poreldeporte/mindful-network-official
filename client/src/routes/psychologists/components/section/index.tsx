"use client"

import { Typography } from "@/components/ui";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  items: Array<{ id: string; label: string }>;
  emptyMessage: string;
}

export function Section({ id, icon, title, items, emptyMessage }: SectionProps) {

  const [isOpen, setIsOpen] = useState(true)

  const toggleContent = () => {
    setIsOpen(!isOpen);
  }

  return (
    <section id={id} className="py-10 px-10 lg:rounded-2xl my-10 bg-white shadow-sm shadow-gray-100">
      <SectionHeader icon={icon} title={title} isOpen={isOpen} toggleContent={toggleContent} />
      {isOpen && (
        <SectionContent>
          <ul className="grid grid-cols-1 gap-4 w-full">
            {items && items.length ? (
              items.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b py-2">
                  <Typography as="p" variant="medium" color="darkGray">
                    {item.label}
                  </Typography>
                </li>
              ))
            ) : (
              <Typography as="p" variant="medium" color="darkGray">
                {emptyMessage}
              </Typography>
            )}
          </ul>
        </SectionContent>
      )}
    </section>
  );
}

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  isOpen: boolean;
  toggleContent: () => void;
}

export const SectionHeader = ({ icon, title, isOpen, toggleContent }: SectionHeaderProps) => {
  return (
    <div
      className="flex items-center justify-between border-b pb-5 border-gray-200 cursor-pointer"
      onClick={toggleContent}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <Typography variant="medium" className="font-bold" as="h3" color="black">
          {title}
        </Typography>
      </div>

      <div>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-gray-300" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-300" />
        )}
      </div>
    </div>
  );
};

export const SectionContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="lg:flex gap-20 mt-10">{children}</div>;
};

