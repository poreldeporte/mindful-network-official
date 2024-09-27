import { Suspense } from "react";
import { SearchWrapper } from "@/routes/search";
import { Footer, Topbar, MobileTopBar } from "@/components/shared";

export default function Search() {
  return (
    <section className="min-h-screen lg:h-screen max-h-max mt-10 relative">
      <Topbar />
      <MobileTopBar />
      <Suspense fallback={<div>loading...</div>}>
        <SearchWrapper />
      </Suspense>
      <Footer />
    </section>
  );
}
