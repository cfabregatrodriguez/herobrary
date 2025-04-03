<template>
    <v-container v-if="character" class="pa-0">
        <v-card :class="['hb-card', 'hb-card--nocut', cardSelectedClass]" class="mx-auto">
            <div
                :class="[{ 'hb-card--fight': mode == 'fight' }, { 'hb-card--fight--0': index == 0 }, { 'hb-card--fight--1': index == 1 }]">
                <div class="hb-card__img" @mouseover="isHovering = true" @mouseleave="isHovering = false">
                    <v-img :src="character.images?.lg || ''" alt="Character Image" cover
                        @click.stop="isNotFightRoute ? toggleSelection() : ''"
                        :style="{ height: compact ? '300px' : '400px' }" class="cursor-pointer"
                        :class="[{ 'hb-overlay': isSelected && isNotFightRoute }, { 'hb-card--darken-on-hover': isHovering && isListRoute }]">

                        <v-toolbar color="transparent">
                            <template v-slot:append>
                                <v-badge :class="['hb-card__badge', badgePositionClass]" :content="getRank(character)"
                                    inline />
                            </template>
                        </v-toolbar>

                        <v-tooltip
                            v-if="!isSelected && selectedCharactersStore.checkIfArrayHasElementsInBothPositions()"
                            activator="parent" width="200" location="center">
                            You have already chosen two fighters. Remove one in the top bar to add another fighter.
                        </v-tooltip>

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

                        <v-badge v-if="isSelected && isNotFightRoute"
                            class="hb-card__badge hb-card__badge--bottom hb-animation--slideBottom" content="selected"
                            inline />

                        <transition v-if="isNotFightRoute" name="fade-opacity">
                            <v-btn v-if="isHovering" class="hb-card__image__icon" icon variant="tonal" size="large"
                                :disabled="!isSelected && selectedCharactersStore.checkIfArrayHasElementsInBothPositions()">
                                <v-icon
                                    :icon="isSelected ? 'mdi-minus' : selectedCharactersStore.checkIfArrayHasElementsInBothPositions() ? 'mdi-close' : 'mdi-plus'"></v-icon>
                            </v-btn>
                        </transition>

                    </v-img>
                </div>
                <div class=" hb-card__info ">
                    <v-card-title class=" text-center mt-2">{{ character.name }}</v-card-title>
                    <v-card-text>
                        <div v-if="isListRoute" :class="{ 'my-4': isDetailRoute }"
                            class="d-flex justify-center align-center w-100">
                            <v-btn variant="tonal" size="small" @click.stop="goToDetail">
                                <span>View details</span>
                            </v-btn>
                        </div>

                        <div v-if="isCharacterStats" class="px-4 px-sm-1 py-md-0 h-100">
                            <CharacterStats :character="character" density="compact" />
                        </div>
                    </v-card-text>
                    <v-card-actions class="d-block">
                        <v-card-subtitle class="pt-2" :class="{ 'pb-2': !isCharacterPublisher }"
                            v-text="character.biography?.fullName || character.name" />
                        <v-card-subtitle v-if="isCharacterPublisher" class="pb-2 text-subtitle-2 opacity-30"
                            v-text="character.biography?.publisher || 'Unknown'" />
                    </v-card-actions>
                </div>
            </div>
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
    // Vue & Utilities
    import { computed, ref } from "vue";
    import { useRouter } from 'vue-router';
    const isHovering = ref(false);

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
        winLose: { type: Number, default: -1 },
        mode: { type: String, default: 'default' }
    });

    // Computed properties
    const isSelected = computed(() =>
        selectedCharactersStore.selectedCharacters.some((c: CharacterModel) => c?.id === props.character?.id)
    );

    const isNotFightRoute = computed(() => router?.currentRoute.value.name !== 'Fight');
    const isListRoute = computed(() => router?.currentRoute.value.name === 'List');
    const isDetailRoute = computed(() => router?.currentRoute.value.name === 'Detail');

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