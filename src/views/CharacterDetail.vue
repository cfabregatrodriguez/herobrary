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


  <BarFight 
        :speed=speed
        :penalty=penalty
        :bonus=bonus
        :coloredZones="coloredZones" 
        :minibarraWidth="minibarraWidth" />
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

    // Computed para calcular el ancho de la barra
    const minibarraWidth = computed(() => {
      if (!character.value) return 20;
      const intelligence = character.value.powerstats.intelligence;
      const factor = 3; 
      return Math.max(5, Math.min(50, (100 - intelligence) / factor));
    });

    // Computed para calcular la penalizacion cuando pulsas fuera de las zonas de color
    const penalty = computed(() => {
      if (!character.value) return 4;
      const durability = character.value.powerstats.durability;

      // formula lineal para penalty el valor aumenta cuando la durability es menor
      let penaltyValue = 1 + ((100 - durability) / 90) * 9;
      
      // Aseguramos que penalty no sea mayor que 10
      return penaltyValue > 10 ? 10 : penaltyValue;
    });

    // Computed para calcular el bonus cuando pulsas dentro de las zonas de color
    const bonus = computed(() => {
      if (!character.value) return 1;
      const strength = character.value.powerstats.strength;

      // formula lineal para bonus, el valor de bonus aumenta cuando la strength aumenta
      return 1 + (strength - 30) / 70;
    });

    // Computed para calcular las coloredZones
    // mayor es la caracteristica de combate mayor el numero de zonas
    // mayor es la caracteristica de poder más anchas son las zonas
    const coloredZones = computed(() => {
      if (!character.value) return []; // Si no hay personaje cargado, no generamos zonas

      const combat = character.value.powerstats.combat;
      const power = character.value.powerstats.power;

      const maxTotalWidth = 290; // El máximo ancho permitido para todas las zonas
      let numZones = Math.max(1, Math.floor(combat / 20)); // Número de zonas basado en el valor de combat

      const baseWidthFactor = Math.max(20, power); // El ancho base de cada zona depende de power
      const spaceBetweenFactor = 20; 

      // Calcular el total de espacio que ocuparán las zonas con el ancho base y los espacios entre ellas
      let totalBaseWidth = baseWidthFactor * numZones + spaceBetweenFactor * (numZones - 1);

      // Si el total base excede el máximo, eliminamos zonas hasta que se cumpla la condición
      while (totalBaseWidth > maxTotalWidth && numZones > 1) {
        numZones--; // Eliminamos una zona
        totalBaseWidth = baseWidthFactor * numZones + spaceBetweenFactor * (numZones - 1); // Recalculamos el total
      }

      const widthFactor = baseWidthFactor;

      // Generar las zonas
      let zones = [];
      let start = 10; // Empezamos desde la posición 10

      for (let i = 0; i < numZones; i++) {
        const zoneWidth = i === numZones - 1 ? widthFactor : widthFactor; // La última zona es igual a las anteriores

        // Añadimos la zona con su posición de inicio y su ancho
        zones.push({ start: start, width: zoneWidth });

        // Incrementar el start teniendo en cuenta el ancho de la zona y el espacio entre ellas
        start += zoneWidth + spaceBetweenFactor;
      }

      return zones;
    });


    // Computed para calcular la velocidad de la minibarra
    const speed = computed(() => {
      if (!character.value) return 1; 

      const speedValue = character.value.powerstats.speed;
      const factor = 0.02;
      const expSpeed = Math.exp((75 - speedValue/1.5) * factor); 

      return expSpeed;
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
      averagePowerReal,
      speed,
      penalty,
      bonus,
      coloredZones,
      minibarraWidth
    };
  }
});
</script>
