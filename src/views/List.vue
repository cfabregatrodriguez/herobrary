<template>
  <div>
    <!-- Search Filters -->
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="searchQuery" label="Search character..." prepend-inner-icon="mdi-magnify"
          density="compact" clearable @click:clear="clearSearch"></v-text-field>
      </v-col>
      <v-col>
        <v-select v-model="selectedRace" label="Race" :items="races" density="compact" clearable></v-select>
      </v-col>
      <v-col>
        <v-select v-model="selectedAlignment" label="Alignment" :items="alignments" density="compact"
          clearable></v-select>
      </v-col>
      <v-col>
        <v-select v-model="selectedPublisher" label="Publisher" :items="publishers" density="compact"
          clearable></v-select>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-pagination v-model="page" :length="totalPages" :show-prev-next="true" :total-visible="7" class="my-4"
      size="small"></v-pagination>

    <!-- Character List -->
    <v-row>
      <v-col v-for="character in paginatedCharacters" :key="character.id" cols="6" sm="4" md="2" class="pa-1">
        <Character v-if="character" :character="character" :isCharacterPowerBar="false" :isCharacterStats="false"
          :isCharacterBarFight="false" :isCharacterPublisher="false" :compact="true" :index="1" />
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-pagination v-model="page" :length="totalPages" :show-prev-next="true" :total-visible="7" class="my-4"
      size="small"></v-pagination>
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
const selectedRace = ref<string | null>(null); // Selected race filter
const selectedAlignment = ref<string | null>(null); // Selected alignment filter
const selectedPublisher = ref<string | null>(null); // Selected publisher filter

// Filter characters based on search query, race, alignment, and publisher
const filteredCharacters = computed(() => {
  let filtered = characters.value;

  // Search filter
  if (searchQuery.value.trim()) {
    filtered = filtered.filter((character) =>
      character.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Race filter
  if (selectedRace.value) {
    filtered = filtered.filter(
      (character) =>
        character.appearance?.race?.toLowerCase() === selectedRace.value?.toLowerCase()
    );
  }

  // Alignment filter
  if (selectedAlignment.value) {
    filtered = filtered.filter(
      (character) =>
        character.biography?.alignment?.toLowerCase() === selectedAlignment.value?.toLowerCase()
    );
  }

  // Publisher filter
  if (selectedPublisher.value) {
    filtered = filtered.filter(
      (character) =>
        character.biography?.publisher?.toLowerCase() === selectedPublisher.value?.toLowerCase()
    );
  }

  return filtered;
});

// Get unique races
const races = computed(() => {
  const allRaces = characters.value.map((character) => character.appearance?.race).filter(Boolean);
  return Array.from(new Set(allRaces)); // Remove duplicates
});

// Get unique alignments
const alignments = computed(() => {
  const allAlignments = characters.value.map((character) => character.biography?.alignment).filter(Boolean);
  return Array.from(new Set(allAlignments)); // Remove duplicates
});

// Get unique publishers
const publishers = computed(() => {
  const allPublishers = characters.value.map((character) => character.biography?.publisher).filter(Boolean);
  return Array.from(new Set(allPublishers)); // Remove duplicates
});

// Total pages based on filtered characters
const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / itemsPerPage);
});

// Get the characters for the current page
const paginatedCharacters = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = page.value * itemsPerPage;
  return filteredCharacters.value.slice(start, end);
});

// Synchronize filters with URL and reset pagination when filters change
watch(
  [searchQuery, selectedRace, selectedAlignment, selectedPublisher],
  () => {
    page.value = 1; // Reset pagination when any filter changes
    updateQueryParams();
  }
);

// Watch for changes in the page and update the URL query params
watch(
  [page, searchQuery, selectedRace, selectedAlignment, selectedPublisher],
  ([newPage, newSearch, newRace, newAlignment, newPublisher]) => {
    router.replace({
      query: {
        ...route.query,
        page: newPage,
        search: newSearch || undefined,
        race: newRace || undefined,
        alignment: newAlignment || undefined,
        publisher: newPublisher || undefined
      }
    });
  }
);

// Watch for page changes to update query params
watch(page, (newPage) => {
  updateQueryParams();
});

// Function to update the URL with current filters
const updateQueryParams = () => {
  router.replace({
    query: {
      ...route.query,
      page: page.value,
      search: searchQuery.value || undefined,
      race: selectedRace.value || undefined,
      alignment: selectedAlignment.value || undefined,
      publisher: selectedPublisher.value || undefined
    }
  });
};

// Function to clear the search field and reset pagination
const clearSearch = () => {
  searchQuery.value = "";
  page.value = 1;
  router.replace({ query: { page: 1 } });
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
