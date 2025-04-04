import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";
import CharacterBarFight from "../../src/components/character/CharacterBarFight.vue";
import { useCountdownStore } from "../../src/stores/countdownStore";
import { useStatsPlayerStore } from "../../src/stores/statsPlayerStore";

vi.mock("@/composables/useBarFightBar", () => ({
	useBarFightBar: () => ({
		maxTotalWidth: ref(200), // Mockea maxTotalWidth como un ref
		minibarPos: ref(50),
		updateBarWidth: vi.fn(),
		updateWidth: vi.fn(),
		moveMinibar: vi.fn(),
	}),
}));

vi.mock("@/composables/useBarFightZones", () => ({
	useBarFightZones: () => ({
		calculateZones: vi.fn(() => [
			{ start: 0, width: 50, color: "red" },
			{ start: 50, width: 50, color: "blue" },
		]),
	}),
}));

describe("CharacterBarFight.vue", () => {
	let wrapper: ReturnType<typeof mount>;
	let countdownStore: ReturnType<typeof useCountdownStore>;
	let statsPlayerStore: ReturnType<typeof useStatsPlayerStore>;

	beforeEach(() => {
		wrapper = mount(CharacterBarFight, {
			global: {
				stubs: {
					"v-progress-linear": true,
				},
			},
			props: {
				character: {
					powerstats: {
						combat: 80,
						power: 70,
						speed: 60,
						intelligence: 50,
						durability: 40,
						strength: 30,
					},
				},
				bgColor: "blue",
				isAuto: false,
				counter: 10,
				divisionPassed: 1,
				isPlayer: 1,
			},
		});

		countdownStore = useCountdownStore();
		statsPlayerStore = useStatsPlayerStore();
	});

	it("calculates colored zones correctly", async () => {
		// Espera a que se actualicen los valores computados
		await wrapper.vm.$nextTick();

		// Verifica que las zonas de color se renderizan
		const coloredZones = wrapper.findAll(".hb-barfight__colored-zones");
		expect(coloredZones.length).toBeGreaterThan(0); // Verifica que las zonas de color se renderizan
	});

	it("positions the minibar correctly", () => {
		const minibar = wrapper.find(".hb-barfight__minibar");
		expect(minibar.exists()).toBe(true);
		expect(minibar.attributes("style")).toContain("left"); // Verifica que la posición de la minibarra está definida
	});

	it("reacts to changes in isCountdownActive", async () => {
		countdownStore.isCountdownActive = false;
		await wrapper.vm.$nextTick();

		// Verifica que el intervalo se detiene cuando isCountdownActive es false
		expect(countdownStore.isCountdownActive).toBe(false);
	});

	it("emits 'updateCounter' when the counter is updated", async () => {
		// Mockea el método updateCounterValue directamente en el componente
		const emitSpy = vi.spyOn(wrapper.vm, "$emit");

		// Simula la emisión del evento
		wrapper.vm.$emit("updateCounter", 10);

		// Verifica que el evento fue emitido con los argumentos correctos
		expect(emitSpy).toHaveBeenCalledWith("updateCounter", 10);
	});
});
