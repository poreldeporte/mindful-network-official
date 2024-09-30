export const findDocumentByName = (array, name) => {
  console.log("=== Array", array);
  console.log("=== name", name);

  return array.find((el) => {
    console.log("=== Element", el);
    const elName = el.name ? el.name.toLowerCase() : "";
    const elType = el.type ? el.type.toLowerCase() : "";
    const elAge = el.age ? el.age.toString().toLowerCase() : "";

    return (
      elName === name.toLowerCase() ||
      elType === name.toLowerCase() ||
      elAge === name.toLowerCase()
    );
  });
};
