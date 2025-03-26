<template>
    <v-container v-if="character">
        <v-card
            class="mx-auto"
            :style="{ minHeight: '300px', width: '100%' }"
        >
            <v-img
            :src="character.images.md"
            alt="Character Image"
            cover
            style="height: 300px; width: 100%;"
            />
            <v-card-title>{{ character.name }}</v-card-title>
            <v-card-subtitle class="py-2" v-text="character.biography.fullName || character.name" />
        </v-card>
    </v-container>
</template>



<script setup lang="ts">
    import { Character } from '@/models/character.model';

    // Recibir las propiedades del componente
    const props = defineProps<{
        character: Character;
    }>();
</script>