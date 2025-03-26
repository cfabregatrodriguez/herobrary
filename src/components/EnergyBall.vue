<template>
    <div class="hb-ball" @mousedown="emit('startHold')" @mouseup="emit('stopHold')" @mouseleave="emit('stopHold')">
        <div class="hb-ball__counter" :style="{ transform: 'scale(' + (1 + parseInt(Math.min(100, counter)) / 20) + ')'}">
            {{ Math.round(counter) }}
        </div>
        <svg viewBox="0 0 200 200" class="wave" 
            :style="{ 
                transform: 'scale(' + (1 + parseInt(Math.min(100, counter)) / 20) + ')',
                fill: bgColor,
                filter: 'drop-shadow(0 0 15px '+ bgColor +')' 
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
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10"/>
                </filter>
            </defs>
            <circle cx="100" cy="100" r="80" filter="url(#waveFilter)"/>
        </svg>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        counter: {
            type: Number,
            default: 0
        },
        bgColor: {
            type: String,
            default: "red", // Asegura que siempre se pase un valor
        }
    });

// const emit = defineEmits<{
//     (event: 'startHold'): void;
//     (event: 'stopHold'): void;
// }>();
</script>