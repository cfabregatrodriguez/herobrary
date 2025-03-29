<template>
  <v-app>
    <v-app-bar app fixed>
      <v-row no-gutters class="align-center justify-center">
        <v-col cols=" 3">
          <v-btn icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <SelectedCharacters />
        </v-col>
        <v-col cols="3">
          <PlayerStats :playerId="playerId" />
        </v-col>
      </v-row>
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
import { useStatsPlayerStore } from "@/stores/statsPlayerStore";
import SelectedCharacters from "@/components/SelectedCharacters.vue";
import PlayerStats from "@/components/PlayerStats.vue";

// Acceso a la store
const selectedCharactersStore = useSelectedCharactersStore();
const statsPlayerStore = useStatsPlayerStore();

const playerId = statsPlayerStore.playerId || 1;

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