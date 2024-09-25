import { Footer, Topbar } from "@/components/shared";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mindful Network - Search",
  description: "",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
