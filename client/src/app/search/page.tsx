import { Typography } from "@/components/ui";
import { MapComponent } from "@/components/shared";

export default function Search() {
  return (
    <main className="">
      <section className="h-screen bg-orange-200 mt-60">
        <Typography
          className="font-antic"
          as="h2"
          color="black"
          variant="medium"
        >
          Search component
        </Typography>

        <MapComponent
          position={[34.0522, -118.2437]}
          className="h-full w-full"
        />
      </section>
    </main>
  );
}
