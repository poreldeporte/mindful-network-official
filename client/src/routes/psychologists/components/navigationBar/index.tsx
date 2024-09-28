"use client";

import { useEffect, useState } from "react";
import { psychologistNavigation } from "@/lib/constants";
import { Button } from "@/components/ui";

export function NavigationBar() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="hidden overflow-hidden lg:flex  items-center justify-center fixed bottom-10 left-1/2 -translate-x-1/2 w-11/12 xl:w-3/4 mx-auto z-10">
      <div className="bg-orange-100/60 backdrop-blur rounded-full px-10 py-5 flex items-center justify-between">
        <div>
          {psychologistNavigation.map((link) => {
            const isActive = activeSection === link.key.replace("#", "");
            return (
              <a
                className={`mr-10 ${
                  isActive
                    ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                    : ""
                }`}
                key={link.key}
                href={link.key}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <Button className="p-2 rounded-full" variant="medium">
          Get in Touch
        </Button>
      </div>
    </nav>
  );
}
