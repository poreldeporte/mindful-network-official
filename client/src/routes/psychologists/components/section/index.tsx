import { Typography } from "@/components/ui";
import { BriefcaseIcon } from "@heroicons/react/24/outline";

interface Props {
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  title: string;
}

export function Section({ children, title, id }: Props) {
  return (
    <section id={id} className="py-10 px-10 lg:py-28 rounded-2xl my-10 bg-white border border-gray-100 shadow-sm shadow-gray-100">
      <div className="flex items-center space-x-3 ">
        <BriefcaseIcon className="h-12 w-12" />
        <Typography
          variant="xlarge"
          className="font-bold"
          as="h3"
          color="black"
        >
          {title}
        </Typography>
      </div>

      <div className="lg:flex pl-16 gap-20 mt-10">{children}</div>
    </section>
  );
}
