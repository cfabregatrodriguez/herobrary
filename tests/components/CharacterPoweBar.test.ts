import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import CharacterPowerBar from "../../src/components/character/CharacterPowerBar.vue";

describe("CharacterPowerBar.vue", () => {
	const character = {
		powerstats: {
			intelligence: 80,
		},
	};

	it("renders the power bar correctly", () => {
		const wrapper = mount(CharacterPowerBar, {
			props: {
				character,
				counter: 50,
				bgColor: "blue",
			},
		});

		// Verifica que el contenedor principal existe
		expect(wrapper.find(".hb-power-bar").exists()).toBe(true);

		// Verifica que el contador se renderiza correctamente
		expect(wrapper.find(".hb-power-bar__counter").text()).toBe("50");

		// Verifica que el rectángulo SVG tiene las propiedades correctas
		const rect = wrapper.find("rect");
		expect(rect.attributes("y")).toBe(String(1000 - (0 + 50 * 2)));
		expect(rect.attributes("height")).toBe(String(50 + 50 * 2));
		expect(rect.attributes("fill")).toBe("blue");
	});

	it("calculates the correct number of divisions", () => {
		const wrapper = mount(CharacterPowerBar, {
			props: {
				character,
				counter: 50,
			},
		});

		// Verifica que el número de divisiones es correcto
		const numDivisions = Math.max(
			1,
			Math.ceil(character.powerstats.intelligence / 20)
		);
		expect(wrapper.vm.numDivisions).toBe(numDivisions);

		// Verifica que las líneas de división se renderizan correctamente
		const lines = wrapper.findAll("line");
		expect(lines.length).toBe(numDivisions);
	});

	it("renders animated circles with correct radius and opacity", async () => {
		const wrapper = mount(CharacterPowerBar, {
			props: {
				character,
				counter: 50,
			},
		});

		// Simula un cambio en el contador que activa un mensaje
		await wrapper.setProps({ counter: 60 });

		// Verifica que los círculos tienen el radio y la opacidad correctos
		const circles = wrapper.findAll("circle");
		circles.forEach((circle, index) => {
			const radius = wrapper.vm.getRadius(index + 1);
			const opacity = wrapper.vm.getOpacity(index + 1);
			expect(circle.attributes("r")).toBe(String(radius));
			expect(circle.attributes("style")).toContain(`opacity: ${opacity}`);
		});
	});
});
