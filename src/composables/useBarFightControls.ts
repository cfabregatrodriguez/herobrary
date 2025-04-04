import { ref } from "vue";

export function useBarFightControls(
	countdownStore: any,
	updateCounterValue: () => void
) {
	const isHolding = ref(false);
	const holdTime = ref(0);
	const holdTimer = ref<ReturnType<typeof setInterval> | null>(null);

	const baseHoldInterval = 50;

	// Starts the hold action and updates the counter periodically
	const startHold = () => {
		if (!countdownStore.isCountdownActive || isHolding.value) return;

		isHolding.value = true;
		holdTime.value = 0;

		holdTimer.value = setInterval(() => {
			if (!countdownStore.isCountdownActive) return;
			if (isHolding.value) {
				holdTime.value++;
				updateCounterValue();
			}
		}, baseHoldInterval);
	};

	// Stops the hold action and clears the timer
	const stopHold = () => {
		if (!countdownStore.isCountdownActive) return;
		isHolding.value = false;
		if (holdTimer.value) {
			clearInterval(holdTimer.value);
			holdTimer.value = null;
		}
	};

	// Handles the keydown event for the spacebar to start holding
	const handleKeyDown = (event: KeyboardEvent) => {
		if (!countdownStore.isCountdownActive) return;
		if (event.code === "Space") {
			event.preventDefault();
			startHold();
		}
	};

	// Handles the keyup event for the spacebar to stop holding
	const handleKeyUp = (event: KeyboardEvent) => {
		if (!countdownStore.isCountdownActive) return;
		if (event.code === "Space") {
			event.preventDefault();
			stopHold();
		}
	};

	return {
		isHolding,
		holdTime,
		holdTimer,
		startHold,
		stopHold,
		handleKeyDown,
		handleKeyUp,
	};
}
