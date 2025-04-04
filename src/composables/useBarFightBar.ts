import { ref } from "vue";

export function useBarFightBar() {
	const barWidth = ref(0);
	const maxTotalWidth = ref(0);
	const minibarPos = ref(1);
	const direction = ref(1);

	// Updates the bar width and ensures the minibar stays within bounds
	const updateBarWidth = (
		progressBarRef: HTMLElement | null,
		minibarWidth: number,
		isPlayer: number // true or false
	) => {
		if (!progressBarRef) return;

		// Default to characterId = 0 if undefined
		const resolvedCharacterId = isPlayer;

		const rect = progressBarRef.getBoundingClientRect();

		// Apply different divisors based on resolvedCharacterId
		const divisor = resolvedCharacterId === 0 ? 1.3 : 0.95; // Important: this value is the same as the one in the CSS (in &--fight--1 and &--fight--0)

		maxTotalWidth.value = rect.width / divisor || 1;
		barWidth.value = rect.width / divisor || 1;

		// Ensure minibar stays within bounds
		minibarPos.value = Math.min(
			minibarPos.value,
			barWidth.value - minibarWidth
		);
		minibarPos.value = Math.max(minibarPos.value, 0);
	};

	// Updates the total width of the progress bar
	const updateWidth = (progressBarRef: HTMLElement | null) => {
		if (progressBarRef) {
			maxTotalWidth.value = progressBarRef.offsetWidth || 1;
		}
	};

	// Moves the minibar and changes direction when it reaches the edges
	const moveMinibar = (speed: number, minibarWidth: number) => {
		minibarPos.value += speed * direction.value;
		if (
			minibarPos.value + minibarWidth >= barWidth.value ||
			minibarPos.value <= 0
		) {
			direction.value *= -1;
		}
	};

	return {
		barWidth,
		maxTotalWidth,
		minibarPos,
		direction,
		updateBarWidth,
		updateWidth,
		moveMinibar,
	};
}
