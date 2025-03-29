<template>
    <v-container v-if="character" class="pa-0">
        <v-card :class="'v-card--chara hb-card hb-card--nocut v-card--chara' + characterNum" class="mx-auto">
            <v-img :src="character.images.md" alt="Character Image" cover style="height: 300px; width: 100%;" />
            <v-card-title>{{ character.name }}</v-card-title>
            <div class="ma-4">
                <CharacterStats :character="character" density="compact" />
            </div>
            <v-card-subtitle class="py-2" v-text="character.biography.fullName || character.name" />
        </v-card>
    </v-container>
</template>



<script setup lang="ts">
import CharacterStats from "@/components/character/CharacterStats.vue";
import { CharacterModel } from '@/models/character.model';

// Recibir las propiedades del componente
const props = defineProps<{
    character: CharacterModel;
    characterNum: Number;
}>();
</script>