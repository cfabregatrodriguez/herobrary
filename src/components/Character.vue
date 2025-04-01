<template>
    <div :class="'hb-character hb-character--' + index + (compact ? ' hb-character--compact' : '')">
        <div class="d-sm-flex" :style="index == 1 ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }">
            <!-- Character card component -->
            <CharacterCard :character="character" :characterNum="1" :index="index" :isCharacterStats="isCharacterStats"
                :isCharacterPublisher="isCharacterPublisher" :compact="compact" :winLose="winLose" />

            <!-- Character power bar (conditionally rendered) -->
            <CharacterPowerBar v-if="isCharacterPowerBar" :character="character" @divisionPassed="handleDivisionPassed"
                :counter="counter" :bgColor="bgColor" @updateCounter="handleCounterChange" @filled="handleFilled"
                :index="index" />
        </div>

        <!-- Character bar fight (conditionally rendered) -->
        <CharacterBarFight v-if="isCharacterBarFight" :character="character" :counter="counter" :bgColor="bgColor"
            :isCountdownActive="countdownStore.isCountdownActive" :isAuto="isAuto"
            @updateCounter="handleCounterChange" />
    </div>
</template>

<script setup lang="ts">
// Models
import { CharacterModel } from '@/models/character.model';

// Components
import CharacterCard from '@/components/character/CharacterCard.vue';
import CharacterPowerBar from '@/components/character/CharacterPowerBar.vue';
import CharacterBarFight from '@/components/character/CharacterBarFight.vue';

// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();  // Using countdown store

// Props
const props = defineProps({
    character: { type: Object as () => CharacterModel, required: true, default: () => ({} as CharacterModel) },
    counter: { type: Number, default: 0 },
    isAuto: { type: Boolean, default: false },
    isCharacterPowerBar: { type: Boolean, default: false },
    isCharacterBarFight: { type: Boolean, default: true },
    isCharacterStats: { type: Boolean, default: true },
    isCharacterPublisher: { type: Boolean, default: true },
    compact: { type: Boolean, default: false },
    bgColor: { type: String, default: "#FFFFFF" },
    index: { type: Number, required: true, default: 0 },
    winLose: { type: Number, default: -1 }
});

// Emits
const emit = defineEmits<{
    (event: "divisionPassed", value: number): void;
    (event: "counterChange", value: number): void;
    (event: "filled", value: number): void;
}>();

// Event handlers
const handleFilled = () => {
    emit('filled', 0);
};

const handleDivisionPassed = (division: number) => {
    emit('divisionPassed', division);
};

const handleCounterChange = (counter: number) => {
    emit('counterChange', counter);
};
</script>
