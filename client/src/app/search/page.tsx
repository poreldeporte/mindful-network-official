import { MapComponent } from "@/components/shared";
import { PsychologistModel } from "@/models";
import { SidePanel } from "@/routes/search";
import { getAllPsychologists } from "@/services/psychologist.service";
import { getAllConditions } from "@/services/condition-specialties.service";

export default async function Search() {
  const psychologists: PsychologistModel[] = await getAllPsychologists();
  const conditions: any = await getAllConditions();

  console.log(conditions);

  return (
    <>
      <section className="h-screen mt-10 relative">
        <SidePanel psychologists={psychologists} />
        <MapComponent
          position={[34.0522, -118.2437]}
          className="h-full w-full"
        />
      </section>
    </>
  );
}
