import { BlogModel } from "@/models/blog.model";

const BlogCard = () => {
  return <div>BlogCard</div>;
};

interface Props {
  posts?: BlogModel[] | null;
}

export function BlogContainer({ posts }: Props) {
  return (
    <section>
      This is the blog
      {posts && posts.length ? <BlogCard /> : ""}
    </section>
  );
}
