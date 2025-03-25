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
        <BarStat stat="Intelligence" icon="mdi-brain" color="orange-lighten-2" :value="character.powerstats.intelligence"/>
        <BarStat stat="Strength" icon="mdi-weight" color="red-lighten-1" :value="character.powerstats.strength"/>
        <BarStat stat="Speed" icon="mdi-run-fast" color="blue-lighten-1" :value="character.powerstats.speed"/>
        <BarStat stat="Durability" icon="mdi-wall" color="green-darken-1" :value="character.powerstats.durability"/>
        <BarStat stat="Power" icon="mdi-lightning-bolt-outline" color="purple-lighten-1" :value="character.powerstats.power"/>
        <BarStat stat="Combat" icon="mdi-fencing" color="deep-orange-lighten-2" :value="character.powerstats.combat"/>
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

  <BarFight 
        :speed="speed"
        :penalty="penalty"
        :bonus="bonus"
        :coloredZones="coloredZones" 
        :minibarWidth="minibarWidth" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
import BarFight from "@/components/BarFight.vue";
import BarStat from "@/components/BarStat.vue";

// Definimos la interfaz para un personaje
interface Character {
  id: string;
  name: string;
  images: { lg: string };
  biography: { fullName: string | null };
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
}

// Variables reactivas con tipos más estrictos
const character = ref<Character | null>(null);
const route = useRoute();
const characterId = route.params.id as string;
const selectedCharactersStore = useSelectedCharactersStore();

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

// Otros computados
const minibarWidth = computed(() => {
  if (!character.value) return 20;
  const intelligence = character.value.powerstats.intelligence;
  const factor = 3; 
  return Math.max(5, Math.min(20, (100 - intelligence) / factor));
});

const penalty = computed(() => {
  if (!character.value) return 4;
  const durability = character.value.powerstats.durability;
  let penaltyValue = 1 + ((100 - durability) / 90) * 9;
  return penaltyValue > 10 ? 10 : penaltyValue;
});

const bonus = computed(() => {
  if (!character.value) return 1;
  const strength = character.value.powerstats.strength;
  return 1 + (strength - 30) / 70;
});

const coloredZones = computed(() => {
  if (!character.value) return [];

  const combat = character.value.powerstats.combat;
  const power = character.value.powerstats.power;

  const maxTotalWidth = 290;
  let numZones = Math.max(1, Math.floor(combat / 20));
  const baseWidthFactor = Math.max(20, power);
  const spaceBetweenFactor = 20;

  let totalBaseWidth = baseWidthFactor * numZones + spaceBetweenFactor * (numZones - 1);

  while (totalBaseWidth > maxTotalWidth && numZones > 1) {
    numZones--;
    totalBaseWidth = baseWidthFactor * numZones + spaceBetweenFactor * (numZones - 1);
  }

  const widthFactor = baseWidthFactor;
  let zones = [];
  let start = 10;

  for (let i = 0; i < numZones; i++) {
    const zoneWidth = i === numZones - 1 ? widthFactor : widthFactor;
    zones.push({ start: start, width: zoneWidth });
    start += zoneWidth + spaceBetweenFactor;
  }

  return zones;
});

const speed = computed(() => {
  if (!character.value) return 1; 
  const speedValue = character.value.powerstats.speed;
  const factor = 0.02;
  return Math.exp((75 - speedValue / 1.5) * factor);
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
    character.value = data;
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
