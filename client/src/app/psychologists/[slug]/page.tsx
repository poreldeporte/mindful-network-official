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
import { sanityClient } from "@/api";
import { getPsychologistsAdapter } from "@/adapters";

export default function PsychologistPage() {
  const { slug } = useParams();
  const [psychologist, setPsychologist] = useState<PsychologistModel | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (slug) {
        try {
          const query = `*[_id == $slug][0]`;
          const data = await sanityClient.fetch(query, { slug });
          const adaptedData = getPsychologistsAdapter(data);

          if (adaptedData) setPsychologist(adaptedData);
        } catch (error) {
          console.log(error);
          setError(error);
        }
      }
    };
    fetchData();
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
