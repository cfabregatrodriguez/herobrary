<template>
  <div v-if="selectedCharacters && selectedCharacters.length > 0" class="my-8">
    <v-row>
        <v-col v-for="(character, index) in selectedCharacters" :key="index" class="mini-card" cols="3">
            <v-card 
                @click="toggleSelection(character)"
                class="mx-auto" 
                :prepend-avatar="character.imagexs" 
                :subtitle="character.name" 
            >
            </v-card>
        </v-col>
    </v-row>


  </div>
  <div v-else class="my-8">
    <p>No hay personajes seleccionados</p>
  </div>
</template>

<script>
export default {
  props: {
    selectedCharacters: {
      type: Array,
      required: true,
      default: () => []  // Asegura que siempre es un array, incluso si no se pasa como prop
    },
    toggleSelection: {
        type: Function,
        required: true,
    }
  },
  mounted() {
    // Verifica que selectedCharacters está definido
    if (this.selectedCharacters && this.selectedCharacters.length > 0) {
      this.selectedCharacters.forEach(character => {
        console.log('Character image:', character.image);
        console.log('Character image URL:', character.image?.url);
      });
    }
  }
}
</script>
