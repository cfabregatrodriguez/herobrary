import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import { nextTick } from "vue";
import CharacterCard from "@/components/character/CharacterCard.vue";
import { CharacterModel } from "@/models/character.model";

const router = createRouter({
	history: createMemoryHistory(),
	routes: [
		{ path: "/", name: "List", component: { template: "<div></div>" } },
		{
			path: "/character/:id",
			name: "Detail",
			component: { template: "<div></div>" },
		},
		{ path: "/fight/", name: "Fight", component: { template: "<div></div>" } },
	],
});

let character: CharacterModel;

beforeEach(() => {
	character = {
		id: 1,
		name: "Superman",
		images: {
			xs: "https://example.com/superman-xs.jpg",
			sm: "https://example.com/superman-sm.jpg",
			md: "https://example.com/superman.jpg",
			lg: "https://example.com/superman-lg.jpg",
		},
		slug: "superman",
		powerstats: {
			strength: 100,
			speed: 90,
		},
		appearance: {
			gender: "Male",
			race: "Kryptonian",
			height: ["6'3\"", "191 cm"],
			weight: ["0 lb", "0 kg"],
			eyeColor: "",
			hairColor: "",
		},
		biography: {
			fullName: "Clark Kent",
			placeOfBirth: "Krypton",
			alterEgos: "",
			aliases: [],
			firstAppearance: "",
			publisher: "",
			alignment: "",
		},
		connections: {
			groupAffiliation: "Justice League",
			relatives: "Jonathan Kent, Martha Kent",
		},
		work: {
			occupation: "Journalist",
			base: "Metropolis",
		},
	};
});

describe("CharacterCard.vue", () => {
	it("debe mostrar la imagen del personaje correctamente", async () => {
		const wrapper = mount(CharacterCard, {
			props: { character, index: 0, characterNum: 1 },
			global: {
				plugins: [router],
			},
		});

		const image = wrapper.find("v-img");
		expect(image.exists()).toBe(true);
		expect(image.attributes("src")).toBe("https://example.com/superman.jpg");
	});

	it("debe mostrar el nombre del personaje", () => {
		const wrapper = mount(CharacterCard, {
			props: { character, index: 0, characterNum: 1 },
			global: {
				plugins: [router],
			},
		});

		const name = wrapper.find("v-card-title");
		expect(name.text()).toBe("Superman");
	});

	it("debe mostrar el badge 'selected' cuando el personaje está seleccionado", async () => {
		const wrapper = mount(CharacterCard, {
			props: { character, index: 0, characterNum: 1 },
			global: {
				plugins: [router],
			},
		});

		await wrapper.setProps({ isSelected: true });

		const badge = wrapper.find(".hb-card__badge--right");
		expect(badge.exists()).toBe(true);
	});

	it("debe navegar a la vista de detalles al hacer clic en la tarjeta", async () => {
		const wrapper = mount(CharacterCard, {
			global: {
				plugins: [router],
			},
			props: { character, index: 0, characterNum: 1 },
		});

		await router.isReady();

		const card = wrapper.find("v-img");

		await card.trigger("click");

		await nextTick();
		await new Promise((resolve) => setTimeout(resolve, 100));

		expect(router.currentRoute.value.name).toBe("Detail");
		expect(router.currentRoute.value.params.id).toBe(character.id.toString());
	});
});
