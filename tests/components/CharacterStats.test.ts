import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CharacterStats from "../../src/components/character/CharacterStats.vue";
import CharacterBarStat from "../../src/components/character/CharacterBarStat.vue";

describe("CharacterStats.vue", () => {
	const character = {
		id: 1,
		appearance: {},
		biography: {},
		work: {},
		connections: {},
		images: {},
		powerstats: {
			intelligence: 80,
			strength: 70,
			speed: 60,
			durability: 50,
			power: 40,
			combat: 30,
		},
	};

	const density = "compact";

	it("renders all CharacterBarStat components with correct props", () => {
		const wrapper = mount(CharacterStats, {
			props: {
				character,
				density,
			},
		});

		// Verifica que se renderizan 6 componentes CharacterBarStat
		const barStats = wrapper.findAllComponents(CharacterBarStat);
		expect(barStats.length).toBe(6);

		// Verifica que cada componente CharacterBarStat recibe las props correctas
		const expectedStats = [
			{
				stat: "Intelligence",
				value: 80,
				icon: "mdi-brain",
				color: "orange-lighten-2",
			},
			{
				stat: "Strength",
				value: 70,
				icon: "mdi-dumbbell",
				color: "red-lighten-1",
			},
			{
				stat: "Speed",
				value: 60,
				icon: "mdi-run-fast",
				color: "blue-lighten-1",
			},
			{
				stat: "Durability",
				value: 50,
				icon: "mdi-wall",
				color: "green-darken-1",
			},
			{
				stat: "Power",
				value: 40,
				icon: "mdi-lightning-bolt-outline",
				color: "purple-lighten-1",
			},
			{
				stat: "Combat",
				value: 30,
				icon: "mdi-sword-cross",
				color: "deep-orange-lighten-2",
			},
		];

		expectedStats.forEach((expectedStat, index) => {
			const barStat = barStats[index];
			expect(barStat.props("stat")).toBe(expectedStat.stat);
			expect(barStat.props("value")).toBe(expectedStat.value);
			expect(barStat.props("icon")).toBe(expectedStat.icon);
			expect(barStat.props("color")).toBe(expectedStat.color);
			expect(barStat.props("density")).toBe(density);
		});
	});

	it("renders default values if powerstats are missing", () => {
		const wrapper = mount(CharacterStats, {
			props: {
				character: {
					id: 0,
					appearance: {},
					biography: {},
					work: {},
					connections: {},
					powerstats: {},
					images: {}, // Added 'images' property to satisfy CharacterModel type
				}, // Sin valores en powerstats
				density,
			},
		});

		// Verifica que los valores predeterminados (0) se pasan a los componentes
		const barStats = wrapper.findAllComponents(CharacterBarStat);
		barStats.forEach((barStat) => {
			expect(barStat.props("value")).toBe(0);
		});
	});
});
