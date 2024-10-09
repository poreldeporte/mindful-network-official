export const allBackerActFacilitiesQuery = `*[_type == 'backerActFacilities']{
    ..., 
    "slug": slug.current,
    "conditionSpecialty": conditionSpecialty[]->{
      "id": _id,
      name
    },
    "insurances": insurances[]->{
      "id": _id,
      name
    },
    "ageSpecialty": ageSpecialty[]->{
      "id": _id,
      age
    },
    "therapyOptions": therapyOptions[]->{
      "id": _id,
      type
    },
    "image": image.asset->url
  }`;

export const getBackerActFacilityById = (id: string) => {
	const query: string = `*[_type == 'backerActFacilities' && _id == "${id}"]{
    ..., 
    "slug": slug.current,
    "conditionSpecialty": conditionSpecialty[]->{
      "id": _id,
      name
    },
    "insurances": insurances[]->{
      "id": _id,
      name
    },
    "ageSpecialty": ageSpecialty[]->{
      "id": _id,
      age
    },
    "therapyOptions": therapyOptions[]->{
      "id": _id,
      type
    },
    "image": image.asset->url
  }`;

	return query;
};
