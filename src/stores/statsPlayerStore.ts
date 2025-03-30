import { defineStore } from "pinia";
import { BattleModel } from "@/models/battle.model";

export const useStatsPlayerStore = defineStore("player", {
	state: () => {
		// Inicializa el estado desde localStorage si existen datos guardados
		const storedState = localStorage.getItem("playerStats");
		if (storedState) {
			return JSON.parse(storedState); // Parseamos el estado almacenado en localStorage
		} else {
			return {
				wins: 0,
				loses: 0,
				playerId: 1,
				battles: [] as BattleModel[], // Array de batallas vacío si no hay datos previos
			};
		}
	},

	actions: {
		// Establece la información del jugador y guarda en localStorage
		setPlayerInfo(playerId: string) {
			this.playerId = playerId;
			this.wins = 0;
			this.loses = 0;
			this.saveToLocalStorage();
		},

		// Registra una victoria y guarda el estado en localStorage
		recordWin() {
			this.wins += 1;
			this.saveToLocalStorage();
		},

		// Registra una derrota y guarda el estado en localStorage
		recordLoss() {
			this.loses += 1;
			this.saveToLocalStorage();
		},

		// Agrega una batalla y guarda el estado en localStorage
		addBattle(
			characterId: number,
			enemyCharacterId: number,
			playerEnergy: number,
			enemyEnergy: number
		) {
			const battle: BattleModel = {
				playerId: Number(this.playerId),
				characterId,
				enemyCharacterId,
				playerEnergy,
				enemyEnergy,
			};
			this.battles.push(battle);
			if (this.battles.length > 50) {
				this.battles.shift(); // Elimina la batalla más antigua
			}
			this.saveToLocalStorage(); // Guardamos el estado en localStorage después de agregar la batalla
		},

		// Obtiene las batallas almacenadas en el estado
		getBattles() {
			return this.battles;
		},

		// Resetea la información del jugador y guarda en localStorage
		resetPlayer() {
			this.wins = 0;
			this.loses = 0;
			this.battles = [];
			this.saveToLocalStorage();
		},

		// Función para borrar las batallas del localStorage
		clearBattlesFromLocalStorage() {
			this.wins = 0;
			this.loses = 0;
			this.battles = []; // Limpiamos las batallas en el estado
			this.saveToLocalStorage(); // Guardamos el estado actualizado (sin batallas) en localStorage
		},

		// Función para guardar el estado en localStorage
		saveToLocalStorage() {
			// Guardamos el estado en localStorage después de cualquier cambio
			localStorage.setItem(
				"playerStats",
				JSON.stringify({
					wins: this.wins,
					loses: this.loses,
					playerId: this.playerId,
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
