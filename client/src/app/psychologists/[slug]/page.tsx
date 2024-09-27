"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PsychologistModel } from "@/models";
import {
  PsychologistAbout,
  ProfileCard,
  GetInTouch,
  NavigationBar,
} from "@/routes/psychologists/components";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";

export default function PsychologistPage() {
  const { slug } = useParams();
  const [psychologist, setPsychologist] = useState<PsychologistModel | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/psychologists/${slug}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch psychologist");
          }
          return response.json();
        })
        .then((data) => setPsychologist(data))
        .catch((err) => setError(err.message));
    }
  }, [slug]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!psychologist) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Topbar />
      <MobileTopBar />

      <div className="min-h-screen page-width lg:my-56">
        <NavigationBar />
        <ProfileCard {...psychologist} />
        <PsychologistAbout {...psychologist} />
        <GetInTouch {...psychologist} />
      </div>
      <Footer />
    </main>
  );
}
