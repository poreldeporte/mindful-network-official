import { Typography } from "../ui";
import { navigation, resources } from "@/lib/constants";

export function Footer() {
  return <section>
      <div className="p-10 flex items-start justify-between">
        <div>
          <Typography
            className=""
            color="black"
            as="h2"
            variant="title"
          >
          Mindful Network
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-2">
            <div>
            <Typography
            className=""
            color="black"
            as="h2"
            variant="large"
          >
          Resources
          </Typography>
            <div className="flex flex-col">
              {
                resources.map((resource) => {
                  return <a href={resource.path} className="" key={resource.key}>{resource.title}</a>
                })
              }
            </div>
            </div>
            <div>
            <Typography
            className=""
            color="black"
            as="h2"
            variant="large"
          >
          Navigation
          </Typography>
          <div className="flex flex-col">
              {
                navigation.map((navigation) => {
                  return <a href={navigation.path} className="" key={navigation.key}>{navigation.label}</a>
                })
              }
            </div>
          </div>
        </div>
      </div>
  </section>
}
