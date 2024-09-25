import { BlogModel } from "@/models/blog.model";
import { blogPosts } from "@/lib/constants";
import { Typography } from "@/components/ui";
import Image from "next/image";
import React from "react";

const BlogCard = ({ title, description, image, slug }: BlogModel) => {
  return (
    <article>
      <a href={slug}>
        <Image
          className="w-full aspect-video h-auto object-cover mb-4"
          src={image}
          width={400}
          height={200}
          alt="Picture of the author"
        />
        <Typography className="mb-2" color="black" as="h4" variant="medium">
          {title}
        </Typography>
        <Typography
          className="mb-2 font-semibold"
          color="black"
          as="h2"
          variant="xlarge"
        >
          {description}
        </Typography>
      </a>
    </article>
  );
};

interface Props {
  posts?: BlogModel[] | null;
}

export const BlogContainer: React.FC<Props> = () => {
  return (
    <section className="page-width my-32 lg:my-56">
      <Typography
        className="mb-10 font-bold"
        color="black"
        as="h4"
        variant="title"
      >
        Expert articles and resources <span className="block"></span>to
        <span className="text-green-300"> support your journey</span>
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {blogPosts.map((blogPost) => (
          <BlogCard key={blogPost.id} {...blogPost} />
        ))}
      </div>
    </section>
  );
};
