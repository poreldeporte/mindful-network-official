"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PsychologistModel } from "@/models";
import {
  PsychologistAbout,
  ProfileCard,
  GetInTouch,
  NavigationBar,
  ProfileCardLg,
  StickyButton,
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
      fetch(`/api/resources/psychologists/${slug}`)
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

      <div className="min-h-screen page-width lg:grid lg:grid-cols-6 lg:items-start lg:my-56 lg:gap-x-10">
        <div className="lg:col-span-4">
          <NavigationBar />
          <ProfileCardLg {...psychologist}/>
          <ProfileCard {...psychologist} />
          <PsychologistAbout {...psychologist} />
        </div>
        
        <div className="lg:col-span-2 lg:relative h-full">
          <StickyButton />
        </div>
      </div>
      <GetInTouch {...psychologist} />
      <Footer />
    </main>
  );
}
