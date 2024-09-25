import { Footer, Topbar, MobileTopBar } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mindful Network - Psychologist",
  description: "",
};

export default function PsychologistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
