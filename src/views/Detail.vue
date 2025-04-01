<template>
  <v-row v-if="character" class="text-left align-start justify-start align-md-center justify-md-center">
    <v-col cols="12" sm="6" md="4">
      <v-container class="position-relative hb-animation--slideLeft">
        <div class="hb-detail__backgroundChar"></div>
        <Character v-if="character" :character="character" :index="0" :isCharacterPowerBar="false" />
      </v-container>
    </v-col>
    <v-col>
      <v-row>
        <!-- Character biography details -->
        <v-col cols="12" sm="12" md="4" v-for="(value, title) in character.biography" :key="title">
          <div class="mb-4">
            <div class="text-caption font-weight-bold">{{ title }}</div>
            <div class="opacity-50 text-subtitle-2">{{ value || 'Unknown' }}</div>
          </div>
        </v-col>

        <!-- Character appearance details -->
        <v-col cols="12" sm="12" md="4" v-for="(value, title) in character.appearance" :key="title">
          <div class="mb-4">
            <div class="text-caption font-weight-bold">{{ title }}</div>
            <div class="opacity-50 text-subtitle-2">{{ value || 'Unknown' }}</div>
          </div>
        </v-col>

        <!-- Character work and connections details -->
        <v-col cols="12" sm="12" md="4" v-for="(value, title) in character.work" :key="title">
          <div class="mb-4">
            <div class="text-caption font-weight-bold">{{ title }}</div>
            <div class="opacity-50 text-subtitle-2">{{ value || 'Unknown' }}</div>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="4" v-for="(value, title) in character.connections" :key="title">
          <div class="mb-4">
            <div class="text-caption font-weight-bold">{{ title }}</div>
            <div class="opacity-50 text-subtitle-2">{{ value || 'Unknown' }}</div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <!-- Loading message while character data is being fetched -->
  <div v-else>
    <p>Loading character...</p>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";

// Components
import Character from "@/components/Character.vue";
import { CharacterModel } from '@/models/character.model';

// Reactive variables with stricter types
const character = ref<CharacterModel | null>(null);
const route = useRoute();
const characterId = route.params.id as string;

// Fetch character data when the component is mounted
onMounted(async () => {
  try {
    const data = await getCharacter(characterId);
    if (data && data.id) { // Check if data is valid
      character.value = data;
    } else {
      console.error("Invalid character data");
    }
  } catch (error) {
    console.error("Error fetching character:", error);
  }
});
</script>
