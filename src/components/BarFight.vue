<template>
  <div class="pa-4 d-flex flex-column align-center">
    <div class="hb-ball">
      <svg viewBox="0 0 200 200" class="wave" :style="{
         transform: 'scale(' + (1 + parseInt(counter)/5) + ')'
       }">
        <defs>
          <filter id="waveFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="turbulence">
              <animate 
                attributeName="baseFrequency" 
                values="0.015; 0.03; 0.015" 
                dur="10s" 
                keyTimes="0; 0.5; 1" 
                keySplines="0.25 0.8 0.25 1" 
                repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10"/>
          </filter>
        </defs>
        <circle cx="100" cy="100" r="80" filter="url(#waveFilter)"/>
      </svg>
    </div>
    <v-progress-linear :style="{ width: barWidth + 'px', height: '20px', position: 'relative' }" class="rounded-pill"
      color="grey lighten-1" background-color="grey darken-3">
      <div v-for="(zone, index) in props.coloredZones" :key="index" :style="{
        position: 'absolute',
        left: zone.start + 'px',
        width: zone.width + 'px',
        height: '100%',
        backgroundColor: 'red'
      }"></div>

      <div
        class="bg-blue-grey-darken-3"
       :style="{
        position: 'absolute',
        left: minibarPos + 'px',
        width: props.minibarWidth + 'px',
        height: '100%'
      }"></div>
    </v-progress-linear>
    <div class="pa-6">
      <v-btn @mousedown="startHold" @mouseup="stopHold" @mouseleave="stopHold" icon="mdi-flare" size="x-large">
      </v-btn>
    </div>
    <p>Contador: {{ counter }}</p>
<p>bonus: {{ props.bonus }}</p>
<p>penalty: {{ props.penalty }}</p>
<p>speed: {{ props.speed }}</p>
<p>nº zones: {{ props.coloredZones.length }}</p>
<p>width zones: {{ props.coloredZones[0] }}</p>
<p>bar width: {{ props.minibarWidth }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted, defineProps } from "vue";
  // Recibimos los valores como props
  const props = defineProps({
    minibarWidth: {
      type: Number,
      default: 10
    },
    speed: {
      type: Number,
      default: 1
    },
    penalty: {
      type: Number,
      default: 2
    },
    bonus: {
      type: Number,
      default: 1
    },
    coloredZones: {
      type: Array,
      default: [
        { start: 20, width: 140 },
        { start: 120, width: 30 },
        { start: 200, width: 50 }
      ]
    }
  });
  const barWidth = 300;
  const baseHoldInterval = 100; // Tiempo base en milisegundos
  const counter = ref(0);
  const direction = ref(1);
  const isHolding = ref(false);
  const minibarPos = ref(0);
  let interval;
  let holdTimer;
  const holdTime = ref(0); // Tiempo acumulado en milisegundos

  const isInsideColoredZone = computed(() => {
    return props.coloredZones.some(zone =>
      // Verificamos si toda la minibar está completamente dentro de la zona
      minibarPos.value >= zone.start && 
      minibarPos.value + props.minibarWidth <= zone.start + zone.width
    );
  });

  const moveMinibar = () => {
    minibarPos.value += props.speed * direction.value;
    if (minibarPos.value + props.minibarWidth >= barWidth || minibarPos.value <= 0) {
      direction.value *= -1;
    }
  };

  const updateHold = () => {
    if (!isHolding.value) return;

    holdTime.value += 10; // Acumulamos tiempo cada 10ms

    // Calculamos la aceleración exponencial de la velocidad
    const intervalSpeed = Math.max(5, baseHoldInterval * Math.exp(-holdTime.value / 1000));

    if (isInsideColoredZone.value) {
      counter.value += props.bonus;
    } else {
      counter.value -= props.penalty;
    }

    counter.value = Math.max(counter.value, 0);

    // Reiniciamos el temporizador con la nueva velocidad
    clearInterval(holdTimer);
    holdTimer = setInterval(updateHold, intervalSpeed);
  };

  const startHold = () => {
    if (!isHolding.value) {
      isHolding.value = true;
      holdTime.value = 0;
      //aumentamos el counter si hacemos un click por pequeño que sea asi nos aseguramos de que siempre aumentara en cuanto hacemos click en una zona correcta sin esperar los 100ms de baseHoldInterval
      if (isInsideColoredZone.value) {
        counter.value += props.bonus;
      } else {
        counter.value -= props.penalty;
      }

      counter.value = Math.max(counter.value, 0);

      holdTimer = setInterval(updateHold, baseHoldInterval); // Comenzamos con el tiempo base
    }
  };

  const stopHold = () => {
    isHolding.value = false;
    clearInterval(holdTimer);
  };

  onMounted(() => {
    interval = setInterval(moveMinibar, 16);
  });

  onUnmounted(() => {
    clearInterval(interval);
    clearInterval(holdTimer);
  });
</script>
