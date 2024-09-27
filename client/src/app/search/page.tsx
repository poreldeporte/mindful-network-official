import { Suspense } from "react";
import { SearchWrapper } from "@/routes/search";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";

export default function Search() {
  return (
    <main>
      <Topbar />
      <MobileTopBar />

      <section className="min-h-screen lg:h-screen max-h-max relative mt-10">
        <Suspense fallback={<div>loading...</div>}>
          <SearchWrapper />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
