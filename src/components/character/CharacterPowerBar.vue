<template>
    <div class="hb-ball" ref="ballContainer">
        <div class="hb-ball__counter permanent-marker-regular">
            {{ Math.round(counter) }}
        </div>
        <div>
            <svg viewBox="0 0 200 1000" class="wave" :style="{ filter: 'drop-shadow(0 0 15px ' + bgColor + ')' }">
                <defs>
                    <filter id="waveFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="turbulence">
                            <animate attributeName="baseFrequency" values="0.015; 0.03; 0.015" dur="10s"
                                keyTimes="0; 0.5; 1" keySplines="0.25 0.8 0.25 1" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="100" />
                    </filter>
                </defs>

                <!-- Container Bar -->
                <rect filter="url(#waveFilter)" :y="1000 - (50 + (counter * 2))" :height="50 + (counter * 2)"
                    width="300" :fill="bgColor" />

                <!-- Colored Bars - Divisions - -->
                <g>
                    <template v-for="i in numDivisions" :key="i">
                        <line x1="300" x2="140" :y1="getDivisionY(i) - 30" :y2="getDivisionY(i) - 30" stroke="#ffb74d"
                            stroke-width="4" stroke-opacity="1" />
                    </template>
                </g>

                <!-- Animated Circle -->
                <g>
                    <template v-for="(division, index) in numDivisions" :key="index">
                        <circle fill="#fff" :cx="140" :cy="getDivisionY(division) - 30" :r="getRadius(division)"
                            class="ok-message"
                            :style="{ opacity: getOpacity(division), transition: 'opacity 1s, r 0.5s' }" />
                    </template>
                </g>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, watch, computed } from "vue";

// Props
const props = defineProps({
    character: {
        type: Object,
        required: false
    },
    counter: {
        type: Number,
        default: 0
    },
    bgColor: {
        type: String,
        default: "red",
    },
    index: {
        type: Number,
        default: 0
    }
});

// Emits
const emit = defineEmits<{
    (event: "filled"): void;
    (event: "divisionPassed", division: number): void;
}>();

// Reactive Variables

const ballContainer = ref<HTMLElement | null>(null);
const passedDivisions = ref<number[]>([]);
const messages = ref<{ [key: number]: boolean }>({});

// Watches

watch(() => props.counter, () => {
    if (props.counter <= 0) passedDivisions.value = [];

    const rectHeightInSVG = 50 + (props.counter * 2);
    const rectYInSVG = 1000 - rectHeightInSVG;

    for (let i = 1; i <= numDivisions.value; i++) {
        const divisionY = getDivisionY(i);
        if (rectYInSVG <= divisionY && !passedDivisions.value.includes(i)) {
            passedDivisions.value.push(i);
            emit('divisionPassed', i);
            messages.value[i] = true;
            setTimeout(() => {
                messages.value[i] = false;
            }, 500);
        }
    }

    if (rectYInSVG <= 0) {
        emit('filled');
    }
});

// Computed

const numDivisions = computed(() => {
    return props.character?.powerstats?.intelligence
        ? Math.max(1, Math.ceil(props.character.powerstats.intelligence / 20))
        : 1;
});

// Actions

function getDivisionY(i: number) {
    const totalHeight = 1000;
    const step = totalHeight / (numDivisions.value + 1);
    return totalHeight - i * step;
}

function getRadius(division: number): number {
    return messages.value[division] ? 15 : 0;
}

function getOpacity(division: number): number {
    return messages.value[division] ? 1 : 0;
}
</script>
