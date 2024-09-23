import { Typography } from "../ui";
import { resources } from "@/lib/constants";
import { Button } from "../ui";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function Searchbar() {
  return (
    <div>
      <div className="relative h-12 w-full flex items-center rounded-full overflow-hidden">
        <Button variant="medium" className="rounded-l-full px-4 h-full">
          All <ChevronDownIcon className="h-4 w-4" />
        </Button>
        <input
          className="h-full w-full border border-gray-300 rounded-r-full pl-5"
          type="text"
        />
        <Button
          variant="medium"
          className="absolute rounded-full px-4 right-1 top-1/2 -translate-y-1/2 h-[calc(100%-8px)]"
        >
          SEARCH
        </Button>
      </div>
    </div>
  );
}
