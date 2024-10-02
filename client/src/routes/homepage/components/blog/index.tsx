import { BlogModel } from "@/models/blog.model";
import { blogPosts } from "@/lib/constants";
import { Typography } from "@/components/ui";
import Image from "next/image";
import React from "react";

const BlogCard = ({ title, description, image, slug }: BlogModel) => {
  return (
    <article className="w-full">
      <a href={slug}>
        <Image
          className="w-full aspect-video object-cover mb-4 rounded-md"
          src={image}
          width={300}
          height={300}
          alt={`${title} image`}
        />
        <Typography color="darkGray" as="h3" variant="small">
          {title}
        </Typography>
        <Typography
          className="mb-2 font-semibold"
          color="black"
          as="h2"
          variant="medium"
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
    <section className="page-width section-y-padding">
      <Typography
        className="mb-20 font-medium leading-tight"
        color="black"
        as="h2"
        variant="title"
      >
        Expert articles and resources <span className="block"></span>to
        <span className="text-green-300"> support your journey</span>
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-5">
        {blogPosts.map((blogPost) => (
          <BlogCard key={blogPost.id} {...blogPost} />
        ))}
      </div>
    </section>
  );
};
