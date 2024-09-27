"use client";

import Link from "next/link";
import { Typography } from "../ui";
import { Searchbar } from "./Searchbar";
import { resources } from "@/lib/constants";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { Button } from "../ui";

export function Topbar() {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  const headerFixed =
    "fixed top-5 left-1/2 -translate-x-1/2 w-11/12 xl:w-3/4 bg-white rounded-xl overflow-hidden hidden md:block z-50";
  const headerRelative =
    "relative mt-5 mx-auto w-11/12 xl:w-3/4 bg-white rounded-xl overflow-hidden hidden md:block z-50";

  return (
    <header className={isSearchPage ? headerRelative : headerFixed}>
      <div className="flex items-center justify-between p-5">
        <Typography
          variant="xlarge"
          as="span"
          color="black"
          className="font-antic font-normal flex items-center"
        >
          <Link href={"/"}>The Mindful Network</Link>
        </Typography>

        {/*<Searchbar />*/}
        <Button
          variant="medium"
          className="py-2 rounded-full px-4"
        >
          <Link href={"/search"}>Start Search</Link>
        </Button>
      </div>
      <nav className="bg-blue-500 px-5 py-2 flex items-center justify-center gap-5">
        <Link href={"/search"} className="flex items-center">
          <Typography
            className="flex items-center gap-2"
            as="span"
            variant="small"
            color="white"
          >
            All resources <ChevronDownIcon className="h-4 w-4" />
          </Typography>
        </Link>

        {resources.map((resource, resourceIdx) => {
          if (resourceIdx < 4)
            return (
              <Link key={resource.key} href={resource.path}>
                <Typography
                  className="flex items-center gap-2"
                  as="span"
                  variant="small"
                  color="white"
                >
                  {resource.title}
                </Typography>
              </Link>
            );
        })}
      </nav>
    </header>
  );
}
