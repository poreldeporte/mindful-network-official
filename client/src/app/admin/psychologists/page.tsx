"use client";
import { Typography } from "@/components/ui";
import Link from "next/link";
import { deleteLocalStorage } from "@/utilities";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { FileUploadContainer } from "@/routes/admin";

export default function Search() {
  const handleClick = () => deleteLocalStorage("token");

  return (
    <main className="h-screen overflow-x-hidden relative grid grid-rows-[auto_1fr] page-width gap-10 items-center">
      <header className="py-10">
        <Link onClick={handleClick} href={"/"}>
          <Typography
            className="mb-2 flex items-center gap-2"
            color="black"
            as="p"
            variant="medium"
          >
            <ArrowLongLeftIcon className="h-7 w-7" />
            Back to home
          </Typography>
        </Link>
      </header>

      <section className="w-full flex flex-col gap-5">
        <Typography
          className=" font-bold"
          color="black"
          as="h1"
          variant="xlarge"
        >
          Create Psychologists Below
        </Typography>

        <FileUploadContainer />
      </section>
    </main>
  );
}
