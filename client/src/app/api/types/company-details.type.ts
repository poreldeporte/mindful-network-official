export const allCompanyDetailsQuery = `*[_type == "companyDetails"][0] {
    _id,
    "logo": logo.asset->url,
    email,
    phoneNumber,
    address,
    socialLinks
  }`;
