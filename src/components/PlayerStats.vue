<template>
  <div>
    <v-row class="align-center justify-center" no-gutters>
      <!-- Chip de victorias -->
      <v-chip prepend-icon="mdi-check-bold" class="ma-2" color="green">
        {{ wins }} Wins
      </v-chip>

      <!-- Chip de derrotas -->
      <v-chip prepend-icon="mdi-close-thick" class="ma-2" color="red">
        {{ loses }} Loses
      </v-chip>

      <!-- Avatar del jugador -->
      <v-avatar>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>

      <!-- Botón para abrir el dialog de batallas -->
      <v-btn color="primary" @click="dialog = true">
        History
      </v-btn>
    </v-row>

    <!-- Dialog de batallas -->
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="400" scrollable>
      <v-toolbar>
        <v-btn icon="mdi-close" @click="dialog = false"></v-btn>

        <v-toolbar-title>History Battles</v-toolbar-title>

      </v-toolbar>
      <v-card>
        <v-card-text>
          <v-list dense>
            <v-item-group v-if="battles.length">
              <v-list-item v-for="(battle, index) in battles" :key="index">
                <v-list-item-title>
                  <strong>Batalla {{ index + 1 }}</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-row class="align-center">
                    <v-col>
                      <!-- Avatar del jugador -->
                      <v-avatar size="30px">
                        <img :src="battle.characterAvatar" alt="Character Avatar" />
                      </v-avatar>
                      vs
                      <!-- Avatar del enemigo -->
                      <v-avatar size="30px">
                        <img :src="battle.enemyCharacterAvatar" alt="Enemy Avatar" />
                      </v-avatar>
                    </v-col>
                    <v-col>
                      {{ Math.round(battle.playerEnergy) }} vs {{ Math.round(battle.enemyEnergy) }}
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item>
            </v-item-group>
            <v-list-item v-else>
              <v-list-item-title>There is no register battles</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="dialog = false">Cerrar</v-btn>
          <v-btn color="red" text @click="clearBattles">Borrar Batallas</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStatsPlayerStore } from '@/stores/statsPlayerStore';
import { getCharacter } from '@/services/api';

// Definimos las propiedades del componente
const props = defineProps({
  playerId: {
    type: Number,
    required: true,
  },
});

// Referencias reactivas
const dialog = ref(false);

// Accedemos a la store de Pinia
const statsPlayerStore = useStatsPlayerStore();

// Computed properties para victorias, derrotas y batallas
const wins = computed(() => statsPlayerStore.wins);
const loses = computed(() => statsPlayerStore.loses);
const battles = computed(() => statsPlayerStore.battles);

// Función para obtener los avatares de los personajes
const fetchAvatars = async (battle: any) => {
  try {
    // Obtener detalles del personaje (jugador)
    const characterDetails = await getCharacter(battle.characterId.toString());
    // Obtener detalles del personaje enemigo
    const enemyDetails = await getCharacter(battle.enemyCharacterId.toString());

    // Asignar las imágenes del avatar usando images.lg
    battle.characterAvatar = characterDetails.images.xs; // Usamos 'images.lg' para el avatar grande
    battle.enemyCharacterAvatar = enemyDetails.images.xs; // Lo mismo para el enemigo
  } catch (error) {
    console.error('Error al obtener los avatares de los personajes:', error);
  }
};

// Función para borrar las batallas del localStorage
const clearBattles = () => {
  statsPlayerStore.clearBattlesFromLocalStorage(); // Llamamos a la acción de la store para limpiar las batallas
  dialog.value = false; // Cerramos el dialog después de borrar las batallas
};

// Función que obtiene los avatares para todas las batallas
const fetchBattleAvatars = async () => {
  for (let battle of battles.value) {
    await fetchAvatars(battle); // Obtener los avatares de los personajes de cada batalla
  }
};

// Verificar si las batallas cambian y obtener los avatares de nuevo
watch(battles, async () => {
  if (dialog.value) { // Solo cargar cuando el dialogo está abierto
    await fetchBattleAvatars(); // Cargar los avatares
  }
});

// Cargar avatares cuando el dialogo se abre
watch(dialog, async (newVal) => {
  if (newVal) {
    await fetchBattleAvatars(); // Cargar los avatares de las batallas cuando el dialogo se abre
  }
});

</script>
