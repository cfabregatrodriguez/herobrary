<template>
  <div>
    <div class="w-100 justify-center">
      <v-btn :disabled="countdownStore.isCountdownActive" size="x-small" @click="assignRandomCharacter(0)">RND</v-btn>

      <v-tooltip v-if="selectedCharacters[0]" location="top">
        <template v-slot:activator="{ props }">
          <v-avatar size="50" @click="toggleSelection(selectedCharacters[0])" v-bind="props"
            class="hb-avatar-container">
            <v-img :src="selectedCharacters[0].images.md" alt="Character Image" />
            <v-icon v-if="!countdownStore.isCountdownActive && router.currentRoute.value.name !== 'Fight'"
              class="hb-remove-icon mdi mdi-close" @click.stop="toggleSelection(selectedCharacters[0])" />
          </v-avatar>
        </template>
        <span>{{ selectedCharacters[0] ? selectedCharacters[0].name : 'Empty Slot' }}</span>
      </v-tooltip>
      <v-avatar v-else color="#B0BEC5" size="50"></v-avatar>

      <v-btn variant="outlined" class="mx-4" @click="goToCharactersFight"
        :disabled="countdownStore.isCountdownActive || !canFight">
        Start
      </v-btn>

      <!-- Tooltip for selected character (Slot 2) -->
      <v-tooltip v-if="selectedCharacters[1]" location="top">
        <template v-slot:activator="{ props }">
          <v-avatar size="50" @click="toggleSelection(selectedCharacters[1])" v-bind="props"
            class="hb-avatar-container">
            <v-img :src="selectedCharacters[1].images.md" alt="Character Image" />
            <v-icon v-if="!countdownStore.isCountdownActive && router.currentRoute.value.name !== 'Fight'"
              class="hb-remove-icon mdi mdi-close" @click.stop="toggleSelection(selectedCharacters[1])" />
          </v-avatar>
        </template>
        <span>{{ selectedCharacters[1] ? selectedCharacters[1].name : 'Empty Slot' }}</span>
      </v-tooltip>
      <v-avatar v-else color="#B0BEC5" size="50"></v-avatar>

      <v-btn :disabled="countdownStore.isCountdownActive" size="x-small" @click="assignRandomCharacter(1)">RND</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { useRouter } from 'vue-router';
import { computed, ref, onMounted } from 'vue';
import { getListCharacters } from "@/services/api"; // Import API
import { CharacterModel } from '@/models/character.model';

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
  if (countdownStore.isCountdownActive || router.currentRoute.value.name == 'Fight') return;
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
