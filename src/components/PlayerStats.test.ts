import { render, fireEvent, screen, waitFor } from "@testing-library/vue";
import PlayerStats from "@/components/PlayerStats.vue";
import { useStatsPlayerStore } from "@/stores/statsPlayerStore";

describe("PlayerStats.vue", () => {
	let store: ReturnType<typeof useStatsPlayerStore>;

	beforeEach(() => {
		store = useStatsPlayerStore();
		store.wins = 5;
		store.loses = 2;
		store.battles = [
			{
				characterId: 1,
				enemyCharacterId: 2,
				playerEnergy: 75,
				enemyEnergy: 45,
				characterAvatar: "https://example.com/avatar1.jpg",
				enemyCharacterAvatar: "https://example.com/avatar2.jpg",
			},
			{
				characterId: 3,
				enemyCharacterId: 4,
				playerEnergy: 60,
				enemyEnergy: 80,
				characterAvatar: "https://example.com/avatar3.jpg",
				enemyCharacterAvatar: "https://example.com/avatar4.jpg",
			},
		];
	});

	test("should render wins and loses", () => {
		render(PlayerStats);
		expect(screen.getByText("5 Wins")).toBeTruthy();
		expect(screen.getByText("2 Loses")).toBeTruthy();
	});

	test("should open battle history dialog on button click", async () => {
		render(PlayerStats);
		const historyButton = screen.getByText("History");
		await fireEvent.click(historyButton);
		expect(screen.getByText("History Battles")).toBeTruthy();
	});

	test("should show battles with avatars when dialog opens", async () => {
		render(PlayerStats);
		const historyButton = screen.getByText("History");
		await fireEvent.click(historyButton);
		const characterAvatars = screen.getAllByAltText("Character Avatar");
		const enemyAvatars = screen.getAllByAltText("Enemy Avatar");
		expect(characterAvatars.length).toBeGreaterThan(0);
		expect(enemyAvatars.length).toBeGreaterThan(0);
		expect((characterAvatars[0] as HTMLImageElement).src).toBe(
			"https://example.com/avatar1.jpg"
		);
		expect((enemyAvatars[0] as HTMLImageElement).src).toBe(
			"https://example.com/avatar2.jpg"
		);
	});

	test("should clear battles when clicking 'Clear Battles'", async () => {
		render(PlayerStats);
		const historyButton = screen.getByText("History");
		await fireEvent.click(historyButton);
		const clearBattlesButton = screen.getByText("Clear Battles");
		await fireEvent.click(clearBattlesButton);
		store.battles = [];
		await waitFor(() => {
			expect(screen.getByText("No battles registered")).toBeTruthy();
		});
	});
});
