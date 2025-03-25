<template>
  <v-app>
    <div  class="pa-16">
      <h1>HEROBRARY</h1>
      <SelectedCharacters 
          :selectedCharacters="selectedCharactersStore.selectedCharacters" 
          :toggleSelection="toggleSelection" 
      />
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
  import SelectedCharacters from "@/components/SelectedCharacters.vue";
  export default defineComponent({
    name: "App",
    components: {
      SelectedCharacters
    },
    setup() {
      const selectedCharactersStore = useSelectedCharactersStore();
      // La función toggleSelection se puede pasar como prop al componente SelectedCharacters
      const toggleSelection = (character: any) => {
        const isSelected = selectedCharactersStore.isCharacterSelected(character);
        if (isSelected) {
          selectedCharactersStore.removeCharacter(character);
        } else {
          selectedCharactersStore.addCharacter(character);
        }
      };

      return {
        selectedCharactersStore,
        toggleSelection
      };
    }
  });
</script>
