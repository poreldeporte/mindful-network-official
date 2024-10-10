export const blogQuery = `*[_type == "blog"] | order(_createdAt desc)[0...8] { 
    ...,
    title, 
    description, 
    "slug": slug.current, 
    "featuredImage": featuredImage.asset->url 
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
}: {
	page: number;
	limit: number;
}) => {
	const offset = (page - 1) * limit;

	const coursesQuery = `*[_type == 'blog'] | order(publishedAt desc) [${offset}...${
		offset + limit
	}] {
        _id,
        category,
        title,
        slug,
        "featuredImage": featuredImage.asset->url,
      }`;

	return coursesQuery;
};

export const countBlogsQuery = `count(*[_type == "blog"])`;
