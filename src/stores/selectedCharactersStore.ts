import { defineStore } from 'pinia';

export const useSelectedCharactersStore = defineStore('selectedCharacters', {
  state: () => ({
    selectedCharacters: JSON.parse(localStorage.getItem('selectedCharacters') || '[]'),
  }),

  actions: {
    addCharacter(character: any) {
      if (this.selectedCharacters.length < 2) {
        // Agregar al array usando el ID como referencia
        if (!this.selectedCharacters.some(item => item.id === character.id)) {
          this.selectedCharacters.push(character);
          localStorage.setItem('selectedCharacters', JSON.stringify(this.selectedCharacters));
        }
      } else {
        alert("Only 2 characters can be selected.");
      }
    },

    removeCharacter(character: any) {
      const index = this.selectedCharacters.findIndex(item => item.id === character.id);
      if (index > -1) {
        this.selectedCharacters.splice(index, 1);
        localStorage.setItem('selectedCharacters', JSON.stringify(this.selectedCharacters));
      }
    },

    clearSelection() {
      this.selectedCharacters = [];
      localStorage.removeItem('selectedCharacters');
    },
  },

  getters: {
    isCharacterSelected: (state) => (character: any) => {
      // Compara por el ID del personaje
      return state.selectedCharacters.some(item => item.id === character.id);
    },
  },
});
