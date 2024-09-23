import { Typography } from "@/components/ui";
import { Person1, Person2, Person3 } from "@/lib/images";
import { benefits } from "@/lib/constants";

interface BenefitCardProps {
  key: number;
  title: string;
  description: string;
}

const BenefitCard = ({ title, description }: BenefitCardProps) => {
  return (
    <article>
      <Typography className="mb-2 font-bold" color="black" as="h4" variant="medium">
        {title}
      </Typography>

      <Typography className="mb-2" color="darkGray" as="p" variant="medium">
        {description}
      </Typography>
    </article>
  );
};

export function About() {
  return (
    <section className="page-width my-4">
      <div>
        <Typography className="mb-2" color="black" as="h2" variant="subtitle">
          <span className="text-green-300">We' re here to help</span> <span className="block"/>build your support net
        </Typography>

        <Typography className="mb-2 font-semibold" color="black" as="h3" variant="medium">
          Access the most reliable and reputable mental health resources
          available
        </Typography>

        <div className="my-5">
        {benefits.map((benefit) => {
          return (
            <BenefitCard
              key={benefit.key}
              title={benefit.title}
              description={benefit.description}
            />
          );
        })}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <img className="w-full" src={Person1} alt=""></img>
        <img className="w-full" src={Person2} alt=""></img>
        <img className="w-full" src={Person3} alt=""></img>
      </div>
    </section>
  );
}
