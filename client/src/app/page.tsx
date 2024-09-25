import { GetInTouch } from "@/components/forms";
import { Typography } from "@/components/ui";
import {
  About,
  BlogContainer,
  CTASection,
  Hero,
} from "@/routes/homepage/components";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <BlogContainer />
      <CTASection />
      <GetInTouch />
    </main>
  );
}
