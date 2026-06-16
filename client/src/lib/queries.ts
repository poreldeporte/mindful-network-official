export const blogQuery = `*[_type == "blog"] | order(_createdAt desc)[0...8] { 
    ...,
    title, 
    description, 
    "slug": slug.current, 
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "category": {
      ...category->,
      "slug": category->slug.current
    },
}`;

export const blogByIdQuery = `*[_type == "blog" && slug.current == $slug][0]{
    ...,
    title,
    slug,
    content,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    "authorImage": authorImage.asset->url,
    "authorImageAlt": authorImage.alt,
    seo {
      metaTitle,
      metaDescription,
      "openGraphImage": openGraphImage.asset->url,
      "openGraphImageAlt": openGraphImage.alt
    }
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

  const query = `*[_type == 'blog' ${categoryFilter}] | order(publishDate ${sanitizedOrder}) [${offset}...${offset + limit}] {
      _id,
      "category": {
        ...category->,
        "slug": category->slug.current
      },
      title,
      "slug": slug.current,
      isInternal,
      "featuredImage": featuredImage.asset->url,
      "featuredImageAlt": featuredImage.alt,
    }`;

	return query;
};

// Related posts for the bottom of a blog post: same category as the current
// post (matched by reference, so it works regardless of how category is shaped
// elsewhere), excluding the current post and any external-link posts. Newest
// first, capped at 3. Gives each post inbound internal links — blog posts were
// otherwise cross-link orphans.
export const relatedBlogQuery = `*[
    _type == "blog" &&
    slug.current != $slug &&
    isInternal != false &&
    category._ref == *[_type == "blog" && slug.current == $slug][0].category._ref
  ] | order(publishDate desc)[0...3]{
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt
  }`;

export const countBlogsQuery = `count(*[_type == "blog"])`;

export const AllblogCategories = `*[_type == "blogCategories"]{
  _id,
  title,
  "value": slug.current
}`;
