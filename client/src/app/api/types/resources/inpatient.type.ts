export const allInpatientQuery = `*[_type == 'inpatient']{
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

export const getInpatientById = (id: string) => {
  const query: string = `*[_type == 'inpatient' && _id == "${id}"]{
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
