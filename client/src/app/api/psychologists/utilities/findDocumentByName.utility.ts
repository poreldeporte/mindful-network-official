export const findDocumentByName = (array, name) =>
  array.find((el) => el.name.toLowerCase() === name.toLowerCase());
