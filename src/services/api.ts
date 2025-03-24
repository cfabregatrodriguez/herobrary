const API_URL = "https://akabab.github.io/superhero-api/api/all.json";

export async function getListCharacters() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error al obtener personajes: ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((character: any) => ({
      id: character.id,
      name: character.name,
      image: character.images.md, // Imagen en tamaño medio
      imagexs: character.images.xs, // Imagen en tamaño pequeño
    }));
  } catch (error) {
    console.error("Error en getListCharacters:", error);
    return [];
  }
}