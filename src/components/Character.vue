<template>
    <div 
        class="d-sm-flex"  
        :style="isAuto ? { flexDirection: 'row-reverse' } : { flexDirection: 'row' }">
            <CharacterCardFight :character="character" characterNum="1" />
            <CharacterPowerBar 
                :character="character" 
                @divisionPassed="handleDivisionPassed" 
                :counter="counter" 
                :bgColor="bgColor" 
                :flash="flash" 
                @updateCounter="handleCounterChange" 
                @filled="handleFilled" 
            />
    </div>
    <CharacterBarFight 
        :character="character" 
        :counter="counter" 
        :bgColor="bgColor"
        :isCountdownActive="isCountdownActive" 
        :isAuto="isAuto"
        @updateCounter="handleCounterChange" 
    />
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import CharacterCardFight from '@/components/character/CharacterCardFight.vue';
    import CharacterPowerBar from '@/components/character/CharacterPowerBar.vue';
    import CharacterBarFight from '@/components/character/CharacterBarFight.vue';

    const props = defineProps({
        character: Object,
        counter: Number,
        flash: Boolean,
        isAuto: Boolean,
        bgColor: String,
        isCountdownActive: Boolean,
    });

    const flash = ref(false);

    const emit = defineEmits<{
        (event: "handleDivisionPassed", value: number): void;
        (event: "handleCounterChange", value: number): void;
        (event: "handleFilled", value: number): void;
    }>();

    const handleFilled = () => {
        emit('handleFilled', 0); // Replace 0 with the appropriate number value if needed
    };

    const handleDivisionPassed = (division: number) => {
        emit('handleDivisionPassed', division);
    };

    const handleCounterChange = (counter: number) => {
        emit('handleCounterChange', counter);
    };
</script>
