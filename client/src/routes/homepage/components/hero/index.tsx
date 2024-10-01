import { Typography } from "@/components/ui";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="page-width h-[60vh] lg:h-[90vh] flex items-center justify-center flex-col">
      <Typography
        className="font-antic my-4"
        as="h1"
        color="black"
        variant="title"
      >
        A network curated for your{" "}
        <span className="text-green-300">path to healing</span>
      </Typography>

      <Typography className="mb-2" as="p" color="darkGray" variant="medium">
        Explore our mindfully curated network of trusted mental health resources
        to find the support you need, when you need it.
      </Typography>

      <Link href={"/search"} className="mt-4 py-2 px-4 rounded-xl bg-blue-500">
        <Typography as="span" variant={"medium"} color="white">
          Start Exploring
        </Typography>
      </Link>
    </section>
  );
};
