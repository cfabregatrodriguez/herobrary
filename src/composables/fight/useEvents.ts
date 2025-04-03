import { ref, onUnmounted } from "vue";
import type { Ref } from "vue";

export function useBarfightEvents(
	props: any,
	countdownStore: any,
	statsPlayerStore: any
) {
	const isHolding: Ref<boolean> = ref(false);
	let holdTimer: ReturnType<typeof setInterval> | null = null;

	const startHold = () => {
		if (!countdownStore.isCountdownActive) return;
		isHolding.value = true;
		holdTimer = setInterval(() => {
			if (!isHolding.value) return;
			// Lógica para actualizar contador
		}, 50);
	};

	const stopHold = () => {
		isHolding.value = false;
		if (holdTimer) clearInterval(holdTimer);
	};

	const handleAutoModeChange = (autoMode: boolean) => {
		if (autoMode) {
			// Lógica para modo automático
		}
	};

	onUnmounted(() => {
		if (holdTimer) clearInterval(holdTimer);
	});

	return { startHold, stopHold, handleAutoModeChange };
}
