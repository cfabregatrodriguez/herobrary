<template>
  <div class="hb-countdown">
    <p class="permanent-marker-regular">{{ count }}</p>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref } from "vue";

// Props
const props = defineProps({
  maxCount: { type: Number, default: 10 }
});

// Emits
const emit = defineEmits(["finished"]);

// Reactive Variables
const count = ref(props.maxCount);


// Actions
let interval: number | null = null;

const startCounting = () => {
  if (interval) clearInterval(interval); // Clear any previous interval

  count.value = props.maxCount; // Reset count to maxCount

  interval = setInterval(() => {
    if (count.value > 0) {
      count.value--; // Decrease count each second
    } else {
      clearInterval(interval!); // Clear interval when countdown finishes
      emit("finished"); // Emit "finished" event when countdown reaches zero
    }
  }, 1000);
};

// Expose startCounting method to be callable from parent
defineExpose({ startCounting });
</script>
