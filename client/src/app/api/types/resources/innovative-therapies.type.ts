export const allInnovativeTherapiesQuery = `*[_type == 'innovativeTherapy']{
    ..., 
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

export const getInnovativeTherapyById = (id: string) => {
  const query: string = `*[_type == 'innovativeTherapy' && _id == "${id}"]{
    ..., 
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
