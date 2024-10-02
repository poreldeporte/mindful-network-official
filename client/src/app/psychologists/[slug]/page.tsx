"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PsychologistModel } from "@/models";
import {
  PsychologistAbout,
  ProfileCard,
  GetInTouch,
  NavigationBar,
  StickyButton,
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
          const query = `*[_id == $slug][0]{
            ..., 
            "conditionSpecialty": conditionSpecialty[]->{
              "id": _id,
              name
            },
            "insurances": insurances[]->{
              "id": _id,
              name
            },
            "ageSpecialty": ageSpecialty[]->{
              "id": _id,
              age
            },
            "therapyOptions": therapyOptions[]->{
              "id": _id,
              type
            },
            "image": image.asset->url
          }`;
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

      <div className="min-h-screen mx-auto w-11/12 xl:w-3/4 lg:grid lg:grid-cols-6 lg:items-start lg:my-56 lg:gap-x-10">
        <div className="lg:col-span-4">
          <NavigationBar />
          <ProfileCard {...psychologist} />
          <PsychologistAbout {...psychologist} />
        </div>
        
        <div className="lg:col-span-2 lg:relative h-full">
          <StickyButton />
        </div>
        <GetInTouch {...psychologist} />
      </div>
      
      <Footer />
    </main>
  );
}
