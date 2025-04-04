<template>
  <div>
    <div class="hb-selectedCharas w-100 justify-center d-flex justify-center align-center">
      <div class="d-flex justify-center align-center">
        <v-btn class="mr-1 mt-0" color="secondary" :disabled="countdownStore.isCountdownActive" size="x-small"
          @click="assignRandomCharacter(0)">RND</v-btn>
        <!-- Tooltip for selected character (Slot 1) -->
        <v-tooltip v-if="selectedCharacters[0]" location="bottom" class="text-center">
          <template v-slot:activator="{ props }">
            <v-avatar :size="breakpoint.smAndDown ? '35' : '50'" @click="toggleSelection(selectedCharacters[0])"
              v-bind="props" class="hb-avatar-container mt-0">
              <v-img :src="selectedCharacters[0].images.md" alt="Character Image" />
              <v-icon v-if="!countdownStore.isCountdownActive" class="hb-remove-icon mdi mdi-close"
                @click.stop="toggleSelection(selectedCharacters[0])" />
            </v-avatar>
          </template>
          <div v-if="!countdownStore.isCountdownActive && router.currentRoute.value.name !== 'Fight'">Remove
          </div>
          <span>{{
            selectedCharacters[0] ? selectedCharacters[0].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" :size="breakpoint.smAndDown ? '35' : '50'" class="hb-avatar-container mt-0">
          <v-tooltip activator="parent" location="bottom" class="text-center" width="200">
            choose a character from the list or press the RND button to assign a random character.
          </v-tooltip>
        </v-avatar>
      </div>
      <div>
        <v-tooltip v-if="!selectedCharactersStore.checkIfArrayHasElementsInBothPositions()" activator="parent"
          width="150" location="bottom" class="text-center">
          You need 2 characters to fight.
        </v-tooltip>
        <v-btn :size="breakpoint.smAndDown ? 'x-small' : 'default'"
          :class="canFight && router.currentRoute.value.name !== 'Fight' ? 'hb-animation--glow' : ''" color="secondary"
          variant="outlined" class="mx-4" @click="goToCharactersFight"
          :disabled="countdownStore.isCountdownActive || !canFight || router.currentRoute.value.name == 'Fight'">
          Start
        </v-btn>
      </div>

      <div class="d-flex justify-center align-center">
        <!-- Tooltip for selected character (Slot 2) -->
        <v-tooltip v-if="selectedCharacters[1]" location="bottom" class="text-center">
          <template v-slot:activator="{ props }">
            <v-avatar :size="breakpoint.smAndDown ? '35' : '50'" @click="toggleSelection(selectedCharacters[1])"
              v-bind="props" class="hb-avatar-container mt-0">
              <v-img :src="selectedCharacters[1].images.md" alt="Character Image" />
              <v-icon v-if="!countdownStore.isCountdownActive" class="hb-remove-icon mdi mdi-close"
                @click.stop="toggleSelection(selectedCharacters[1])" />
            </v-avatar>
          </template>
          <div v-if="!countdownStore.isCountdownActive && router.currentRoute.value.name !== 'Fight'">Remove
          </div>
          <span>{{ selectedCharacters[1] ? selectedCharacters[1].name : 'Empty Slot' }}</span>
        </v-tooltip>
        <v-avatar v-else color="#B0BEC5" :size="breakpoint.smAndDown ? '35' : '50'" class="hb-avatar-container mt-0">
          <v-tooltip activator="parent" location="bottom" class="text-center" width="200">
            choose a character from the list or press the RND button to assign a random character.
          </v-tooltip>
        </v-avatar>
        <v-btn class="ml-1 mt-0" color="secondary" :disabled="countdownStore.isCountdownActive" size="x-small"
          @click="assignRandomCharacter(1)">RND</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Vue & Utilities
  import { useRouter } from 'vue-router';
  import { computed, ref, onMounted } from 'vue';
  import { getListCharacters } from "@/services/api"; // Import API
  import { CharacterModel } from '@/models/character.model';
  import { useDisplay } from 'vuetify'

  //Reactive variables
  const breakpoint = ref(useDisplay());

  // Pinia Stores
  import { useCountdownStore } from '@/stores/countdownStore';
  const countdownStore = useCountdownStore();  // Using countdown store
  import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
  const selectedCharactersStore = useSelectedCharactersStore();

  // Computed
  const selectedCharacters = computed(() => selectedCharactersStore.selectedCharacters);
  const canFight = computed(() => {
    return selectedCharacters.value.length === 2 && selectedCharacters.value.every((character: CharacterModel | null) => character !== null);
  });


  const allCharacters = ref<CharacterModel[]>([]);

  onMounted(async () => {
    allCharacters.value = await getListCharacters();
  });

  // Actions
  const toggleSelection = (character: CharacterModel) => {
    if (countdownStore.isCountdownActive) return;
    selectedCharactersStore.removeCharacter(character);
  };

  const assignRandomCharacter = (index: number) => {
    if (allCharacters.value.length === 0) return;

    const randomIndex = Math.floor(Math.random() * allCharacters.value.length);
    const randomCharacter = allCharacters.value[randomIndex];

    if (selectedCharacters.value.some((c: CharacterModel | null) => c?.id === randomCharacter.id)) {
      assignRandomCharacter(index); // Try again
      return;
    }

    selectedCharactersStore.setCharacter(index, randomCharacter);
  };

  //Routes
  const router = useRouter();
  const goToCharactersFight = () => {
    if (!selectedCharacters.value[0]?.id || !selectedCharacters.value[1]?.id) return;

    router.push({
      name: 'Fight'
    });
  };
</script>
