<template>
    <div>
        <div class="hb-fight__backgroundBar" :style="breakpoint.xs ? 'height: 100%' : ''"></div>
        <v-row class="hb-fight__container flex-column flex-sm-row justify-center align-center">
            <!-- Character 1 -->
            <v-col cols="12" sm="5" class="pt-0 pr-0">
                <Character v-if="selectedCharactersStore.getCharacterByIndex(0)" :mode="'fight'"
                    class="hb-character--fight--0" :character="selectedCharactersStore.getCharacterByIndex(0)"
                    :counter="counter" :bgColor="bgColor" :isAuto="playerIsAuto" @divisionPassed="handleDivisionPassed"
                    @counterChange="handleCounterChange" @filled="endBattle" :index="0" :isCharacterPowerBar="true"
                    :winLose="winLose" />
                <router-link to="/" v-else>
                    <v-btn color="white">Choose a character</v-btn>
                </router-link>
            </v-col>
            <v-col cols="12" sm="2">
                <!-- Fight control and instructions -->
                <div v-if="selectedCharactersStore.getCharacterByIndex(0) &&
                    selectedCharactersStore.getCharacterByIndex(1)"
                    class="d-flex align-center justify-center hb-countdown-fight">
                    <div v-if="showFightButton" class="d-block hb-countdown-fight--in my-0 my-sm-6">
                        <!-- Button to start the fight -->
                        <v-btn color="secondary" variant="outlined"
                            class="hb-btn--fight hb-animation--glow permanent-marker-regular" @click="toggleFight"
                            icon="" width="100" height="100">
                            Fight
                        </v-btn>
                    </div>
                    <!-- Countdown timer -->
                    <Countdown v-show="countdownStore.isCountdownActive" ref="countdownRef" :maxCount="fightTime"
                        @finished="endBattle" />
                </div>
            </v-col>
            <!-- Character 2 -->
            <v-col cols="12" sm="5" class="pt-0 pr-0">
                <Character v-if="selectedCharactersStore.getCharacterByIndex(1)" :mode="'fight'"
                    class="hb-character--fight--1" :character="selectedCharactersStore.getCharacterByIndex(1)"
                    :counter="counter2" :bgColor="bgColor2" :isAuto="true" @divisionPassed="handleDivisionPassed2"
                    @counterChange="handleCounterChange2" @filled="endBattle" :index="1" :isCharacterPowerBar="true"
                    :winLose="winLose" />
                <div v-else>
                    <router-link to="/">
                        <v-btn color="white">Choose a character</v-btn>
                    </router-link>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
    // Vue & Utilities
    import { ref, onMounted, watch, onUnmounted, computed } from "vue";
    import { useDisplay } from 'vuetify'


    // Reactive variables
    const breakpoint = ref(useDisplay());
    const counter = ref(0);
    const counter2 = ref(0);
    const countdownRef = ref();
    const bgColor = ref('#3498db');
    const bgColor2 = ref('red');
    const totalBarsPassed = ref(0);
    const winLose = ref(-1);
    const showFightButton = ref(true);

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

    // Computed

    const fightTime = computed<number>({
        get: (): number => statsPlayerStore.fightTime,
        set: (value: number): void => statsPlayerStore.setFightTime(value),
    });

    const playerIsAuto = computed<boolean>({
        get: () => statsPlayerStore.playerIsAuto,
        set: (value) => statsPlayerStore.playerIsAuto = value,
    });



    // Methods
    const handleCounterChange = (value: number) => {
        counter.value = value;
        if (counter.value < 0) counter.value = 0;
    };

    const handleCounterChange2 = (value: number) => {
        counter2.value = value;
        if (counter2.value < 0) counter2.value = 0;
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
        countdownStore.startCountdown();
        countdownStore.startBattle();
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
            Number(selectedCharactersStore.getCharacterByIndex(0).id),
            Number(selectedCharactersStore.getCharacterByIndex(1).id),
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
            event.preventDefault();
            toggleFight();
        }
    };

    // Watchers
    watch(
        () => selectedCharactersStore.selectedCharacters,
        () => {
            winLose.value = -1;
        },
        { deep: true }
    );


    watch(() => countdownStore.isCountdownActive, (newValue) => {
        if (!newValue) {
            setTimeout(() => {
                showFightButton.value = true;
                winLose.value = -1;
            }, 3000);
        } else {
            showFightButton.value = false;
        }
    });

    // Lifecycle hooks
    onMounted(async () => {

        window.addEventListener("keydown", handleKeyPress);
    });

    onUnmounted(() => {
        window.removeEventListener("keydown", handleKeyPress);
    });
</script>
