<template>
  <div>
    <!-- Search Filters -->
    <v-row>
      <v-col cols="6">
        <v-text-field bg-color="white" v-model="searchQuery" label="Search character..."
          prepend-inner-icon="mdi-magnify" density="compact" clearable @click:clear="clearSearch"></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete bg-color="white" flat v-model="selectedRace" label="Race" :items="races" density="compact"
          clearable theme="default"></v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete bg-color="white" v-model="selectedAlignment" label="Alignment" :items="alignments"
          density="compact" clearable></v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete bg-color="white" v-model="selectedPublisher" label="Publisher" :items="publishers"
          density="compact" clearable></v-autocomplete>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-pagination v-model="page" density="compact" :length="totalPages" :show-prev-next="true" :total-visible="7"
      class="my-8" size="small"></v-pagination>

    <!-- Character List -->
    <v-row>
      <v-col v-for="character in paginatedCharacters" :key="character.id" cols="6" sm="4" md="3" lg="2" class="pa-1">
        <Character v-if="character" :character="character" :isCharacterPowerBar="false" :isCharacterStats="false"
          :isCharacterBarFight="false" :isCharacterPublisher="false" :compact="true" :index="1" />
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-pagination v-model="page" density="compact" :length="totalPages" :show-prev-next="true" :total-visible="7"
      class="my-8" size="small"></v-pagination>
  </div>
</template>

<script setup lang="ts">
// Vue & Router Imports
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getListCharacters } from "@/services/api";

// Components
import Character from "@/components/Character.vue";

// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';

const route = useRoute();
const router = useRouter();

// Reactive Variables
const characters = ref<any[]>([]); // Holds all fetched characters
const page = ref(Number(route.query.page) || 1); // Current page for pagination
const itemsPerPage = 24; // Number of items per page
const searchQuery = ref(route.query.search ? String(route.query.search) : ""); // Search query
const selectedRace = ref(route.query.race ? String(route.query.race) : null); // Selected race filter
const selectedAlignment = ref(route.query.alignment ? String(route.query.alignment) : null); // Selected alignment filter
const selectedPublisher = ref(route.query.publisher ? String(route.query.publisher) : null); // Selected publisher filter

// Filter characters based on search query, race, alignment, and publisher
const filteredCharacters = computed(() => {
  let filtered = characters.value;

  if (searchQuery.value.trim()) {
    filtered = filtered.filter((character) =>
      character.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  if (selectedRace.value) {
    filtered = filtered.filter(
      (character) =>
        character.appearance?.race?.toLowerCase() === selectedRace.value?.toLowerCase()
    );
  }
  if (selectedAlignment.value) {
    filtered = filtered.filter(
      (character) =>
        character.biography?.alignment?.toLowerCase() === selectedAlignment.value?.toLowerCase()
    );
  }
  if (selectedPublisher.value) {
    filtered = filtered.filter(
      (character) =>
        character.biography?.publisher?.toLowerCase() === selectedPublisher.value?.toLowerCase()
    );
  }
  return filtered;
});

// Get unique races, alignments, and publishers sorted alphabetically
const races = computed(() => {
  return Array.from(new Set(characters.value.map(c => c.appearance?.race).filter(Boolean))).sort();
});
const alignments = computed(() => {
  return Array.from(new Set(characters.value.map(c => c.biography?.alignment).filter(Boolean))).sort();
});
const publishers = computed(() => {
  return Array.from(new Set(characters.value.map(c => c.biography?.publisher).filter(Boolean))).sort();
});

// Total pages based on filtered characters
const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / itemsPerPage);
});

// Get the characters for the current page
const paginatedCharacters = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return filteredCharacters.value.slice(start, start + itemsPerPage);
});

// Synchronize filters with URL
watch([searchQuery, selectedRace, selectedAlignment, selectedPublisher], () => {
  page.value = 1; // Reset de paginación
  updateQueryParams(); // Actualiza la URL con los nuevos parámetros
});

function updateQueryParams() {
  router.replace({
    query: {
      page: page.value,
      search: searchQuery.value || undefined,
      race: selectedRace.value || undefined,
      alignment: selectedAlignment.value || undefined,
      publisher: selectedPublisher.value || undefined
    }
  });
}

// Function to clear the search field and reset pagination
const clearSearch = () => {
  searchQuery.value = "";
  page.value = 1;
  updateQueryParams();
};

// Function to load characters from the API
onMounted(async () => {
  const countdownStore = useCountdownStore();
  countdownStore.isCountdownActive = false;

  const data = await getListCharacters();
  if (Array.isArray(data) && data.length > 0) {
    characters.value = data;
  } else {
    console.error("Error in API response or no results found");
  }
});
</script>
