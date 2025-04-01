<template>
  <v-app>
    <v-img class="hb-image--splat" :src="splat" alt="splat" />
    <!-- App Bar with Navigation and Components -->
    <v-app-bar app fixed class="hb-app-bar">
      <v-row no-gutters class="align-center justify-center">
        <!-- Button to navigate to the Character List page -->
        <v-col cols="2" md="3">
          <router-link to="/">
            <v-img height=" 50px" :src="logo" alt="logo herobrary" />
          </router-link>
        </v-col>


        <!-- Component to display selected characters -->
        <v-col cols="8" md="4">
          <SelectedCharacters />
        </v-col>

        <!-- Component to display player stats -->
        <v-col cols="2" md="3">
          <PlayerStats />
        </v-col>
      </v-row>
    </v-app-bar>

    <!-- Main content area -->
    <v-main>

      <!-- Main content view where nested routes will be rendered -->
      <div class="py-16">
        <router-view></router-view>
      </div>
    </v-main>

  </v-app>
</template>

<script setup lang="ts">

// Pinia Store: Player Stats
import logo from '@/assets/images/logo.webp';
import splat from '@/assets/images/splat.svg';

// Components
import SelectedCharacters from "@/components/SelectedCharacters.vue";
import PlayerStats from "@/components/PlayerStats.vue";
</script>
