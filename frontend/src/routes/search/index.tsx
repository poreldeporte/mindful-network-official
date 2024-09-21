import { useSearchParams } from "react-router-dom";

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const resource = searchParams.get("resource");
  const age = searchParams.get("age");

  console.log(resource, age);
  return (
    <section className="page-width">
      <div>Search Page</div>
    </section>
  );
}
