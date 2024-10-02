"use client";

import { resources } from "@/lib/constants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Typography } from "../ui";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Shadcn-select";

export function Topbar() {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  const router = useRouter();

  const handleSelectChange = (value: string) => {
    const selectedResource = resources.find(
      (resource) => resource.title === value
    );
    if (selectedResource) {
      router.push(
        `/search?resource=${encodeURIComponent(
          selectedResource.path.substring(1)
        )}`
      );
    }
  };

  const headerFixed =
    "fixed top-5 left-1/2 -translate-x-1/2 w-11/12 xl:w-3/4 bg-white rounded-xl overflow-hidden hidden lg:block z-50";
  const headerRelative =
    "relative mt-5 mx-auto w-11/12 xl:w-3/4 bg-white rounded-xl overflow-hidden hidden lg:block z-50";

  return (
    <header className={isSearchPage ? headerRelative : headerFixed}>
      <div className="flex items-center justify-between p-5">
        <Typography
          variant="large"
          as="span"
          color="black"
          className="font-antic font-normal flex items-center"
        >
          <Link href={"/"}>The Mindful Network</Link>
        </Typography>

        <Button variant="small" className="py-2 rounded-full px-4">
          <Link href={"/search"}>Start Search</Link>
        </Button>
      </div>

      <nav className="bg-blue-500 px-5 flex items-center justify-center gap-5">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[100px] z-50 bg-blue-500 border-none text-white px-0">
            <SelectValue placeholder="Resources" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Resources</SelectLabel>
              {resources.map((resource) => (
                <SelectItem key={resource.key} value={resource.title}>
                  {resource.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {resources.map((resource, resourceIdx) => {
          if (resourceIdx < 4)
            return (
              <Link
                key={resource.key}
                href={`/search?resource=${encodeURIComponent(
                  resource.path.substring(1)
                )}`}
              >
                <Typography
                  className="flex items-center gap-2"
                  as="span"
                  variant="xsmall"
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
