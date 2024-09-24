import { Typography, Button } from "@/components/ui";

export const Hero = () => {
  const handleTest = (text: string, event: React.MouseEvent): void => {
    console.log(text, event);
  };

  return (
    <section className="page-width mb-20 mt-56 lg:flex items-center justify-center flex-col">
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

      <Button className="mt-4 p-2" variant="medium">
        Start Exploring
      </Button>
    </section>
  );
};
