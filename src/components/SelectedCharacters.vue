<template>
  <div v-if="selectedCharacters.length > 0 || 4" class="my-8">
    <v-row>
      <v-col cols="5">
        <v-tooltip v-if="selectedCharacters[0]" location="top">
          <template v-slot:activator="{ props }">
            <v-avatar size="80" @click="toggleSelection(selectedCharacters[0])" v-bind="props" class="hb-avatar-container">
              <v-img :src="selectedCharacters[0].images.md" alt="Character Image" />
              <v-icon v-if="selectedCharacters[0]" class="hb-remove-icon mdi mdi-close" @click.stop="toggleSelection(selectedCharacters[0])" />
            </v-avatar>
          </template>
          <span>{{ selectedCharacters[0] ? selectedCharacters[0].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" size="80"></v-avatar>
      </v-col>
      <v-col class="align-center justify-center d-sm-flex">
        <!-- Mostrar el botón solo si hay dos personajes no nulos y no se ha presionado aún -->
        <v-btn class="permanent-marker-regular" v-if="canFight && !fightButtonPressed" @click="goToCharactersFight">fight</v-btn>
      </v-col>
      <v-col cols="5">
        <v-tooltip v-if="selectedCharacters[1]" location="top">
          <template v-slot:activator="{ props }">
            <v-avatar size="80" @click="toggleSelection(selectedCharacters[1])" v-bind="props" class="hb-avatar-container">
              <v-img :src="selectedCharacters[1].images.md" alt="Character Image" />
              <v-icon v-if="selectedCharacters[1]" class="hb-remove-icon mdi mdi-close" @click.stop="toggleSelection(selectedCharacters[1])" />
            </v-avatar>
          </template>
          <span>{{ selectedCharacters[1] ? selectedCharacters[1].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" size="80"></v-avatar>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue'; // Usar `ref` para manejar estado local
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore"; // Asegúrate de importar la store
import { Character } from '@/models/character.model';

// Accede a la store de Pinia
const selectedCharactersStore = useSelectedCharactersStore();

// Computado para obtener los personajes seleccionados
const selectedCharacters = computed(() => selectedCharactersStore.selectedCharacters);

// Computado para verificar si hay dos personajes no nulos
const canFight = computed(() => {
  return selectedCharacters.value.length === 2 && selectedCharacters.value.every(character => character !== null);
});

// `ref` para controlar si el botón "fight" ha sido presionado
const fightButtonPressed = ref(false);

// Función para alternar la selección de personajes
const toggleSelection = (character: Character) => {
  // Alterna la eliminación de un personaje
  selectedCharactersStore.removeCharacter(character);
};

const router = useRouter();
const goToCharactersFight = () => {
  if (!selectedCharacters.value[0]?.id || !selectedCharacters.value[1]?.id) return;

  // Marca el botón como presionado y navega
  fightButtonPressed.value = true;
  
  // Realiza la navegación al componente de pelea
  router.push({
    name: 'Fight',
    params: { id: selectedCharacters.value[0].id.toString(), vs: selectedCharacters.value[1].id.toString() },
  });
};

// Evento que se activa cuando el componente vuelve a cargarse
router.afterEach((to) => {
  // Solo volvemos a habilitar el botón si no estamos en la vista "Fight"
  if (to.name !== 'Fight') {
    fightButtonPressed.value = false;
  }
});
</script>

