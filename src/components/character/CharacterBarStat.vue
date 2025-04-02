<template>
    <v-row class="hb-character__stat align-center justify-space-between" no-gutters>
        <v-col cols="2" class="text-left" :class="density === 'compact' ? 'pa-0' : 'pa-1'">
            <v-tooltip activator="parent" location="end">{{ stat }}</v-tooltip>
            <v-icon :color="color" :icon="icon" :size="density === 'compact' ? 'x-small' : ''" />
        </v-col>
        <v-col cols="10" :class="density === 'compact' ? 'py-0' : 'py-1'">
            <v-progress-linear class="rounded-pill bg-blue-grey-darken-1" :color="color" :model-value="value"
                :height="density === 'compact' ? 6 : 12"></v-progress-linear>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">

// Props

defineProps({
    stat: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'black'
    },
    icon: {
        type: String,
        default: 'mdi-help'
    },
    value: {
        type: Number,
        required: true
    },
    density: {
        type: String,
        default: ""
    }
});
</script>