export const formatAddress = (fullAddress: string) => {
  const addressRegex = /^(.+),\s*([A-Z\s]+),\s*([A-Z]{2})\s*(\d{5}(-\d{4})?)$/;
  const match = fullAddress.match(addressRegex);

  if (!match) {
    throw new Error("Dirección no válida");
  }

  const [_, address, city, state, zip] = match;

  return {
    address: address.trim(),
    city: city.trim(),
    state: state.trim(),
    zip: zip.trim(),
  };
};
