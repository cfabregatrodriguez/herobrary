<template>
    <div>
        <div class="d-sm-flex" :style="isAuto ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }">
            <CharacterCardFight :character="character" :characterNum="1" />
            <CharacterPowerBar :character="character" @divisionPassed="handleDivisionPassed" :counter="counter"
                :bgColor="bgColor" @updateCounter="handleCounterChange" @filled="handleFilled" />
        </div>
        <CharacterBarFight :character="character" :counter="counter" :bgColor="bgColor"
            :isCountdownActive="countdownStore.isCountdownActive" :isAuto="isAuto"
            @updateCounter="handleCounterChange" />
    </div>
</template>

<script setup lang="ts">
import { CharacterModel } from '@/models/character.model';
import CharacterCardFight from '@/components/character/CharacterCardFight.vue';
import CharacterPowerBar from '@/components/character/CharacterPowerBar.vue';
import CharacterBarFight from '@/components/character/CharacterBarFight.vue';

// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
const countdownStore = useCountdownStore();  // Usamos la store de countdown

const props = defineProps({
    character: {
        type: Object as () => CharacterModel,
        required: true,
        default: () => ({} as CharacterModel), // Provide a default value with type assertion
    },
    counter: {
        type: Number,
        required: true,
        default: 0
    },
    isAuto: {
        type: Boolean,
        default: false
    },
    bgColor: {
        type: String,
        default: "#FFFFFF"
    }
});

const emit = defineEmits<{
    (event: "divisionPassed", value: number): void;
    (event: "counterChange", value: number): void;
    (event: "filled", value: number): void;
}>();

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
