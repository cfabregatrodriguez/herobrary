import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getListCharacters } from "@/services/api";
// Components
import Character from "@/components/Character.vue";
// Pinia Stores
import { useCountdownStore } from '@/stores/countdownStore';
// Routing
const route = useRoute();
const router = useRouter();
// Reactive Variables
const characters = ref([]);
const page = ref(Number(route.query.page) || 1);
const itemsPerPage = 30;
const searchQuery = ref(route.query.search ? String(route.query.search) : "");
const selectedRace = ref(route.query.race ? String(route.query.race) : null);
const selectedAlignment = ref(route.query.alignment ? String(route.query.alignment) : null);
const selectedPublisher = ref(route.query.publisher ? String(route.query.publisher) : null);
// Computed
const filteredCharacters = computed(() => {
    let filtered = characters.value;
    if (searchQuery.value.trim()) {
        filtered = filtered.filter((character) => character.name?.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
    if (selectedRace.value) {
        filtered = filtered.filter((character) => character.appearance?.race?.toLowerCase() === selectedRace.value?.toLowerCase());
    }
    if (selectedAlignment.value) {
        filtered = filtered.filter((character) => character.biography?.alignment?.toLowerCase() === selectedAlignment.value?.toLowerCase());
    }
    if (selectedPublisher.value) {
        filtered = filtered.filter((character) => character.biography?.publisher?.toLowerCase() === selectedPublisher.value?.toLowerCase());
    }
    return filtered;
});
// Computed
const races = computed(() => {
    return Array.from(new Set(characters.value.map(c => c.appearance?.race).filter(Boolean))).sort();
});
const alignments = computed(() => {
    return Array.from(new Set(characters.value.map(c => c.biography?.alignment).filter(Boolean))).sort();
});
const publishers = computed(() => {
    return Array.from(new Set(characters.value.map(c => c.biography?.publisher).filter(Boolean))).sort();
});
const totalPages = computed(() => {
    return Math.ceil(filteredCharacters.value.length / itemsPerPage);
});
const paginatedCharacters = computed(() => {
    const start = (page.value - 1) * itemsPerPage;
    return filteredCharacters.value.slice(start, start + itemsPerPage);
});
// Watches
watch([searchQuery, selectedRace, selectedAlignment, selectedPublisher], () => {
    page.value = 1; // Reset de paginación
    updateQueryParams(); // Actualiza la URL con los nuevos parámetros
});
// Methods
function updateQueryParams() {
    router.replace({
        query: {
            page: page.value,
            search: searchQuery.value || undefined,
            race: selectedRace.value || undefined,
            alignment: selectedAlignment.value || undefined,
            publisher: selectedPublisher.value || undefined
        }
    });
}
const clearSearch = () => {
    searchQuery.value = "";
    page.value = 1;
    updateQueryParams();
};
// Lifecycle Hooks
onMounted(async () => {
    const countdownStore = useCountdownStore();
    countdownStore.isCountdownActive = false;
    const data = await getListCharacters();
    if (Array.isArray(data) && data.length > 0) {
        characters.value = data;
    }
    else {
        console.error("Error in API response or no results found");
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    cols: "6",
}));
const __VLS_6 = __VLS_5({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    ...{ 'onClick:clear': {} },
    bgColor: "white",
    modelValue: (__VLS_ctx.searchQuery),
    label: "Search character...",
    prependInnerIcon: "mdi-magnify",
    density: "compact",
    clearable: true,
}));
const __VLS_10 = __VLS_9({
    ...{ 'onClick:clear': {} },
    bgColor: "white",
    modelValue: (__VLS_ctx.searchQuery),
    label: "Search character...",
    prependInnerIcon: "mdi-magnify",
    density: "compact",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    'onClick:clear': (__VLS_ctx.clearSearch)
};
var __VLS_11;
var __VLS_7;
const __VLS_16 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({}));
const __VLS_18 = __VLS_17({}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.VAutocomplete;
/** @type {[typeof __VLS_components.VAutocomplete, typeof __VLS_components.vAutocomplete, typeof __VLS_components.VAutocomplete, typeof __VLS_components.vAutocomplete, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    bgColor: "white",
    flat: true,
    modelValue: (__VLS_ctx.selectedRace),
    label: "Race",
    items: (__VLS_ctx.races),
    density: "compact",
    clearable: true,
    theme: "default",
}));
const __VLS_22 = __VLS_21({
    bgColor: "white",
    flat: true,
    modelValue: (__VLS_ctx.selectedRace),
    label: "Race",
    items: (__VLS_ctx.races),
    density: "compact",
    clearable: true,
    theme: "default",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
var __VLS_19;
const __VLS_24 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.VAutocomplete;
/** @type {[typeof __VLS_components.VAutocomplete, typeof __VLS_components.vAutocomplete, typeof __VLS_components.VAutocomplete, typeof __VLS_components.vAutocomplete, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    bgColor: "white",
    modelValue: (__VLS_ctx.selectedAlignment),
    label: "Alignment",
    items: (__VLS_ctx.alignments),
    density: "compact",
    clearable: true,
}));
const __VLS_30 = __VLS_29({
    bgColor: "white",
    modelValue: (__VLS_ctx.selectedAlignment),
    label: "Alignment",
    items: (__VLS_ctx.alignments),
    density: "compact",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
const __VLS_32 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({}));
const __VLS_34 = __VLS_33({}, ...__VLS_functionalComponentArgsRest(__VLS_33));
__VLS_35.slots.default;
const __VLS_36 = {}.VAutocomplete;
/** @type {[typeof __VLS_components.VAutocomplete, typeof __VLS_components.vAutocomplete, typeof __VLS_components.VAutocomplete, typeof __VLS_components.vAutocomplete, ]} */ ;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
    bgColor: "white",
    modelValue: (__VLS_ctx.selectedPublisher),
    label: "Publisher",
    items: (__VLS_ctx.publishers),
    density: "compact",
    clearable: true,
}));
const __VLS_38 = __VLS_37({
    bgColor: "white",
    modelValue: (__VLS_ctx.selectedPublisher),
    label: "Publisher",
    items: (__VLS_ctx.publishers),
    density: "compact",
    clearable: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
var __VLS_35;
var __VLS_3;
const __VLS_40 = {}.VPagination;
/** @type {[typeof __VLS_components.VPagination, typeof __VLS_components.vPagination, typeof __VLS_components.VPagination, typeof __VLS_components.vPagination, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    modelValue: (__VLS_ctx.page),
    density: "compact",
    length: (__VLS_ctx.totalPages),
    showPrevNext: (true),
    totalVisible: (7),
    ...{ class: "my-8" },
    size: "small",
}));
const __VLS_42 = __VLS_41({
    modelValue: (__VLS_ctx.page),
    density: "compact",
    length: (__VLS_ctx.totalPages),
    showPrevNext: (true),
    totalVisible: (7),
    ...{ class: "my-8" },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const __VLS_44 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
for (const [character] of __VLS_getVForSourceType((__VLS_ctx.paginatedCharacters))) {
    const __VLS_48 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        key: (character.id),
        cols: "6",
        sm: "4",
        md: "3",
        lg: "2",
        ...{ class: "pa-1" },
    }));
    const __VLS_50 = __VLS_49({
        key: (character.id),
        cols: "6",
        sm: "4",
        md: "3",
        lg: "2",
        ...{ class: "pa-1" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    __VLS_51.slots.default;
    if (character) {
        /** @type {[typeof Character, ]} */ ;
        // @ts-ignore
        const __VLS_52 = __VLS_asFunctionalComponent(Character, new Character({
            character: (character),
            isCharacterPowerBar: (false),
            isCharacterStats: (false),
            isCharacterBarFight: (false),
            isCharacterPublisher: (false),
            compact: (true),
            index: (1),
        }));
        const __VLS_53 = __VLS_52({
            character: (character),
            isCharacterPowerBar: (false),
            isCharacterStats: (false),
            isCharacterBarFight: (false),
            isCharacterPublisher: (false),
            compact: (true),
            index: (1),
        }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    }
    var __VLS_51;
}
var __VLS_47;
const __VLS_55 = {}.VPagination;
/** @type {[typeof __VLS_components.VPagination, typeof __VLS_components.vPagination, typeof __VLS_components.VPagination, typeof __VLS_components.vPagination, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    modelValue: (__VLS_ctx.page),
    density: "compact",
    length: (__VLS_ctx.totalPages),
    showPrevNext: (true),
    totalVisible: (7),
    ...{ class: "my-8" },
    size: "small",
}));
const __VLS_57 = __VLS_56({
    modelValue: (__VLS_ctx.page),
    density: "compact",
    length: (__VLS_ctx.totalPages),
    showPrevNext: (true),
    totalVisible: (7),
    ...{ class: "my-8" },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
/** @type {__VLS_StyleScopedClasses['my-8']} */ ;
/** @type {__VLS_StyleScopedClasses['pa-1']} */ ;
/** @type {__VLS_StyleScopedClasses['my-8']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Character: Character,
            page: page,
            searchQuery: searchQuery,
            selectedRace: selectedRace,
            selectedAlignment: selectedAlignment,
            selectedPublisher: selectedPublisher,
            races: races,
            alignments: alignments,
            publishers: publishers,
            totalPages: totalPages,
            paginatedCharacters: paginatedCharacters,
            clearSearch: clearSearch,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
