<template>
  <v-app>
    <!-- App Bar with Navigation and Components -->
    <v-app-bar app fixed>
      <v-row no-gutters class="align-center justify-center">
        <!-- Button to navigate to the Character List page -->
        <v-col cols="3">
          <v-btn @click="$router.push({ name: 'List' })">
            Characters
          </v-btn>
        </v-col>

        <!-- Component to display selected characters -->
        <v-col cols="6">
          <SelectedCharacters />
        </v-col>

        <!-- Component to display player stats -->
        <v-col cols="3">
          <PlayerStats />
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- Main content area -->
    <v-main>
      <!-- Title with clickable link to homepage -->
      <router-link to="/">
        <h1 class="hb-title permanent-marker-regular">HEROBRARY</h1>
      </router-link>

      <!-- Main content view where nested routes will be rendered -->
      <div class="px-16 pb-16 pt-16">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Pinia Store: Player Stats
import { useStatsPlayerStore } from "@/stores/statsPlayerStore";
const statsPlayerStore = useStatsPlayerStore();

// Components
import SelectedCharacters from "@/components/SelectedCharacters.vue";
import PlayerStats from "@/components/PlayerStats.vue";
</script>
