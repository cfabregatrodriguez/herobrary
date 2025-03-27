<template>
  <v-col cols="4" class="pt-0 pr-0">
    <div class="d-sm-flex">
      <!-- Avatar del primer personaje -->
      <CharacterCardFight :character="character" characterNum="1" />
      <EnergyBall 
        :character="character" 
        @divisionPassed="handleDivisionPassed" 
        :counter="counter" 
        :bgColor="'#3498db'" 
        :flash="flash1" 
        @updateCounter="handleCounterChange" 
        @filled="handleFilled" 
      />
    </div>
    <BarFight 
      :character="character" 
      :counter="counter" 
      :bgColor="'#3498db'"
      :isCountdownActive="isCountdownActive" 
      @updateCounter="handleCounterChange" 
    />
  </v-col>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import CharacterCardFight from '@/components/CharacterCardFight.vue';
import EnergyBall from '@/components/EnergyBall.vue';
import BarFight from '@/components/BarFight.vue';

const props = defineProps({
  character: Object,
  counter: Number,
  flash1: Boolean,
  isCountdownActive: Boolean,
});

const emit = defineEmits(['handleDivisionPassed', 'handleCounterChange', 'handleFilled']);
const flash1 = ref(false);
</script>
