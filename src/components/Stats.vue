<template>
    <BarStat :density="density" stat="Intelligence" icon="mdi-brain" color="orange-lighten-2" :value="character.powerstats.intelligence" />
    <BarStat :density="density" stat="Strength" icon="mdi-weight" color="red-lighten-1" :value="character.powerstats.strength" />
    <BarStat :density="density" stat="Speed" icon="mdi-run-fast" color="blue-lighten-1" :value="character.powerstats.speed" />
    <BarStat :density="density" stat="Durability" icon="mdi-wall" color="green-darken-1" :value="character.powerstats.durability" />
    <BarStat :density="density" stat="Power" icon="mdi-lightning-bolt-outline" color="purple-lighten-1" :value="character.powerstats.power" />
    <BarStat :density="density" stat="Combat" icon="mdi-fencing" color="deep-orange-lighten-2" :value="character.powerstats.combat" />
</template>

<script setup lang="ts">
    import { Character } from '@/models/character.model';

    import BarStat from "@/components/BarStat.vue";

    // Recibir las propiedades del componente
    const props = defineProps<{
        character: Character;
        density: String;
    }>();
</script>