<template>
  <div class="hb-countdown">
    <p class="permanent-marker-regular">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  maxCount: { type: Number, default: 10 }
});

const emit = defineEmits(["finished"]);

const count = ref(props.maxCount);
let interval: number | null = null;

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

// Exponer el método para que el padre pueda llamarlo
defineExpose({ startCounting });
</script>