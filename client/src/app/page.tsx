import { Typography } from "@/components/ui";
import { About, BlogContainer, Hero } from "@/routes/homepage/components";

export default function Home() {
  return (
    <main className="">
      <Typography className="font-antic" as="h2" color="black" variant="medium">
        Homepage
      </Typography>
      <Hero />
      <About />
      <BlogContainer />
    </main>
  );
}
