<template>
    <div>
        <CharacterBarStat :density="density" stat="Intelligence" icon="mdi-brain" color="orange-lighten-2"
            :value="character.powerstats.intelligence" />
        <CharacterBarStat :density="density" stat="Strength" icon="mdi-weight" color="red-lighten-1"
            :value="character.powerstats.strength" />
        <CharacterBarStat :density="density" stat="Speed" icon="mdi-run-fast" color="blue-lighten-1"
            :value="character.powerstats.speed" />
        <CharacterBarStat :density="density" stat="Durability" icon="mdi-wall" color="green-darken-1"
            :value="character.powerstats.durability" />
        <CharacterBarStat :density="density" stat="Power" icon="mdi-lightning-bolt-outline" color="purple-lighten-1"
            :value="character.powerstats.power" />
        <CharacterBarStat :density="density" stat="Combat" icon="mdi-fencing" color="deep-orange-lighten-2"
            :value="character.powerstats.combat" />
    </div>
</template>

<script setup lang="ts">
// Components
import CharacterBarStat from "@/components/character/CharacterBarStat.vue";

// Models
import { CharacterModel } from '@/models/character.model';

// Props
const props = defineProps<{
    character: CharacterModel;
    density: string;
}>();
</script>
