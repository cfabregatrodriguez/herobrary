import { defineStore } from "pinia";
// Ensure the correct path to CharacterModel
import { CharacterModel } from "@/models/character.model"; // Adjusted the path

export const useSelectedCharactersStore = defineStore("selectedCharacters", {
	state: () => ({
		selectedCharacters: JSON.parse(
			localStorage.getItem("selectedCharacters") || "[null, null]"
		),
	}),

	actions: {
		addCharacter(character: CharacterModel) {
			// Verificar si el personaje ya está en el array
			if (
				!this.selectedCharacters.some(
					(item: CharacterModel | null) => item?.id === character.id
				)
			) {
				// Buscar la primera posición vacía (null) en el array
				const emptyIndex = this.selectedCharacters.findIndex(
					(item: CharacterModel | null) => item === null
				);
				if (emptyIndex > -1) {
					this.selectedCharacters[emptyIndex] = character;
				}

				// Guardar en localStorage
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		removeCharacter(character: CharacterModel) {
			const index = this.selectedCharacters.findIndex(
				(item: CharacterModel | null) => item?.id === character.id
			);
			if (index > -1) {
				this.selectedCharacters[index] = null;
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		clearSelection() {
			this.selectedCharacters = [null, null]; // Mantener dos espacios fijos
			localStorage.setItem(
				"selectedCharacters",
				JSON.stringify(this.selectedCharacters)
			);
		},

		setCharacter(index: number, character: any) {
			if (index >= 0 && index < this.selectedCharacters.length) {
				this.selectedCharacters[index] = character;
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		getCharacterByIndex(index: number) {
			return this.selectedCharacters[index] || null;
		},

		checkIfArrayHasElementsInBothPositions() {
			return (
				this.selectedCharacters[0] !== null &&
				this.selectedCharacters[1] !== null
			);
		},
	},

	getters: {
		isCharacterSelected: (state) => (character: any) => {
			return state.selectedCharacters.some(
				(item: CharacterModel | null) => item?.id === character.id
			);
		},
	},
});
