import { defineStore } from "pinia";

export const useCountdownStore = defineStore("countdown", {
	// **State**: Define el estado de la tienda
	state: () => ({
		isCountdownActive: false,
		isBattleActive: false,
	}),

	getters: {
		countdownStatus(state) {
			return state.isCountdownActive ? true : false;
		},
		battleStatus(state) {
			return state.isBattleActive ? true : false;
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

		startBattle() {
			this.isBattleActive = true;
		},

		stopBattle() {
			this.isBattleActive = false;
		},
	},
});
