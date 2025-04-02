<template>
    <div>
        <div class="hb-fight__backgroundBar" :style="breakpoint.xs ? 'height: 100%' : ''">
        </div>
        <v-row class="flex-column flex-sm-row justify-center align-center">
            <!-- Countdown timer -->
            <!-- Character 1 -->
            <v-col cols="12" sm="6" class="pt-0 pr-0">
                <Character v-if="character" :mode="'fight'" class="hb-character--fight--0"
                    :character="selectedCharactersStore.getCharacterByIndex(0)" :counter="counter" :bgColor="bgColor"
                    :isAuto="true" @divisionPassed="handleDivisionPassed" @counterChange="handleCounterChange"
                    @filled="endBattle" :index="0" :isCharacterPowerBar="true" :winLose="winLose" />
            </v-col>
            <v-col cols="1">
                <!-- Fight control and instructions -->
                <div class="d-flex align-center justify-center hb-countdown-fight ml-n11">
                    <div v-if="showFightButton" class="d-block hb-countdown-fight--in my-6">
                        <!-- Button to start the fight -->
                        <v-btn color="secondary" variant="outlined"
                            class="hb-btn--fight hb-animation--glow permanent-marker-regular" @click="toggleFight"
                            icon="" width="100" height="100">
                            Fight
                        </v-btn>
                    </div>
                    <Countdown v-show="countdownStore.isCountdownActive" ref="countdownRef" :maxCount="20"
                        @finished="endBattle" />
                </div>
            </v-col>
            <!-- Character 2 -->
            <v-col cols="12" sm="5" class="pt-0 pr-0">
                <Character v-if="character2" :mode="'fight'" class="hb-character--fight--1"
                    :character="selectedCharactersStore.getCharacterByIndex(1)" :counter="counter2" :bgColor="bgColor2"
                    :isAuto="true" @divisionPassed="handleDivisionPassed2" @counterChange="handleCounterChange2"
                    @filled="endBattle" :index="1" :isCharacterPowerBar="true" :winLose="winLose" />
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, onMounted, watch, onUnmounted } from "vue";
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

// Props

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
const showFightButton = ref(true);


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

const handleKeyPress = (event: KeyboardEvent) => {

    if (event.code === "Space" && showFightButton.value) {
        event.preventDefault(); // Evita el desplazamiento de la página al presionar espacio
        toggleFight();
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


watch(() => countdownStore.isCountdownActive, (newValue) => {
    if (!newValue) {
        setTimeout(() => {
            showFightButton.value = true;
            winLose.value = -1;
        }, 3000); // Espera 3 segundos antes de mostrar el botón
    } else {
        showFightButton.value = false; // Oculta el botón cuando el contador está activo
    }
});

onMounted(async () => {
    try {
        character.value = await getCharacter(selectedCharactersStore.getCharacterByIndex(0).id);
    } catch (error) {
        console.error("Error fetching character 1:", error);
        character.value = {} as CharacterModel; // Prevent null
    }
    window.addEventListener("keydown", handleKeyPress);

    try {
        character2.value = await getCharacter(selectedCharactersStore.getCharacterByIndex(1).id);
    } catch (error) {
        console.error("Error fetching character 2:", error);
        character2.value = {} as CharacterModel; // Prevent null
    }

});

onUnmounted(() => {
    window.removeEventListener("keydown", handleKeyPress);
});
</script>
