<template>
    <div>
        <v-row>
            <v-col cols="5" class="pt-0 pr-0">
                <Character v-if="character" :character="character" :counter="counter" :bgColor="bgColor" :isAuto="true"
                    @divisionPassed="handleDivisionPassed" @counterChange="handleCounterChange"
                    @filled="handleFilled" />
            </v-col>
            <v-col cols="2" class="d-sm-flex align-center justify-center">
                <div>
                    <Countdown v-show="countdownStore.isCountdownActive" class="mb-8" ref="countdownRef" :maxCount="20"
                        @finished="handleFinish" />
                    <v-btn v-show="!countdownStore.isCountdownActive" class="mt-8 permanent-marker-regular"
                        @click="startCountdown" size="x-large">Start</v-btn>
                    <div v-show="!countdownStore.isCountdownActive" class="ma-8">
                        <p class="text-caption">Press the Start button to begin the fight.</p>
                        <p class="text-caption">Press the spacebar and hold when the marker passes over the blue bars to
                            charge your energy.</p>
                    </div>
                </div>
            </v-col>
            <v-col cols="5" class="pt-0 pl-0">
                <Character v-if="character2" :character="character2" :counter="counter2" :bgColor="bgColor2"
                    :isAuto="true" @divisionPassed="handleDivisionPassed2" @counterChange="handleCounterChange2"
                    @filled="handleFilled2" />
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

// Pinia Stores
import { useStatsPlayerStore } from "@/stores/statsPlayerStore";
const statsPlayerStore = useStatsPlayerStore();
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();  // Usamos la store de countdown

// Components
import Character from '@/components/Character.vue';
import Countdown from "@/components/Countdown.vue";

// Reactive state  
const counter = ref(0);
const counter2 = ref(0);
const character = ref<CharacterModel | null>(null);
const character2 = ref<CharacterModel | null>(null);
const countdownRef = ref();
const bgColor = ref('#3498db');
const bgColor2 = ref('red');
const totalBarsPassed = ref(0);

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
    // Llamamos a la acción de la store para registrar una victoria y la batalla
    statsPlayerStore.recordWin();
    statsPlayerStore.addBattle(
        Number(characterId),  // characterId
        Number(characterId2), // enemyCharacterId
        counter.value,        // playerEnergy
        counter2.value        // enemyEnergy
    );
    handleFinish();
    console.log('WIN: ', statsPlayerStore)
};

const handleFilled2 = () => {
    // Llamamos a la acción de la store para registrar una derrota y la batalla
    statsPlayerStore.recordLoss();
    statsPlayerStore.addBattle(
        Number(characterId),  // characterId
        Number(characterId2), // enemyCharacterId
        counter.value,        // playerEnergy
        counter2.value        // enemyEnergy
    );
    handleFinish();
    console.log('LOST: ', statsPlayerStore)
};

// Bar passed logic
const handleDivisionPassed = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

const handleDivisionPassed2 = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

// Countdown logic 
const startCountdown = () => {
    counter2.value = 0;
    counter.value = 0;
    countdownStore.startCountdown();  // Usamos la store para activar la cuenta atrás

    if (countdownRef.value) {
        countdownRef.value.startCounting();
    } else {
        console.error("countdownRef no está disponible");
    }
}

const handleFinish = () => {
    countdownStore.stopCountdown();  // Usamos la store para desactivar la cuenta atrás
};

onMounted(async () => {
    try {
        character.value = await getCharacter(characterId);
    } catch (error) {
        console.error("Error al obtener el personaje 1:", error);
        character.value = {} as CharacterModel; // Evita que sea null
    }

    try {
        character2.value = await getCharacter(characterId2);
    } catch (error) {
        console.error("Error al obtener el personaje 2:", error);
        character2.value = {} as CharacterModel; // Evita que sea null
    }
});
</script>
