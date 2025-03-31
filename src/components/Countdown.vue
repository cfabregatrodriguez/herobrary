<template>
  <div class="hb-countdown">
    <p data-testid="countdown" class="permanent-marker-regular">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref } from 'vue';

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
    } else {
      clearInterval(interval!);
      emit("finished");
    }
  }, 1000);
};

// Exponer el método startCounting
defineExpose({ startCounting });
</script>
