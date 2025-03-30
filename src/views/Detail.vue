<template>
  <v-row v-if="character">
    <v-col cols="4">
      <v-container>
        <Character v-if="character" :character="character" :index="1" :isCharacterPowerBar="false" />
      </v-container>
    </v-col>
    <v-col>
      <v-row>
        <!-- Character biography details -->
        <v-col>
          <v-list>
            <v-list-item class="text-left" :title="'Full Name'"
              :subtitle="character.biography.fullName || 'Unknown'"></v-list-item>
            <v-list-item class="text-left" :title="'Alter Egos'"
              :subtitle="character.biography.alterEgos"></v-list-item>
            <v-list-item class="text-left" :title="'Aliases'"
              :subtitle="character.biography.aliases.join(', ')"></v-list-item>
            <v-list-item class="text-left" :title="'Place of Birth'"
              :subtitle="character.biography.placeOfBirth || 'Unknown'"></v-list-item>
            <v-list-item class="text-left" :title="'Alignment'" :subtitle="character.biography.alignment"></v-list-item>
          </v-list>
        </v-col>

        <!-- Character appearance details -->
        <v-col>
          <v-list>
            <v-list-item class="text-left" :title="'Gender'" :subtitle="character.appearance.gender"></v-list-item>
            <v-list-item class="text-left" :title="'Race'"
              :subtitle="character.appearance.race || 'Unknown'"></v-list-item>
            <v-list-item class="text-left" :title="'Height'"
              :subtitle="character.appearance.height.join(' / ')"></v-list-item>
            <v-list-item class="text-left" :title="'Weight'"
              :subtitle="character.appearance.weight.join(' / ')"></v-list-item>
            <v-list-item class="text-left" :title="'Eye Color'" :subtitle="character.appearance.eyeColor"></v-list-item>
            <v-list-item class="text-left" :title="'Hair Color'"
              :subtitle="character.appearance.hairColor"></v-list-item>
            <v-divider></v-divider>

            <v-list-item class="text-left" :title="'First Appearance'"
              :subtitle="character.biography.firstAppearance"></v-list-item>
            <v-list-item class="text-left" :title="'Publisher'" :subtitle="character.biography.publisher"></v-list-item>
          </v-list>
        </v-col>

        <!-- Character work and connections details -->
        <v-col>
          <v-list>
            <v-list-item class="text-left" :title="'Occupation'" :subtitle="character.work.occupation"></v-list-item>
            <v-list-item class="text-left" :title="'Base'" :subtitle="character.work.base"></v-list-item>

            <v-divider></v-divider>

            <v-list-item class="text-left" :title="'Group Affiliation'"
              :subtitle="character.connections.groupAffiliation"></v-list-item>
            <v-list-item class="text-left" :title="'Relatives'"
              :subtitle="character.connections.relatives"></v-list-item>
          </v-list>
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
