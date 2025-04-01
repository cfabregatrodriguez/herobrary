<template>
  <div class="hb-countdown">
    <p data-testid="countdown" class="permanent-marker-regular">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref } from 'vue';

// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();  // Using countdown store

// Props
const props = defineProps({
  maxCount: { type: Number, default: 10 }
});

// Emits
const emit = defineEmits(["finished"]);

// Reactive Variables
const count = ref(props.maxCount);

let interval: ReturnType<typeof setInterval> | null = null;

const startCounting = () => {
  if (interval) clearInterval(interval);

  count.value = props.maxCount;

  interval = setInterval(() => {
    if (count.value > 0) {
      count.value--;
    } else if (countdownStore.isBattleActive) {
      clearInterval(interval!);
      countdownStore.stopBattle();
      emit("finished");  // Emitir el evento solo si el combate sigue activo
    }
  }, 1000);
};

// Exponer el método startCounting
defineExpose({ startCounting });
</script>
