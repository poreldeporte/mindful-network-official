export const blogQuery = `*[_type == "blog"] | order(_createdAt desc)[0...8] { 
    ...,
    title, 
    description, 
    "slug": slug.current, 
    "featuredImage": featuredImage.asset->url,
    "category": {
      ...category->,
      "slug": category->slug.current
    },
}`;

export const blogByIdQuery = `*[_type == "blog" && slug.current == $slug][0]{
    ...,
    title,
    slug,
    body,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "authorImage": authorImage.asset->url,
    metaTitle,
    metaDescription
  }`;

export const blogsWithOffsetQuery = ({
	page = 1,
	limit = 8,
	category = "",
	order = "desc",
}: {
	page: number;
	limit: number;
	category?: string;
	order?: string;
}) => {
	const offset = (page - 1) * limit;
	const categoryFilter = category
		? `&& category->slug.current == "${category}"`
		: "";
	const sanitizedOrder = order === "asc" ? "asc" : "desc";

	const query = `*[_type == 'blog' ${categoryFilter}] | order(publishedAt ${sanitizedOrder}) [${offset}...${offset + limit}] {
      _id,
      "category": {
        ...category->,
        "slug": category->slug.current
      },
      title,
      "slug": slug.current,
      isInternal,
      "featuredImage": featuredImage.asset->url,
    }`;

	return query;
};

export const countBlogsQuery = `count(*[_type == "blog"])`;

export const AllblogCategories = `*[_type == "blogCategories"]{
  _id,
  title,
  "value": slug.current
}`;
