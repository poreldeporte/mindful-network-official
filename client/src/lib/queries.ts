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
