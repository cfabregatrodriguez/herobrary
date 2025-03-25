<template>
  <v-card
    :class="{
      selected: isSelected,
      'bg-blue-grey-lighten-4': isSelected
    }"
    class="mx-auto"
    :style="{ minHeight: '300px', width: '100%' }"
    @click="goToCharacterDetail"
  >
    <v-img
      :src="character.images.md"
      alt="Character Image"
      cover
      style="height: 200px; width: 100%;"
    />
    <v-card-title>{{ character.name }}</v-card-title>
    <v-card-subtitle v-if="character.biography.fullName">
      {{ character.biography.fullName }}
    </v-card-subtitle>
    <v-card-subtitle v-else>
      {{ character.name }}
    </v-card-subtitle>
    <template v-slot:actions>
      <div class="d-flex justify-center align-center w-100">
        <v-btn variant="tonal" @click.stop="toggleSelection(character)">
          <span v-if="isSelected">Remove</span>
          <span v-else>Add to fight</span>
        </v-btn>
      </div>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed } from 'vue'; // Asegúrate de importar `computed`
import { useSelectedCharactersStore } from '@/stores/selectedCharactersStore';
import { Character } from '@/models/character.model';

// Recibir las propiedades del componente
const props = defineProps<{
  character: Character;
}>();

// Usar la store de Pinia
const selectedCharactersStore = useSelectedCharactersStore();

// Computado para saber si el personaje está seleccionado
const isSelected = computed(() =>
  selectedCharactersStore.selectedCharacters.some(
    (selectedCharacter) => selectedCharacter.id === props.character.id
  )
);

// Función para alternar la selección
const toggleSelection = (character: Character) => {
  if (isSelected.value) {
    selectedCharactersStore.removeCharacter(character);
  } else {
    selectedCharactersStore.addCharacter(character);
  }
};

// Función para navegar al detalle del personaje
const router = useRouter();
const goToCharacterDetail = () => {
  if (!props.character.id) return;

  router.push({
    name: 'CharacterDetail',
    params: { id: props.character.id.toString() },
  });
};
</script>
