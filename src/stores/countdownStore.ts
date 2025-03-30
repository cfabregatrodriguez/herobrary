import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountdownStore = defineStore("countdown", {
	// **State**: Define el estado de la tienda
	state: () => ({
		isCountdownActive: ref(false),
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
