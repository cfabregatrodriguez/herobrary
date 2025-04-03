<template>
  <div>
    <v-row class="align-center justify-center" no-gutters>
      <!-- Wins Chip -->
      <v-chip @click="emit('update:historyDialog', true)" v-show="breakpoint.mdAndUp"
        :size="breakpoint.smAndDown ? 'x-small' : 'small'" color="primary" prepend-icon="mdi-check-bold"
        class="hb-chip hb-chip--wins ma-2">
        {{ wins }} <span class="ml-1" v-show="!breakpoint.smAndDown">Wins</span>
      </v-chip>

      <!-- Losses Chip -->
      <v-chip @click="emit('update:historyDialog', true)" v-show="breakpoint.mdAndUp"
        :size="breakpoint.smAndDown ? 'x-small' : 'small'" color="primary" prepend-icon="mdi-close-thick"
        class="hb-chip hb-chip--defeats ma-2">
        {{ loses }} <span class="ml-1" v-show="!breakpoint.smAndDown">Loses</span>
      </v-chip>

      <!-- Player Avatar and History Dropdown -->
      <v-menu location="bottom">
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props">
            <v-icon color="white">mdi-menu</v-icon>
          </v-avatar>
        </template>

        <!-- Dropdown Menu -->
        <v-list>
          <v-list-item @click="emit('update:historyDialog', true)">
            <template v-slot:prepend>
              <v-icon icon="mdi-history" color="white"></v-icon>
            </template>
            <v-list-item-title class="text-white">History</v-list-item-title>
          </v-list-item>
          <v-list-item @click="emit('update:settingsDialog', true)" :disabled="countdownStore.isCountdownActive">
            <template v-slot:prepend>
              <v-icon icon="mdi-cog-outline" color="white"></v-icon>
            </template>
            <v-list-item-title class="text-white">Settings</v-list-item-title>
          </v-list-item>
          <v-list-item href="https://github.com/cfabregatrodriguez/herobrary/tree/main" target="blank">
            <template v-slot:prepend>
              <v-icon icon="mdi-github" color="white"></v-icon>
            </template>
            <v-list-item-title class="text-white">Github Project</v-list-item-title>
          </v-list-item>
          <v-list-item @click="emit('update:helpDialog', true)">
            <template v-slot:prepend>
              <v-icon icon="mdi-help" color="white"></v-icon>
            </template>
            <v-list-item-title class="text-white">Help</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>



  </div>
</template>

<script setup lang="ts">
  // Vue & Utilities
  import { ref, computed } from 'vue';
  import { useDisplay } from 'vuetify'

  // Props
  const props = defineProps({
    helpDialog: { type: Boolean },
    historyDialog: { type: Boolean, default: false },
    settingsDialog: { type: Boolean, default: false }
  });

  // State: Reactive variables
  const breakpoint = ref(useDisplay());

  // Pinia Stores
  import { useStatsPlayerStore } from '@/stores/statsPlayerStore';
  const statsPlayerStore = useStatsPlayerStore();
  import { useCountdownStore } from '@/stores/countdownStore';
  const countdownStore = useCountdownStore();

  // Computed
  const wins = computed(() => statsPlayerStore.wins);
  const loses = computed(() => statsPlayerStore.loses);

  const emit = defineEmits(["update:helpDialog", "update:historyDialog", "update:settingsDialog"]);

</script>
