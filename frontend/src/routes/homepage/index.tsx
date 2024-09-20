import { Typography } from "@/components/ui";
import { Hero, About, BlogContainer } from "./components"

export const HomePage = () => {
  return (
    <section>
      <Typography className="font-antic" as="h2" color="black" variant="medium">
        Homepage
      </Typography>

      <Hero />

      <About /> 

      <BlogContainer />
    </section>
  );
};
