export const geocodeAddress = async (address: string) => {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`
    );

    if (!response.ok) {
      throw new Error(`Error de red: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      const location = data[0];
      return {
        lat: parseFloat(location.lat),
        lon: parseFloat(location.lon),
      };
    } else {
      console.error(
        "No se encontró ninguna ubicación para la dirección proporcionada."
      );
      return null;
    }
  } catch (error) {
    console.error("Error al obtener la latitud y longitud:", error);
    return null;
  }
};
