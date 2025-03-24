<template>
  <v-container>
    <h1 class="text-center">Superhéroes</h1>

    <v-row>
      <v-col
        v-for="character in characters"
        :key="character.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          class="mx-auto"
          :elevation="selectedCharacters.includes(character.id) ? 10 : 2"
          :color="selectedCharacters.includes(character.id) ? 'primary' : 'white'"
          @click="toggleSelection(character.id)"
        >
          <v-img
            :src="character.image.url"
            height="250px"
            cover
          ></v-img>

          <v-card-title>{{ character.name }}</v-card-title>

          <v-card-subtitle>{{ character.biography["full-name"] }}</v-card-subtitle>

          <v-card-text>
            <p><strong>Primera aparición:</strong> {{ character.biography["first-appearance"] }}</p>
            <p><strong>Alineación:</strong> {{ character.biography.alignment }}</p>
          </v-card-text>

          <v-card-actions>
            <v-checkbox
              v-model="selectedCharacters"
              :value="character.id"
              hide-details
            ></v-checkbox>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getListCharacters } from "@/services/api";

export default defineComponent({
  name: "Characters",
  setup() {
    const characters = ref<any[]>([]);
    const selectedCharacters = ref<string[]>([]); // Guarda los IDs de los seleccionados

    onMounted(async () => {
      const data = await getListCharacters();
      if (Array.isArray(data) && data.length > 0 && data[0]?.id) {
        characters.value = data;
      } else {
        console.error("Error en la respuesta de la API o no se encontraron resultados", data);
      }
    });

    const toggleSelection = (id: string) => {
      if (selectedCharacters.value.includes(id)) {
        selectedCharacters.value = selectedCharacters.value.filter((charId) => charId !== id);
      } else {
        selectedCharacters.value.push(id);
      }
    };

    return {
      characters,
      selectedCharacters,
      toggleSelection,
    };
  },
});
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
