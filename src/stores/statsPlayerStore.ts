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
				playerIsAuto: false,
				fightTime: 20,
				handicap: 0.5,
				difficult: 2,
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
			this.playerIsAuto = false;
			this.fightTime = 20;
			this.handicap = 1;
			this.difficult = 1;
			this.battles = [];
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
				this.battles.shift(); // Elimina la batalla más antigua
			}
			this.saveToLocalStorage(); // Guardamos el estado en localStorage después de agregar la batalla
		},

		// Resetea la información del jugador y guarda en localStorage
		resetPlayer() {
			this.wins = 0;
			this.loses = 0;
			this.playerIsAuto = false;
			this.fightTime = 20;
			this.handicap = 1;
			this.difficult = 1;
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

		// Cambia el estado de `playerIsAuto`
		toggleAutoPlay() {
			this.playerIsAuto = !this.playerIsAuto;
			this.saveToLocalStorage();
		},

		setIsAuto(value: boolean) {
			this.playerIsAuto = value;
			this.saveToLocalStorage();
		},

		// Configura el tiempo de combate
		setFightTime(time: number) {
			this.fightTime = time;
			this.saveToLocalStorage();
		},

		// Ajusta el hándicap
		setHandicap(value: number) {
			this.handicap = value;
			this.saveToLocalStorage();
		},

		// Ajusta la dificultad
		setDifficult(level: number) {
			this.difficult = level;
			this.saveToLocalStorage();
		},

		// Función para guardar el estado en localStorage
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
