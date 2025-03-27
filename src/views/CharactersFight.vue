<template>
    <div>
        <v-row v-if="character && character2" >
            <v-col cols="4" class="pt-0 pr-0">
                <div class="d-sm-flex">
                    <CharacterCardFight :character="character" characterNum="1" />
                    <EnergyBall :counter="counter" :bgColor="'#3498db'" @updateCounter="handleCounterChange" />
                </div>
                <BarFight :character="character" :counter="counter" :bgColor="'#3498db'"
                    :isCountdownActive="isCountdownActive" @updateCounter="handleCounterChange" />
            </v-col>
            <v-col class="d-sm-flex align-center justify-center">
                <div>
                    <Countdown v-show="isCountdownActive" class="mb-8" ref="countdownRef" :maxCount="3"
                        @finished="handleFinish" />
                    <v-btn v-show="!isCountdownActive" class="mt-8" @click="startCountdown" size="x-large">Start</v-btn>
                    <div v-show="!isCountdownActive" class="ma-8">
                        <p class="text-caption">Press the Start button to begin the fight.</p>
                        <p class="text-caption">Press the spacebar and hold when the marker passes over the blue bars to
                            charge your energy.</p>
                    </div>
                </div>
            </v-col>
            <v-col cols="4" class="pt-0 pl-0">
                <div class="d-sm-flex">
                    <EnergyBall :counter="counter2" @updateCounter="handleCounterChange2" />
                    <CharacterCardFight :character="character2" characterNum="2" />
                </div>
                <BarFight :character="character2" :counter="counter2" @updateCounter="handleCounterChange2"
                    :isCountdownActive="isCountdownActive" :isAuto="true" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";

// Components
import EnergyBall from "@/components/EnergyBall.vue";
import BarFight from "@/components/BarFight.vue";
import CharacterCardFight from "@/components/CharacterCardFight.vue";
import Countdown from "@/components/Countdown.vue";

// Models & Types
import { Character } from '@/models/character.model';

// Reactive state  
const counter = ref(0);
const counter2 = ref(0);
const character = ref<Character | null>(null);
const character2 = ref<Character | null>(null);
const countdownRef = ref();

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
