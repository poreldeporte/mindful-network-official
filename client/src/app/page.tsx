import { GetInTouch } from "@/components/forms";
import {
  About,
  BlogContainer,
  CTASection,
  Hero,
} from "@/routes/homepage/components";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";

export default function Home() {
  return (
    <main>
      <Topbar />
      <MobileTopBar />
      <Hero />
      <About />
      <BlogContainer />
      <CTASection />
      <GetInTouch />
      <Footer />
    </main>
  );
}
