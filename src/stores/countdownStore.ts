// stores/countdownStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCountdownStore = defineStore("countdown", () => {
	const isCountdownActive = ref(false);

	const startCountdown = () => {
		isCountdownActive.value = true;
	};

	const stopCountdown = () => {
		isCountdownActive.value = false;
	};

	return {
		isCountdownActive,
		startCountdown,
		stopCountdown,
	};
});
