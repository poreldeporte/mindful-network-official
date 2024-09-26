import { Typography } from "@/components/ui";

interface Props {
  children: React.ReactNode;
  title: string;
}

export function Section({ children, title }: Props) {
  return (
    <section className="my-10 p-5 lg:grid grid-cols-6 lg:gap-10 border-b border-gray-300">
      <div className="lg:col-span-1">
        <Typography variant="large" className="font-bold" as="h3" color="black">
          {title}
        </Typography>
      </div>
      <div className="lg:col-span-5">{children}</div>
    </section>
  );
}
