<template>
    <div>
        <v-row v-if="character && character2" >
            <v-col cols="5" class="pt-0 pr-0">
                <Character
                    :character="character" 
                    :counter="counter" 
                    :flash="flash1" 
                    :isCountdownActive="isCountdownActive" 
                    :bgColor="bgColor"
                    @handleDivisionPassed="handleDivisionPassed" 
                    @handleCounterChange="handleCounterChange" 
                    @handleFilled="handleFilled" 
                />
            </v-col>
            <v-col cols="2" class="d-sm-flex align-center justify-center">
                <div>
                    <Countdown v-show="isCountdownActive" class="mb-8" ref="countdownRef" :maxCount="20"
                        @finished="handleFinish" />
                    <v-btn v-show="!isCountdownActive" class="mt-8 permanent-marker-regular" @click="startCountdown" size="x-large">Start</v-btn>
                    <div v-show="!isCountdownActive" class="ma-8">
                        <p class="text-caption">Press the Start button to begin the fight.</p>
                        <p class="text-caption">Press the spacebar and hold when the marker passes over the blue bars to
                            charge your energy.</p>
                    </div>
                </div>
            </v-col>
            <v-col cols="5" class="pt-0 pl-0">
                <Character
                    :character="character2" 
                    :counter="counter2" 
                    :flash="flash2" 
                    :isCountdownActive="isCountdownActive" 
                    :bgColor="bgColor2"
                    :isAuto="true"
                    @handleDivisionPassed="handleDivisionPassed2" 
                    @handleCounterChange="handleCounterChange2" 
                    @handleFilled="handleFilled2"  
                />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";
import { CharacterModel } from '@/models/character.model';

// Components
import Character from '@/components/Character.vue';
import Countdown from "@/components/Countdown.vue";

// Reactive state  
const counter = ref(0);
const counter2 = ref(0);
const character = ref<CharacterModel | null>(null);
const character2 = ref<CharacterModel | null>(null);
const countdownRef = ref();
const flash1 = ref(false);
const flash2 = ref(false);
const bgColor = ref('#3498db');
const bgColor2 = ref('red');
const totalBarsPassed = ref(0);
const totalBarsPassed2 = ref(0);

// Estado para saber si la cuenta atrás está activa
const isCountdownActive = ref(false);

// Route handling
const route = useRoute();
const characterId = route.params.id as string;
const characterId2 = route.params.vs as string;

// Counter update logic 
const handleCounterChange = (value: number) => {
    counter.value = value;
    if (counter.value < 0) counter.value = 0; // Asegurar que no sea negativo
};

const handleCounterChange2 = (value: number) => {
    counter2.value = value;
    if (counter2.value < 0) counter2.value = 0; // Asegurar que no sea negativo
};

// Win logic
const handleFilled = () => {
    flash1.value = true;
};

const handleFilled2 = () => {
    flash2.value = true;
};

// Bar passed logic
const handleDivisionPassed = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

const handleDivisionPassed2 = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

// Countdown  logic 
const startCountdown = () => {
    counter2.value = 0;
    counter.value = 0;
    isCountdownActive.value = true;  // Activamos el estado de la cuenta atrás
    countdownRef.value?.startCounting();
};

const handleFinish = () => {
    isCountdownActive.value = false;  // Desactivamos el estado cuando termine la cuenta atrás
};

// Get character fields
onMounted(async () => {
    try {
        const data = await getCharacter(characterId);
        character.value = data;
    } catch (error) {
        console.error("Error al obtener el personaje 1:", error);
    }
    try {
        const data = await getCharacter(characterId2);
        character2.value = data;
    } catch (error) {
        console.error("Error al obtener el personaje 2:", error);
    }
});
</script>
