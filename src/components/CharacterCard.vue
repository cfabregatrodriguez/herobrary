<template>
  <v-card
    :class="{
      selected: isSelected,
      'bg-blue-grey-lighten-1': isSelected
    }"
    class="mx-auto"
    :style="{ minHeight: '300px', width: '100%' }"
    @click="goToCharacterDetail"
  >
    <v-badge v-if="isSelected"
        class="hb-card__badge"
        color="white"
        content="selected"
        inline
    ></v-badge>
    <v-img
      :src="character.images.md"
      alt="Character Image"
      cover
      style="height: 200px; width: 100%;"
    />
    <v-card-title>{{ character.name }}</v-card-title>
    <div class="d-flex justify-center align-center w-100 pb-4">
        <v-btn variant="tonal" size="small" @click.stop="toggleSelection(character)">
            <span v-if="isSelected">Remove</span>
            <span v-else>Add to fight</span>
        </v-btn>
    </div>
    <v-card-subtitle class="py-2" v-text="character.biography.fullName || character.name" />
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
