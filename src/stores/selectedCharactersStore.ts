import { defineStore } from "pinia";

export const useSelectedCharactersStore = defineStore("selectedCharacters", {
	state: () => ({
		selectedCharacters: JSON.parse(
			localStorage.getItem("selectedCharacters") || "[]"
		),
	}),

	actions: {
		addCharacter(character: any) {
			// Verificar si el personaje ya está en el array
			if (!this.selectedCharacters.some((item) => item?.id === character.id)) {
				// Verificar si hay dos elementos no nulos
				const nonNullCharacters = this.selectedCharacters.filter(
					(item) => item !== null
				);

				if (nonNullCharacters.length < 2) {
					// Buscar la primera posición vacía (null) en el array
					const emptyIndex = this.selectedCharacters.findIndex(
						(item) => item === null
					);
					if (emptyIndex > -1) {
						// Reemplazar la posición vacía
						this.selectedCharacters[emptyIndex] = character;
					} else {
						// Si no hay posiciones vacías, agregar al final
						this.selectedCharacters.push(character);
					}
				} else {
					// Si ya hay dos elementos no nulos, sustituir el segundo
					const secondNonNullIndex = this.selectedCharacters.findIndex(
						(item) => item !== null && item === nonNullCharacters[1]
					);
					if (secondNonNullIndex > -1) {
						this.selectedCharacters[secondNonNullIndex] = character;
					}
				}

				// Guardar el array actualizado en el localStorage
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		removeCharacter(character: any) {
			const index = this.selectedCharacters.findIndex(
				(item) => item?.id === character.id
			);
			if (index > -1) {
				// Marcar la posición como vacía (null) en lugar de eliminarla
				this.selectedCharacters[index] = null;
				localStorage.setItem(
					"selectedCharacters",
					JSON.stringify(this.selectedCharacters)
				);
			}
		},

		clearSelection() {
			this.selectedCharacters = [];
			localStorage.removeItem("selectedCharacters");
		},

		setCharacter(index: number, character: any) {
			this.selectedCharacters[index] = character;
			localStorage.setItem(
				"selectedCharacters",
				JSON.stringify(this.selectedCharacters)
			);
		},

		// Acción para obtener un personaje por su índice
		getCharacterByIndex(index: number) {
			return this.selectedCharacters[index] || null;
		},
	},

	getters: {
		isCharacterSelected: (state) => (character: any) => {
			// Compara por el ID del personaje
			return state.selectedCharacters.some((item) => item?.id === character.id);
		},
	},
});
