import { defineStore } from "pinia";
import { BattleModel } from "@/models/battle.model";

export const useStatsPlayerStore = defineStore("player", {
	state: () => {
		// Initialize state from localStorage if saved data exists
		const storedState = localStorage.getItem("playerStats");
		if (storedState) {
			return JSON.parse(storedState); // Parse the state stored in localStorage
		} else {
			return {
				wins: 0,
				loses: 0,
				playerId: 1,
				playerIsAuto: false,
				fightTime: 20,
				handicap: 0.3,
				difficult: 2,
				battles: [] as BattleModel[], // Empty battles array if no previous data
			};
		}
	},

	actions: {
		// Sets player information and saves to localStorage
		setPlayerInfo(playerId: string) {
			this.playerId = playerId;
			this.wins = 0;
			this.loses = 0;
			this.playerIsAuto = false;
			this.fightTime = 20;
			this.handicap = 0.3;
			this.difficult = 1;
			this.battles = [];
			this.saveToLocalStorage();
		},

		// Records a win and saves the state to localStorage
		recordWin() {
			this.wins += 1;
			this.saveToLocalStorage();
		},

		// Records a loss and saves the state to localStorage
		recordLoss() {
			this.loses += 1;
			this.saveToLocalStorage();
		},

		// Adds a battle and saves the state to localStorage
		addBattle(
			characterId: number,
			enemyCharacterId: number,
			playerEnergy: number,
			enemyEnergy: number,
			characterAvatar: string,
			enemyCharacterAvatar: string
		) {
			const battle: BattleModel = {
				playerId: Number(this.playerId),
				characterId,
				enemyCharacterId,
				playerEnergy,
				enemyEnergy,
				characterAvatar,
				enemyCharacterAvatar,
			};
			this.battles.push(battle);
			if (this.battles.length > 50) {
				this.battles.shift(); // Remove the oldest battle
			}
			this.saveToLocalStorage(); // Save the state to localStorage after adding the battle
		},

		// Resets player information and saves to localStorage
		resetPlayer() {
			this.wins = 0;
			this.loses = 0;
			this.playerIsAuto = false;
			this.fightTime = 20;
			this.handicap = 0.3;
			this.difficult = 1;
			this.battles = [];
			this.saveToLocalStorage();
		},

		// Clears battles from localStorage
		clearBattlesFromLocalStorage() {
			this.wins = 0;
			this.loses = 0;
			this.battles = []; // Clear battles in the state
			this.saveToLocalStorage(); // Save the updated state (without battles) to localStorage
		},

		// Toggles the `playerIsAuto` state
		toggleAutoPlay() {
			this.playerIsAuto = !this.playerIsAuto;
			this.saveToLocalStorage();
		},

		setIsAuto(value: boolean) {
			this.playerIsAuto = value;
			this.saveToLocalStorage();
		},

		// Sets the fight time
		setFightTime(time: number) {
			this.fightTime = time;
			this.saveToLocalStorage();
		},

		// Adjusts the handicap
		setHandicap(value: number) {
			this.handicap = value;
			this.saveToLocalStorage();
		},

		// Adjusts the difficulty
		setDifficult(level: number) {
			this.difficult = level;
			this.saveToLocalStorage();
		},

		// Saves the state to localStorage
		saveToLocalStorage() {
			localStorage.setItem(
				"playerStats",
				JSON.stringify({
					wins: this.wins,
					loses: this.loses,
					playerId: this.playerId,
					playerIsAuto: this.playerIsAuto,
					fightTime: this.fightTime,
					handicap: this.handicap,
					difficult: this.difficult,
					battles: this.battles,
				})
			);
		},
	},

	getters: {
		totalBattles: (state) => state.wins + state.loses,
		lastBattle: (state) => state.battles[state.battles.length - 1],
	},
});
