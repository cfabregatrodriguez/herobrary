<template>
  <div>
    <h2 class="permanent-marker-regular">Fight</h2>
    <v-row>
        <v-col cols="3">
            <CharacterCardFight
                v-if="character"
                :character="character"
            />
            <BarFight 
                v-if="character" 
                :character="character" 
                :counter="counter" 
                :bgColor="'#3498db'"
                @updateCounter="updateCounter"
            />
        </v-col>
        <v-col class="d-sm-flex justify-center align-center">
            <EnergyBall 
                :counter="counter"
                :bgColor="'#3498db'"
                @updateCounter="updateCounter" 
            />
        </v-col>
        <v-col class="d-sm-flex justify-center align-center">
            <EnergyBall 
                :counter="counter2"
                @updateCounter="updateCounter2" 
            />
        </v-col>
        <v-col cols="3">
            <CharacterCardFight
                v-if="character2"
                :character="character2"
            />
            <BarFight 
                v-if="character2" 
                :character="character2" 
                :counter="counter2" 
                @updateCounter="updateCounter2"
                :isAuto="true"
            />
        </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// Vue & Utilities
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getCharacter } from "@/services/api";

// Components
import EnergyBall from "@/components/EnergyBall.vue";
import BarFight from "@/components/BarFight.vue";
import CharacterCardFight from "@/components/CharacterCardFight.vue";

// Models & Types
import { Character } from '@/models/character.model';

// Reactive state  
const counter = ref(0);
const counter2 = ref(0);
const character = ref<Character | null>(null);
const character2 = ref<Character | null>(null);

// Route handling
const route = useRoute();
const characterId = route.params.id as string;
const characterId2 = route.params.vs as string;

// Counter update logic 
const updateCounter = (value: number) => {
counter.value = value; 
if (counter.value < 0) counter.value = 0; // Asegurar que no sea negativo
};

const updateCounter2 = (value: number) => {
counter2.value = value; 
if (counter2.value < 0) counter2.value = 0; // Asegurar que no sea negativo
};

// Get character fields
onMounted(async () => {
    try {
        const data = await getCharacter(characterId);
        character.value = data;
    } catch (error) {
        console.error("Error al obtener el personaje 1:", error);
    }
    try {
        const data = await getCharacter(characterId2);
        character2.value = data;
    } catch (error) {
        console.error("Error al obtener el personaje 2:", error);
    }
});
</script>
