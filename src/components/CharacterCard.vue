<template>
    <v-card 
        :class="{'selected': isSelected, 'bg-blue-grey-lighten-4': isSelected}" 
        class="mx-auto" 
        :style="{ minHeight: '300px', width: '100%' }"
        @click="goToCharacterDetail" 
    >
        <v-img :src="character.images.md" alt="Character Image" 
            cover
            style="height: 200px; width: 100%;"
        />
        <v-card-title>{{ character.name }}</v-card-title>
        <v-card-subtitle v-if="character.biography.fullName">
            {{ character.biography.fullName }}
        </v-card-subtitle>
        <v-card-subtitle v-else>
            {{ character.name }}
        </v-card-subtitle>
        <template v-slot:actions>
            <div class="d-flex justify-center align-center w-100">
                <v-btn variant="tonal" @click.stop="toggleSelection(character)">
                    <span v-if="isSelected">Remove</span>
                    <span v-else>Add to fight</span>    
                </v-btn>
            </div>
        </template>
    </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "CharacterCard",
    props: {
        character: {
            type: Object as PropType<{ id: number; name: string; image: string }>,
            required: true,
        },
        isSelected: {
            type: Boolean,
            required: true,
        },
        toggleSelection: {
            type: Function,
            required: true,
        }
    },
    setup(props) {  // Usa props en setup()
        const router = useRouter();

        const goToCharacterDetail = () => {
            console.log("Navegando a detalle con ID:", props.character?.id);
            if (!props.character?.id) return;

            router.push({
                name: "CharacterDetail",
                params: {
                    id: props.character.id.toString()
                }
            });
        };

        return { goToCharacterDetail };
    },
});
</script>