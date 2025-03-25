import axios from "axios";

const API_URL = "https://akabab.github.io/superhero-api/api/";

export async function getListCharacters() {
  try {
    const response = await fetch(`${API_URL}all.json`);
    if (!response.ok) {
      throw new Error(`Error al obtener personajes: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getListCharacters:", error);
    return [];
  }
}

export async function getCharacter(id: string) {
    try {
        console.log("Obteniendo personaje con ID:", id); // Verificar que el ID sea correcto

        if (!id) {
            throw new Error("ID de personaje no válido.");
        }

        const response = await fetch(`${API_URL}id/${id}.json`);
        
        if (!response.ok) {
            throw new Error(`Error al obtener detalles: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data) {
            throw new Error("No se encontró el personaje en la API.");
        }
        return data;

    } catch (error) {
        console.error("Error en getCharacter:", error);
        throw error; // Relanzar el error para manejarlo en el componente
    }
}