<template>
  <div>
    <v-row class="align-center justify-center" no-gutters>
      <!-- Wins Chip -->
      <v-chip v-show="breakpoint.mdAndUp" :size="breakpoint.smAndDown ? 'x-small' : 'small'" color="primary"
        prepend-icon="mdi-check-bold" class="hb-chip hb-chip--wins ma-2">
        {{ wins }} <span class="ml-1" v-show="!breakpoint.smAndDown">Wins</span>
      </v-chip>

      <!-- Losses Chip -->
      <v-chip v-show="breakpoint.mdAndUp" :size="breakpoint.smAndDown ? 'x-small' : 'small'" color="primary"
        prepend-icon="mdi-close-thick" class="hb-chip hb-chip--defeats ma-2">
        {{ loses }} <span class="ml-1" v-show="!breakpoint.smAndDown">Loses</span>
      </v-chip>

      <!-- Player Avatar and History Dropdown -->
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props">
            <v-icon color="white">mdi-account-circle</v-icon>
          </v-avatar>
        </template>

        <!-- Dropdown Menu -->
        <v-list>
          <v-list-item @click="historyDialog = true">
            <v-list-item-title class="text-white">History</v-list-item-title>
          </v-list-item>
          <v-list-item @click="helpDialog = true">
            <v-list-item-title class="text-white">Help</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>


    <!-- Help Dialog -->
    <v-dialog v-model="helpDialog" transition="dialog-bottom-transition" max-width="500" opacity=".8">

      <v-toolbar color="primary">
        <v-toolbar-title>Instructions</v-toolbar-title>
        <v-btn icon="mdi-close" @click="helpDialog = false"></v-btn>
      </v-toolbar>
      <v-card color="white">
        <v-card-text>
          <v-list class="text-primary opacity-60">
            <v-list-item>
              <strong>Press the Fight button to begin the fight.</strong>
            </v-list-item>
            <v-list-item>
              <p>If you are over an 🟧 orange zone (combat), tap <strong>the spacebar</strong> repeatedly to strike
                hard.
              </p>
            </v-list-item>
            <v-list-item>
              <p>If you are over a 🟪 purple zone (power), hold <strong>the spacebar</strong> down as long as you can
                to
                unleash
                your energy.</p>
            </v-list-item>

          </v-list>


        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="helpDialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Battle History Dialog -->
    <v-dialog v-model="historyDialog" transition="dialog-bottom-transition" width="400" opacity=".8" scrollable>
      <v-toolbar color="primary">
        <v-toolbar-title>History Battles</v-toolbar-title>
        <v-btn icon="mdi-close" @click="historyDialog = false"></v-btn>
      </v-toolbar>
      <v-card color="white">
        <v-card-text>
          <v-list dense>
            <v-item-group v-if="battles.length">
              <v-list-item v-for="(battle, index) in battles" :key="index"
                :class="(Math.round(battle.playerEnergy) < Math.round(battle.enemyEnergy)) ? 'opacity-40' : ''">
                <template v-slot:default="props">
                  <div v-bind="props">
                    <div class="d-flex w-100">
                      <v-row class="align-center justify-start v-row--no-gutters text-primary">
                        <v-col cols="1"><strong>{{ index + 1 }}</strong></v-col>
                        <v-col cols="4">
                          <v-avatar size="30px">
                            <img :src="battle.characterAvatar" alt="Character Avatar" />
                          </v-avatar>
                          vs
                          <v-avatar size="30px">
                            <img :src="battle.enemyCharacterAvatar" alt="Enemy Avatar" />
                          </v-avatar>
                        </v-col>
                        <v-col cols="6" class="text-center">
                          {{ Math.round(battle.playerEnergy) }} vs {{ Math.round(battle.enemyEnergy) }}
                        </v-col>
                        <v-col cols="1">
                          <v-icon v-if="Math.round(battle.playerEnergy) > Math.round(battle.enemyEnergy)"
                            icon="mdi-check-bold" size="large"></v-icon>
                          <v-icon v-else icon="mdi-close-thick" size="large"></v-icon>
                        </v-col>
                      </v-row>
                    </div>
                    <v-divider class="mt-2"></v-divider>
                  </div>
                </template>
              </v-list-item>
            </v-item-group>
            <v-list-item v-else>
              <v-list-item-title>No battles registered</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="py-4">
          <v-btn color="primary" variant="flat" @click="clearBattles">Clear Battles</v-btn>
          <v-btn color="primary" @click="historyDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, computed, watch } from 'vue';
import { useDisplay } from 'vuetify'

// State: Reactive variables
const dialog = ref(false);
const historyDialog = ref(false);
const helpDialog = ref(false);
const breakpoint = ref(useDisplay());

// Pinia Stores
import { useStatsPlayerStore } from '@/stores/statsPlayerStore';
const statsPlayerStore = useStatsPlayerStore();

// Computed
const wins = computed(() => statsPlayerStore.wins);
const loses = computed(() => statsPlayerStore.loses);
const battles = computed(() => statsPlayerStore.battles);

// Actions
const fetchAvatars = (battle: any) => {
  if (battle.characterAvatar) {
    battle.characterAvatar = battle.characterAvatar; // Ya está en el estado
  } else {
    console.error('No se encontraron imágenes para el personaje:', battle.characterId);
  }

  if (battle.enemyCharacterAvatar) {
    battle.enemyCharacterAvatar = battle.enemyCharacterAvatar; // Ya está en el estado
  } else {
    console.error('No se encontraron imágenes para el enemigo:', battle.enemyCharacterId);
  }
};

const clearBattles = () => {
  statsPlayerStore.clearBattlesFromLocalStorage();
  dialog.value = false;
};

const fetchBattleAvatars = async () => {
  const avatarPromises = battles.value.map((battle: { characterId: number; enemyCharacterId: number; characterAvatar?: string; enemyCharacterAvatar?: string }) =>
    fetchAvatars(battle)
  );
  await Promise.all(avatarPromises);
};

// Watchers
watch(battles, async () => {
  if (dialog.value) {
    await fetchBattleAvatars();
  }
});

watch(dialog, async (newVal) => {
  if (newVal) {
    await fetchBattleAvatars();
  }
});
</script>
