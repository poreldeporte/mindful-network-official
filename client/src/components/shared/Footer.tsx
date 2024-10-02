import { Typography } from "../ui";
import { navigation, resources } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="page-width py-10 flex flex-col lg:flex-row items-start justify-between">
      <div className="mb-10 lg:mb-0">
        <Typography color="black" as="h2" variant="title">
          The Mindful Network
        </Typography>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <Typography color="black" as="h2" variant="medium">
            Resources
          </Typography>
          <div className="flex flex-col">
            {resources.map((resource) => {
              return (
                <a href={resource.path} key={resource.key}>
                  <Typography color="darkGray" as="span" variant="small">
                    {resource.title}
                  </Typography>
                </a>
              );
            })}
          </div>
        </div>
        <div>
          <Typography color="black" as="h2" variant="medium">
            Navigation
          </Typography>
          <div className="flex flex-col">
            {navigation.map((navigation) => {
              return (
                <a href={navigation.path} key={navigation.key}>
                  <Typography color="darkGray" as="span" variant="small">
                    {navigation.label}
                  </Typography>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
