"use client";

import { psychologistNavigation } from "@/lib/constants"
import Link from "next/link"
import { Button, Typography } from "@/components/ui"
import { PsychologistModel } from "@/models";

import { usePathname } from 'next/navigation';

const NavigationBar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between">
      <div>
        {psychologistNavigation.map((link) => {
          const isActive = pathname === link.key;
          return (
            <a
              className={`mr-10 ${isActive ? 'font-bold underline' : ''}`}
              key={link.key}
              href={link.key}
            >
              {link.label}
            </a>
          );
        })}
      </div>
      <Button className="p-2" variant="medium">Get in Touch</Button>
    </nav>
  );
}

export function PsychologistAbout(Props: PsychologistModel ) {
  return (
    <div>
        <NavigationBar />

    </div>
  )
}
