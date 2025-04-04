export function useBarFightZones() {
	// Calculates the power zone width based on power and division passed
	function calculatePowerZone(
		power: number,
		maxWidth: number,
		divisionPassed: number = 0
	) {
		return {
			width: (power / 100) * (0.4 * maxWidth * (1 + divisionPassed * 0.1)),
		};
	}

	// Calculates the combat zones based on combat stats
	function calculateCombatZones(
		combat: number,
		maxWidth: number,
		divisionPassed: number = 0
	) {
		const combatZones: { width: number }[] = [];
		if (combat <= 20) combatZones.push({ width: 0.1 * maxWidth });
		else if (combat <= 50)
			combatZones.push({ width: 0.1 * maxWidth }, { width: 0.1 * maxWidth });
		else if (combat <= 80)
			combatZones.push({ width: 0.15 * maxWidth }, { width: 0.1 * maxWidth });
		else if (combat <= 90)
			combatZones.push({ width: 0.15 * maxWidth }, { width: 0.15 * maxWidth });
		else if (combat <= 99)
			combatZones.push(
				{ width: 0.15 * maxWidth },
				{ width: 0.1 * maxWidth },
				{ width: 0.15 * maxWidth }
			);
		else if (combat >= 100)
			combatZones.push(
				{ width: 0.15 * maxWidth },
				{ width: 0.2 * maxWidth },
				{ width: 0.1 * maxWidth }
			);

		return combatZones;
	}

	// Combines power and combat zones and calculates their positions
	function calculateZones(
		power: number,
		combat: number,
		maxWidth: number,
		divisionPassed: number = 0
	) {
		const powerZone = {
			...calculatePowerZone(power, maxWidth, divisionPassed),
			type: "power",
		};
		const combatZones = calculateCombatZones(
			combat,
			maxWidth,
			divisionPassed
		).map((z) => ({
			...z,
			type: "combat",
		}));

		const allZones: {
			width: number;
			type: string;
			start: number;
			color: string;
		}[] = [];

		// Interleave powerZone and combatZones
		let i = 0;
		while (i < combatZones.length || i < 1) {
			if (i < combatZones.length) {
				allZones.push({
					...combatZones[i],
					start: 0,
					color: "#ff8a65",
				});
			}
			if (i < 1) {
				allZones.push({
					...powerZone,
					start: 0,
					color: "#ab47bc",
				});
			}
			i++;
		}

		// Calculate positions and remaining space
		const totalZonesWidth = allZones.reduce((sum, zone) => sum + zone.width, 0);
		const remainingSpace = maxWidth - totalZonesWidth;
		const spaceSize = remainingSpace / (allZones.length + 1);

		let currentPosition = spaceSize;
		return allZones.map((zone) => {
			const z = {
				start: currentPosition,
				width: zone.width,
				type: zone.type,
				color: zone.color,
			};
			currentPosition += zone.width + spaceSize;
			return z;
		});
	}

	return {
		calculatePowerZone,
		calculateCombatZones,
		calculateZones,
	};
}
