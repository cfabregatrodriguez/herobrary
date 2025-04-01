<template>
    <div>
        <div class="hb-fight__backgroundBar" :style="breakpoint.smAndDown ? 'height: 100%' : ''">
        </div>
        <v-row class="flex-column flex-sm-row justify-center align-center">
            <!-- Countdown timer -->
            <!-- Character 1 -->
            <v-col cols="12" sm="5" class="pt-0 pr-0">
                <Character v-if="character" :character="selectedCharactersStore.getCharacterByIndex(0)"
                    :counter="counter" :bgColor="bgColor" :isAuto="false" @divisionPassed="handleDivisionPassed"
                    @counterChange="handleCounterChange" @filled="endBattle" :index="0" :isCharacterPowerBar="true"
                    :winLose="winLose" />
            </v-col>
            <!-- Fight control and instructions -->
            <v-col cols="2" class="d-flex align-center justify-center">
                <div class="d-block">
                    <!-- Button to start the fight -->
                    <v-btn color="secondary" variant="outlined" v-show="!countdownStore.isCountdownActive"
                        class="hb-btn--fight my-10 hb-btn--glow permanent-marker-regular" @click="toggleFight" icon=""
                        :width="breakpoint.smAndDown ? '100' : '150'"
                        :height="breakpoint.smAndDown ? '100' : '150'">Fight</v-btn>
                </div>
                <Countdown v-show="countdownStore.isCountdownActive" class="mb-8" ref="countdownRef" :maxCount="20"
                    @finished="endBattle" />
            </v-col>

            <!-- Character 2 -->
            <v-col cols="12" sm="5" class="pt-0 pr-0">
                <Character v-if="character2" :character="selectedCharactersStore.getCharacterByIndex(1)"
                    :counter="counter2" :bgColor="bgColor2" :isAuto="true" @divisionPassed="handleDivisionPassed2"
                    @counterChange="handleCounterChange2" @filled="endBattle" :index="1" :isCharacterPowerBar="true"
                    :winLose="winLose" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, onMounted, watch } from "vue";
import { getCharacter } from "@/services/api";
import { useDisplay } from 'vuetify'


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
const winLose = ref(-1);
const breakpoint = ref(useDisplay());


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

const handleDivisionPassed = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

const handleDivisionPassed2 = (passedBars: number) => {
    totalBarsPassed.value = passedBars;
};

const toggleFight = () => {
    winLose.value = -1;
    startCountdown();
};

const startCountdown = () => {
    counter2.value = 0;
    counter.value = 0;
    countdownStore.startCountdown();  // Activa la cuenta atrás
    countdownStore.startBattle();     // Activa el estado de batalla
    if (countdownRef.value) {
        countdownRef.value.startCounting();
    } else {
        console.error("countdownRef is not available");
    }
};

const endBattle = () => {
    countdownStore.stopCountdown();
    countdownStore.stopBattle();

    statsPlayerStore.addBattle(
        Number(selectedCharactersStore.getCharacterByIndex(0).id),  // characterId
        Number(selectedCharactersStore.getCharacterByIndex(1).id), // enemyCharacterId
        counter.value,
        counter2.value,
        selectedCharactersStore.getCharacterByIndex(0)?.images.xs,
        selectedCharactersStore.getCharacterByIndex(1)?.images.xs
    );

    if (counter.value > counter2.value) {
        statsPlayerStore.recordWin();
        winLose.value = 1;
    } else {
        statsPlayerStore.recordLoss();
        winLose.value = 0;
    }
};


// Watchers
watch(
    () => selectedCharactersStore.selectedCharacters,
    () => {
        winLose.value = -1;
    },
    { deep: true } // Asegura que se detecten los cambios en los objetos internos
);

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
