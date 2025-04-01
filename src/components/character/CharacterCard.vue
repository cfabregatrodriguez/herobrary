<template>
    <v-container v-if="character" class="pa-0">
        <v-card :class="['hb-card', 'hb-card--nocut', cardSelectedClass]" class="mx-auto">
            <v-row no-gutters>
                <v-col :cols="compact ? '12' : '6'" sm="12" no-gutters>
                    <v-badge :class="['hb-card__badge', badgePositionClass]" :content="getRank(character)" inline />
                    <v-img @click="isNotFightRoute ? goToDetail() : null" :src="character.images?.lg || ''"
                        alt="Character Image" cover
                        :style="{ height: compact ? '200px' : '300px', width: '100%', cursor: isListRoute ? 'pointer' : 'default' }">
                        <transition name="fade-scale">
                            <div v-if="winLose != -1 && !isNotFightRoute"
                                class="hb-card__result permanent-marker-regular">
                                <div class="hb-card__result__text">
                                    <span v-if="(index == 0 && winLose == 1) || (index == 1 && winLose == 0)">
                                        Winner
                                    </span>
                                    <span v-else>
                                        Loser
                                    </span>
                                </div>
                            </div>
                        </transition>
                        <v-badge v-if="isSelected && isNotFightRoute" class="hb-card__badge hb-card__badge--bottom"
                            content="selected" inline />
                    </v-img>

                    <v-card-title class="text-center">{{ character.name }}</v-card-title>

                    <div v-if="isNotFightRoute" class="d-flex justify-center align-center w-100 pb-4">
                        <v-btn variant="tonal" size="small" @click.stop="toggleSelection()"
                            :disabled="!isSelected && selectedCharactersStore.checkIfArrayHasElementsInBothPositions()">
                            <span>{{ isSelected ? 'Remove' : 'Add to fight' }}</span>
                        </v-btn>
                    </div>
                </v-col>
                <v-col :cols="compact ? '12' : '6'" sm="12">
                    <div class="d-flex h-100 flex-column justify-space-between">
                        <div v-if="isCharacterStats" class="mx-4 my-auto">
                            <CharacterStats :character="character" density="compact" />
                        </div>
                        <div class="mt-6">
                            <v-card-subtitle class="pt-2" :class="{ 'pb-2': !isCharacterPublisher }"
                                v-text="character.biography?.fullName || character.name" />
                            <v-card-subtitle v-if="isCharacterPublisher" class="pb-2 text-subtitle-2 opacity-30"
                                v-text="character.biography?.publisher || 'Unknown'" />
                        </div>
                    </div>
                </v-col>
            </v-row>


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

// Pinia Stores
import { useSelectedCharactersStore } from "@/stores/selectedCharactersStore";

const selectedCharactersStore = useSelectedCharactersStore();
const router = useRouter();

// Props
const props = defineProps({
    character: { type: Object as () => CharacterModel, required: true },
    characterNum: { type: Number, required: true },
    index: { type: Number, required: true },
    isCharacterStats: { type: Boolean, default: true },
    isCharacterPublisher: { type: Boolean, default: true },
    compact: { type: Boolean, default: false },
    winLose: { type: Number, default: -1 }
});

// Computed properties
const isSelected = computed(() =>
    selectedCharactersStore.selectedCharacters.some((c: CharacterModel) => c?.id === props.character?.id)
);

const isNotFightRoute = computed(() => router?.currentRoute.value.name !== 'Fight');
const isListRoute = computed(() => router?.currentRoute.value.name === 'List');

const cardSelectedClass = computed(() => ({
    'selected': isSelected.value && isNotFightRoute.value,
    'hb-card--selected': isSelected.value && isNotFightRoute.value
}));

const badgePositionClass = computed(() => props.index === 1 ? 'hb-card__badge--left' : 'hb-card__badge--right');

// Methods
const toggleSelection = () => {
    isSelected.value
        ? selectedCharactersStore.removeCharacter(props.character)
        : selectedCharactersStore.addCharacter(props.character);
};

const getRank = (character: CharacterModel) => {
    if (!character || !character.powerstats) return 0;
    const { intelligence = 0, strength = 0, speed = 0, durability = 0, power = 0, combat = 0 } = character.powerstats;
    return Math.round((intelligence + strength + speed + durability + power + combat) / 6);
};

const goToDetail = () => {
    if (props.character) {
        router.push({ name: 'Detail', params: { id: props.character.id.toString() } });
    }
};


</script>
