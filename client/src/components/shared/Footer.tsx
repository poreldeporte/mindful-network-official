import { Typography } from "../ui";
import { navigation, resources } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="page-width py-10 flex flex-col lg:flex-row items-start justify-between">
      <div className="mb-10 lg:mb-0">
        <Typography className="" color="black" as="h2" variant="title">
          Mindful Network
        </Typography>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <Typography className="" color="black" as="h2" variant="large">
            Resources
          </Typography>
          <div className="flex flex-col">
            {resources.map((resource) => {
              return (
                <a href={resource.path} className="" key={resource.key}>
                  {resource.title}
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <Typography className="" color="black" as="h2" variant="large">
            Navigation
          </Typography>
          <div className="flex flex-col">
            {navigation.map((navigation) => {
              return (
                <a href={navigation.path} className="" key={navigation.key}>
                  {navigation.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
