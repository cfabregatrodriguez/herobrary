<template>
    <v-container v-if="character" class="pa-0">
        <v-card @click="router.currentRoute.value.name !== 'Fight' ? goToDetail() : null" :class="['v-card--chara' + characterNum, 'hb-card', 'hb-card--nocut', {
            'selected': isSelected,
            'bg-blue-grey-darken-2': isSelected && router.currentRoute.value.name !== 'Fight'
        }]" class="mx-auto">
            <v-badge
                :class="{ 'hb-card__badge': true, 'hb-card__badge--left': index === 1, 'hb-card__badge--right': index !== 1 }"
                color="white" :content="getRank(props.character)" inline></v-badge>
            <v-badge v-if="isSelected && router.currentRoute.value.name !== 'Fight'"
                class="hb-card__badge hb-card__badge--right" color="white" content="selected" inline></v-badge>
            <v-img :src="character.images.md" alt="Character Image" cover
                :style="{ height: compact ? '200px' : '300px', width: '100%' }" />
            <v-card-title>{{ character.name }}</v-card-title><!-- Botón de selección -->
            <div v-if="router.currentRoute.value.name !== 'Fight'"
                class="d-flex justify-center align-center w-100 pb-4">
                <v-btn variant="tonal" size="small" @click.stop="toggleSelection(character)">
                    <span v-if="isSelected">Remove</span>
                    <span v-else>Add to fight</span>
                </v-btn>
            </div>
            <div v-if="isCharacterStats" class="ma-4">
                <CharacterStats :character="character" density="compact" />
            </div>
            <v-card-subtitle class="pt-2" :class="{ 'pb-2': !isCharacterPublisher }"
                v-text="character.biography.fullName || character.name" />
            <v-card-subtitle v-if="isCharacterPublisher" class="pb-2 text-subtitle-2 opacity-30"
                v-text="character.biography.publisher || 'Unknown'" />
        </v-card>
    </v-container>
</template>



<script setup lang="ts">
// Vue & Utilities
import { computed } from "vue";
import { useRouter } from 'vue-router';

// Components
import CharacterStats from "@/components/character/CharacterStats.vue";

// Models
import { CharacterModel } from '@/models/character.model';

//Pinia Stores
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";
const selectedCharactersStore = useSelectedCharactersStore();

// Props
const props = defineProps({
    character: {
        type: Object as () => CharacterModel,
        required: true,
        default: () => ({} as CharacterModel)
    },
    characterNum: {
        type: Number,
        default: 0
    },
    index: {
        type: Number,
        default: 0
    },
    isCharacterStats: {
        type: Boolean,
        default: true
    },
    isCharacterPublisher: {
        type: Boolean,
        default: true
    },
    compact: {
        type: Boolean,
        default: false
    },
});


// Actions

const isSelected = computed(() => {
    if (!props.character) return false;

    return selectedCharactersStore.selectedCharacters
        .filter((character: null) => character !== null)
        .some((selectedCharacter: { id: number | undefined; }) => selectedCharacter.id === props.character?.id);
});

const toggleSelection = (character: CharacterModel) => {
    if (isSelected.value) {
        selectedCharactersStore.removeCharacter(props.character);
    } else {
        selectedCharactersStore.addCharacter(props.character);
    }
};

const getRank = (character: CharacterModel) => {
    if (!character || !character.powerstats) return 0;
    const { intelligence, strength, speed, durability, power, combat } = character.powerstats;
    return (Math.round((intelligence + strength + speed + durability + power + combat) / 6));
};

// Routes
const router = useRouter();
const goToDetail = () => {
    if (!props.character) return;

    router.push({
        name: 'Detail',
        params: { id: props.character.id.toString() },
    });
};
</script>