import { useEffect, useState } from "react";
import { Typography } from "@/components/ui";
import { getLatestBlog } from "./services";
import { BlogModel } from "@/models/blog.model";
import { getLatestBlogsAdapter } from "./adapters";
import { BlogContainer } from "./components/blog";

export const HomePage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogModel[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const blogs = await getLatestBlog();
      const result = getLatestBlogsAdapter(blogs);
      if (result) setBlogPosts(result);
    };

    getData();
  }, []);

  return (
    <section>
      <Typography className="font-antic" as="h2" color="black" variant="h1">
        Homepage
      </Typography>

      <BlogContainer posts={blogPosts} />
    </section>
  );
};
