import { Suspense } from "react";
import { SearchWrapper } from "@/routes/search";

export default function Search() {
  return (
    <section className="min-h-screen lg:h-screen max-h-max mt-10 relative">
      <Suspense fallback={<div>loading...</div>}>
        <SearchWrapper />
      </Suspense>
    </section>
  );
}
