<template>
  <div v-if="selectedCharactersStore.length > 0 || 4" class="my-8">
    <v-row>
      <!-- Generar 4 avatares, rellena los vacíos si hay menos de 4 personajes -->
      <v-col v-for="n in 4" :key="n" class="mini-card" cols="3">
        
        <v-tooltip v-if="selectedCharactersStore[n-1]" location="top">
          <template v-slot:activator="{ props }">
            <!-- Si hay un personaje, se muestra el avatar del personaje, si no, un avatar gris vacío -->
            <v-avatar size="80" @click="toggleSelection(selectedCharactersStore[n-1])" v-bind="props">
              <v-img
                :src="selectedCharactersStore[n-1].images.md" 
                alt="Character Image" 
              />
            </v-avatar>
          </template>
          <span>{{ selectedCharactersStore[n-1] ? selectedCharactersStore[n-1].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" size="80"></v-avatar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore"; // Asegúrate de importar la store

export default {
  setup() {
    const selectedCharactersStore = useSelectedCharactersStore(); // Accede a la store de Pinia
    const toggleSelection = (character) => {
      selectedCharactersStore.removeCharacter(character); // Llamas al método para eliminar un personaje
    };

    return {
      selectedCharactersStore: selectedCharactersStore.selectedCharacters, // Asegúrate de pasar el array de personajes
      toggleSelection,
    };
  },
};
</script>
