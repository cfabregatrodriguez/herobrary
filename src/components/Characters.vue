<template>
  <div>
    <h1>Superheroes</h1>
    <ul>
      <li v-for="character in characters" :key="character.id">
        <h3>{{ character.name }}</h3>
        <img :src="character.image.url" alt="Character Image" />
        <p><strong>Full name:</strong> {{ character.biography["full-name"] }}</p>
        <p><strong>First appearance:</strong> {{ character.biography["first-appearance"] }}</p>
        <p><strong>Alignment:</strong> {{ character.biography.alignment }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getListCharacters } from "@/services/api";

export default defineComponent({
  name: "Characters",
  setup() {
    const characters = ref<any[]>([]);

    onMounted(async () => {
        const data = await getListCharacters();

        // Si data es un array válido y tiene al menos un elemento
        if (Array.isArray(data) && data.length > 0 && data[0]?.id) {
            characters.value = data; // Asigna los datos correctamente
        } else {
            console.error('Error en la respuesta de la API o no se encontraron resultados', data);
        }
    });

    return {
      characters,
    };
  },
});
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>