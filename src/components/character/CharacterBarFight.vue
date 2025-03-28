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
            backgroundColor: zone.color
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
          opacity: isHolding || isAutoClick ? 0.5 : 1
        }"
      ></div>
    </v-progress-linear>

    <!-- Información -->
  <v-row>
    <v-col>Contador: {{ Math.round(counter * 10) / 10 }}</v-col>
    <v-col>Bonus: {{ Math.round(bonus * 10) / 10 }}</v-col>
    <v-col>Penalty: {{ Math.round(penalty * 100) / 100 }}</v-col>
    <v-col>Speed: {{ Math.round(speed * 10) / 10 }}</v-col>
    <v-col>Nº zones: {{ coloredZones.length }}</v-col>
    <v-col>Width zones: {{ Math.round(coloredZones[0]?.width * 10) / 10 }}</v-col>
    <v-col>Bar width: {{ Math.round(minibarWidth * 10) / 10 }}</v-col>
  </v-row>
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
  counter: { type: Number, default: 1 },
});

const emit = defineEmits<{
  (event: "updateCounter", value: number): void;
}>();

// Refs comunes
const barWidth = ref(0);
const maxTotalWidth = ref(0); 
const progressBarRef = ref<HTMLElement | null>(null);
const direction = ref(1);
const minibarPos = ref(0);

// Refs para jugador
const baseHoldInterval = 50;
const isHolding = ref(false);
let interval: number;
let holdTimer: number;
const holdTime = ref(0);

// Refs para jugador auto
const baseHoldIntervalAuto = 75; //velocidad del intervalo del jugador en modo auto
const baseChanceToHitAuto = 2; //probabilidad de acertar en modo auto, a mas valor menos probabilidad
const isAutoClick = ref(false); //el enemigo simula un click
let intervalAutoClicks: number;
const autoBonusCounter = ref(1);


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
  if (combat <= 20) combatZones.push({ width: 0.1 * maxWidth });
  else if (combat <= 50) combatZones.push({ width: 0.1 * maxWidth }, { width: 0.1 * maxWidth });
  else if (combat <= 80) combatZones.push({ width: 0.2 * maxWidth },{ width: 0.1 * maxWidth });
  else if (combat <= 99) combatZones.push({ width: 0.2 * maxWidth },{ width: 0.2 * maxWidth });
  else if (combat === 100) combatZones.push({ width: 0.2 * maxWidth },{ width: 0.2 * maxWidth },{ width: 0.1 * maxWidth });
  
  return combatZones;
}

// Calcular las zonas completas
function calculateZones(power: number, combat: number, maxWidth: number) {
  const powerZone = { ...calculatePowerZone(power, maxWidth), type: 'power' };
  const combatZones = calculateCombatZones(combat, maxWidth).map(z => ({ ...z, type: 'combat' }));

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


// === Computed ===

//Si cualquier parte de la minibarra sobresale fuera de la zona (por izquierda o por derecha), no se considera dentro y devolverá undefined
//version descartada tras algunas pruebas, la dejamos por si se quisiera recuperar
// const currentZone = computed(() =>
//   coloredZones.value.find(
//     (zone) =>
//       minibarPos.value >= zone.start &&
//       minibarPos.value + minibarWidth.value <= zone.start + zone.width
//   )
// );

//Si cualquier parte de la minibarra sobresale fuera de la zona (por izquierda o por derecha), se sigue considerando dentro y devolvera true
const currentZone = computed(() =>
  coloredZones.value.find(
    (zone) =>
      minibarPos.value + minibarWidth.value > zone.start && // El borde derecho de la minibarra entra en la zona
      minibarPos.value < zone.start + zone.width            // El borde izquierdo de la minibarra aún no ha pasado el final de la zona
  )
);

const isInsideColoredZone = computed(() => !!currentZone.value);
const isInPowerZone = computed(() => currentZone.value?.type === 'power');
const isInCombatZone = computed(() => currentZone.value?.type === 'combat');

// calcula el nuevo valor del counter según si estamos dentro de una zona coloreada y segun el color de la zona
const updateCounterValue = () => {
  let bonusFinal: number;
  if (isInCombatZone.value) {
    bonusFinal = bonus.value;
    clearInterval(holdTimer); //ponemos este limite para que en las zonas de combate no se pueda mantener el boton apretado.
    holdTime.value = 0;
  }
  else {
    bonusFinal = holdTime.value/2;
  }

  let newValue: number;
  if (isInsideColoredZone.value) {
    newValue = props.counter + bonusFinal;
  }
  else {
    newValue = props.counter - penalty.value;
    clearInterval(holdTimer); //ponemos este limite para que no se pueda apretar sin soltar todo el rato, si apretamos y es una zona fuera del color, se resetea el contador
    holdTime.value = 0;
  }
  newValue = Math.max(newValue, 0);
  emit("updateCounter", newValue);
};

// calcula el nuevo valor del counter para el modo auto
const updateCounterValueAuto = () => {
  // Asegúrate de que currentZone y maxWidth estén correctamente definidas

  const zoneWidth = currentZone.value ? currentZone.value.width : 0;  // Anchura de la zona coloreada
  const maxWidth = 100; // O el valor máximo adecuado para el ancho total de la barra
  const randomValue = Math.random();

  if (randomValue <= 0.95) {
    autoBonusCounter.value += 1;
    isAutoClick.value = true;
  } else {
    autoBonusCounter.value = 1;
    isAutoClick.value = false;
  }

  const bonusFinal = isInCombatZone.value ? bonus.value/2 : autoBonusCounter.value;
  let newValue = 0;

  // Cálculo de la precisión basado en la anchura de la zona
  // const precision = Math.max(0.05, Math.min(0.95, Math.pow(zoneWidth / maxWidth, baseChanceToHitAuto)));
  // expo = 1.5 → hace que 0.2 tenga solo un 8% y 0.4 suba al 25%.
  // expo = 2 → hace que 0.2 tenga un 4% y 0.4 solo un 16%, pero sube bien al 64% cuando es
  const expo = 1
  const factor = 1.3
  const rawPrecision = Math.pow(zoneWidth, expo);
  const precision = Math.max(0.05, Math.min(0.95, rawPrecision * factor));


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
};

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
  // A mayor inteligencia, mayor será el valor
  return Math.max(5, (props.character.powerstats.intelligence/2 - 10));
});

// Computed para penalty
const penalty = computed(() => {
  if (!props.character) return 4;
  return (props.counter * ((15 - props.character.powerstats.durability/10))/100);
});

// Computed para bonus
const bonus = computed(() => {
  if (!props.character) return 1;
  return 1 + props.character.powerstats.strength/2;
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
  if (!props.isCountdownActive || isHolding.value) return;

  isHolding.value = true;
  holdTime.value = 1; // empezamos en 1 directamente

  holdTimer = setInterval(updateHold, baseHoldInterval);
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
  clearInterval(interval);
  clearInterval(holdTimer);
  clearInterval(intervalAutoClicks); 
  window.removeEventListener("resize", updateBarWidth);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});
</script>
