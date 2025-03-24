<template>
    <v-card 
        :class="{'selected': isSelected}" 
        class="mx-auto" 
        :style="{ minHeight: '300px', width: '100%' }"
        @click="goToCharacterDetail" 
        >
            <v-img :src="character.image" alt="Character Image" 
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
    import { defineComponent, PropType, defineProps } from "vue";
    import { useRouter } from "vue-router";

    const props = defineProps<{ character: { id: number } }>(); // ⬅️ Asegura que el ID existe
    const router = useRouter(); // Inicializar router

    const goToCharacterDetail = () => {
        console.log("Navegando a detalle con ID:", props.character?.id); // Verifica si el ID está bien
        if (!props.character?.id) return; // Evita errores si el ID es undefined o null

        router.push({ 
            name: "CharacterDetail", 
            params: { 
                id: props.character.id.toString() 
            } 
        });
    };

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
        setup() {
            const router = useRouter();

            // Función para navegar al detalle del personaje
            const goToCharacterDetail = () => {
            router.push({ name: 'CharacterDetail', params: { id: this.character.id } });
            };

            return { goToCharacterDetail };
        },
    });
</script>

<style scoped>
.selected {
  border: 2px solid #42b983;
}
</style>