export function useBarFightZones() {
    // PowerZone
    function calculatePowerZone(power, maxWidth, divisionPassed = 0) {
        return {
            width: (power / 100) * (0.4 * maxWidth * (1 + divisionPassed * 0.1)),
        };
    }
    // CombatZones
    function calculateCombatZones(combat, maxWidth, divisionPassed = 0) {
        const combatZones = [];
        if (combat <= 20)
            combatZones.push({ width: 0.1 * maxWidth });
        else if (combat <= 50)
            combatZones.push({ width: 0.1 * maxWidth }, { width: 0.1 * maxWidth });
        else if (combat <= 80)
            combatZones.push({ width: 0.15 * maxWidth }, { width: 0.1 * maxWidth });
        else if (combat <= 90)
            combatZones.push({ width: 0.15 * maxWidth }, { width: 0.15 * maxWidth });
        else if (combat <= 99)
            combatZones.push({ width: 0.15 * maxWidth }, { width: 0.1 * maxWidth }, { width: 0.15 * maxWidth });
        else if (combat >= 100)
            combatZones.push({ width: 0.15 * maxWidth }, { width: 0.2 * maxWidth }, { width: 0.1 * maxWidth });
        return combatZones;
    }
    // All zones
    function calculateZones(power, combat, maxWidth, divisionPassed = 0) {
        const powerZone = {
            ...calculatePowerZone(power, maxWidth, divisionPassed),
            type: "power",
        };
        const combatZones = calculateCombatZones(combat, maxWidth, divisionPassed).map((z) => ({
            ...z,
            type: "combat",
        }));
        const allZones = [];
        let i = 0;
        while (i < powerZone.width || i < combatZones.length) {
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
        const totalZonesWidth = allZones.reduce((sum, zone) => sum + zone.width, 0);
        const remainingSpace = maxWidth - totalZonesWidth;
        const spaceSize = remainingSpace / (allZones.length + 1);
        let currentPosition = spaceSize;
        return allZones.map((zone) => {
            const z = {
                start: currentPosition,
                width: zone.width,
                type: zone.type,
                color: zone.type === "power" ? "#ab47bc" : "#ff8a65",
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
