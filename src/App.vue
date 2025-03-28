<template>
  <v-app>

    <v-app-bar app fixed>
      <SelectedCharacters :selectedCharacters="selectedCharactersStore.selectedCharacters"
        :toggleSelection="toggleSelection" />
    </v-app-bar>

    <v-main>
      <router-link to="/">
        <h1 class="hb-title permanent-marker-regular">HEROBRARY</h1>
      </router-link>
      <div class="px-16 pb-16 pt-16">
          <router-view></router-view>
      </div>
    </v-main>

  </v-app>
</template>

<script setup lang="ts">
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
import SelectedCharacters from "@/components/SelectedCharacters.vue";

// Acceso a la store
const selectedCharactersStore = useSelectedCharactersStore();

// Función para alternar la selección de personajes
const toggleSelection = (character: any) => {
  const isSelected = selectedCharactersStore.isCharacterSelected(character);
  if (isSelected) {
    selectedCharactersStore.removeCharacter(character);
  } else {
    selectedCharactersStore.addCharacter(character);
  }
};
</script>