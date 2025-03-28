<template>
  <div v-if="selectedCharacters.length > 0 || 4" class="w-100">
    <v-row class="ma-0 pa-0">
      <v-col cols="4" class="ma-0 pa-0"></v-col>
      <v-col cols="4">
        <!-- Botón RND para el primer personaje -->
        <v-btn v-if="router.currentRoute.value.name !== 'Fight'" size="x-small" @click="assignRandomCharacter(0)">RND</v-btn>
        <v-tooltip v-if="selectedCharacters[0]" location="top">
          <template v-slot:activator="{ props }">
            <v-avatar size="50" @click="toggleSelection(selectedCharacters[0])" v-bind="props" class="hb-avatar-container">
              <v-img :src="selectedCharacters[0].images.md" alt="Character Image" />
              <v-icon v-if="selectedCharacters[0] && router.currentRoute.value.name !== 'Fight'" class="hb-remove-icon mdi mdi-close" @click.stop="toggleSelection(selectedCharacters[0])" />
            </v-avatar>
          </template>
          <span>{{ selectedCharacters[0] ? selectedCharacters[0].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" size="50"></v-avatar>

        <!-- Botón de pelea -->
        <v-btn 
          class="permanent-marker-regular mx-4" 
          @click="goToCharactersFight" 
          :disabled="!canFight || router.currentRoute.value.name === 'Fight'"
        >
          fight
        </v-btn>

        <!-- Botón RND para el segundo personaje -->
        <v-tooltip v-if="selectedCharacters[1]" location="top">
          <template v-slot:activator="{ props }">
            <v-avatar size="50" @click="toggleSelection(selectedCharacters[1])" v-bind="props" class="hb-avatar-container">
              <v-img :src="selectedCharacters[1].images.md" alt="Character Image" />
              <v-icon v-if="selectedCharacters[1] && router.currentRoute.value.name !== 'Fight'" class="hb-remove-icon mdi mdi-close" @click.stop="toggleSelection(selectedCharacters[1])" />
            </v-avatar>
          </template>
          <span>{{ selectedCharacters[1] ? selectedCharacters[1].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" size="50"></v-avatar>

        <v-btn v-if="router.currentRoute.value.name !== 'Fight'" size="x-small" @click="assignRandomCharacter(1)">RND</v-btn>
      </v-col>
      <v-col cols="4" class="ma-0 pa-0"></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
import { getListCharacters } from "@/services/api"; // Importa la API
import { Character } from '@/models/character.model';

// Accede a la store de Pinia
const selectedCharactersStore = useSelectedCharactersStore();
const router = useRouter();

// Computado para obtener los personajes seleccionados
const selectedCharacters = computed(() => selectedCharactersStore.selectedCharacters);

// Lista de personajes obtenidos de la API
const allCharacters = ref<Character[]>([]);

// Cargar la lista de personajes al montar el componente
onMounted(async () => {
  allCharacters.value = await getListCharacters();
});

// Computado para verificar si hay dos personajes no nulos
const canFight = computed(() => {
  return selectedCharacters.value.length === 2 && selectedCharacters.value.every(character => character !== null);
});

// Función para alternar la selección de personajes
const toggleSelection = (character: Character) => {
  if (router.currentRoute.value.name == 'Fight') return;
  selectedCharactersStore.removeCharacter(character);
};

// Asigna un personaje aleatorio en el índice dado (0 o 1)
const assignRandomCharacter = (index: number) => {
  if (allCharacters.value.length === 0) return;

  // Seleccionar un personaje aleatorio
  const randomIndex = Math.floor(Math.random() * allCharacters.value.length);
  const randomCharacter = allCharacters.value[randomIndex];

  // Evitar duplicados si el otro personaje ya está seleccionado
  if (selectedCharacters.value.some(c => c?.id === randomCharacter.id)) {
    assignRandomCharacter(index); // Vuelve a intentarlo
    return;
  }

  // Agregar el personaje aleatorio en la posición deseada
  selectedCharactersStore.setCharacter(index, randomCharacter);
};

const goToCharactersFight = () => {
  if (!selectedCharacters.value[0]?.id || !selectedCharacters.value[1]?.id) return;
  
  router.push({
    name: 'Fight',
    params: { id: selectedCharacters.value[0].id.toString(), vs: selectedCharacters.value[1].id.toString() },
  });
};
</script>
