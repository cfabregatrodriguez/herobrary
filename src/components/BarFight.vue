<template>
  <div class="pa-4 d-flex flex-column align-center">
    <v-progress-linear :style="{ width: barWidth + 'px', height: '20px', position: 'relative' }" class="rounded-pill"
      color="grey lighten-1" background-color="grey darken-3">
      <div v-for="(zone, index) in coloredZones" :key="index" :style="{
        position: 'absolute',
        left: zone.start + 'px',
        width: zone.width + 'px',
        height: '100%',
        backgroundColor: 'red'
      }"></div>

      <div
        class="rounded-pill bg-blue-grey-darken-3"
       :style="{
        position: 'absolute',
        left: minibarraPos + 'px',
        width: minibarraWidth + 'px',
        height: '100%'
      }"></div>
    </v-progress-linear>
    <div class="pa-6">
      <v-btn @mousedown="startHold" @mouseup="stopHold" @mouseleave="stopHold" icon="mdi-flare" size="x-large">
      </v-btn>
    </div>
    <p>Contador: {{ counter }}</p>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";

  const barWidth = 300;
  const minibarraWidth = ref(10);
  const speed = ref(1);
  const baseHoldInterval = 100; // Tiempo base en milisegundos
  const counter = ref(0);
  const isHolding = ref(false);
  const minibarraPos = ref(0);
  const direction = ref(1);
  const penalty = ref(2);
  const bonus = ref(1);
  let interval;
  let holdTimer;
  const holdTime = ref(0); // Tiempo acumulado en milisegundos

  const coloredZones = ref([
    { start: 20, width: 40 },
    { start: 120, width: 30 },
    { start: 200, width: 50 }
  ]);

  const isInsideColoredZone = computed(() => {
    return coloredZones.value.some(zone =>
      minibarraPos.value + minibarraWidth.value >= zone.start &&
      minibarraPos.value <= zone.start + zone.width
    );
  });

  const moveMinibarra = () => {
    minibarraPos.value += speed.value * direction.value;
    if (minibarraPos.value + minibarraWidth.value >= barWidth || minibarraPos.value <= 0) {
      direction.value *= -1;
    }
  };

  const updateHold = () => {
    if (!isHolding.value) return;

    holdTime.value += 10; // Acumulamos tiempo cada 10ms

    // Calculamos la aceleración exponencial de la velocidad
    const intervalSpeed = Math.max(5, baseHoldInterval * Math.exp(-holdTime.value / 1000));

    if (isInsideColoredZone.value) {
      counter.value += bonus.value;
    } else {
      counter.value -= penalty.value;
    }

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
        counter.value += bonus.value;
      } else {
        counter.value -= penalty.value;
      }
      holdTimer = setInterval(updateHold, baseHoldInterval); // Comenzamos con el tiempo base
    }
  };

  const stopHold = () => {
    isHolding.value = false;
    clearInterval(holdTimer);
  };

  onMounted(() => {
    interval = setInterval(moveMinibarra, 16);
  });

  onUnmounted(() => {
    clearInterval(interval);
    clearInterval(holdTimer);
  });
</script>
