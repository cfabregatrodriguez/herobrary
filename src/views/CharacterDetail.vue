<template>
  <v-container v-if="character">
    <v-card
      :class="{'selected': isSelected, 'bg-blue-grey-lighten-4': isSelected}"  
      :style="{ minHeight: '300px', width: '300px', maxWidth: '300px' }">
      <v-img :src="character.images.lg" alt="Character Image"
        cover
        style="height: 200px; width: 100%;"
      ></v-img>
      <div class="rounded-pill bg-brown-darken-3 text-subtitle-2 my-3 d-sm-inline-block px-3 text-white">{{ averagePower }}</div>
      <div class="rounded-pill bg-brown-darken-1 text-subtitle-2 my-3 d-sm-inline-block px-3 text-white">{{ averagePowerReal }}</div>
      <v-card-title>{{ character.name }}</v-card-title>
      <v-card-subtitle>{{ character.biography?.['fullName'] || 'Unknown' }}</v-card-subtitle>
      <v-card-text>
        <v-row class="align-center">
          <v-col cols="2" class="py-1"><v-tooltip activator="parent" location="end">Intelligence</v-tooltip><v-icon color="orange-lighten-2" icon="mdi-brain" /></v-col>
          <v-col cols="10" class="py-1"><v-progress-linear class="rounded-pill" color="orange-lighten-2" :model-value="character.powerstats.intelligence" :height="12"></v-progress-linear></v-col>
        </v-row>
        <v-row class="align-center">
          <v-col cols="2" class="py-1"><v-tooltip activator="parent" location="end">Strength</v-tooltip><v-icon color="red-lighten-1" icon="mdi-weight" /></v-col>
          <v-col cols="10" class="py-1"><v-progress-linear class="rounded-pill" color="red-lighten-1" :model-value="character.powerstats.strength" :height="12"></v-progress-linear></v-col>
        </v-row>
        <v-row class="align-center">
          <v-col cols="2" class="py-1"><v-tooltip activator="parent" location="end">Speed</v-tooltip><v-icon color="blue-lighten-1" icon="mdi-run-fast" /></v-col>
          <v-col cols="10" class="py-1"><v-progress-linear class="rounded-pill" color="blue-lighten-1" :model-value="character.powerstats.speed" :height="12"></v-progress-linear></v-col>
        </v-row>
        <v-row class="align-center">
          <v-col cols="2" class="py-1"><v-tooltip activator="parent" location="end">Durability</v-tooltip><v-icon color="green-darken-1" icon="mdi-wall" /></v-col>
          <v-col cols="10" class="py-1"><v-progress-linear class="rounded-pill" color="green-darken-1" :model-value="character.powerstats.durability" :height="12"></v-progress-linear></v-col>
        </v-row>
        <v-row class="align-center">
          <v-col cols="2" class="py-1"><v-tooltip activator="parent" location="end">Power</v-tooltip><v-icon color="purple-lighten-1" icon="mdi-lightning-bolt-outline" /></v-col>
          <v-col cols="10" class="py-1"><v-progress-linear class="rounded-pill" color="purple-lighten-1" :model-value="character.powerstats.power" :height="12"></v-progress-linear></v-col>
        </v-row>
        <v-row class="align-center">
          <v-col cols="2" class="py-1"><v-tooltip activator="parent" location="end">Combat</v-tooltip><v-icon color="deep-orange-lighten-2" icon="mdi-fencing" /></v-col>
          <v-col cols="10" class="py-1"><v-progress-linear class="rounded-pill" color="deep-orange-lighten-2" :model-value="character.powerstats.combat" :height="12"></v-progress-linear></v-col>
        </v-row>
      </v-card-text>
      <template v-slot:actions>
        <div class="d-flex justify-center align-center w-100">
          <v-btn variant="tonal" @click.stop="toggleSelection(character)">
            <span v-if="isSelected">Remove</span>
            <span v-else>Add to fight</span>    
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-container>

  <div v-else>
    <p>Cargando personaje...</p>
  </div>

  <BarFight />
</template>

<script>
import { defineComponent, onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
import BarFight from "@/components/BarFight.vue";

export default defineComponent({
  name: "CharacterDetail",
  components: {
    BarFight
  },
  setup() {
    const character = ref(null);
    const route = useRoute();
    const characterId = route.params.id;
    const selectedCharactersStore = useSelectedCharactersStore();

    // Calculamos el promedio de los powerstats
    const averagePower = computed(() => {
      if (!character.value) return 0; // Si el personaje aún no está cargado
      const stats = character.value.powerstats;
      const totalPower = 
        stats.intelligence + 
        stats.strength + 
        stats.speed + 
        stats.durability + 
        stats.power + 
        stats.combat;
      const average = totalPower / 6;
      return Math.round(average * 10) / 10;
    });

    const averagePowerReal = computed(() => {
      if (!character.value) return 0;

      const stats = character.value.powerstats;
      let totalPower = 0;
      let count = 0;

      for (const key in stats) {
        if (stats[key] !== null) {
          let value = stats[key];

          // Multiplicadores
          if ((key === "intelligence" || key === "power") && value === 100) {
            value *= 5;
          } else if (value === 100) {
            value *= 4;
          } else if (value > 90) {
            value *= 3;
          }

          totalPower += value;
          count++;
        }
      }

      const average = count > 0 ? totalPower / count : 0;
      return Math.round(average * 10) / 10;
    });

    // Computed para saber si el personaje está seleccionado
    const isSelected = computed(() => {
      return selectedCharactersStore.selectedCharacters.some(
        (selectedCharacter) => selectedCharacter.id === character.value?.id
      );
    });

    onMounted(async () => {
      try {
        const data = await getCharacter(characterId);
        character.value = data; // Asignación correcta
      } catch (error) {
        console.error("Error al obtener el personaje:", error);
      }
    });

    // Función para alternar la selección
    const toggleSelection = (character) => {
      if (isSelected.value) {
        selectedCharactersStore.removeCharacter(character);
      } else {
        selectedCharactersStore.addCharacter(character);
      }
    };

    return {
      character,
      isSelected,
      toggleSelection,
      averagePower,
      averagePowerReal
    };
  }
});
</script>
