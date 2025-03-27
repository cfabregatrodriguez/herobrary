<template>
  <div class="hb-barfight d-flex flex-column align-center" v-if="character">
    <v-progress-linear 
      ref="progressBarRef"
      class="position-relative"
      style="width: 100%; height: 20px;"
      color="grey lighten-1"
    >
      <!-- Zonas de color -->
      <template v-for="(zone, index) in coloredZones" :key="index">
        <div class="position-absolute"
          :style="{
            left: zone.start + 'px',
            width: zone.width + 'px',
            height: '30px',
            backgroundColor: bgColor
          }">
        </div>
      </template>

      <!-- Minibar -->
      <div 
        class="hb-barfight__minibar position-absolute"
        :style="{
          left: minibarPos + 'px',
          width: minibarWidth + 'px',
          height: '100%',
          opacity: isHolding ? 0.5 : 1
        }"
      ></div>
    </v-progress-linear>

    <!-- Información -->
    <p>Contador: {{ Math.round(counter * 10) / 10 }}</p>
    <p>Bonus: {{ Math.round(bonus * 10) / 10 }}</p>
    <p>Penalty: {{ Math.round(penalty * 10) / 10 }}</p>
    <p>Speed: {{ Math.round(speed * 10) / 10 }}</p>
    <p>Nº zones: {{ coloredZones.length }}</p>
    <p>Width zones: {{ Math.round(coloredZones[0]?.width * 10) / 10 }}</p>
    <p>Bar width: {{ Math.round(minibarWidth * 10) / 10 }}</p>
  </div>

  <div v-else>
    <p>Character not available, loading...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

// Props
const props = defineProps({
  character: { type: Object, required: false },
  bgColor: { type: String, default: "red" },
  isAuto: { type: Boolean, default: false },
  isCountdownActive: { type: Boolean, default: false },
});

const emit = defineEmits<{
  (event: "updateCounter", value: number): void;
}>();

// Refs
const barWidth = ref(0);
const maxTotalWidth = ref(0); 
const progressBarRef = ref<HTMLElement | null>(null);
const baseHoldInterval = 50;
const counter = ref(0);
const direction = ref(1);
const isHolding = ref(false);
const minibarPos = ref(0);
let intervalAutoClicks: number;
let interval: number;
let holdTimer: number;
const holdTime = ref(0);

// === Funciones de cálculo ===

// Calcular PowerZone
function calculatePowerZone(power: number, maxWidth: number) {
  return {
    width: (power / 100) * (0.4 * maxWidth)
  };
}

// Calcular CombatZones
function calculateCombatZones(combat: number, maxWidth: number) {
  const combatZones: { width: number }[] = [];
  if (combat <= 20) combatZones.push({ width: 0.05 * maxWidth });
  else if (combat <= 50) combatZones.push({ width: 0.5 * maxWidth });
  else if (combat <= 80) combatZones.push({ width: 0.10 * maxWidth }, { width: 0.15 * maxWidth });
  else if (combat <= 99) combatZones.push({ width: 0.15 * maxWidth }, { width: 0.20 * maxWidth });
  else if (combat === 100) combatZones.push({ width: 0.30 * maxWidth });
  
  return combatZones;
}

// Calcular las zonas completas
function calculateZones(power: number, combat: number, maxWidth: number) {
  const powerZone = calculatePowerZone(power, maxWidth);
  const combatZones = calculateCombatZones(combat, maxWidth);
  const allZones = [powerZone, ...combatZones];
  const totalZonesWidth = allZones.reduce((sum, zone) => sum + zone.width, 0);
  const remainingSpace = maxWidth - totalZonesWidth;
  const spaceSize = remainingSpace / (allZones.length + 1);
  
  let currentPosition = spaceSize;
  return allZones.map(zone => {
    const z = { start: currentPosition, width: zone.width };
    currentPosition += zone.width + spaceSize;
    return z;
  });
}

// === Computed ===

const isInsideColoredZone = computed(() =>
  coloredZones.value.some(
    (zone) =>
      minibarPos.value >= zone.start &&
      minibarPos.value + minibarWidth.value <= zone.start + zone.width
  )
);

// coloredZones ahora usa la función calculateZones
const coloredZones = computed(() => {
  if (!props.character || maxTotalWidth.value <= 1) return [];

  const { combat, power } = props.character.powerstats;
  return calculateZones(power, combat, maxTotalWidth.value);
});

// Computed para la velocidad
const speed = computed(() => {
  if (!props.character) return 1;
  return Math.exp((75 - props.character.powerstats.speed / 1.5) * 0.02);
});

// Computed para el ancho de la minibarra
const minibarWidth = computed(() => {
  if (!props.character) return 20;
  return Math.max(5, Math.min(40, (130 - props.character.powerstats.intelligence) / 3));
});

// Computed para penalty
const penalty = computed(() => {
  if (!props.character) return 4;
  return Math.min(10, 1 + ((100 - props.character.powerstats.durability) / 90) * 9);
});

// Computed para bonus
const bonus = computed(() => {
  if (!props.character) return 1;
  return 1 + props.character.powerstats.strength / 50;
});

// === Funciones de actualización ===

// Update Bar Width
const updateBarWidth = () => {
  if (progressBarRef.value) {
    const element = progressBarRef.value.$el ?? progressBarRef.value;
    maxTotalWidth.value = progressBarRef.value.offsetWidth;
    barWidth.value = element.clientWidth;
  }
};

// Update Width
const updateWidth = () => {
  if (progressBarRef.value) {
    maxTotalWidth.value = progressBarRef.value.$el.offsetWidth || 1; 
  }
};

// Mover minibarra
const moveMinibar = () => {
  minibarPos.value += speed.value * direction.value;
  if (minibarPos.value + minibarWidth.value >= barWidth.value || minibarPos.value <= 0) {
    direction.value *= -1;
  }
};

// Actualizar Hold
const updateHold = () => {
  if (!props.isCountdownActive) return;  // No actualizar el contador si el countdown no está activo
  if (!isHolding.value) return;

  // Limpiar el intervalo anterior
  clearInterval(holdTimer);
  // Si no estamos dentro de la zona, reiniciar el intervalSpeed al valor base
  const intervalSpeed = isInsideColoredZone.value 
    ? Math.max(10, baseHoldInterval * Math.exp(-holdTime.value / 1000))  // Normal behavior
    : baseHoldInterval;  // Reset intervalSpeed to base value if not inside colored zone

  // Actualizar el contador según si estamos dentro o fuera de la zona
  counter.value += isInsideColoredZone.value ? bonus.value : -penalty.value;
  counter.value = Math.max(counter.value, 0);  // Asegurarse que el contador no sea negativo
  emit("updateCounter", counter.value);

  // Limpiar el intervalo anterior
  clearInterval(holdTimer);

  // Establecer un nuevo intervalo con el intervalSpeed actualizado
  holdTimer = setInterval(updateHold, intervalSpeed);
};

const startHold = () => {
  if (!props.isCountdownActive) return;  // Solo continuar si el countdown está activo
  if (!isHolding.value) {
    isHolding.value = true;
    holdTime.value = 0;

    counter.value += isInsideColoredZone.value ? bonus.value : -penalty.value;
    counter.value = Math.max(counter.value, 0);
    emit("updateCounter", counter.value);

    // Limpiar el intervalo anterior
    clearInterval(holdTimer);

    holdTimer = setInterval(updateHold, baseHoldInterval);
  }
};

const stopHold = () => {
  if (!props.isCountdownActive) return;  // Detener solo si el countdown está activo
  isHolding.value = false;

  clearInterval(holdTimer);
};

// === Eventos de teclado ===
const handleKeyDown = (event: KeyboardEvent) => {
  if (!props.isCountdownActive) return;  // Solo permite comenzar si el countdown está activo
  if (event.code === "Space") {
    event.preventDefault();
    startHold();
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (!props.isCountdownActive) return;  // Solo permite detener si el countdown está activo
  if (event.code === "Space") {
    event.preventDefault();
    stopHold();
  }
};

// === Lifecycle Hooks ===
onMounted(() => {
  nextTick(updateBarWidth);
  nextTick(updateWidth);
  window.addEventListener("resize", updateBarWidth);

  interval = setInterval(moveMinibar, 12);

    // Si está en modo auto, establece el intervalo para aumentar o reducir el contador
    if (props.isAuto) {
      intervalAutoClicks = setInterval(() => {
        if (props.isCountdownActive) {
          if (isInsideColoredZone.value) counter.value += bonus.value;
          else if (Math.random() <= 0.1) counter.value -= penalty.value;

          emit("updateCounter", counter.value);
        }
      }, 50);
    } else {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }

});


// Limpiar los intervalos cuando el countdown termina
onUnmounted(() => {
  clearInterval(interval);
  clearInterval(holdTimer);
  clearInterval(intervalAutoClicks); 
  window.removeEventListener("resize", updateBarWidth);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});
</script>
