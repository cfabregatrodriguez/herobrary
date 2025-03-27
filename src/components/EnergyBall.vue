<template>
    <div 
        class="hb-ball" 
        ref="ballContainer">
        <div class="hb-ball__counter permanent-marker-regular">
            {{ Math.round(counter) }}
        </div>
        <svg viewBox="0 0 200 1000" class="wave" 
            :style="{ 
                filter: 'drop-shadow(0 0 15px ' + bgColor + ')'
                }">
            <defs>
                <filter id="waveFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" result="turbulence">
                        <animate 
                            attributeName="baseFrequency" 
                            values="0.015; 0.03; 0.015" 
                            dur="10s" 
                            keyTimes="0; 0.5; 1" 
                            keySplines="0.25 0.8 0.25 1" 
                            repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="100"/>
                </filter>
            </defs>
            <rect 
                filter="url(#waveFilter)" 
                :y="1000 - (50 + (counter * 2))" 
                :height="50 + (counter * 2)" 
                width="300" 
                :fill="bgColor"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

// Props
const props = defineProps({
    counter: {
        type: Number,
        default: 0
    },
    bgColor: {
        type: String,
        default: "red",
    }
});

// Emits
const emit = defineEmits<{
    (event: "filled"): void;
}>();

// Refs
const ballContainer = ref<HTMLElement | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);

// Watch del counter
watch(() => props.counter, () => {
    const rectHeightInSVG = 50 + (props.counter * 2);
    const rectYInSVG = 1000 - rectHeightInSVG;

    if (rectYInSVG <= 0) {
        emit('filled');
    }
});

</script>

