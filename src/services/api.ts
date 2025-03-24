export const API_KEY = import.meta.env.VITE_API_KEY;

export async function getListCharacters(batchSize = 10) {
  const characters = [];
  const totalCharacters = 30;

  for (let i = 1; i <= totalCharacters; i += batchSize) {
    const idsBatch = Array.from({ length: batchSize }, (_, j) => i + j).filter(id => id <= totalCharacters);
    const batchRequests = idsBatch.map(id =>
      fetch(`/api/${API_KEY}/${id}`)
        .then(responseBatchRequests => responseBatchRequests.json())
        .then(data => {
          if (data && data.response === 'success' && data.id) {
            return data; // Solo retornar si la respuesta es válida
          }
          return null; // Devolver null si no es válida
        })
        .catch(error => {
          return null; // En caso de error, devolver null
        })
    );

    const resultadosLote = await Promise.all(batchRequests);
    characters.push(...resultadosLote.filter(character => character !== null)); // Filtrar nulos
  }

  return characters;
}