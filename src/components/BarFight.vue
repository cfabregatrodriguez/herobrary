<template>
  <div class="pa-4 d-flex flex-column align-center" v-if="character">
    <v-progress-linear :style="{ width: barWidth + 'px', height: '20px', position: 'relative' }" class="rounded-pill"
      color="grey lighten-1" background-color="grey darken-3">
      <div v-for="(zone, index) in coloredZones" :key="index" :style="{
        position: 'absolute',
        left: zone.start + 'px',
        width: zone.width + 'px',
        height: '100%',
        backgroundColor: bgColor
      }"></div>

      <div 
        class="bg-blue-grey-darken-3"
       :style="{
        position: 'absolute',
        left: minibarPos + 'px',
        width: minibarWidth + 'px',
        height: '100%',
        opacity: isHolding ? '0.5' : '1'
      }"></div>
    </v-progress-linear>
    <div class="pa-6">
      <v-btn @mousedown="startHold" @mouseup="stopHold" @mouseleave="stopHold" icon="mdi-flare" size="x-large">
      </v-btn>
    </div>
    <p>Contador: {{ counter }}</p>
    <p>bonus: {{ bonus }}</p>
    <p>penalty: {{ penalty }}</p>
    <p>speed: {{ speed }}</p>
    <p>nº zones: {{ coloredZones.length }}</p>
    <p>width zones: {{ coloredZones[0] }}</p>
    <p>bar width: {{ minibarWidth }}</p>
  </div>
  <div v-else>
    <p>Character not available, loading...</p>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted} from "vue";

  // Recibir la propiedad "character" del componente padre
  const props = defineProps({
    character: {
      type: Object,
      required: false
    },
    bgColor: {
      type: String,
      default: 'red'
    },
    isAuto: { 
      type: Boolean, 
      default: false 
    }
  });


  const barWidth = 300;
  const baseHoldInterval = 100; // Tiempo base en milisegundos
  const counter = ref(0);
  const direction = ref(1);
  const isHolding = ref(false);
  const minibarPos = ref(0);
  let intervalAutoClicks;
  let interval;
  let holdTimer;
  const holdTime = ref(0); // Tiempo acumulado en milisegundos

  // Definir los eventos que se van a emitir
  const emit = defineEmits<{
    (event: 'updateCounter', value: number): void;
  }>();

  const isInsideColoredZone = computed(() => {
    return coloredZones.value.some(zone =>
      // Verificamos si toda la minibar está completamente dentro de la zona
      minibarPos.value >= zone.start && 
      minibarPos.value + minibarWidth.value <= zone.start + zone.width
    );
  });

  const moveMinibar = () => {
    minibarPos.value += speed.value * direction.value;
    if (minibarPos.value + minibarWidth.value >= barWidth || minibarPos.value <= 0) {
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

    counter.value = Math.max(counter.value, 0);
    emit('updateCounter', counter.value);

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

      counter.value = Math.max(counter.value, 0);
      emit('updateCounter', counter.value);

      holdTimer = setInterval(updateHold, baseHoldInterval); // Comenzamos con el tiempo base
    }
  };

  const stopHold = () => {
    isHolding.value = false;
    clearInterval(holdTimer);
  };

  // Otros computados
  const minibarWidth = computed(() => {
    if (!props.character) return 20;
    const intelligence = props.character.powerstats.intelligence;
    const factor = 3; 
    return Math.max(5, Math.min(40, (130 - intelligence) / factor));
  });

  const penalty = computed(() => {
    if (!props.character) return 4;
    const durability = props.character.powerstats.durability;
    let penaltyValue = 1 + ((100 - durability) / 90) * 9;
    return penaltyValue > 10 ? 10 : penaltyValue;
  });

  const bonus = computed(() => {
    if (!props.character) return 1;
    const strength = props.character.powerstats.strength;
    return 1 + (strength) / 10;
  });

  const coloredZones = computed(() => {

    if (!props.character) return []; // Si no hay personaje, devolvemos un array vacío

    const combat = props.character.powerstats.combat;
    const power = props.character.powerstats.power;
    const speed = props.character.powerstats.speed;

    const maxTotalWidth = 290;

    // Determinar el número de zonas según combat
    let numZones;

    if (combat <= 10) numZones = 5;
    else if (combat <= 50) numZones = 3;
    else if (combat <= 90) numZones = 2;
    else numZones = 1;

    // `power` define el ancho total antes de repartirlo
    let totalBaseWidth = Math.min(maxTotalWidth, Math.max(100, power * 2));

    // Definir el espacio entre zonas en función de combat (a más combat, más espacio)
    let minSpacing = 5; // Espaciado mínimo
    let maxSpacing = 30; // Espaciado máximo
    let spaceBetweenFactor = minSpacing + ((combat / 100) * (maxSpacing - minSpacing));

    // Calcular el ancho de cada zona ajustando el espaciado
    let totalSpacing = spaceBetweenFactor * (numZones - 1);
    let availableWidth = totalBaseWidth - totalSpacing;
    let zoneWidth = availableWidth / numZones;

    // Si el total sobrepasa el máximo, reajustar el espacio entre zonas
    while (totalBaseWidth > maxTotalWidth && spaceBetweenFactor > minSpacing) {
      spaceBetweenFactor -= 1;
      totalSpacing = spaceBetweenFactor * (numZones - 1);
      availableWidth = totalBaseWidth - totalSpacing;
      zoneWidth = availableWidth / numZones;
    }

    // Calcular el desplazamiento inicial basado en speed
    let minStart = 10;  // Mínima posición de inicio
    let maxStart = 100; // Máxima posición de inicio
    let start = minStart + ((100 - speed) / 100) * (maxStart - minStart);

    let zones = [];

    for (let i = 0; i < numZones; i++) {
      zones.push({ start: start, width: zoneWidth });
      start += zoneWidth + spaceBetweenFactor;
    }
    // Asegúrate de que siempre se devuelve un array, aunque esté vacío
    return Array.isArray(zones) ? zones : [];
  });

  const speed = computed(() => {
    if (!props.character) return 1; 
    const speedValue = props.character.powerstats.speed;
    const factor = 0.02;
    return Math.exp((75 - speedValue / 1.5) * factor);
  });

  const handleClick = () => {
    counter.value += 1;
    emit('updateCounter', counter.value);
    // Aquí podrías agregar la lógica de actualización del estado
  };

  const handleErrorClick = () => {
    counter.value -= 1;
    emit('updateCounter', counter.value);
    // Aquí podrías agregar la lógica de actualización del estado
  };

  const handleSpacebarDown = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      startHold();
    }
  };

  const handleSpacebarUp = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      stopHold();
    }
  };


  onMounted(() => {
    interval = setInterval(moveMinibar, 16);
    window.addEventListener('keydown', handleSpacebarDown);
    window.addEventListener('keyup', handleSpacebarUp);

    if (props.isAuto) {
      // Simulación de que el personaje 2 hace clic automáticamente
      intervalAutoClicks = setInterval(() => {
        const chanceToHit = Math.random();
        // Detectar si la minibar pasa por encima de las coloredZones
        if (isInsideColoredZone.value) {
          if (chanceToHit <= 0.8) {
            handleClick(); // Hace clic dentro de la zona coloreada con 80% de probabilidad
          }
        }
        else {
          if (chanceToHit <= 0.1) {
            handleErrorClick();
          }  
        }
      }, 20);  // Intervalo de 1 segundo para hacer clic
    }

  });
  onUnmounted(() => {
    clearInterval(intervalAutoClicks);
    clearInterval(interval);
    clearInterval(holdTimer);
    window.removeEventListener('keydown', handleSpacebarDown);
    window.removeEventListener('keyup', handleSpacebarUp);
  });
</script>
