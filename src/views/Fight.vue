<template>
    <div>
        <v-row>
            <!-- Character 1 -->
            <v-col cols="5" class="pt-0 pr-0">
                <Character v-if="character" :character="selectedCharactersStore.getCharacterByIndex(0)"
                    :counter="counter" :bgColor="bgColor" :isAuto="true" @divisionPassed="handleDivisionPassed"
                    @counterChange="handleCounterChange" @filled="handleFilled" :index="0"
                    :isCharacterPowerBar="true" />
            </v-col>

            <!-- Fight control and instructions -->
            <v-col cols="2" class="d-sm-flex align-center justify-center">
                <div>
                    <!-- Countdown timer -->
                    <Countdown v-show="countdownStore.isCountdownActive" class="mb-8" ref="countdownRef" :maxCount="20"
                        @finished="handleFinish" />

                    <!-- Button to start the fight -->
                    <v-btn v-show="!countdownStore.isCountdownActive" class="mt-8 permanent-marker-regular"
                        @click="startCountdown" icon="" variant="text" width="100" height="100" border>Fight</v-btn>

                    <!-- Instructions displayed when countdown is not active -->
                    <div v-show="!countdownStore.isCountdownActive" class="ma-8">
                        <p class="text-caption">Press the Start button to begin the fight.</p>
                        <p class="text-caption">Press the spacebar and hold when the marker passes over the blue bars to
                            charge your energy.</p>
                    </div>
                </div>
            </v-col>

            <!-- Character 2 -->
            <v-col cols="5" class="pt-0 pl-0">
                <Character v-if="character2" :character="selectedCharactersStore.getCharacterByIndex(1)"
                    :counter="counter2" :bgColor="bgColor2" :isAuto="true" @divisionPassed="handleDivisionPassed2"
                    @counterChange="handleCounterChange2" @filled="handleFilled2" :index="1"
                    :isCharacterPowerBar="true" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, onMounted } from "vue";
import { getCharacter } from "@/services/api";

// Models
import { CharacterModel } from '@/models/character.model';

// Pinia Stores
import { useStatsPlayerStore } from "@/stores/statsPlayerStore";
const statsPlayerStore = useStatsPlayerStore();
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();  // Countdown store for managing countdown logic
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
const selectedCharactersStore = useSelectedCharactersStore();

// Components
import Character from '@/components/Character.vue';
import Countdown from "@/components/Countdown.vue";

// Reactive Variables
const counter = ref(0);
const counter2 = ref(0);
const character = ref<CharacterModel | null>(null);
const character2 = ref<CharacterModel | null>(null);
const countdownRef = ref();
const bgColor = ref('#3498db');
const bgColor2 = ref('red');
const totalBarsPassed = ref(0);


// Actions

// Counter change logic
const handleCounterChange = (value: number) => {
    counter.value = value;
    if (counter.value < 0) counter.value = 0; // Ensure counter doesn't go negative
};

const handleCounterChange2 = (value: number) => {
    counter2.value = value;
    if (counter2.value < 0) counter2.value = 0; // Ensure counter doesn't go negative
};

// Win and loss handling
const handleFilled = () => {
    // Record a win and battle stats
    statsPlayerStore.recordWin();
    statsPlayerStore.addBattle(
        Number(selectedCharactersStore.getCharacterByIndex(0).id),  // characterId
        Number(selectedCharactersStore.getCharacterByIndex(1).id), // enemyCharacterId
        counter.value,        // playerEnergy
        counter2.value        // enemyEnergy
    );
    handleFinish();
    console.log('WIN: ', statsPlayerStore);
};

const handleFilled2 = () => {
    // Record a loss and battle stats
    statsPlayerStore.recordLoss();
    statsPlayerStore.addBattle(
        Number(selectedCharactersStore.getCharacterByIndex(0).id),  // characterId
        Number(selectedCharactersStore.getCharacterByIndex(1).id), // enemyCharacterId
        counter.value,        // playerEnergy
        counter2.value        // enemyEnergy
    );
    handleFinish();
    console.log('LOST: ', statsPlayerStore);
};

const handleDivisionPassed = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

const handleDivisionPassed2 = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

const startCountdown = () => {
    counter2.value = 0;
    counter.value = 0;
    countdownStore.startCountdown();  // Activate countdown using the store

    if (countdownRef.value) {
        countdownRef.value.startCounting();
    } else {
        console.error("countdownRef is not available");
    }
};

const handleFinish = () => {
    countdownStore.stopCountdown();  // Stop countdown using the store
};

onMounted(async () => {
    try {
        character.value = await getCharacter(selectedCharactersStore.getCharacterByIndex(0).id);
    } catch (error) {
        console.error("Error fetching character 1:", error);
        character.value = {} as CharacterModel; // Prevent null
    }

    try {
        character2.value = await getCharacter(selectedCharactersStore.getCharacterByIndex(1).id);
    } catch (error) {
        console.error("Error fetching character 2:", error);
        character2.value = {} as CharacterModel; // Prevent null
    }
});
</script>
