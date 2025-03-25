<template>
  <div v-if="selectedCharacters.length > 0 || 4" class="my-8">
    <v-row>
      <!-- Generar 4 avatares, rellena los vacíos si hay menos de 4 personajes -->
      <v-col v-for="n in 4" :key="n" class="mini-card" cols="3">
        
        <v-tooltip v-if="selectedCharacters[n-1]" location="top">
          <template v-slot:activator="{ props }">
            <!-- Si hay un personaje, se muestra el avatar del personaje, si no, un avatar gris vacío -->
            <v-avatar size="80" @click="toggleSelection(selectedCharacters[n-1])" v-bind="props">
              <v-img
                :src="selectedCharacters[n-1].images.md" 
                alt="Character Image" 
              />
            </v-avatar>
          </template>
          <span>{{ selectedCharacters[n-1] ? selectedCharacters[n-1].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" size="80"></v-avatar>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'; // Asegúrate de importar `computed`
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore"; // Asegúrate de importar la store
import { Character } from '@/models/character.model';

// Accede a la store de Pinia
const selectedCharactersStore = useSelectedCharactersStore();

// Computado para obtener los personajes seleccionados
const selectedCharacters = computed(() => selectedCharactersStore.selectedCharacters);

// Función para alternar la selección de personajes
const toggleSelection = (character: Character) => {
  // Alterna la eliminación de un personaje
  selectedCharactersStore.removeCharacter(character);
};
</script>
