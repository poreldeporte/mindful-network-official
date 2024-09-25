"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PsychologistModel } from '@/models';
import { PsychologistAbout, ProfileCard } from '@/routes/psychologists/components';


export default function PsychologistPage() {
  const { slug } = useParams(); // Retrieve slug from the dynamic route
  const [psychologist, setPsychologist] = useState<PsychologistModel | null>(null);
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
    <section className='page-width my-56'>
      <ProfileCard {...psychologist}/>

      <PsychologistAbout {...psychologist}/>

      <h2>Insurances Accepted</h2>
      <ul>
        {psychologist.insurances.map((insurance) => (
          <li key={insurance.id}>{insurance.name}</li>
        ))}
      </ul>

      <h2>Age Specialties</h2>
      <ul>
        {psychologist.ageSpecialty.map((specialty) => (
          <li key={specialty.id}>{specialty.age}</li>
        ))}
      </ul>

      <h2>Condition Specialties</h2>
      <ul>
        {psychologist.conditionSpecialty.map((condition) => (
          <li key={condition.id}>{condition.name}</li>
        ))}
      </ul>

      <h2>Therapy Options</h2>
      <ul>
        {psychologist.therapyOptions.map((option) => (
          <li key={option.id}>{option.type}</li>
        ))}
      </ul>
    </section>
  );
}