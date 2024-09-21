import { Link } from "react-router-dom";
import { Typography } from "../ui";
import { Searchbar } from "./Searchbar";
import { resources } from "@/lib/constants";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function Topbar() {
  return (
    <header className="fixed top-10 left-1/2 -translate-x-1/2 w-11/12 xl:w-3/4 bg-white rounded-xl overflow-hidden hidden md:block">
      <div className="grid grid-cols-[auto_1fr] p-5 gap-5">
        <Typography
          variant="xlarge"
          as="span"
          color="black"
          className="font-antic font-normal flex items-center"
        >
          The Mindful Network
        </Typography>

        <Searchbar />
      </div>
      <nav className="bg-blue-500 px-5 py-2 flex items-center justify-center gap-5">
        <Link to={"/search"} className="flex items-center">
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
              <Link key={resource.key} to={resource.path}>
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
