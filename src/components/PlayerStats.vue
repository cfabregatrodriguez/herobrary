<template>
  <div>
    <v-row class="align-center justify-center" no-gutters>
      <!-- Wins Chip -->
      <v-chip prepend-icon="mdi-check-bold" class="ma-2" color="green">
        {{ wins }} Wins
      </v-chip>

      <!-- Losses Chip -->
      <v-chip prepend-icon="mdi-close-thick" class="ma-2" color="red">
        {{ loses }} Loses
      </v-chip>

      <!-- Player Avatar -->
      <v-avatar>
        <v-icon>mdi-account-circle</v-icon>
      </v-avatar>

      <!-- Button to open the battle history dialog -->
      <v-btn @click="dialog = true">
        History
      </v-btn>
    </v-row>

    <!-- Battle History Dialog -->
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
                <v-list-item-title class="text-caption">
                  <strong>Battle {{ index + 1 }}</strong>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-row class="align-center">
                    <v-col cols="5">
                      <v-avatar size="30px">
                        <img :src="battle.characterAvatar" alt="Character Avatar" />
                      </v-avatar>
                      vs
                      <v-avatar size="30px">
                        <img :src="battle.enemyCharacterAvatar" alt="Enemy Avatar" />
                      </v-avatar>
                    </v-col>
                    <v-col cols="4">
                      {{ Math.round(battle.playerEnergy) }} vs {{ Math.round(battle.enemyEnergy) }}
                    </v-col>
                    <v-col cols="2">
                      <v-chip v-if="Math.round(battle.playerEnergy) > Math.round(battle.enemyEnergy)"
                        prepend-icon="mdi-check-bold" class="ma-2" color="green" variant="flat">
                      </v-chip>
                      <v-chip v-else prepend-icon="mdi-close-thick" class="ma-2" color="red" variant="flat">
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
                <v-divider></v-divider>
              </v-list-item>
            </v-item-group>
            <v-list-item v-else>
              <v-list-item-title>No battles registered</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue" text @click="dialog = false">Close</v-btn>
          <v-btn color="red" text @click="clearBattles">Clear Battles</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, computed, watch } from 'vue';
import { useStatsPlayerStore } from '@/stores/statsPlayerStore';
import { getCharacter } from '@/services/api';

// State: Reactive variables
const dialog = ref(false);

// Pinia Stores
const statsPlayerStore = useStatsPlayerStore();

// Computed
const wins = computed(() => statsPlayerStore.wins);
const loses = computed(() => statsPlayerStore.loses);
const battles = computed(() => statsPlayerStore.battles);

// Actions
const fetchAvatars = async (battle: any) => {
  try {
    const characterDetails = await getCharacter(battle.characterId.toString());
    const enemyDetails = await getCharacter(battle.enemyCharacterId.toString());

    battle.characterAvatar = characterDetails.images.xs;
    battle.enemyCharacterAvatar = enemyDetails.images.xs;
  } catch (error) {
    console.error('Error fetching character avatars:', error);
  }
};

const clearBattles = () => {
  statsPlayerStore.clearBattlesFromLocalStorage();
  dialog.value = false;
};

const fetchBattleAvatars = async () => {
  for (let battle of battles.value) {
    await fetchAvatars(battle);
  }
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
