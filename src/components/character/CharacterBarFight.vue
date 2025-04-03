<template>
  <div>
    <div class="hb-barfight d-flex flex-column align-center" v-if="character">
      <v-progress-linear ref="progressBarRef" class="position-relative" style="width: 100%; height: 20px;">
        <!-- Zonas de color -->
        <template v-for="(zone, index) in coloredZones" :key="index">
          <div class="hb-barfight__colored-zones position-absolute" :style="{
            left: zone.start + 'px',
            width: zone.width + 'px',
            height: '30px',
            backgroundColor: zone.color
          }">
          </div>
        </template>

        <!-- Minibar -->
        <div class="hb-barfight__minibar position-absolute" :style="{
          left: minibarPos + 'px',
          width: minibarWidth + 'px',
          height: '100%',
        }" :class="(isHolding || isAutoClick) && countdownStore.isCountdownActive ? 'hb-barfight__minibar--hit' : ''">
        </div>
      </v-progress-linear>

    </div>

  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, nextTick, watch } from "vue";
  import { VProgressLinear } from 'vuetify/components';

  // Props
  const props = defineProps({
    character: { type: Object, required: false },
    bgColor: { type: String, default: "red" },
    isAuto: { type: Boolean, default: false },
    counter: { type: Number, default: 1 },
    divisionPassed: { type: Number, default: 1 }
  });


  // Pinia Stores
  import { useCountdownStore } from '@/stores/countdownStore';
  const countdownStore = useCountdownStore();
  import { useStatsPlayerStore } from "@/stores/statsPlayerStore";
  const statsPlayerStore = useStatsPlayerStore();

  const emit = defineEmits<{
    (event: "updateCounter", value: number): void;
  }>();

  // Reactive variables
  const barWidth = ref(0);
  const maxTotalWidth = ref(0);
  const progressBarRef = ref<InstanceType<typeof VProgressLinear> | null>(null);
  const direction = ref(1);
  const minibarPos = ref(0);
  const divisionPassedRef = ref(props.divisionPassed);


  // Refs para jugador
  const baseHoldInterval = 50;
  const isHolding = ref(false);
  let interval: ReturnType<typeof setInterval> | null = null;
  let holdTimer: ReturnType<typeof setInterval>;
  const holdTime = ref(0);

  // Refs para jugador auto
  const baseHoldIntervalAuto = 100;
  const baseChanceToHitAuto = 1;
  const isAutoClick = ref(false);
  let intervalAutoClicks: ReturnType<typeof setInterval>;
  const autoBonusCounter = ref(1);


  // Functions

  // PowerZone
  function calculatePowerZone(power: number, maxWidth: number, divisionPassed: number = 0) {
    return {
      width: (power / 100) * (0.4 * maxWidth * (1 + (divisionPassed * 0.10)))
    };
  }

  // CombatZones
  function calculateCombatZones(combat: number, maxWidth: number, divisionPassed: number = 0) {
    const combatZones: { width: number }[] = [];
    if (combat <= 20) combatZones.push({ width: 0.1 * maxWidth });
    else if (combat <= 50) combatZones.push({ width: 0.10 * maxWidth }, { width: 0.10 * maxWidth });
    else if (combat <= 80) combatZones.push({ width: 0.15 * maxWidth }, { width: 0.10 * maxWidth });
    else if (combat <= 90) combatZones.push({ width: 0.15 * maxWidth }, { width: 0.15 * maxWidth });
    else if (combat <= 99) combatZones.push({ width: 0.15 * maxWidth }, { width: 0.10 * maxWidth }, { width: 0.15 * maxWidth });
    else if (combat >= 100) combatZones.push({ width: 0.15 * maxWidth }, { width: 0.20 * maxWidth }, { width: 0.10 * maxWidth });

    return combatZones;
  }

  // All zones
  function calculateZones(power: number, combat: number, maxWidth: number, divisionPassed: number = 0) {

    const powerZone = { ...calculatePowerZone(power, maxWidth, divisionPassed), type: 'power' };
    const combatZones = calculateCombatZones(combat, maxWidth, divisionPassed).map(z => ({ ...z, type: 'combat' }));
    // Intercalar las zonas
    const allZones: { width: number, type: string, start: number, color: string }[] = [];
    let i = 0;

    // Intercalamos power y combat
    while (i < powerZone.width || i < combatZones.length) {
      if (i < combatZones.length) {
        allZones.push({
          ...combatZones[i],
          start: 0, // Default start value
          color: '#ff8a65' // Default color for combat zones
        });
      }
      if (i < 1) { // Solo agregar 1 zona de tipo 'power'
        allZones.push({
          ...powerZone,
          start: 0, // Default start value
          color: '#ab47bc' // Default color for power zones
        });
      }
      i++;
    }

    // Calcular el espacio restante y la distribución
    const totalZonesWidth = allZones.reduce((sum, zone) => sum + zone.width, 0);
    const remainingSpace = maxWidth - totalZonesWidth;
    const spaceSize = remainingSpace / (allZones.length + 1);

    // Calcular las posiciones de inicio y asignar colores
    let currentPosition = spaceSize;
    return allZones.map(zone => {
      const z = {
        start: currentPosition,
        width: zone.width,
        type: zone.type,
        color: zone.type === 'power' ? '#ab47bc' : '#ff8a65'
      };
      currentPosition += zone.width + spaceSize;
      return z;
    });
  }


  // Computed
  const handicap = computed<number>({
    get: () => statsPlayerStore.handicap,
    set: (value) => statsPlayerStore.setHandicap(value),
  });

  const difficult = computed<number>({
    get: () => statsPlayerStore.difficult,
    set: (value) => statsPlayerStore.setDifficult(value),
  });

  const currentZone = computed(() =>
    coloredZones.value.find(
      (zone) =>
        minibarPos.value + minibarWidth.value > zone.start &&
        minibarPos.value < zone.start + zone.width
    )
  );

  const isInsideColoredZone = computed(() => !!currentZone.value);
  const isInPowerZone = computed(() => currentZone.value?.type === 'power');
  const isInCombatZone = computed(() => currentZone.value?.type === 'combat');

  const coloredZones = computed(() => {
    if (!props.character || maxTotalWidth.value <= 1) return [];

    const { combat, power } = props.character.powerstats;
    return calculateZones(power, combat, maxTotalWidth.value, divisionPassedRef.value);
  });

  // Computed stats

  const speed = computed(() => {
    if (!props.character) return 1;
    return Math.exp((75 - props.character.powerstats.speed / 1.5) * 0.02);
  });

  const minibarWidth = computed(() => {
    if (!props.character) return 20;
    return Math.max(5, (props.character.powerstats.intelligence / 2 - 10));
  });

  const penalty = computed(() => {
    if (!props.character) return 4;
    return (props.counter * ((15 - props.character.powerstats.durability / 10)) / 100) * handicap.value;
  });

  const bonus = computed(() => {
    if (!props.character) return 1;
    return (1 + props.character.powerstats.strength / 4) * handicap.value;
  });


  // Actions

  const updateBarWidth = () => {
    if (!progressBarRef.value) return;

    const element = progressBarRef.value.$el ?? progressBarRef.value;
    if (element instanceof HTMLElement) {
      const rect = element.getBoundingClientRect();
      maxTotalWidth.value = rect.width || 1;
      barWidth.value = rect.width || 1;

      // Asegurar que minibar no se salga de los límites
      minibarPos.value = Math.min(minibarPos.value, barWidth.value - minibarWidth.value);
      minibarPos.value = Math.max(minibarPos.value, 0);
    }
  };

  const updateWidth = () => {
    if (progressBarRef.value) {
      maxTotalWidth.value = progressBarRef.value.$el.offsetWidth || 1;
    }
  };


  const moveMinibar = () => {
    minibarPos.value += speed.value * direction.value;
    if (minibarPos.value + minibarWidth.value >= barWidth.value || minibarPos.value <= 0) {
      direction.value *= -1;
    }
  };

  // Counter actions

  // Function that updates the counter value based on the current zone and various conditions
  const updateCounterValue = () => {
    let bonusFinal: number;

    // If the current zone is a combat zone, reset the hold timer
    if (isInCombatZone.value) {
      bonusFinal = bonus.value;
      clearInterval(holdTimer); // Stop the hold timer when inside a combat zone
      holdTime.value = 0;
    }
    else {
      // If not in combat zone, use the hold time as bonus
      bonusFinal = (holdTime.value / 2) * handicap.value;
    }

    let newValue: number;

    // If the character is inside a colored zone, increase the counter by bonus
    if (isInsideColoredZone.value) {
      newValue = props.counter + bonusFinal;
    }
    else {
      // If not inside a colored zone, decrease the counter by penalty and reset the hold timer
      newValue = props.counter - penalty.value;
      clearInterval(holdTimer); // Reset the hold timer when not inside a colored zone
      holdTime.value = 0;
    }

    // Ensure the new value does not go below zero
    newValue = Math.max(newValue, 0);

    // Emit the updated counter value
    emit("updateCounter", newValue);
  };

  // Function that automatically updates the counter value based on the current zone and random events
  const updateCounterValueAuto = () => {

    const zoneWidth = currentZone.value ? currentZone.value.width : 0;  // Width of the colored zone
    const randomValue = Math.random();  // Generate a random value between 0 and 1

    // Calculate the reduction of the hit chance based on the character's speed
    const speedFactor = Math.pow((props.character?.powerstats.speed || 0) / 100, 2);
    // The speedFactor will reduce the hit chance as speed decreases from 100 to 0.

    if (randomValue <= (isInCombatZone.value ? .8 : .95)) {
      autoBonusCounter.value += 1;
      isAutoClick.value = true;  // Simulate an automatic click
    } else {
      autoBonusCounter.value = 1;  // Reset the automatic bonus counter
      isAutoClick.value = false;
    }

    // Calculate the final bonus based on whether we're in a combat zone
    const bonusFinal = isInCombatZone.value ? bonus.value / 2 : autoBonusCounter.value * handicap.value;
    let newValue = 0;

    // Calculate the precision based on the zone width and speed-modified hit chance
    const factor = 1.3;
    const rawPrecision = Math.pow(zoneWidth, baseChanceToHitAuto);
    const precision = Math.max(0.05, Math.min(0.95, rawPrecision * factor * speedFactor)); // Modify precision with speed factor

    // If we're inside a colored zone and the random value is less than or equal to the adjusted precision, increase the counter
    if (isInsideColoredZone.value && randomValue <= precision) {
      newValue = props.counter + bonusFinal;
    }
    // If the random value is less than or equal to 0.1, reset the automatic bonus counter and apply penalty
    else if (randomValue <= 0.1) {
      autoBonusCounter.value = 1;
      isAutoClick.value = true;
      newValue = props.counter - penalty.value;  // Apply the penalty
    }
    // If none of the above conditions are met, keep the counter the same
    else {
      isAutoClick.value = false;
      newValue = props.counter;
      autoBonusCounter.value = 1;
    }

    // Ensure the value doesn't go below zero
    newValue = Math.max(newValue, 0);

    // Emit the updated counter value
    emit("updateCounter", newValue);
  };



  const updateHold = () => {
    if (!countdownStore.isCountdownActive) return;
    if (!isHolding.value) return;

    if (isInsideColoredZone.value) {
      holdTime.value++;
    }
    else {
      holdTime.value = 0;
    }

    // Actualizar el contador
    updateCounterValue();
  };

  const startHold = () => {
    if (!countdownStore.isCountdownActive || isHolding.value) return;

    isHolding.value = true;
    holdTime.value = 0; // empezamos en 1 directamente

    holdTimer = setInterval(updateHold, baseHoldInterval);
  };

  const stopHold = () => {
    if (!countdownStore.isCountdownActive) return;  // Detener solo si el countdown está activo
    isHolding.value = false;
    clearInterval(holdTimer);
  };

  // Keyboard Events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!countdownStore.isCountdownActive) return;  // Solo permite comenzar si el countdown está activo
    if (event.code === "Space") {
      event.preventDefault();
      startHold();
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!countdownStore.isCountdownActive) return;  // Solo permite detener si el countdown está activo
    if (event.code === "Space") {
      event.preventDefault();
      stopHold();
    }
  };

  // Watchers

  // Observa cuando countdownStore.isCountdownActive cambia
  watch(() => countdownStore.isCountdownActive, (newValue) => {
    if (newValue) {
      nextTick(updateBarWidth);
      divisionPassedRef.value = 0;
      // Activa el intervalo cuando isCountdownActive es true
      interval = setInterval(moveMinibar, 12);
    } else {
      // Limpia el intervalo cuando isCountdownActive es false
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

    }
  });

  watch(() => props.divisionPassed, (newValue) => {
    divisionPassedRef.value = newValue;
  });


  // Lifecycle Hooks
  onMounted(() => {
    nextTick(updateBarWidth);
    nextTick(updateWidth);
    window.addEventListener("resize", updateBarWidth);
    // Si está en modo auto, establece el intervalo para aumentar o reducir el contador
    if (props.isAuto) {
      intervalAutoClicks = setInterval(() => {
        if (countdownStore.isCountdownActive) {
          updateCounterValueAuto();
        }
      }, baseHoldIntervalAuto);
    } else {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }

  });


  // Limpiar los intervalos cuando el countdown termina
  onUnmounted(() => {
    if (interval) clearInterval(interval);
    if (holdTimer) clearInterval(holdTimer);
    if (intervalAutoClicks) clearInterval(intervalAutoClicks);
    window.removeEventListener("resize", updateBarWidth);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  });
</script>
