<template>
  <div>
    <div class="hb-barfight d-flex flex-column align-center" v-if="character" ref="progressBarRef">
      <v-progress-linear class="position-relative" ref="progressBarInRef" style="width: 100%; height: 20px;"
        color="grey lighten-1">
        <!-- Colored Zones -->
        <template v-for="(zone, index) in coloredZones" :key="index">
          <div class="position-absolute" :style="{
            left: zone.start + 'px',
            width: zone.width + 'px',
            height: '30px',
            backgroundColor: zone.color
          }"></div>
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

    <div v-else>
      <p>Character not available, loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();

// Props
const props = defineProps({
  character: { type: Object, required: false },
  bgColor: { type: String, default: "red" },
  isAuto: { type: Boolean, default: false },
  counter: { type: Number, default: 1 },
});

// Emits
const emit = defineEmits<{
  (event: "updateCounter", value: number): void;
}>();

// Reactive Variables
const barWidth = ref(0);
const maxTotalWidth = ref(0);
const progressBarRef = ref<HTMLElement | null>(null);
const direction = ref(1);
const minibarPos = ref(0);

const isHolding = ref(false);
let animationFrameId: number | null = null;
let holdAnimationId: number | null = null;
let lastTime = 0;
let lastHoldTime = 0;
const holdTime = ref(0);

const isAutoClick = ref(false);
const autoBonusCounter = ref(1);
let autoClicksAnimationId: number | null = null;
let lastAutoClickTime = 0;

// Computed

// Colored Zones
const coloredZones = computed(() => {
  if (!props.character || maxTotalWidth.value <= 1) return [];
  const { combat, power } = props.character.powerstats;
  return calculateZones(power, combat, maxTotalWidth.value);
});

// Speed
const speed = computed(() => {
  if (!props.character) return 1;
  return Math.exp((75 - props.character.powerstats.speed / 1.5) * 0.02);
});

// Minibar Width
const minibarWidth = computed(() => {
  if (!props.character) return 20;
  return Math.max(5, (props.character.powerstats.intelligence / 2 - 10));
});

// Penalty
const penalty = computed(() => {
  if (!props.character) return 4;
  return (props.counter * ((15 - props.character.powerstats.durability / 10)) / 100);
});

// Bonus
const bonus = computed(() => {
  if (!props.character) return 1;
  return 1 + props.character.powerstats.strength / 2;
});

// Actions

// Calculate PowerZone
function calculatePowerZone(power: number, maxWidth: number) {
  return { width: (power / 100) * (0.4 * maxWidth) };
}

// Calculate CombatZones
function calculateCombatZones(combat: number, maxWidth: number) {
  const combatZones: { width: number }[] = [];
  if (combat <= 20) combatZones.push({ width: 0.1 * maxWidth });
  else if (combat <= 50) combatZones.push({ width: 0.1 * maxWidth }, { width: 0.1 * maxWidth });
  else if (combat <= 80) combatZones.push({ width: 0.2 * maxWidth });
  else if (combat <= 90) combatZones.push({ width: 0.2 * maxWidth }, { width: 0.15 * maxWidth });
  else if (combat <= 99) combatZones.push({ width: 0.25 * maxWidth }, { width: 0.15 * maxWidth });
  else combatZones.push({ width: 0.25 * maxWidth }, { width: 0.25 * maxWidth });

  return combatZones;
}

// Calculate zones
function calculateZones(power: number, combat: number, maxWidth: number) {
  const powerZone = { ...calculatePowerZone(power, maxWidth), type: 'power' };
  const combatZones = calculateCombatZones(combat, maxWidth).map(z => ({ ...z, type: 'combat' }));

  const allZones: { width: number, type: string, start: number, color: string }[] = [];
  let i = 0;

  while (i < powerZone.width || i < combatZones.length) {
    if (i < combatZones.length) {
      allZones.push({ ...combatZones[i], start: 0, color: '#ff8a65' });
    }
    if (i < 1) {
      allZones.push({ ...powerZone, start: 0, color: '#ab47bc' });
    }
    i++;
  }

  const totalZonesWidth = allZones.reduce((sum, zone) => sum + zone.width, 0);
  const remainingSpace = maxWidth - totalZonesWidth;
  const spaceSize = remainingSpace / (allZones.length + 1);

  let currentPosition = spaceSize;
  return allZones.map(zone => {
    const z = { start: currentPosition, width: zone.width, type: zone.type, color: zone.type === 'power' ? '#ab47bc' : '#ff8a65' };
    currentPosition += zone.width + spaceSize;
    return z;
  });
}

// Update Bar Width
const updateBarWidth = () => {
  if (!progressBarRef.value) return;

  const element = progressBarRef.value;
  if (element instanceof HTMLElement) {
    const rect = element.getBoundingClientRect();
    maxTotalWidth.value = rect.width || 1;
    barWidth.value = rect.width || 1;

    // Asegurar que minibar no se salga de los límites
    minibarPos.value = Math.min(minibarPos.value, barWidth.value - minibarWidth.value);
    minibarPos.value = Math.max(minibarPos.value, 0);
  }
};

// Update Width
const updateWidth = () => {
  if (progressBarRef.value instanceof HTMLElement) {
    maxTotalWidth.value = progressBarRef.value.offsetWidth || 1;
  }
};

// Move Minibar with requestAnimationFrame
const moveMinibar = (timestamp: number) => {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;

  // Aim for similar speed as the 12ms interval (roughly 83 fps)
  if (deltaTime >= 12) {
    minibarPos.value += speed.value * direction.value;
    if (minibarPos.value + minibarWidth.value >= barWidth.value || minibarPos.value <= 0) {
      direction.value *= -1;
    }
    lastTime = timestamp;
  }

  animationFrameId = requestAnimationFrame(moveMinibar);
};

// Update Hold Timer with requestAnimationFrame
const updateHold = (timestamp: number) => {
  if (!countdownStore.isCountdownActive || !isHolding.value) {
    return;
  }

  if (!lastHoldTime) lastHoldTime = timestamp;
  const deltaTime = timestamp - lastHoldTime;

  // Similar to 50ms interval (20 fps)
  if (deltaTime >= 50) {
    if (isInsideColoredZone.value) {
      holdTime.value++;
    } else {
      holdTime.value = 0;
    }

    updateCounterValue();
    lastHoldTime = timestamp;
  }

  holdAnimationId = requestAnimationFrame(updateHold);
};

// Handle Hold
const startHold = () => {
  if (!countdownStore.isCountdownActive || isHolding.value) return;
  isHolding.value = true;
  holdTime.value = 1;
  lastHoldTime = 0;
  if (!holdAnimationId) {
    holdAnimationId = requestAnimationFrame(updateHold);
  }
};

// Stop Hold
const stopHold = () => {
  if (!countdownStore.isCountdownActive) return;
  isHolding.value = false;
  if (holdAnimationId) cancelAnimationFrame(holdAnimationId);
};

// Counter Update
const updateCounterValue = () => {
  let bonusFinal = isInCombatZone.value ? bonus.value : holdTime.value / 2;
  let newValue = isInsideColoredZone.value ? props.counter + bonusFinal : props.counter - penalty.value;
  newValue = Math.max(newValue, 0);
  emit("updateCounter", newValue);
};

// Auto Update Counter with requestAnimationFrame
const updateCounterValueAuto = (timestamp: number) => {
  if (!props.isAuto) return;
  if (!countdownStore.isCountdownActive) {
    autoClicksAnimationId = requestAnimationFrame(updateCounterValueAuto);
    return;
  }

  if (!lastAutoClickTime) lastAutoClickTime = timestamp;
  const deltaTime = timestamp - lastAutoClickTime;

  // Similar to 75ms interval
  if (deltaTime >= 75) {
    const zoneWidth = currentZone.value ? currentZone.value.width : 0;
    const randomValue = Math.random();

    if (randomValue <= 0.95) {
      autoBonusCounter.value += 1;
      isAutoClick.value = true;
    } else {
      autoBonusCounter.value = 1;
      isAutoClick.value = false;
    }

    const bonusFinal = isInCombatZone.value ? bonus.value / 2 : autoBonusCounter.value;
    let newValue = 0;

    const precision = Math.max(0.05, Math.min(0.95, Math.pow(zoneWidth, 1.3) * 1.3));
    if (isInsideColoredZone.value && randomValue <= precision) {
      newValue = props.counter + bonusFinal;
    } else if (randomValue <= 0.1) {
      autoBonusCounter.value = 1;
      isAutoClick.value = true;
      newValue = props.counter - penalty.value;
    } else {
      isAutoClick.value = false;
      newValue = props.counter;
      autoBonusCounter.value = 1;
    }

    newValue = Math.max(newValue, 0);
    emit("updateCounter", newValue);

    lastAutoClickTime = timestamp;
  }

  autoClicksAnimationId = requestAnimationFrame(updateCounterValueAuto);
};

// Lifecycle Hooks
onMounted(() => {
  nextTick(updateBarWidth);
  nextTick(updateWidth);
  window.addEventListener("resize", updateBarWidth);

  // Start animation loop with requestAnimationFrame
  animationFrameId = requestAnimationFrame(moveMinibar);

  if (props.isAuto) {
    autoClicksAnimationId = requestAnimationFrame(updateCounterValueAuto);
  } else {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }
});

onUnmounted(() => {
  // Cancel all animations
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (holdAnimationId) cancelAnimationFrame(holdAnimationId);
  if (autoClicksAnimationId) cancelAnimationFrame(autoClicksAnimationId);

  window.removeEventListener("resize", updateBarWidth);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});

// Keyboard Events
const handleKeyDown = (event: KeyboardEvent) => {
  if (!countdownStore.isCountdownActive) return;
  if (event.code === "Space") {
    event.preventDefault();
    startHold();
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (!countdownStore.isCountdownActive) return;
  if (event.code === "Space") {
    event.preventDefault();
    stopHold();
  }
};

// Watchers
const currentZone = computed(() =>
  coloredZones.value.find(
    (zone) =>
      minibarPos.value + minibarWidth.value > zone.start &&
      minibarPos.value < zone.start + zone.width
  )
);
const isInsideColoredZone = computed(() => !!currentZone.value);
// const isInPowerZone = computed(() => currentZone.value?.type === 'power');
const isInCombatZone = computed(() => currentZone.value?.type === 'combat');
</script>