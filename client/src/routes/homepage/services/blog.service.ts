// import { BlogModel } from "@/models/blog.model";
// import { SanityClient } from "@/api";

export const getLatestBlog = async () => {
  try {
    // const query = "";
    // const result: { data: BlogModel[]; status_code: number } =
    //   await SanityClient.fetch(query);
    // if (result.status_code === 200) return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBlogById = async (id: string) => {
  try {
    // const idQuery = id ? ` && id match "*${id}*"` : "";
    // const query = `[_type === blog ${idQuery}]{
    //     ...,
    //     "image": image.asset->url
    // }`;
    // const result: { data: BlogModel[]; status_code: number } =
    //   await SanityClient.fetch(query);
    // if (result.status_code === 200) return result.data;
  } catch (error) {
    console.log(error);
  }
};
