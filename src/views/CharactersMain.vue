<template>
  <div>
    <v-text-field 
        v-model="searchQuery" 
        label="Search character..." 
        prepend-inner-icon="mdi-magnify"
        density="compact"
        clearable
    ></v-text-field>

    <v-pagination
        v-model="page"
        :length="totalPages"
        @input="onPageChange"
        :show-prev-next="true"
        :total-visible="7"
        class="my-4"
        size="small"
    ></v-pagination>

    <v-row>
      <v-col v-for="character in paginatedCharacters" :key="character.id" cols="6" sm="4" md="2" class="pa-1">
        <CharacterCard
          :character="character"
          :isSelected="isSelected(character)"
          :toggleSelection="toggleSelection"
        />
      </v-col>
    </v-row>

    <v-pagination
        v-model="page"
        :length="totalPages"
        @input="onPageChange"
        :show-prev-next="true"
        :total-visible="7"
        class="my-4"
        size="small"
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
import { getListCharacters } from "@/services/api";
import CharacterCard from "@/components/CharacterCard.vue";

// Reactive variables
const characters = ref<any[]>([]);
const page = ref(1);
const itemsPerPage = 24; // Número de elementos por página
const searchQuery = ref(""); // Estado para la búsqueda

// Acceder a la store de Pinia
const selectedCharactersStore = useSelectedCharactersStore();

// Filtrar personajes según el término de búsqueda
const filteredCharacters = computed(() => {
  if (!searchQuery.value.trim()) return characters.value;
  return characters.value.filter(character =>
    character.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Total de páginas basadas en los personajes filtrados
const totalPages = computed(() => {
  return Math.ceil(filteredCharacters.value.length / itemsPerPage);
});

// Filtrar personajes según la página actual
const paginatedCharacters = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = page.value * itemsPerPage;
  return filteredCharacters.value.slice(start, end);
});

// Manejar el cambio de página
const onPageChange = () => {
  console.log("Página actual:", page.value);
};

const toggleSelection = (character: any) => {
  const isSelected = selectedCharactersStore.isCharacterSelected(character);
  if (isSelected) {
    selectedCharactersStore.removeCharacter(character);
  } else {
    selectedCharactersStore.addCharacter(character);
  }
};

const isSelected = (character: any) => {
  return selectedCharactersStore.isCharacterSelected(character);
};

// Cargar los datos de los personajes cuando se monta el componente
onMounted(async () => {
  const data = await getListCharacters();
  if (Array.isArray(data) && data.length > 0) {
    characters.value = data;
  } else {
    console.error("Error en la respuesta de la API o no se encontraron resultados");
  }
});
</script>
