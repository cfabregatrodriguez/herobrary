import { defineStore } from "pinia";

export const useCountdownStore = defineStore("countdown", {
	// **State**: Define el estado de la tienda
	state: () => ({
		isCountdownActive: false,
	}),

	getters: {
		countdownStatus(state) {
			return state.isCountdownActive ? "Active" : "Inactive";
		},
	},

	// **Actions**: Métodos que alteran el estado
	actions: {
		startCountdown() {
			this.isCountdownActive = true;
		},

		stopCountdown() {
			this.isCountdownActive = false;
		},
	},
});
