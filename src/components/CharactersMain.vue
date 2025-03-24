<template>
  <div>
    <h1>Superheroes</h1>
    
    <SelectedCharacters 
        :selectedCharacters="selectedCharacters" 
        :toggleSelection="toggleSelection" 
    />

    <v-pagination
        v-model="page"
        :length="totalPages"
        @input="onPageChange"
        :show-prev-next="true"
        :total-visible="7"
        class="my-4"
    ></v-pagination>

    <v-row>
      <v-col v-for="character in paginatedCharacters" :key="character.id" cols="6" sm="4" md="2">
        <CharacterCard
          :character="character"
          :isSelected="isSelected(character)"
          :toggleSelection="toggleSelection"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from "vue";
import { getListCharacters } from "@/services/api";
import CharacterCard from "@/components/CharacterCard.vue";
import SelectedCharacters from "@/components/SelectedCharacters.vue";

export default defineComponent({
    name: "CharacterList",
    components: {
        CharacterCard,
        SelectedCharacters,
    },
    setup() {
        const characters = ref<any[]>([]);
        const selectedCharacters = ref([]);
        const page = ref(1);
        const itemsPerPage = 20; // Número de elementos por página

        // Total de páginas
        const totalPages = computed(() => {
            return Math.ceil(characters.value.length / itemsPerPage);
        });

         // Filtrar personajes según la página actual
        const paginatedCharacters = computed(() => {
            const start = (page.value - 1) * itemsPerPage;
            const end = page.value * itemsPerPage;
            return characters.value.slice(start, end);
        });

        // Manejar el cambio de página
        const onPageChange = () => {
            console.log("Página actual:", page.value);
        };

        const toggleSelection = (character) => {
            // Verificamos si el personaje ya está seleccionado
            const index = selectedCharacters.value.indexOf(character);
            if (index > -1) {
                // Si el personaje ya está seleccionado, lo eliminamos
                selectedCharacters.value.splice(index, 1);
            } else {
                // Si no está seleccionado, lo agregamos
                if (selectedCharacters.value.length < 4) {
                selectedCharacters.value.push(character);
                } else {
                alert("Solo puedes seleccionar hasta 4 personajes.");
                }
            }
        };

        const isSelected = (character: any) => {
            return selectedCharacters.value.includes(character);
        };

        onMounted(async () => {
            const data = await getListCharacters();
            console.log("datos recibidos en characterMain: ", data);  // Agrega este log para ver qué datos estás recibiendo
            if (Array.isArray(data) && data.length > 0) {
                characters.value = data;
            } else {
                console.error("Error en la respuesta de la API o no se encontraron resultados");
            }
        });

        return {
            selectedCharacters,
            toggleSelection,
            isSelected,
            page,
            totalPages,
            paginatedCharacters,
            onPageChange
        };
    },
});
</script>