import { ref, onMounted, onUnmounted } from "vue";

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

	// Handles both keydown and touchstart events to start holding
	const handleStart = (event: KeyboardEvent | TouchEvent) => {
		if (!countdownStore.isCountdownActive) return;

		// Prevent default behavior for both keyboard and touch events
		event.preventDefault();

		// Check if the event is a keyboard event and the key is "Space"
		if (event instanceof KeyboardEvent && event.code === "Space") {
			startHold();
		}

		// If it's a touch event, start holding
		if (event instanceof TouchEvent) {
			startHold();
		}
	};

	// Handles both keyup and touchend events to stop holding
	const handleKeyUp = (event: KeyboardEvent | TouchEvent) => {
		if (!countdownStore.isCountdownActive) return;

		// Prevent default behavior for both keyboard and touch events
		event.preventDefault();

		// Check if the event is a keyboard event and the key is "Space"
		if (event instanceof KeyboardEvent && event.code === "Space") {
			stopHold();
		}

		// If it's a touch event, stop holding
		if (event instanceof TouchEvent) {
			stopHold();
		}
	};

	// Add global event listeners for touch and keyboard events
	onMounted(() => {
		window.addEventListener("keydown", handleStart);
		window.addEventListener("keyup", handleKeyUp);
		window.addEventListener("touchstart", handleStart, { passive: false }); // Configura como no pasivo
		window.addEventListener("touchend", handleKeyUp, { passive: false }); // Configura como no pasivo
	});

	onUnmounted(() => {
		window.removeEventListener("keydown", handleStart);
		window.removeEventListener("keyup", handleKeyUp);
		window.removeEventListener("touchstart", handleStart);
		window.removeEventListener("touchend", handleKeyUp);
	});

	return {
		isHolding,
		holdTime,
		holdTimer,
		startHold,
		stopHold,
		handleStart,
		handleKeyUp,
	};
}
