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
			// Check if the character is already in the array
			if (
				!this.selectedCharacters.some(
					(item: CharacterModel | null) => item?.id === character.id
				)
			) {
				// Find the first empty position (null) in the array
				const emptyIndex = this.selectedCharacters.findIndex(
					(item: CharacterModel | null) => item === null
				);
				if (emptyIndex > -1) {
					this.selectedCharacters[emptyIndex] = character;
				}

				// Save to localStorage
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		removeCharacter(character: CharacterModel) {
			// Find the index of the character to remove
			const index = this.selectedCharacters.findIndex(
				(item: CharacterModel | null) => item?.id === character.id
			);
			if (index > -1) {
				this.selectedCharacters[index] = null;
				// Save to localStorage
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		clearSelection() {
			// Reset the array to [null, null]
			this.selectedCharacters = [null, null];
			// Save to localStorage
			localStorage.setItem(
				"selectedCharacters",
				JSON.stringify(this.selectedCharacters)
			);
		},

		setCharacter(index: number, character: any) {
			// Set a character at the specified index
			if (index >= 0 && index < this.selectedCharacters.length) {
				this.selectedCharacters[index] = character;
				// Save to localStorage
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		getCharacterByIndex(index: number) {
			// Return the character at the specified index or null if not found
			return this.selectedCharacters[index] || null;
		},

		checkIfArrayHasElementsInBothPositions() {
			// Check if both positions in the array are filled
			return (
				this.selectedCharacters[0] !== null &&
				this.selectedCharacters[1] !== null
			);
		},
	},

	getters: {
		isCharacterSelected: (state) => (character: any) => {
			// Check if a character is already selected
			return state.selectedCharacters.some(
				(item: CharacterModel | null) => item?.id === character.id
			);
		},
	},
});
