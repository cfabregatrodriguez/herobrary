<template>
  <v-row>
    <v-col>
      <v-container v-if="character">
          <v-card class="hb-card__detail" :class="{'selected': isSelected, 'bg-blue-grey-darken-2': isSelected}"
            :style="{ minHeight: '300px', width: '300px', maxWidth: '300px' }">
            <v-img :src="character.images.lg" alt="Character Image" cover style="height: 200px; width: 100%;"></v-img>
            <div class="rounded-pill bg-brown-darken-3 text-subtitle-2 my-3 d-sm-inline-block px-3 text-white">{{ averagePower
              }}</div>
            <div class="rounded-pill bg-brown-darken-1 text-subtitle-2 my-3 d-sm-inline-block px-3 text-white">{{
              averagePowerReal }}</div>
            <v-card-title>{{ character.name }}</v-card-title>
            <div class="d-flex justify-center align-center w-100 pb-4">
              <v-btn variant="tonal" size="small" @click.stop="toggleSelection(character)">
                <span v-if="isSelected">Remove</span>
                <span v-else>Add to fight</span>
              </v-btn>
            </div>
            <v-card-text>
              <BarStat stat="Intelligence" icon="mdi-brain" color="orange-lighten-2" :value="character.powerstats.intelligence" />
              <BarStat stat="Strength" icon="mdi-weight" color="red-lighten-1" :value="character.powerstats.strength" />
              <BarStat stat="Speed" icon="mdi-run-fast" color="blue-lighten-1" :value="character.powerstats.speed" />
              <BarStat stat="Durability" icon="mdi-wall" color="green-darken-1" :value="character.powerstats.durability" />
              <BarStat stat="Power" icon="mdi-lightning-bolt-outline" color="purple-lighten-1" :value="character.powerstats.power" />
              <BarStat stat="Combat" icon="mdi-fencing" color="deep-orange-lighten-2" :value="character.powerstats.combat" />
            </v-card-text>
            <v-card-subtitle class="py-2">{{ character.biography?.['fullName'] || 'Unknown' }}</v-card-subtitle>
          </v-card>
        </v-container>
        <div v-else>
          <p>Loading character...</p>
        </div>
    </v-col>
  </v-row>
  

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
import BarFight from "@/components/BarFight.vue";
import BarStat from "@/components/BarStat.vue";
import EnergyBall from "@/components/EnergyBall.vue";
import { Character } from '@/models/character.model';


// Variables reactivas con tipos más estrictos
const character = ref<Character | null>(null);
const route = useRoute();
const characterId = route.params.id as string;
const selectedCharactersStore = useSelectedCharactersStore();
const counter = ref(0);

// Escuchar el evento de actualización del contador
const updateCounter = (newCounterValue: number) => {
  counter.value = newCounterValue;
};

// Calculamos el promedio de los powerstats
const averagePower = computed(() => {
  if (!character.value) return 0;
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

// Cálculo del promedio real ajustado
const averagePowerReal = computed(() => {
  if (!character.value) return 0;

  const stats = character.value.powerstats;
  let totalPower = 0;
  let count = 0;

  for (const key in stats) {
    if (stats[key] !== null) {
      let value = stats[key];

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

  // Computado para saber si el personaje está seleccionado
  const isSelected = computed(() => {
    return selectedCharactersStore.selectedCharacters.some(
      (selectedCharacter) => selectedCharacter.id === character.value?.id
    );
  });

// Obtener los datos del personaje al montar el componente
onMounted(async () => {
  try {
    const data = await getCharacter(characterId);
    if (data && data.id) { // Verificamos que los datos tienen la estructura esperada
      character.value = data;
    } else {
      console.error("Datos del personaje no válidos");
    }
  } catch (error) {
    console.error("Error al obtener el personaje:", error);
  }
});

// Alternar la selección
const toggleSelection = (character: Character) => {
  if (isSelected.value) {
    selectedCharactersStore.removeCharacter(character);
  } else {
    selectedCharactersStore.addCharacter(character);
  }
};

</script>
