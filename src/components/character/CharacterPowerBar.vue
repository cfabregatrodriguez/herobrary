<template>
    <div class="hb-power-bar" ref="powerBarContainer">
        <div class="hb-power-bar__counter permanent-marker-regular">
            {{ Math.round(counter) }}
        </div>
        <div class="hb-power-bar__in">
            <svg style="left: 5px; bottom: 5px" viewBox="50 0 135 1000" class="wave"
                :style="{ filter: 'drop-shadow(0 -5px 5px ' + bgColor + ')' }">
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

                <rect filter="url(#waveFilter)" :y="1000 - (0 + (counter * 2))" :height="50 + (counter * 2)" x="0"
                    width="300" :fill="bgColor" />

                <!-- Colored Bars - Divisions - -->
                <g>
                    <template v-for="i in numDivisions" :key="i">
                        <line x1="300" x2="150" :y1="getDivisionY(i) + 40" :y2="getDivisionY(i) + 40" stroke="#ffb74d"
                            stroke-width="4" stroke-opacity="1" />
                    </template>
                </g>

                <!-- Animated Circle -->
                <g>
                    <template v-for="(division, index) in numDivisions" :key="index">
                        <circle fill="#fff" :cx="180" :cy="getDivisionY(division) + 40" :r="getRadius(division)"
                            class="ok-message"
                            :style="[{ opacity: getOpacity(division), transition: 'opacity 1s, r 0.5s' }, { zIndex: '9999' }]" />
                    </template>
                </g>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
    // Vue & Utilities
    import { ref, watch, computed, onMounted } from "vue";

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

    const powerBarContainer = ref<HTMLElement | null>(null);
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
        return messages.value[division] ? 100 : 0;
    }

    function getOpacity(division: number): number {
        return messages.value[division] ? 1 : 0;
    }

    // Expose properties and methods for testing
    defineExpose({
        numDivisions,
        getRadius,
        getOpacity,
    });

    // Lifecycle Hooks
    onMounted(() => {
        passedDivisions.value = [];
    });

</script>
