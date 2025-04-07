<template>
  <div>
    <!-- Help Dialog -->
    <v-dialog v-model="helpDialog" @update:model-value="emit('update:helpDialog', $event)" transition="
      dialog-bottom-transition" max-width="500" opacity=".8">
      <v-toolbar color="primary">
        <v-toolbar-title>How to Play</v-toolbar-title>
        <v-btn icon="mdi-close" @click="emit('update:helpDialog', false)"></v-btn>
      </v-toolbar>
      <v-card color="white">
        <v-card-text>
          <v-list class=" text-caption opacity-60">
            <v-list-item>
              <strong>Step 1:</strong> Go to the character list and select two characters. You can remove them in the
              top
              toolbar.
            </v-list-item>
            <v-list-item>
              <strong>Step 2:</strong> Click the "Start" to go to the fight scenary.
            </v-list-item>
            <v-list-item>
              <strong>Step 3:</strong> Click the "Fight" button or tap the spacebar to begin the fight.
            </v-list-item>
            <v-list-item>
              <strong>Step 4:</strong> During the fight:
              <ul class="ml-4 mt-2">
                <li>🟧 <strong>Orange Zones (Combat):</strong> Tap the <strong>spacebar</strong> repeatedly to strike
                  hard.
                </li>
                <li>🟪 <strong>Purple Zones (Power):</strong> Hold the <strong>spacebar</strong> to charge your energy.
                </li>
              </ul>
            </v-list-item>
            <v-list-item>
              <strong>Step 5:</strong> The character with the highest energy at the end wins!
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" @click="emit('update:helpDialog', false)"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <!-- Battle History Dialog -->
    <v-dialog v-model="historyDialog" transition="dialog-bottom-transition" width="400" opacity=".8" scrollable>
      <v-toolbar color="primary">
        <v-toolbar-title>History Battles</v-toolbar-title>
        <v-btn icon="mdi-close" @click="emit('update:historyDialog', false)"></v-btn>
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
          <v-btn color="primary" @click="emit('update:historyDialog', false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>




    <!-- Settings Dialog -->
    <v-dialog v-model="settingsDialog" transition="dialog-bottom-transition" width="720" opacity=".8" scrollable>
      <v-toolbar color="primary">
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-btn icon="mdi-close" @click="emit('update:settingsDialog', false)"></v-btn>
      </v-toolbar>
      <v-card color="white">
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <div>
                <div class="text-caption">Select this option for your character to play automatically, simulating
                  spacebar presses.</div>
                <v-switch v-model="playerIsAuto" prepend-icon="mdi-robot-excited-outline">
                </v-switch>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div>
                <div class="text-caption">Change the duration of the battle.</div>
                <v-slider v-model="fightTime" show-ticks="always" step="5" tick-size="5" prepend-icon="mdi-timer-sand"
                  :ticks="{
                    20: 'Default'
                  }" thumb-label :min="minFightTime" :max="maxFightTime"></v-slider>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div>
                <div class="text-caption">Ease of filling the energy bar.</div>
                <v-slider v-model="handicap" show-ticks="always" step=".1" tick-size="5" prepend-icon="mdi-glass-stange"
                  :ticks="{
                    0.3: 'Default'
                  }" thumb-label :min="minHandicap" :max="maxHandicap"></v-slider>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div>
                <div class="text-caption text-disabled">Adjust how hard your enemy will be.</div>
                <v-slider disabled v-model="difficult" show-ticks="always" step="1" tick-size="5"
                  prepend-icon="mdi-robot-angry-outline" :ticks="{
                    2: 'Default'
                  }" thumb-label :min="minDifficult" :max="maxDifficult" messages="Upcoming..."></v-slider>
              </div>
            </v-col>
          </v-row>


        </v-card-text>
        <v-card-actions class="py-4">
          <v-btn color="primary" @click="emit('update:settingsDialog', false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">

  import { ref, computed, watch } from 'vue';

  // Pinia Stores
  import { useStatsPlayerStore } from '@/stores/statsPlayerStore';
  const statsPlayerStore = useStatsPlayerStore();


  const emit = defineEmits(["update:helpDialog", "update:historyDialog", "update:settingsDialog"]);


  const helpDialog = computed({
    get: () => props.helpDialog,
    set: (value) => emit("update:helpDialog", value),
  });

  const historyDialog = computed({
    get: () => props.historyDialog,
    set: (value) => emit("update:historyDialog", value),
  });

  const settingsDialog = computed({
    get: () => props.settingsDialog,
    set: (value) => emit("update:settingsDialog", value),
  });

  // Props
  const props = defineProps({
    helpDialog: { type: Boolean, default: false },
    historyDialog: { type: Boolean, default: false },
    settingsDialog: { type: Boolean, default: false }
  });

  // State: Reactive variables
  const dialog = ref(false);

  const minFightTime = ref(10);
  const maxFightTime = ref(40);

  const minHandicap = ref(0.1);
  const maxHandicap = ref(1);

  const minDifficult = ref(1);
  const maxDifficult = ref(5);

  // Computed
  const playerIsAuto = computed<boolean>({
    get: (): boolean => statsPlayerStore.playerIsAuto,
    set: (value: boolean): void => statsPlayerStore.setIsAuto(value),
  });

  const fightTime = computed<number>({
    get: (): number => statsPlayerStore.fightTime,
    set: (value: number): void => statsPlayerStore.setFightTime(value),
  });

  const handicap = computed<number>({
    get: () => statsPlayerStore.handicap,
    set: (value) => statsPlayerStore.setHandicap(value),
  });

  const difficult = computed<number>({
    get: () => statsPlayerStore.difficult,
    set: (value) => statsPlayerStore.setDifficult(value),
  });

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