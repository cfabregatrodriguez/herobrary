<template>
    <v-card :class="{'selected': isSelected}" class="mx-auto" :style="{ minHeight: '300px', width: '100%' }">
        <v-img :src="character.image.url" alt="Character Image" 
            cover
            style="height: 200px; width: 100%;"
        />
        <v-card-title>{{ character.name }}</v-card-title>
        <v-card-subtitle v-if="character.biography?.['full-name']">
            {{ character.biography?.['full-name'] }}
        </v-card-subtitle>
        <v-card-subtitle v-else>
            {{ character.name }}
        </v-card-subtitle>
        <template v-slot:actions>
            <div class="d-flex justify-center align-center w-100">
                <v-btn variant="tonal" @click="toggleSelection(character)">
                    <span v-if="isSelected">Remove</span>
                    <span v-else>Add to fight</span>    
                </v-btn>
            </div>
        </template>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: "CharacterCard",
    props: {
        character: {
            type: Object as PropType<any>,
            required: true,
        },
        isSelected: {
            type: Boolean,
            required: true,
        },
        toggleSelection: {
            type: Function,
            required: true,
        },
    },
});
</script>

<style scoped>
.selected {
  border: 2px solid #42b983;
}
</style>