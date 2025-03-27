<template>
    <v-container v-if="character" class="pa-0">
        <v-card
            :class="'v-card--chara v-card--chara' + characterNum"
            class="mx-auto"
            :style="{ minHeight: '300px', width: '280px' }"
        >
            <v-img
            :src="character.images.md"
            alt="Character Image"
            cover
            style="height: 300px; width: 100%;"
            />
            <v-card-title>{{ character.name }}</v-card-title>
            <div  class="ma-4">
                <Stats 
                    :character="character" 
                    density="compact"/>
            </div>
            <v-card-subtitle class="py-2" v-text="character.biography.fullName || character.name" />
        </v-card>
    </v-container>
</template>



<script setup lang="ts">
    import { Character } from '@/models/character.model';

    import Stats from "@/components/Stats.vue";

    // Recibir las propiedades del componente
    const props = defineProps<{
        character: Character;
        characterNum: Number;
    }>();
</script>