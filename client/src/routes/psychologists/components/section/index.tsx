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
    <section id={id} className="my-10 pb-32 border-b border-gray-300">
      <div className="flex items-center space-x-3 ">
        <BriefcaseIcon className="h-12 w-12"/>
        <Typography variant="xlarge" className="font-bold" as="h3" color="black">
          {title}
        </Typography>
      </div>

      <div className="lg:flex pl-16 gap-20 mt-10">
          {children}
      </div>
    </section>
  );
}
