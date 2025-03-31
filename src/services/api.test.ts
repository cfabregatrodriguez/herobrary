import { vi, expect, test, describe, beforeEach, afterEach } from "vitest";
import fetchMock from "fetch-mock";
import { getCharacter } from "./api";

const API_URL = "https://akabab.github.io/superhero-api/api/";

describe("API function tests", () => {
	beforeEach(() => {
		fetchMock.reset();
	});

	afterEach(() => {
		fetchMock.restore();
	});

	test("getCharacter should return character details", async () => {
		fetchMock.get(`${API_URL}id/1.json`, { id: 1, name: "Superman" });

		const character = await getCharacter("1");

		expect(character).toEqual({ id: 1, name: "Superman" });
	});

	test("getCharacter should throw an error when no ID is provided", async () => {
		await expect(getCharacter("")).rejects.toThrow(
			"ID de personaje no válido."
		);
	});

	test("getCharacter should handle API errors", async () => {
		fetchMock.get(`${API_URL}id/1.json`, {
			throws: new Error("Error al obtener detalles: Error al obtener datos"),
		});

		await expect(getCharacter("1")).rejects.toThrow(
			"Error al obtener detalles: Error al obtener datos"
		);
	});
});
